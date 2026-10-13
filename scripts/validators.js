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
