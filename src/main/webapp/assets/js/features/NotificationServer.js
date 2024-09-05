const NOTIFICATION_WEBSOCKET_HREF = 'ws://' + window.location.host + '/notification';
let notificationWebSocket = undefined;


const messageProcess = (event) => {

}
const errorProcess = (event) => {
    console.error('An error occured when running NotificationWebsoket.',event);
}

const openProcess = (event) => {
    console.log('Connecting to notification server...');
    notificationWebSocket.send('{\"senderJwt\":\"'+localStorage.authToken+'\"}');
    console.log('Connect succesfully!');
}

const closeProcess = (event) => {

}

const sendNotification = (title, content, type, timestamp) => {
    let jsonString = '{\"title\":\"'+title+'\",\"content\":\"'+content+'\",\"type\":\"'+type+'\",\"timestamp\":\"'+timestamp+'\"}';
    notificationWebSocket.send(jsonString);
}

const connectToServer = (AccessJWT) => {
    notificationWebSocket = new WebSocket(NOTIFICATION_WEBSOCKET_HREF);
    notificationWebSocket.onopen = (event) => openProcess(event);
    notificationWebSocket.onclose = (event) => closeProcess(event);
    notificationWebSocket.onerror = (event) => errorProcess(event);
    notificationWebSocket.onmessage = (event) => messageProcess(event);

} 