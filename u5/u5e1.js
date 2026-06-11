// T3. JavaScript profesional en una aplicación web
// U4. Almacenamiento local (Cookies)
// Enunciado disponible en u5e1.md / Enunciat disponible a u5e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:

class ClipboardApi {

    constructor(customClipboard = null) {
        const nativeClipboard = window.navigator && window.navigator.clipboard
            ? window.navigator.clipboard
            : null;

        this.clipboard = customClipboard || nativeClipboard;
    }

    async copy(text) {
        if (!this.clipboard || typeof this.clipboard.writeText !== 'function') {
            throw new Error('Clipboard API no disponible');
        }

        return this.clipboard.writeText(text);
    }

    async read() {
        if (!this.clipboard || typeof this.clipboard.readText !== 'function') {
            throw new Error('Clipboard API no disponible');
        }

        return this.clipboard.readText();
    }
}

export { ClipboardApi };