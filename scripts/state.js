let records =[];

export function getRecords() {
    return records;
}

export function setRecords(list) {
    records = list;
}

export function addRecord(data) {
    const now = new Date().toISOString();
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
        copy.sort(function (a, b) { return a.date.localeCompare(b.date); });
    } else if (mode ==='date-desc') {
        copy.sort(function (a, b) { return b.date.localeCompare(a.date); });
    } else if (mode === 'desc-asc') {
        copy.sort(function (a, b) { return a.description.localeCompare(b.description); });
    } else if (mode === 'desc-asc') {
        copy.sort(function (a, b) { return b.description.localeCompare(a.description); });
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

export function updateRecord(id, data) {
    const r = records.find(function (x) { return x.id === id; });
    if (!r) return;
    r.description = data.description;
    r.amount = Number(data.amount);
    r.category = data.category;
    r.date = data.date;
    r.updatedAt = new Date().toISOString();
    }

