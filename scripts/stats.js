function toKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() +1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
}

export function computeStats(list) {
    const total = list.length;
    let sum = 0;
    const byCategory = {};

    list.forEach(function (r){
        sum += r.amount;
        byCategory[r.category] = (byCategory[r.category] || 0) +1;
    });

    let top = 'None yet';
    let topCount = 0;
    Object.keys(byCategory).forEach(function (c) {
        if (byCategory[c] > topCount) {
            top = c;
            topCount = byCategory[c];
        }
    });
    const days = [];
    for (let i = 6; i>=0; i--) {
        const d = new Date();
        d.setDate(d.getDate() -i);
        const key = toKey(d);
        let amount = 0;
        list.forEach(function (r) {
            if (r.date === key) amount += r.amount;
        });
        days.push({ key: key, amount: amount });
    }
    return { total: total, sum: sum, top: top, days: days };
}
export function capStatus(sum, cap) {
    if (cap === null) {
        return { state: 'none', text: 'No spending cap set. Add one in Settings.', left: null };
    }
    const diff = cap - sum;
    if (diff >=0) {
    return { state: 'under', text: 'You have ' + diff.toFixed(2) + 'left under your cap.', left: diff};
    }
    return { state: 'over', text: 'You are over your cap by ' +Math.abs(diff).toFixed(2) + '!', left: diff };
}