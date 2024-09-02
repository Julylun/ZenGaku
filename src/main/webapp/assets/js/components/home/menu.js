import * as HTMLDom from '../HTMLDom.js'
import * as WidgetDisplay from '../../features/ZenGakuWidget/WidgetDisplay.js'

export {
    createMenu,
    deleteMenu
}

const iconPathArr = [
    'assets/resources/img/social-icon-black.svg',
    'assets/resources/img/timer-icon-black.svg',
    'assets/resources/img/background-configuration-icon-black.svg',
    'assets/resources/img/sound-board-icon-black.svg',
    'assets/resources/img/quotes-icon.svg',
    'assets/resources/img/widget/todolist_icon.svg',
    'assets/resources/img/widget/calculator_logo.svg',
    'assets/resources/img/widget/zengaku_assistant_logo.svg',
    'assets/resources/img/commingSoon.svg'
];
const titleArr = [
    'Social',
    'Counter',
    'Background Config',
    'Sound board',
    'Daily quotes',
    'Todo list',
    'Calculator',
    'ZenGaku Assistant',
    'Comming soon'
];
const idArr = [
    'laicos-feature',
    'timer-feature',
    'background-config-feature',
    'sound-board-feature',
    'quotes-feature',
    'to-do-feature',
    'calculator-feature',
    'zengaku-assistant-feature',
    'comming-soon-feature'
]

//Create Menu when call this function, then return this menu
//To add menu item, just change lists above following exist index
const createMenu = () => {
    let bgContent = HTMLDom.createElement('div',[],document.body,{},'opened-bg-content');
    let menu = HTMLDom.createElement('div', [], 
        bgContent
    ,{},'menu');

    for(let i = 0; i < iconPathArr.length; i++){
        createMenuItem(
            titleArr[i],
            iconPathArr[i],
            menu,
            idArr[i]
        );
    }
    WidgetDisplay.widgetListenerInit();
    return bgContent;
}


const deleteMenu = (menu) => {
    let tmpTimer = 0;
    let tmpId = setInterval(() => {
        tmpTimer += 100;
        if(tmpTimer == 300){
            clearInterval(tmpId);
            menu.remove();
        }
    }, 100);
    
}

const createMenuItem = (title, iconPath, parent, id) => {
    let menuItem = HTMLDom.createElement('div', ['menu-item'], parent, {});
    HTMLDom.createElement('img',['item-image'],menuItem,{title: title, src: iconPath, },id);
    HTMLDom.createElement('p',['item-text'],menuItem,{innerText: title});
}