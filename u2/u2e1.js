// T3. JavaScript profesional en una aplicación web
// U2. Delegación de eventos
// Enunciado disponible en u2e1.md / Enunciat disponible a u2e1.md

const TASK_LIST = [
    {
        name: 'Work',
        done: false,
    },
    {
        name: 'Shopping',
        done: false,
    },
    {
        name: 'Call mom',
        done: true,
    },
];

//Escribe aquí tu solución / escriviu aquí la vostra solució:

class TodoList {
    #appRef;
    #listRef;
    #todoTpl;

    constructor(appRef, listRef, todoTpl) {
        this.#appRef = appRef;
        this.#listRef = listRef;
        this.#todoTpl = todoTpl;
        this.list = [];
        this.init();
    }

    init() {
        const addButton = this.#appRef.querySelector('.js-todo-add');
        addButton.addEventListener('click', (e) => {
            e.preventDefault();
            const input = this.#appRef.querySelector('.js-todo-new-name');
            this.add(input.value, false);
            input.value = '';
        });

        this.#listRef.addEventListener('click', (e) => {
            e.preventDefault();
            const todoLi = e.target.closest('.js-todo');
            if (!todoLi) return;
            const taskName = todoLi.getAttribute('data-todo');

            if (e.target.classList.contains('js-todo-done')) {
                this.toggle(taskName);
            }

            if (e.target.classList.contains('js-todo-delete')) {
                this.remove(taskName);
            }
        });
    }
    
    add(todo, status){
        const cleanTodo = todo.trim();
        if (cleanTodo === '') return false;

        const exists = this.list.some(item => item.name === cleanTodo);
        if (exists) return false;

        this.list.push({ name: cleanTodo, done: status});
        this.render();
        return true;
    }

    remove(todoName) {
        this.list = this.list.filter(item => item.name !== todoName);
        this.render();
    }

    toggle(todoName) {
        const item = this.list.find(item => item.name === todoName);
        if (item) {
            item.done = !item.done;
        }
        this.render();
    }

    render() {
        this.#listRef.innerHTML = '';

        this.list.forEach(item => {
            const clone = this.#todoTpl.content.cloneNode(true);

            const li = clone.querySelector('.js-todo');
            li.setAttribute('data-todo', item.name);
            li.setAttribute('data-done', item.done);

            clone.querySelector('.js-todo-name').textContent = item.name;

            const doneLink = clone.querySelector('.js-todo-done');
            doneLink.textContent = item.done ? 'done' : 'pending';

            this.#listRef.appendChild(clone);
        });
    }
}

const todosApp = new TodoList(
    document.getElementById('app'),
    document.querySelector('.js-todo-list'),
    document.getElementById('todo-tpl')
);

TASK_LIST.forEach(task => todosApp.add (task.name, task.done));

todosApp.add('New one', false);
todosApp.toggle('Shopping');
todosApp.remove('Call mom');
todosApp.add('Another one', true);

document.querySelector('.js-todo-new-name').value = 'Test';
document.querySelector('.js-todo-add').click();

document.querySelector('.js-todo[data-todo="New one"] .js-todo-done').click();
document.querySelector('.js-todo[data-todo="Another one"] .js-todo-delete').click();
