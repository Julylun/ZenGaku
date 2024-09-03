import * as Server from './Server.js'
import * as Interface from '../../../components/socialMedia/messages/MessageCreator.js'

const setup = async () => {
    let data = await Server.getMessages(localStorage.authToken);
    if(data) {
        data = await data.json();
        
        if(data.hasMessages)
            for(let index = 0; index < data.messages.length; index += 1) {
                let sendTime = data.messages[index].sendTime;
                Interface.createMessage(
                    data.usersInfo[index].id,
                    data.usersInfo[index].firstname + " " + data.usersInfo[index].lastname,
                    data.messages[index].bodyText,
                    sendTime[2] + "-" + sendTime[1] + "-" + sendTime[0],
                    data.usersInfo[index].userAvatar
                );
            }
    } else {
        console.error('Error occured when fetch get messages',data.error);        
    }
}

await setup()