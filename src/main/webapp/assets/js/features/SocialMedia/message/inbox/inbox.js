import * as ChatElementCreator from '../../../../components/socialMedia/messages/inbox/ElementCreator.js'
import * as Server from './Server.js'
import * as SocketConnector from '../socketConnector.js'
import * as NotificationServer from '../../../NotificationServer.js'
export {
    receiverName
}
let receiverName = undefined;
const receiverId = new URLSearchParams(window.location.search).get('id');
const messageContainer = document.getElementsByClassName('inbox-body__message-container').item(0);
// let websocket = SocketConnector.websocket;

const setup = async () => {
    NotificationServer.connectToServer();
    SocketConnector.connectToServer();
    let messageData = await Server.getChatStory(receiverId);
    if (messageData.isSuccessful) {
        setReceiverInformation(messageData.usersInformation.receiver);
        if(messageData.hasMessages) {
            setChatStory(messageData);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
        // if(messageData.hasMessages) setChatStory(messageData); <--- replace NO_MESSAGES case by this.
    } else {
        if(messageData.errorType == "NO_MESSAGES") {
            setReceiverInformation(messageData.usersInformation.receiver);
        }
        console.error("Error occured when fetch get chat history, error -> ", messageData.errorType)
    }
    setButtonEvent();
}
const setButtonEvent = () => {
    document.getElementsByClassName('inbox-body__send-button-element').item(0).addEventListener('click', (event) => {
        let typingElement = document.getElementsByClassName('inbox-body__input-element').item(0);
        let currentDateTime = new Date();
        let timeString = currentDateTime.getDate() + "-" + currentDateTime.getMonth() + "-" + currentDateTime.getFullYear();
        ChatElementCreator.createChatElement(ChatElementCreator.CHAT_ELEMENT_SENDER,'You',typingElement.value,timeString);
        messageContainer.scrollTop = messageContainer.scrollHeight;
        SocketConnector.sendMessage(typingElement.value,receiverId);
        typingElement.value = "";
    })
}

const setReceiverInformation = (receiver) => {
    document.getElementsByClassName('inbox-body__avatar-element').item(0).src = receiver.userAvatar;
    receiverName = receiver.firstname + " " + receiver.lastname;
    document.getElementsByClassName('inbox-body__username-element').item(0).innerHTML = receiverName; 
}

const setChatStory = (messageData) => {
    for (let message of messageData.messages) {
        ChatElementCreator.createChatElement(
            (message.receiver) ? ChatElementCreator.CHAT_ELEMENT_RECEIVER : ChatElementCreator.CHAT_ELEMENT_SENDER,
            (message.receiver) ? receiverName : 'You',
            message.bodyText,
            message.sendTime[2] + "/" + message.sendTime[1] + "/" + message.sendTime[0]
        );
    }
}

setup();