import * as NotificationPanel from '../components/notificationPanel.js';
const NOTIFICATION_WEBSOCKET_HREF = 'ws://' + window.location.host + '/notification';
const NOTIFICATION_PATH = '/assets/resources/audio/system/defaultNotificationSound.mp3';
let notificationWebSocket = undefined;
let notificationAudio = undefined;

export {
    connectToServer,
    sendNotification,
    getNotificationFromServer,
    TYPE_ADD_FRIEND_REQUEST,
    TYPE_MESSAGE,
    TYPE_NONE
}



const TYPE_NONE = 0;
const TYPE_ADD_FRIEND_REQUEST = 1;
const TYPE_MESSAGE = 2;

const getNotificationFromServer = async () => {
    let formData = new FormData();
    formData.append('accessToken',localStorage.authToken);
    let response = await fetch('/api/notification', {
        method: 'POST',
        body: formData
    })

    if(response) {
        let data = await response.json();
        console.log(data);
        return data;
    } else {
        console.log(response.error);
        return null;
    }
}

const messageProcess = async (event) => {
    console.log('Notification -> ' + event.data);
    let data = JSON.parse(event.data);
    // document.getElementsByClassName('notify-content-display').item(0).appendChild(NotificationPanel.createNotificationItem(data.title, data.content));
    if(document.getElementsByClassName('notify-content-display').item(0))
        await NotificationPanel.updateNotification();

    if(Notification.permission == 'granted') {
        new Notification('Zengaku', {
            body: data.title,
            icon: "/assets/resources/img/zengaku_logo.svg"
        })
    }
    if(Notification.permission == 'default' || Notification.permission == 'granted') {
        notificationAudio.play();    
    }
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
    console.log('Notification Server is closed');
}

const sendNotification = (receiverId,title, content, type) => {
    let jsonString = null;
    console.log('Send notification to server...');
    switch (type) {
        case TYPE_NONE: {
            console.log('none');
            jsonString = '{\"receiverId\":\"'+receiverId+'\",\"title\":\"'+title+'\",\"content\":\"'+content+'\",\"type\":\"'+type+'\"}';
            break;
        }
        case TYPE_ADD_FRIEND_REQUEST: {
            jsonString = '{\"receiverId\":\"'+receiverId+'\",\"title\":\"'+title+'\",\"content\":'+content+',\"type\":\"'+type+'\"}';
            break;   
        }
        case TYPE_MESSAGE: {
            console.log('message');
            jsonString = '{\"receiverId\":\"'+receiverId+'\",\"title\":\"'+title+'\",\"content\":'+content+',\"type\":\"'+type+'\"}';
            break;
        }
    }
        notificationWebSocket.send(jsonString);
}

const connectToServer = (AccessJWT) => {
    notificationWebSocket = new WebSocket(NOTIFICATION_WEBSOCKET_HREF);
    notificationWebSocket.onopen = (event) => openProcess(event);
    notificationWebSocket.onclose = (event) => closeProcess(event);
    notificationWebSocket.onerror = (event) => errorProcess(event);
    notificationWebSocket.onmessage = async (event) => await messageProcess(event);
} 

const bypassChromeBlocking = () => {
   function bypass() {
        notificationAudio = new Audio(NOTIFICATION_PATH);
        notificationAudio.muted = true;
        notificationAudio.play();
        notificationAudio.muted = false;
        document.removeEventListener('click',bypass)
    }
    document.addEventListener('click',bypass);
}

bypassChromeBlocking();
