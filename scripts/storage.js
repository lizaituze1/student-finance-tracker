const RECORDS_KEY = 'sft:records';
const SETTINGS_KEY = 'sft:settings';

export function loadRecords() {
    try {
        const raw = localStorage.getItem(RECORDS_KEY);
        const data = raw ? JSON.parse(raw) : [];
        return Array.isArray(data) ? data : [];
    } catch (e) {
        return [];
    }
}

export function saveRecords(list) {
    try {
        localStorage.setItem(RECORDS_KEY, JSON.stringify(list));
    } catch (e) {
        console.warn('Could not save records');
    }
}

export function loadSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        const data = raw ? JSON.parse(raw) : {};
        return typeof data === 'object' && data !== null ? data : {};
    } catch (e) {
        return {};
    }
}

export function saveSettings(settings) {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (e) {
        console.warn('Could not save settings');
    }
}