import * as HTMLDom from '../HTMLDom.js'
import * as FetchAPI from '../../features/ZenGakuWidget/fetchAPI.js'
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
    HTMLDom.createElement("p",[],
        HTMLDom.createElement("div",['zengaku-assistant-content-messsage'],liTag,{})    
    ,{innerText: message});

}

const displayZenGakuAssistant = () => {
    let zengakuAssistant = document.getElementById('zengaku-assistant');
    // console.log('test 1')
    if(zengakuAssistant != null) {
        zengakuAssistant.remove();
        // console.log('test 2')
        return;
    }
    let content = document.getElementsByClassName('content').item(0);
    zengakuAssistant = HTMLDom.createElement("div",['auto-moving'],
        content,
    {}, 'zengaku-assistant');

    console.log(content)
    console.log(zengakuAssistant);

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
    document.getElementById('zengaku-assistant-send-button').addEventListener('click', () => {
        console.log(document.getElementById('zengaku-assistant-input').value);
        addMessage('user',
            document.getElementById('zengaku-assistant-input').value,
            (sessionStorage.getItem('userLastName') == null) ? 'Guest' : (sessionStorage.getItem('userLastName') + " " + sessionStorage.getItem('userFirstName'))
        )
        
        // addMessage('assistant',FetchAPI.getGeminiReply(document.getElementById('zengaku-assistant-input').value),(localStorage.getItem('userName') == null) ? 'Guest' : localStorage.getItem('userName'));
        FetchAPI.showReply(document.getElementById('zengaku-assistant-input').value);
        document.getElementById('zengaku-assistant-input').value = "";
    });

    addMovement(document.getElementById('zengaku-assistant-header'),zengakuAssistant);
}