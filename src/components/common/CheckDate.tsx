export function CheckDate(limit) {
    const { yyyy, mm, dd } = GetNowDate();
    const limitYear = limit.substring(0, 4);
    const limitMonth = limit.substring(5, 7);
    const limitDay = limit.substring(8, 10);

    if (limitYear < yyyy) {
        return true;
    }

    if (limitMonth < mm) {
        return true;
    }

    if (limitDay < dd) {
        return true;
    }

    return false;
}

export function GetNowDate() {
    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = date.getMonth() + 1;
    const dd = date.getDate();

    return { yyyy: yyyy, mm: mm, dd: dd };
}

export function GetNowDateString() {
    const diff = new Date().getTimezoneOffset() * 60000;
    const date = new Date(Date.now() - diff).toISOString().substr(0, 10);
    return date;
}
