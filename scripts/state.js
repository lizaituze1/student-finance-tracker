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