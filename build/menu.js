const sunMenu = document.getElementById('sun-menu'), mobileMenu = document.getElementById('mobile-menu');
mobileMenu.appendChild(createMenuElement());
sunMenu.addEventListener('click', () => {
    sunMenu.classList.toggle('clicked');
    mobileMenu.classList.toggle('show');
});
function createMenuElement() {
    const menuItems = [
        { "nicename": "Games", "href": "/" },
        { "nicename": "Teams", "href": "/teams.html" },
        { "nicename": "Players", "href": "/players.html" }
    ], ulElement = createElement('ul', { 'class': 'flex column no-list' });
    menuItems.forEach(item => {
        const liElement = createElement('li', { 'class': 'menu-items' }), aElement = createElement('a', { "href": item.href }, item.nicename);
        liElement.appendChild(aElement);
        ulElement.appendChild(liElement);
    });
    return ulElement;
}
function createElement(type, attributes = {}, innerHtml = "") {
    const element = document.createElement(type);
    Object.keys(attributes).forEach(attribute => {
        element.setAttribute(attribute, attributes[attribute]);
    });
    element.innerHTML = innerHtml;
    return element;
}
