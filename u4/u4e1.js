
// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u4e1.md / Enunciat disponible a u4e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:

class CookieApi {
    static EXPIRING_DAYS = 365;

    static expirationDate(nDays) {
        const date = new Date();
        date.setTime(date.getTime() + (nDays * 24 * 60 * 60 * 1000));
        return date.toUTCString();
    }

    constructor(customDocument = null) {
        this.document = customDocument || window.document;
    }

    setCookie(key, value, nDays = CookieApi.EXPIRING_DAYS) {
        const expires = CookieApi.expirationDate(nDays);
        const stringifiedValue = JSON.stringify(value);

        this.document.cookie = `${key}=${stringifiedValue}; expires=${expires}; path=/`;
    }

    getCookie(key) {
        const nameEqual = key + '=';
        const cookiesArray = this.document.cookie.split(';');

        for (let cookie of cookiesArray) {
            cookie = cookie.trim();
            if (cookie.startsWith(nameEqual)) {
                const rawValue = cookie.substring(nameEqual.length);
                if (rawValue === '') {
                    return '';
                }
                return JSON.parse(rawValue);
            }
        }

        return null;
    }

    removeCookie(key) {
        this.document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
}

export { CookieApi };