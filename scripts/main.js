import { computeStats, capStatus } from './stats.js';
import { compileRegex, filterRecords } from './search.js';
import { addRecord, getRecords, sortRecords, getSettings, updateSettings, setRecords} from './state.js';
import { renderRecords, renderStats, renderCap } from './ui.js'
import { loadRecords, saveRecords, loadSettings, saveSettings } from './storage.js';
import {
    validateDescription,
    validateAmount,
    validateDate,
    validateCategory,
    validateNoDuplicateWords
} from './validators.js';

const sortSelect = document.getElementById('sort');

const searchInput = document.getElementById('search');
const ignoreCase = document.getElementById('ignore-case');
const searchError = document.getElementById('search-error');

function refresh() {
  const compiled = compileRegex(searchInput.value, ignoreCase.checked);
  searchError.textContent = compiled.error;
  const all = getRecords();
  const shown = sortRecords(filterRecords(all, compiled.re), sortSelect.value);
  renderRecords(shown, compiled.re, all.length);
  const stats = computeStats(all);
  renderStats(stats);
  renderCap(capStatus(stats.sum, getSettings().cap));
}

searchInput.addEventListener('input', refresh);
ignoreCase.addEventListener('change', refresh);
sortSelect.addEventListener('change', refresh);

const form = document.getElementById('record-form');
const fields = [
    { input: document.getElementById('description'), error: document.getElementById('description-error'), check:checkDescription},
    { input: document.getElementById('amount'), error: document.getElementById('amount-error'), check: validateAmount },
  { input: document.getElementById('category'), error: document.getElementById('category-error'), check: validateCategory },
  { input: document.getElementById('date'), error: document.getElementById('date-error'), check: validateDate }
];

function checkDescription(value) {
  const basic = validateDescription(value);
  if (!basic.ok) return basic;
  return validateNoDuplicateWords(value);
}

function showResult(field, result) {
  field.error.textContent = result.message;
  field.input.setAttribute('aria-invalid', result.ok ? 'false' : 'true');
}

fields.forEach(function (field) {
  field.input.addEventListener('blur', function () {
    showResult(field, field.check(field.input.value));
  });
});

form.addEventListener('submit', function (event) {
  event.preventDefault();
  let firstBad = null;
  fields.forEach(function (field) {
    const result = field.check(field.input.value);
    showResult(field, result);
    if (!result.ok && !firstBad) firstBad = field.input;
  });
  if (firstBad) {
    firstBad.focus();
  return;
}
addRecord({
    description: fields[0].input.value.replace(/\s{2,}/g, ' '),
    amount: fields[1].input.value,
    category: fields[2].input.value,
    date: fields[3].input.value
});

saveRecords(getRecords());

refresh();
form.reset();
fields[0].input.focus();
});


const settingsForm = document.getElementById('settings-form');
const capInput = document.getElementById('cap');
const capError = document.getElementById('cap-error');

setRecords(loadRecords());
updateSettings(loadSettings());
const savedCup = getSettings().cap;
capInput.value = savedCup === null || savedCup === undefined ? '' : savedCup;
refresh();

settingsForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const raw = capInput.value.trim();
  if (raw === '') {
    updateSettings({ cap: null });
    capError.textContent = '';
    capInput.setAttribute('aria-invalid', 'false');
  } else {
    const result = validateAmount(raw);
    capError.textContent = result.message;
    capInput.setAttribute('aria-invalid', result.ok ? 'false' : 'true');
    if (!result.ok) {
      capInput.focus();
      return;
    }
    updateSettings({ cap: Number(raw) });
  }
  saveSettings(getSettings());
  refresh();
});