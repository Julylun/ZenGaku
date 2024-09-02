import * as HTMLDom from '../HTMLDom.js'
import * as FetchAPI from '../../features/ZenGakuWidget/OldAI.js'
import * as Movement from '../../features/movement.js'
import * as Gemini from '../../features/ZenGakuWidget/GeminiAI.js'

export {
    displayZenGakuAssistant,
    addMessage
}

const addMessage = (owner, message, userName) => {
    let messageContainer = document.getElementById('zengaku-assistant-message-container');

    let stringOwner, stringName, name;
    if(owner == 'assistant') {
        stringOwner = 'asssistant-reply';
        stringName = 'zengaku-assistant-name';
        name = 'ZenGaku assistant'
    }
    else {
        stringOwner = 'user-reply';
        stringName = 'zengaku-user-name';
        name = userName;
    }
    let liTag = HTMLDom.createElement("li",[stringOwner],messageContainer,{});

    HTMLDom.createElement("p",[],
        HTMLDom.createElement("div",[stringName,'zengaku-name'],liTag,{})
    ,{innerText: name});
    

    if(owner == 'assistant') {
        let TYPING_TIME_PER_TEXT;
        if(message.length < 30) TYPING_TIME_PER_TEXT = 0.5;
        else TYPING_TIME_PER_TEXT = 1;
        const DELAY_TIME = 20;

        let numberCharacterPerTime = message.length/(TYPING_TIME_PER_TEXT*1000/DELAY_TIME);
        let indexOfCurrentCharacter = 0;
        let currentText = '';
        let textContainer = document.getElementById('zengaku-assistant-message-container');

        let textHTMLElement = HTMLDom.createElement("p",[],
            HTMLDom.createElement("div",['zengaku-assistant-content-messsage'],liTag,{})    
        ,{innerText: ''});

        let id = setInterval(() => {
            currentText += message.slice(indexOfCurrentCharacter,indexOfCurrentCharacter+numberCharacterPerTime);
            textHTMLElement.innerText = currentText;
            indexOfCurrentCharacter+= numberCharacterPerTime;
            textContainer.scrollTo({top: textContainer.scrollHeight});
            console.log(textContainer.scrollHeight)
            if(indexOfCurrentCharacter >= message.length) {
                clearInterval(id);
            }
        }, DELAY_TIME);
    } else {
        HTMLDom.createElement("p",[],
            HTMLDom.createElement("div",['zengaku-assistant-content-messsage'],liTag,{})    
        ,{innerText: message});
        document.getElementById('zengaku-assistant-message-container').scrollTo({top: document.getElementById('zengaku-assistant-message-container').scrollHeight});
    }

}

const displayZenGakuAssistant = () => {
    let zengakuAssistant = document.getElementById('zengaku-assistant');
    if(zengakuAssistant != null) {
        zengakuAssistant.remove();
        return;
    }
    let content = document.getElementsByClassName('content').item(0);
    zengakuAssistant = HTMLDom.createElement("div",['auto-moving'],
        content,
    {}, 'zengaku-assistant');

    HTMLDom.createElement('p',[],
        HTMLDom.createElement('div',[],zengakuAssistant,{},'zengaku-assistant-header')
    ,{innerText: 'ZenGaku Assistant'});

    HTMLDom.createElement('div',['config-line'],zengakuAssistant,{});

    HTMLDom.createElement('ul',[],
        HTMLDom.createElement('div',[],zengakuAssistant,{},'zengaku-assistant-content'),
    {},'zengaku-assistant-message-container');

    
    let footer = HTMLDom.createElement('div',[],zengakuAssistant,{},'zengaku-assistant-footer');
    HTMLDom.createElement('textarea',[],footer,{placeholder: "Type your message"},'zengaku-assistant-input');
    HTMLDom.createElement('button',[],footer,{innerText: "Send"},'zengaku-assistant-send-button');

    addMessage('assistant','Hi! How can I help you?',(localStorage.getItem('userName') == null) ? 'Guest' : localStorage.getItem('userName'));
    document.getElementById('zengaku-assistant-send-button').addEventListener('click', async () => {
        addMessage('user',
            document.getElementById('zengaku-assistant-input').value,
            (sessionStorage.getItem('userLastName') == null) ? 'Guest' : (sessionStorage.getItem('userLastName') + " " + sessionStorage.getItem('userFirstName'))
        )
        
        // addMessage('assistant',FetchAPI.getGeminiReply(document.getElementById('zengaku-assistant-input').value),(localStorage.getItem('userName') == null) ? 'Guest' : localStorage.getItem('userName'));
        // FetchAPI.showReply(document.getElementById('zengaku-assistant-input').value);
        const userText = document.getElementById('zengaku-assistant-input').value;
        document.getElementById('zengaku-assistant-input').value = '';
        addMessage('assistant',
            await Gemini.reply(userText),
            (localStorage.getItem('userName') == null) ? 'Guest' : localStorage.getItem('userName')
        );
        // document.getElementById('zengaku-assistant-input').value = "";
    });

    Movement.addMovement(document.getElementById('zengaku-assistant-header'),zengakuAssistant);
}