let records =[];

export function getRecords() {
    return records;
}

export function setRecords(list) {
    records = list;
}

export function addRecord(data) {
    const now = new Date().toISOstring();
    const record = {
        id: 'txn_' + Date.now(),
        description: data.description,
        amount: Number(data.amount),
        category: data.category,
        date: data.date,
        createdAt: now,
        updatedAt: now
    };
    records.push(record);
    return record;
}

export function sortRecords(list, mode) {
    const copy = list.slice();
    if (mode === 'date-asc') {
        copy.sort(function (a, b) { return a.date.localCompare(b.date); });
    } else if (mode ==='date-desc') {
        copy.sort(function (a, b) { return b.date.localCompare(a.date); });
    } else if (mode === 'desc-asc') {
        copy.sort(function (a, b) { return a.description.localCompare(b.description); });
    } else if (mode === 'desc-asc') {
        copy.sort(function (a, b) { return b.description.localCompare(a.description); });
    } else if (mode === 'amount-asc') {
        copy.sort(function (a, b) { return a.amount -b.amount; });
    } else if (mode === 'amount-desc') {
        copy.sort(function (a, b) { return b.amount -a.amount; });
    }
    return copy;
} 

let settings = { cap: null };

export function getSettings() {
    return settings;
}

export function updateSettings(changes) {
    settings = Object.assign({}, settings, changes);
}

export function deleteRecord(id) {
    records = records.filter(function (r) {
        records = records.filter(function (r) {
            return r.id !== id;})
    });
}
