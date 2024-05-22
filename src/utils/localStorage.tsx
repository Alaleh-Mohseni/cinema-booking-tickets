export function lsSet(key: string, data: object | string, isObject = false): void {
    if (typeof key !== 'string') {
        throw new Error('key must be string');
    }

    if (typeof data !== 'object' && isObject) {
        throw new Error('data must be Object');
    }

    if (typeof data === 'object' && !isObject) {
        throw new Error('data must be string or number');
    }

    if (isObject) {
        localStorage.setItem(key, JSON.stringify(data));
    } else {
        localStorage.setItem(key, data as string);
    }
}

export function lsGet(key: string, isObject = false) {
    if (typeof key !== 'string') {
        throw new Error('key must be string');
    }

    if (isObject) {
        return JSON.parse(localStorage.getItem(key) || '{}');
    } else {
        return localStorage.getItem(key);
    }
}