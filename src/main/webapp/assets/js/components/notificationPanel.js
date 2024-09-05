export {
    addNotificationPanel,
    createNotificationItem,
    updateNotification
}

import * as HTMLDom from './HTMLDom.js'
import * as Account from './user/account.js'
import * as NotificationServer from '../features/NotificationServer.js'

function createNotificationItem(title, contentText, type) {
    let parent = HTMLDom.createElement('div', ['notify-content-item']);

    let child = HTMLDom.createElement('div', ['notify-content-item-icon-layer'], parent);
    HTMLDom.createElement('img', [], child, { src: 'assets/resources/img/notify-notification-icon.svg' });

    let textContainer = HTMLDom.createElement('div', ['notify-content-item-text-container'], parent);
    HTMLDom.createElement('p', ['notify-title'], textContainer, { innerHTML: title });
    let contextElement = HTMLDom.createElement('p', ['notify-message'], textContainer, { innerHTML: contentText });

    let lineContainer = HTMLDom.createElement('div', ['notify-line-container'], parent);
    HTMLDom.createElement('div', ['notify-light-line'], lineContainer);

    switch (type) {
        case NotificationServer.TYPE_NONE: {
            return parent
        }
        case NotificationServer.TYPE_MESSAGE: {
            let hrefTag = document.createElement('a');
            hrefTag.classList.add('notify-href-item');
            let jsonData = JSON.parse(contentText);

            contextElement.innerHTML = jsonData.message;
            hrefTag.setAttribute('href',window.location.origin+'/Zentizen/messages/direct?id=' + jsonData.senderId);
            hrefTag.appendChild(parent);
            
            return hrefTag;
        } 
        case NotificationServer.TYPE_ADD_FRIEND_REQUEST: {
            let hrefTag = document.createElement('a');
            hrefTag.classList.add('notify-href-item');
            let jsonData = JSON.parse(contentText);

            contextElement.innerHTML = jsonData.message;
            hrefTag.setAttribute('href',window.location.origin+'/Zentizen/profile?id=' +jsonData.senderId);
            hrefTag.appendChild(parent);

            return hrefTag;
        }
        // case NotificationServer.TYPE_ADD_FRIEND_REQUEST: {
            // let hrefTag = document.createElement('a');
            // let jsonData = JSON.parse(contentText);

            // contentText.innerHTML = ''

            // break;
        // }
    }
    return parent;
}

const getNotificationPanel = (notificationPanel) => {
    if(notificationPanel) return notificationPanel;
    else return document.getElementsByClassName('notify-content-display').item(0);
}

const addElementToNotificationPanel = (element, notificationPanel) => {
    let _notificationPanel = getNotificationPanel((notificationPanel) ? notificationPanel : null);
    _notificationPanel.appendChild(element);
}

const addListElementToNotificationPanel = (notificationList, notificationPanel) => {
    let _notificationPanel = getNotificationPanel((notificationPanel) ? notificationPanel : null);
    for(let notificationElement of notificationList) {
        _notificationPanel.appendChild(createNotificationItem(
            notificationElement.title,
            notificationElement.content,
            notificationElement.type
        ));
    }
}

const updateNotification = async (notificationPanel) => {
    let _notificationPanel = getNotificationPanel((notificationPanel) ? notificationPanel : null);
    _notificationPanel.innerHTML = ''; //Remove children
    addListElementToNotificationPanel(await NotificationServer.getNotificationFromServer(), _notificationPanel);
}

const addNotificationPanel = async () => {
    let notificationDivTag = document.getElementById("notify-panel");

    let accountDisplay = HTMLDom.createElement('div', ['notify-account-display'], notificationDivTag);
    let avatarContainer = HTMLDom.createElement('div', ['notify-avatar-container'], accountDisplay);
    HTMLDom.createElement('img', [], avatarContainer, { src: sessionStorage.getItem('userAvtHref') });

    let textContainer = HTMLDom.createElement('div', ['notify-text-container'], accountDisplay);

    let textOnTop = HTMLDom.createElement('div', ['notify-text-on-top'], textContainer);
    HTMLDom.createElement('p', '', textOnTop, { innerHTML: "Hello" });

    let dayXaHoi = HTMLDom.createElement('div', ['notify-text-day-xa-hoi'], textContainer);
    HTMLDom.createElement('p', ['notify-account-name'], 
            HTMLDom.createElement('a', ['notify-profile-link'],dayXaHoi, {href: '/Zentizen/profile?id=' + sessionStorage.getItem('userId')})
    ,{ innerText: sessionStorage.getItem('userFirstName') + " " + sessionStorage.getItem('userLastName') });
    HTMLDom.createElement('p', ['notify-account-point'], dayXaHoi, { innerText: "1234 tree points" });

    let boldLineContainer = HTMLDom.createElement('div', ['notify-line-container'], notificationDivTag);
    HTMLDom.createElement('div', ['notify-bold-line'], boldLineContainer);

    let contentDisplay = HTMLDom.createElement('div', ['notify-content-display'], notificationDivTag);

    let bottomPanel = HTMLDom.createElement('div', ['notify-bottom-panel'], notificationDivTag);
    let buttonContainer = HTMLDom.createElement('div', ['notify-button-container'], bottomPanel);
    let exitButton = HTMLDom.createElement('img', ['notify-exit-button'], buttonContainer, { src: 'assets/resources/img/notify-logout.svg' });
    exitButton.addEventListener('click',() => {
        Account.logout();
    })

    await updateNotification();

    //DEBUG
    // contentDisplay.appendChild(createNotificationItem("Mèo con đang buồn đấy!", "Mùa nuôi mèo đến rồi, cậu chủ thì vẫn ngồi lì ở ra đó."));
    // contentDisplay.appendChild(createNotificationItem("Đã Lâu lắm rồi cậu chủ không trở lại.", "Có nằm mơ cũng không tin được mình bị cậu chủ đối xử như vậy."));
    // contentDisplay.appendChild(createNotificationItem("Cậu chủ, lại chơi với mèo đi.", "Cậu chủ thật là không có lương tâm gì cả, đã bao ngày xa cách như vậy."));
}