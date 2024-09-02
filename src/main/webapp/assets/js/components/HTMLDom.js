export {
    createElement
}
const createElement = (tag, classNameS, parent, attributes = {}, id) => {
    let element = document.createElement(tag);
    // if (className) element.className = className;
    if(!classNameS.length == 0)
    for(let className of classNameS) {
        element.classList.add(className);
    }
    for (let key in attributes) {
        element[key] = attributes[key];
    }
    // console.log(id)
    if (id) element.id = id;
    if (parent) parent.appendChild(element);
    
    return element;
}