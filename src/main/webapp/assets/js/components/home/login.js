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
        
         document.getElementById('forget-button').addEventListener('click', () => {
            let forgetMenu = document.getElementById('forget-menu');
            deleteLoginMenu();
            
            document.getElementsByClassName('content').item(0).innerHTML += forgetString;
            document.getElementById('forget-menu').style.display = 'flex';
            document.getElementById('forget-close-btn').addEventListener('click', () => {
                document.getElementById('forget-menu').remove();
                document.getElementById('tree-button').style.display = 'none';
                document.getElementById('login-button').style.display = 'block';
            })
         })



    }

    //We have to add event listener when client click on register or forget pw to
    //display theese menu
    let loginMenu = graphicCreate();
    addListener(loginMenu);

    return loginMenu;
}





let forgetString = '<div class ="auth-menu" id = "forget-menu" style = "display: none;"><div id ="forget-close-btn" class="close-button"><div class="close-line-container"><div class="close-line close-left-line"></div><div class="close-line close-right-line"></div></div></div><div id="forget-password-name" class="auth-logo-name"><p>Forget Password</p></div><!-- Quên mật khẩu: Nhập Mail--><form method = "post" action="recover" class = "auth-input" id = "recovery-email-auth"style="display: flex;"><input class="auth-text-field" id="recovery-email-input" name="userRecoveryEmail" type="email"placeholder="Type your recovery email address"><button class="auth-button" id="Confirm">Confirm</button></form><div class="register-paragraph" id = "recovery-notify-text" style="display: none;"><p>We sent a reset password link to your email</p><br></div><div class="register-paragraph" id = "changed-password-notify-text" style="display: none;"><p>You changed your password successfully!</p><br></div></div>'