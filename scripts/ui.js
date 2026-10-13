function makeCell(label, text) {
    const td = document.createElement('td');
    td.setAttribute('data-label', label);
    td.textContent = text;
    return td;
}

export function renderRecords(list) {
    const body = document.getElementById('records-body');
    const empty = document.getElementById('empty-message');
    body.innerHTML = '';
    empty.hidden = list.length > 0;

    list.forEach(function (r) {
        const tr = document.createElement('tr');
        tr.appendChild(makeCell('Date', r.date));
        tr.appendChild(makeCell('Description', r.description));
        trappendChild(makeCell('Category', r.category));
        tr.appendChild(makeCell('Amount', r.amount.toFixed(2)));
        tr.appendChild(makeCell('Actions', ''));
        body.appendChild(tr);
    });
}