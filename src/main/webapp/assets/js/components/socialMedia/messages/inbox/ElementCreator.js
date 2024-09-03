import * as HTMLDom from '../../../HTMLDom.js'
export {
    CHAT_ELEMENT_RECEIVER,
    CHAT_ELEMENT_SENDER,
    createChatElement
}
const CHAT_ELEMENT_SENDER = 0;
const CHAT_ELEMENT_RECEIVER = 1;
const createChatElement = (authorType, username, bodytext, timesamp) => {
    let classType;
    let messageElement = undefined;
    switch (authorType) {
        case CHAT_ELEMENT_RECEIVER: {
            classType = 'inbox-body__message-item--receiver';
            break;
        }
        case CHAT_ELEMENT_SENDER: {
            classType = 'inbox-body__message-item--sender';
            break;
        }
    }
    let messageContainer = document.getElementsByClassName('inbox-body__message-container').item(0);
    messageElement = HTMLDom.createElement('div',['inbox-body__message-item', classType],messageContainer,{});
    //message-username
    HTMLDom.createElement('div',['inbox-body__messsage-username-element'],
        HTMLDom.createElement('div',['inbox-body__message-username'],messageElement,{})
    ,{innerText: username});

    let messageBody = HTMLDom.createElement('div',['inbox-body__messsage-body'],messageElement,{});
    HTMLDom.createElement('p',['inbox-body__message-text'],messageBody,{innerText: bodytext});
    HTMLDom.createElement('p',['inbox-body__message-timesamp'],messageBody,{innerText: timesamp});
    
    return messageElement;
}

// createChatElement(CHAT_ELEMENT_SENDER,'Hoang Luan','hello mọi người nheeee','15:07');



/*
<div class="inbox-body__message-item inbox-body__message-item--receiver">
    <div class="inbox-body__message-username">
        <p class="inbox-body__messsage-username-element">Nguyễn Bảo Khánh Ngân</p>
    </div>
    <div class="inbox-body__messsage-body">
        <p class="inbox-body__message-text">Mày có bị ngu
            không?231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F231F1F
        </p>
        <p class="inbox-body__message-timesamp">15:07</p>
    </div>
</div>
 */