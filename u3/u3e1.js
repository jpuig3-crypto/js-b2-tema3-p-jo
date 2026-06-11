// T3. JavaScript profesional en una aplicación web
// U2. Eventos personalizados (custom events)
// Enunciado disponible en u3e1.md / Enunciat disponible a u3e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:

class Sender {
    static TYPE_A = 'EVENT_NOTIFICATION_A';
    static TYPE_B = 'EVENT_NOTIFICATION_B';

    #refDom;

    constructor(ref, type) {
        this.#refDom = ref;
        this.type = type;
        this.count = 0;
        this.init();
    }

    init() {
        this.#refDom.addEventListener('click', (e) => {
            e.preventDefault();
            this.count++;
            this.trigger();
            this.render();
        });
    }

    trigger() {
        const customEvent = new CustomEvent(this.type, {
            bubbles: true,
            detail: { count: this.count }
        });
        this.#refDom.dispatchEvent(customEvent);
    }

    render() {
        const letra = this.type.split('_').pop();
        this.#refDom.textContent = `${letra}: ${this.count}`;
    }
}

class Logger {
    #refDom;
    #notificationList;

    #handlerA;
    #handlerB;

    constructor(ref) {
        this.#refDom = ref;
        this.#notificationList = [];
        this.init();
    }

    init() {
        this.#handlerA = (e) => this.onNotificationReceived(e);
        this.#handlerB = (e) => this.onNotificationReceived(e);

        document.addEventListener(Sender.TYPE_A, this.#handlerA);
        document.addEventListener(Sender.TYPE_B, this.#handlerB);
    }

    onNotificationReceived(event) {
        this.#notificationList.unshift({
            type: event.type,
            count: event.detail.count
        });
        this.render();
    }

    render() {
        this.#refDom.innerHTML = '';
        this.#notificationList.forEach(notif => {
            const p = document.createElement('p');
            p.textContent = `${notif.type}: ${notif.count}`;
            this.#refDom.appendChild(p);
        });
    }
    
    destroy() {
        document.removeEventListener(Sender.TYPE_A, this.#handlerA);
        document.removeEventListener(Sender.TYPE_B, this.#handlerB);
    }
}

const notificationADom = document.querySelector('.js-notification-A');
const notificationBDom = document.querySelector('.js-notification-B');

const nA = new Sender(notificationADom, Sender.TYPE_A);
const nB = new Sender(notificationBDom, Sender.TYPE_B);
const logger = new Logger(document.querySelector('.js-logger'));

notificationADom.click();
notificationADom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationBDom.click();
notificationADom.click();

logger.destroy();

notificationADom.click();
notificationBDom.click();
