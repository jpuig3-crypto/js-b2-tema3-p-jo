// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e1.md / Enunciat disponible a u1e1.md

//Escribe aquí tu solución / escriviu aquí la vostra solució:

function getItems() {
    const nodes = document.querySelectorAll('.js-item');

    return Array.from(nodes).map(node => {
        return {
            id: node.getAttribute('data-id'),
            es: node.getAttribute('data-es'),
            en: node.getAttribute('data-en')
        };
    });
}

function emptyList() {
    const list = document.querySelector('.js-list');

    if (list) {
        list.innerHTML = '';
    }
}

function renderList(itemList, lang) {
    emptyList();

    const list = document.querySelector('.js-list');
    if (!list) return;

    itemList.forEach(item => {
        const palabraTraducida = item[lang];

        const liHTML = `<li class="js-item" data-id="${item.id}" data-es="${item.es}" data-en="${item.en}">${palabraTraducida}</li>`;

        list.innerHTML += liHTML;
    });
}

function updateItemStyle(idItem) {
    const item = document.querySelector(`.js-item[data-id="${idItem.toString()}"]`);

    if (item) {
        item.classList.add('highLight');
    }
}

const words = getItems();

renderList(words, 'en');

updateItemStyle(2);
updateItemStyle(4);