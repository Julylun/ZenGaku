import * as HTMLDom from '../../HTMLDom.js'

export {
    createMessage
}
const createMessage = (receiverId, receiverName, lastMessage, timesamp, avatarHref) => {
    let messagesContainer = document.getElementsByClassName('messages-block__message-container').item(0);
    let messageItem = HTMLDom.createElement('div',['messages-block__message-item'],
        HTMLDom.createElement('a',['messages-block__message-href'],messagesContainer,{href: '/Zentizen/messages/direct?id=' + receiverId})
    ,{});
    HTMLDom.createElement('img',[],
        HTMLDom.createElement('div',['messages-block__avatar-block'],messageItem, {})
    ,{src: avatarHref});
    let messageInformationBlock = HTMLDom.createElement('div',['mmessages-block__message-information-block'],messageItem,{});
    let messageTopInformationBlock = HTMLDom.createElement('div',['messages-block__top-information-block'],messageInformationBlock,{});
    HTMLDom.createElement('p',['messages-block__user-name'],messageTopInformationBlock,{innerHTML: receiverName});
    HTMLDom.createElement('div',['messages-block__status-circle--unseen'],messageTopInformationBlock,{});

    let messageBotInformationBlock = HTMLDom.createElement('div', ['messages-block__bot-information-block'],messageInformationBlock,{});
    HTMLDom.createElement('p',['messages-block__message-text'],messageBotInformationBlock,{innerHTML: lastMessage});
    HTMLDom.createElement('p',['messages-block__timesamp'],messageBotInformationBlock,{innerHTML: timesamp});
}


/* <a href="abc" class="messages-block__message-href">
    <div class="messages-block__message-item">
        <div class="messages-block__avatar-block">
            <img
                src="https://cdn.animaapp.com/projects/66d37c14306bc9408e7c20ce/releases/66d37c40120acced07d1cfb3/img/ellipse-29.svg"
                alt="avt">
        </div>
        <div class="messages-block__message-information-block">
            <div class="messages-block__top-information-block">
                <p class="messages-block__user-name">Nguyễn Bảo Khánh Ngân</p>
                <div class="messages-block__status-circle--unseen"></div>
            </div>
            <div class="messages-block__bot-information-block">
                <p class="messages-block__message-text">Ê rảnh không?</p>
                <p class="messages-block__timesamp">13:06</p>
            </div>
        </div>
    </div>
</a> */