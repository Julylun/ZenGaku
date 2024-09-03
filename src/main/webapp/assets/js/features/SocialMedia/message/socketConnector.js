import * as ChatCreator from '../../../components/socialMedia/messages/inbox/ElementCreator.js'
import { receiverName } from './inbox/inbox.js';
const WEB_SOCKET_SERVER_PATH = "ws://localhost:8080/Zentizen/message";
export {
    connectToServer,
    sendMessage
}
var websocket = undefined;

const connectToServer = () => {
    websocket = new WebSocket(WEB_SOCKET_SERVER_PATH);
    websocket.onmessage = (websocketResult) => processMessage(websocketResult);
    websocket.onclose = (websocketResult) => processClose(websocketResult);
    websocket.onopen = (websocketResult) => processOpen(websocketResult);
    websocket.onerror = (websocketResult) => processError(websocketResult);
}

const processOpen = (websocketResult) => {
    console.log("Websocket is connected! Now you can chat to your friend!");
    websocket.send('{\"senderJwt\":\"'+localStorage.authToken+'\"}');

    // sendMessage('hello','1');
}

const processMessage = (websocketResult) => {
    
    console.log("Websocket receives a message -> ["+websocketResult.data+"]");
    let data = JSON.parse(websocketResult.data);
    // let jsonData = data.json();
    ChatCreator.createChatElement(ChatCreator.CHAT_ELEMENT_RECEIVER,receiverName,data.message,'null');
    let messsageContainer = document.getElementsByClassName('inbox-body__message-container').item(0);
    messsageContainer.scrollTop = messsageContainer.scrollHeight;
}

const processClose = (websocketResult) => {
    console.log("Websocket is closed!");
}

const processError = (websocketResult) => {
    console.log("Websocket is getting error!");
    console.log(websocketResult);
}

const sendMessage = (message,receiverId) => {
    websocket.send('{\"receiverId\":\"'+receiverId+'\",\"message\":\"'+message+'\"}');
}