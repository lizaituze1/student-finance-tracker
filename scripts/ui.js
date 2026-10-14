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

    const actions = document.createElement('td');
    actions.setAttribute('data-label', 'Actions');
    const del = document.createElement('button');
    del.type = 'button';
    del.textCount = 'Delete';
    del.className = 'btn-delete';
    del.setAttribute('data-id', r.id);
    del.setAttribute('aria-label', 'Delete ' + r.description);

    const edit = document.createElement('button');
    edit.type = 'button';
    edit.textContent = 'Edit';
    edit.className = 'btn-edit';
    edit.setAttribute('data-id', r.id);
    edit.setAttribute('aria-label', 'Edit' + r.description);
    actions.appendChild(edit);
    
    actions.appendChild(del);
    tr.appendChild(actions);

    body.appendChild(tr);
  });
}

export function renderStats(stats) {
  document.getElementById('stat-total').textContent = stats.total;
  document.getElementById('stat-sum').textContent = stats.sum.toFixed(2);
  document.getElementById('stat-top').textContent = stats.top;

  const trend = document.getElementById('trend');
  trend.innerHtml = '';
  const amounts = stats.days.map(function (d) { return d.amount; });
  const max = Math.max.apply(null, amounts.concat([1]));

  stats.days.forEach(function (d) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = (d.amount /max * 100) + '%';
    bar.title = d.key + ': ' + d.amount.toFixed(2);
    trend.appendChild(bar);
  });

  const summary = stats.days.map(function (d) {
    return d.key.slice(5) + ' ' + d.amount.toFixed(2);
  }).join(', ');
  trend.setAttribute('aria-label', 'Spending over the last 7 days: ' + summary);
}

export function renderCap(status) {
  const msg = document.getElementById('cap-message');
  const statCap = document.getElementById('stat-cap');
  msg.setAttribute('aria-live', status.state === 'over' ? 'assertive' : 'polite');
  msg.textContent = status.text;
  msg.className = 'cap-' + status.state;
  statCap.textContent = status.left === null ? 'Not set' : status.left.toFixed(2);
}