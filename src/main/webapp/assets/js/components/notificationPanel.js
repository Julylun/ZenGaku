export {
    addNotificationPanel
}

import * as HTMLDom from './HTMLDom.js'
import * as Account from './user/account.js'

function createNotificationItem(title, contentText) {
    let parent = HTMLDom.createElement('div', ['notify-content-item']);

    let child = HTMLDom.createElement('div', ['notify-content-item-icon-layer'], parent);
    HTMLDom.createElement('img', [], child, { src: 'assets/resources/img/notify-notification-icon.svg' });

    let textContainer = HTMLDom.createElement('div', ['notify-content-item-text-container'], parent);
    HTMLDom.createElement('p', ['notify-title'], textContainer, { innerHTML: title });
    HTMLDom.createElement('p', ['notify-message'], textContainer, { innerHTML: contentText });

    let lineContainer = HTMLDom.createElement('div', ['notify-line-container'], parent);
    HTMLDom.createElement('div', ['notify-light-line'], lineContainer);

    return parent;
}

const addNotificationPanel = () => {
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

    //DEBUG
    contentDisplay.appendChild(createNotificationItem("Mèo con đang buồn đấy!", "Mùa nuôi mèo đến rồi, cậu chủ thì vẫn ngồi lì ở ra đó."));
    contentDisplay.appendChild(createNotificationItem("Đã Lâu lắm rồi cậu chủ không trở lại.", "Có nằm mơ cũng không tin được mình bị cậu chủ đối xử như vậy."));
    contentDisplay.appendChild(createNotificationItem("Cậu chủ, lại chơi với mèo đi.", "Cậu chủ thật là không có lương tâm gì cả, đã bao ngày xa cách như vậy."));
}