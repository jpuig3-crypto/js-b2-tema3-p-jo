// T3. JavaScript profesional en una aplicación web
// U1. Trabajo avanzado con el DOM
// Enunciado disponible en u1e2.md / Enunciat disponible a u1e2.md

const CATEGORY_LIST = [
    {
        id: 1,
        name: 'design'
    }, {
        id: 2,
        name: 'development'
    }, {
        id: 3,
        name: 'consultancy'
    }
];

const PROJECT_LIST = [
    {
        id: 1,
        name: 'First Project',
        excerpt: 'Lorem <strong>ipsum</strong> dolor quan aemet...',
        categoryId: 2,
        progress: 90,
        archived: false,
        search: ['wordA', 'wordB', 'wordC'],
        tags: ['tag1', 'tag2']
    }, {
        id: 2,
        name: 'Second Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 2,
        progress: 50,
        archived: false,
        search: ['wordA', 'wordD'],
        tags: ['tag3']
    }, {
        id: 3,
        name: 'Third Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 1,
        progress: 20,
        archived: false,
        search: ['wordB', 'wordC'],
        tags: ['tag1', 'tag3']
    }, {
        id: 4,
        name: 'Fourth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB'],
        tags: ['tag2']
    }, {
        id: 5,
        name: 'Fifth Project',
        excerpt: 'Lorem ipsum dolor quan aemet...',
        categoryId: 3,
        progress: 100,
        archived: false,
        search: ['wordA', 'wordC', 'wordD'],
        tags: ['tag1', 'tag2', 'tag3']
    }, {
        id: 6,
        name: 'Sixth Project',
        excerpt: 'Lorem ipsum <strong>dolor quan</strong> aemet...',
        categoryId: 2,
        progress: 100,
        archived: true,
        search: ['wordA', 'wordB', 'wordD'],
        tags: ['tag1']
    },
];

//Escribe aquí tu solución / escriviu aquí la vostra solució:

function renderProjects(projects = PROJECT_LIST) {
    const container = document.querySelector('.js-project-list');
    const template = document.getElementById('tpl-project');
    const tagTemplate = document.getElementById('tpl-tag');

    if (!container || !template) return;

    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    projects.forEach(project => {
        const clone = template.content.cloneNode(true);
        
        // Rellenar data attributes
        const projectDiv = clone.querySelector('.js-project');
        projectDiv.setAttribute('data-id', project.id);
        projectDiv.setAttribute('data-tags', project.tags.join(','));
        projectDiv.setAttribute('data-search', project.search.join(','));
        projectDiv.setAttribute('data-archived', project.archived);
        
        // Añadir clases si es necesario
        if (project.archived) {
            projectDiv.classList.add('archived');
        }
        if (project.progress === 100) {
            projectDiv.classList.add('completed');
        }

        // Rellenar nombre del proyecto
        const nameElem = clone.querySelector('.js-name');
        if (nameElem) nameElem.textContent = project.name;

        // Rellenar progreso
        const progressElem = clone.querySelector('.js-progress');
        if (progressElem) progressElem.textContent = project.progress;

        // Rellenar excerpt
        const excerptElem = clone.querySelector('.js-excerpt');
        if (excerptElem) excerptElem.innerHTML = project.excerpt;

        // Rellenar categoría
        const category = CATEGORY_LIST.find(cat => cat.id === project.categoryId);
        const categoryElem = clone.querySelector('.js-category');
        if (categoryElem && category) {
            categoryElem.textContent = category.name;
        }

        // Rellenar tags
        const tagsContainer = clone.querySelector('.js-tags');
        if (tagsContainer && tagTemplate) {
            tagsContainer.innerHTML = '';
            project.tags.forEach(tag => {
                const tagClone = tagTemplate.content.cloneNode(true);
                const tagLink = tagClone.querySelector('.js-tag-link');
                if (tagLink) {
                    tagLink.textContent = tag;
                    tagLink.setAttribute('data-tag', tag);
                }
                tagsContainer.appendChild(tagClone);
            });
        }

        fragment.appendChild(clone);
    });

    container.appendChild(fragment);
}

window.onload = function() {
    renderProjects();
};