import * as HTMLDom from '../HTMLDom.js'
import * as LoginAPI from '../../features/home/loginAPI.js'
import * as Register from './register.js'
const LOGIN_FAILED_MESSAGE = 'Login failed. Check your username or password again.';
const NETWORK_ERROR_MESSAGE = 'Something wrong when you connecting to server. Reload and try again.'
const resgisterButtonText = "I don't have account";
const forgetButtonText = "I forgot my password";

export {
    createLoginMenu,
    deleteLoginMenu,
    displayError,
    LOGIN_FAILED_MESSAGE,
    NETWORK_ERROR_MESSAGE
}


const displayError = (error) => {
    let messageElement = document.getElementsByClassName('login__failedMessageContainer--message').item(0);
    let messageContainer = document.getElementsByClassName('failed-notify-element').item(0);
    messageElement.innerText = error;
    // messageElement.style.displays  = 'block';
    messageContainer.style.display = 'block';
    let tempTimerCounting = 0;
    let tempIntervalId = setInterval(() => {
        tempTimerCounting += 1000;
        if(tempTimerCounting == 4000) {
            messageElement.innerText = '';
            messageContainer.style.display = 'none';
            clearInterval(tempIntervalId);
        }
    },1000);
}

const deleteLoginMenu = (loginMenuElement) => {
    if(loginMenuElement == null) loginMenuElement = document.getElementById('auth-container');
    loginMenuElement.remove();
}

const createLoginMenu = () => {
    const graphicCreate = () => {
        let authContainer = HTMLDom.createElement('div',[],document.body,{},'auth-container');
        let loginMenu = HTMLDom.createElement('div',['auth-menu'],authContainer,{},'login-menu');
        
        let closeButtonContainer = HTMLDom.createElement('div', ['close-line-container'],
            HTMLDom.createElement('div',['close-button'],loginMenu,{})
        ,{});
        HTMLDom.createElement('div',['close-line', 'close-left-line'],closeButtonContainer,{});
        HTMLDom.createElement('div',['close-line', 'close-right-line'],closeButtonContainer,{});

        HTMLDom.createElement('p',[],
            HTMLDom.createElement('div',['auth-logo-name'],loginMenu,{})
        ,{innerText: 'Login'});

        let loginForm = HTMLDom.createElement('form',['auth-input'],loginMenu,{method: 'post', action: 'login'},'login-input');

        let messageFailedContainer = HTMLDom.createElement('div',['failed-notify-element'], loginForm, {})
        HTMLDom.createElement('p',['login__failedMessageContainer--message'],
                messageFailedContainer
        ,{innerText: ' '});
        messageFailedContainer.style.display = 'none';

        HTMLDom.createElement('input',['auth-text-field'],loginForm,{name: 'userName', type: 'text', placeholder: 'Username'},'login-username-input');
        HTMLDom.createElement('input',['auth-text-field'],loginForm,{name: 'userPassword', type: 'password', placeholder: 'Password'},'login-password-input');

        let loginButtonContainer = HTMLDom.createElement('div',[],loginForm,{},'login-button-container');
        HTMLDom.createElement('button',['auth-button'],loginButtonContainer, {innerText: 'Login'},'_login-button');
        let otherButtonContainer = HTMLDom.createElement('div',['other-button'],loginButtonContainer);
        HTMLDom.createElement('p',[],otherButtonContainer,{innerText: resgisterButtonText},'register-button');
        HTMLDom.createElement('p',[],otherButtonContainer,{innerText: forgetButtonText},'forget-button')
        return authContainer;
    }
    const addListener = (loginMenu) => {
        //close when click on X button
        let button = document.getElementsByClassName('close-line-container').item(0).addEventListener('click', () => {
            if(loginMenu != null) deleteLoginMenu(loginMenu);
            else deleteLoginMenu();  

            document.getElementById('tree-button').style.display = 'none';
            document.getElementById('login-button').style.display = 'block';
        });

        //Call login fetch API function
        document.getElementById('login-input').addEventListener('submit', function (event){
            event.preventDefault();
            LoginAPI.fetchLogin();
         });

        //Close login menu and display register menu
        document.getElementById('register-button').addEventListener('click', () => {
            deleteLoginMenu();
            Register.createRegisterMenu();
         })


    }

    //We have to add event listener when client click on register or forget pw to
    //display theese menu
    let loginMenu = graphicCreate();
    addListener(loginMenu);

    return loginMenu;
}
