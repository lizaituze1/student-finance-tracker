import { addRecord, getRecords, sortRecords} from './state.js';
import { renderRecords } from './ui.js'
import {
    validateDescription,
    validateAmount,
    validateDate,
    validateCategory,
    validateNoDuplicateWords
} from './validators.js';

const sortSelect = document.getElementById('sort');

function refresh() {
    renderRecords(sortRecords(getRecords(), sortSelect.value));
}

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
renderRecords(getRecords());
form.reset();
fields[0].input.focus();
});

refresh();
