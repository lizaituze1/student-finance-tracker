export function compileRegex(input, ignoreCase) {
    if (!input) {
        return { re: null, error: '' };
    }
    try {
        return { re: new RegExp(input, ignoreCase ? 'gi' : 'g'), error: ''};
    } catch (e) {
        return { re: null, error: 'Invalid pattern. Check your brackets and symbols' };
    }
}

export function filterRecords(list, re) {
    if (!re) return list;
    return list.filter(function(r) {
        const text = r.description + '' + r.category;
        return new RegExp(re.source, re.flags).test(text);
    });
}