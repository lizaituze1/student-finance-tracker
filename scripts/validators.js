export function validateDescription(value) {
    const cleaned = value.replace(/\s{2,}/g, ' ');
    const pattern = /^\S(?:.*\S)?$/;
    if (!pattern.test(cleaned)) {
        return { ok: false, message: 'Remove spaces at the start or end.' };
    }
    return { ok: true, messages: '' };
}

export function validateAmount(value) {
    const pattern = /^(0|[1-9]\d*)(\.\d{1,2})?$/;
    if (!pattern.test(value)) {
        return { ok: false, message: 'Use a number like 12 or 12.50.' };
    }
    return { ok: true, message: '' };
}

export function validateDate(value) {
    const pattern = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (!pattern.test(value)) {
        return { ok: false, message: 'Use the format YYYY-MM-DD, like 2025-09-29.' };
    }
    const [y, m, d] = value.split('-').map(Number);
    const date = new Date(y, m-1, d);
        const real =
        date.getFullYear() ===y &&
        date.getMonth() === m-1 &&
        date.getDate() === d;
        if (!real) {
            return { ok: false, message: 'That date does note exist.' };
        }
        return { ok: true, message: ''};
}

export function validateCategory(value) {
    const pattern = /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/;
    if (!pattern.test(value)) {
        return { ok: false, message: 'Use letters, spaces or hyphens pnly.' };
    }
    return { ok: true, message: '' };
}

export function validateNoDuplicateWords(value) {
    const pattern = /\b(\w+)\s+\1\b/i;
    const match = value.match(pattern);
    if (match) {
        return { ok: false, message: 'The word "' + match[1] + '" is repeated.' };
    }
    return { ok: true, message: '' };
}

