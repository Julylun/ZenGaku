//  <div class = "profile-information__user--button-list">
//                     <div class = "button-list-item"><p>Bestie</p></div>
//                     <div class = "button-list-split-line"></div>
//                     <div class = "button-list-item"><p>Unfriend</p></div>
//                     <div class = "button-list-split-line"></div>
//                     <div class = "button-list-item button-list-red-item"><p>Block</p></div>
//                 </div>


import * as HTMLDom from '../../HTMLDom.js'

export {
    RED,
    NONE,
    createButtonListElement,
    createSplitLine,
    createButtonListMenu,
    removeButtonListMenu
}
const RED = 1;
const NONE = 0;

const removeButtonListMenu = () => {
    console.log('removed button list');
    document.getElementsByClassName('profile-information__user--button-list').item(0).remove();
}
const createButtonListMenu = () => {
    console.log("I'm here fvkkkk")
    let tmpParent = document.getElementsByClassName('profile-information__user--button-list').item(0);
    if(tmpParent) return tmpParent;
    let parent = document.getElementsByClassName('profile-information__user').item(0);
    return HTMLDom.createElement('div',['profile-information__user--button-list'],parent,{});
}

const createButtonListElement = (title, id, type, parent) => {
    let _parent = null; 
    if(parent) _parent = parent;
    else _parent = document.getElementsByClassName('profile-information__user--button-list').item(0);
    if(!_parent) throw new Error('parent doesn\'t exist!');

    let classnameArray = new Array();
    classnameArray.push('button-list-item');

    switch(type) {
        case RED: {
            classnameArray.push('button-list-red-item');
            break;
        }
        case NONE:
        default: {
            break;
        }
    }
    let htmlElement = null;
    htmlElement = HTMLDom.createElement('div',classnameArray, _parent, {innerHTML: "<p>"+title+"</p>"}, id);
    console.log(htmlElement);   
    return htmlElement
 }

const createSplitLine = (parent) => {
    let _parent = null; 
    if(parent) _parent = parent;
    else _parent = document.getElementsByClassName('profile-information__user--button-list').item(0);
    if(!_parent) throw new Error('parent doesn\'t exist!');

    return HTMLDom.createElement('div',['button-list-split-line'], _parent, {});
}