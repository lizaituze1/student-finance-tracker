function appendHighlighted(parent, text, re) {
  if (!re) {
    parent.textContent = text;
    return;
  }
  let last = 0;
  for (const m of text.matchAll(re)) {
    if (m[0].length === 0) continue;
    parent.appendChild(document.createTextNode(text.slice(last, m.index)));
    const mark = document.createElement('mark');
    mark.textContent = m[0];
    parent.appendChild(mark);
    last = m.index + m[0].length;
  }
  parent.appendChild(document.createTextNode(text.slice(last)));
}

function makeCell(label, text, re) {
  const td = document.createElement('td');
  td.setAttribute('data-label', label);
  appendHighlighted(td, text, re);
  return td;
}

export function renderRecords(list, re, total) {
  const body = document.getElementById('records-body');
  const empty = document.getElementById('empty-message');
  body.innerHTML = '';
  empty.textContent = total === 0
    ? 'No records yet. Add your first one below.'
    : 'No records match your search.';
  empty.hidden = list.length > 0;

  list.forEach(function (r) {
    const tr = document.createElement('tr');
    tr.appendChild(makeCell('Date', r.date, null));
    tr.appendChild(makeCell('Description', r.description, re));
    tr.appendChild(makeCell('Category', r.category, re));
    tr.appendChild(makeCell('Amount', r.amount.toFixed(2), null));
    tr.appendChild(makeCell('Actions', '', null));
    body.appendChild(tr);
  });
}