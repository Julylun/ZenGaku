import * as HTMLDom from '../HTMLDom.js'
import * as RegisterAPI from '../../features/home/registerAPI.js'
export {
    createRegisterMenu,
    displayMenu,
    REGISTER_MENU,
    VERIFICATION_MENU,
    INFORMATION_MENU,
    RETURN_MENU
}
const REGISTER_MENU = 0;
const VERIFICATION_MENU = 1;
const INFORMATION_MENU = 2;
const RETURN_MENU = 3;

const deleteRegisterMenu = (registerMenuElement) => {
    if(registerMenuElement == null) registerMenuElement = document.getElementById('auth-container');
    registerMenuElement.remove();
}
const displayMenu = (menu) => {
    let formList = document.getElementById('auth-container').getElementsByTagName('form');
    let stepBoxList = document.getElementsByClassName('step-box');

    for(let index = 0; index < formList.length; index += 1) {
        formList.item(index).style.display = 'none';
    }
    for(let index = 0; index < stepBoxList.length; index += 1){
        stepBoxList.item(index).classList.remove('step-box-processing');
        stepBoxList.item(index).classList.remove('step-box-success');
    }

    switch(menu) {
        case REGISTER_MENU: {
            for(let index = 0; index < stepBoxList.length; index += 1){
                stepBoxList.item(index).classList.remove('step-box-success');
            }       
            stepBoxList.item(0).classList.add('step-box-processing');
            formList.item(0).style.display = 'flex';
            break;
        }
        case VERIFICATION_MENU: {
            stepBoxList.item(0).classList.add('step-box-success');
            stepBoxList.item(1).classList.add('step-box-processing');
            formList.item(1).style.display = 'flex';
            break;
        }
        case INFORMATION_MENU: {
            stepBoxList.item(0).classList.add('step-box-success');
            stepBoxList.item(1).classList.add('step-box-success');
            stepBoxList.item(2).classList.add('step-box-processing');
            formList.item(2).style.display = 'flex';
            break;
        }
        case RETURN_MENU: {
            stepBoxList.item(0).classList.add('step-box-success');
            stepBoxList.item(1).classList.add('step-box-success');
            stepBoxList.item(2).classList.add('step-box-success');
            formList.item(3).style.display = 'flex';
            break;
        }
    }
}

const createRegisterMenu = () => {
    console.log("[Debug - Register.js]<createRegisterMenu>: createRegisterMenu function is started");
    const graphicCreate = () => {
        let authContainer = HTMLDom.createElement('div',[],document.body,{},'auth-container');
        let registerMenu = HTMLDom.createElement('div',['auth-menu'],authContainer,{},'register-menu');

        let closeButtonContainer = HTMLDom.createElement('div', ['close-line-container'],
            HTMLDom.createElement('div',['close-button'],registerMenu,{})
        ,{});
        HTMLDom.createElement('div',['close-line', 'close-left-line'],closeButtonContainer,{});
        HTMLDom.createElement('div',['close-line', 'close-right-line'],closeButtonContainer,{});

        //step
        let stepContainer = HTMLDom.createElement('div',[],registerMenu,{},'step');
        let step = HTMLDom.createElement('div',['step-box','step-box-processing'],stepContainer,{},'step_1');
        HTMLDom.createElement('div',['step-circle'],step,{});
        HTMLDom.createElement('p',[],step,{innerText: 'Account'});

        step = HTMLDom.createElement('div',['step-box'],stepContainer,{},'step_2');
        HTMLDom.createElement('div',['step-circle'],step,{});
        HTMLDom.createElement('p',[],step,{innerText: 'Verification'});

        step = HTMLDom.createElement('div',['step-box'],stepContainer,{},'step_3');
        HTMLDom.createElement('div',['step-circle'],step,{});
        HTMLDom.createElement('p',[],step,{innerText: 'Information'});

        //Auth name
        HTMLDom.createElement('p',[],
            HTMLDom.createElement('div',['auth-logo-name'],registerMenu,{})
        ,{innerText: 'Register'});

        //Register account
        let form = HTMLDom.createElement('form',['auth-input'],registerMenu,{method: 'post', action: 'register_account', display: 'flex'},'register-input');
        HTMLDom.createElement('input',['auth-text-field'],form,{name: 'userName', type: 'text', placeholder: 'Username'},'register-username-input');
        HTMLDom.createElement('input',['auth-text-field'],form,{name: 'userPassword', type: 'password', placeholder: 'Type your strong password'},'register-password-input');
        HTMLDom.createElement('input',['auth-text-field'],form,{name: 'repeatUserPassword', type: 'password', placeholder: 'Repeat your strong password'},'repeat-register-password-input');
        HTMLDom.createElement('input',['auth-text-field'],form,{name: 'userEmail', type: 'email', placeholder: 'Type your email address'},'register-email-input');
        
        HTMLDom.createElement('button',['auth-button'],form,{innerText: 'Register'}, '_register-button');
        
        HTMLDom.createElement('p',[],
            HTMLDom.createElement('div',['other-button'],form, {})
        ,{innerText: 'Hey, I have an account.'},'have-account-button');
        
        //Register verification
        form = HTMLDom.createElement('form',['auth-input'],registerMenu,{method: 'post', action: 'register_verification', display: 'none'},'register-verification');
        form.style.display = 'none';
        let registerParagraph = HTMLDom.createElement('div',['register-paragraph'],form,{});
        HTMLDom.createElement('p',[],registerParagraph,{innerText: 'We sent an email containing code to ${sessionScope.userEmail}'});
        HTMLDom.createElement('br',[],registerParagraph,{});
        let verificationCodeInput = HTMLDom.createElement('input',['auth-text-field'],form, {name: 'verificationCode', required: 'true'},'verification-code');
        //--| 
        verificationCodeInput.addEventListener('keydown', () => {
            let text = verificationCodeInput.value;
            let lastCharacter = text.substring(text.length-1, text.length);
            if(text.length > 5){
                text = text.substring(0,text.length - 1);
            } else if (lastCharacter < '0' || lastCharacter > '9') {
                text = text.substring(0,text.length-1);
            }
        });
        let verificationButton = HTMLDom.createElement('button',['auth-button'], form, {innerText: 'Verify'},'_verify-button');
        // To complete this form add listener to Verification button to post when click on...



        //Information creation
        form = HTMLDom.createElement('form',['auth-input'],registerMenu,{method: 'post', action: 'information_creation', display: 'none'},'information-creation');
        form.style.display = 'none';
        HTMLDom.createElement('input',['auth-text-field'],form,{name: 'userLastName', type: 'text', placeholder: 'Type your last name'},'last-name-input');
        HTMLDom.createElement('input',['auth-text-field'],form,{name: 'userFirstName', type: 'text', placeholder: 'Type your first name'},'first-name-input');
        HTMLDom.createElement('input',['auth-text-field'],form,{name: 'userBirthday', type: 'date'},'birthday-input');
        HTMLDom.createElement('button',['auth-button'],form,{innerText: 'Create'},'create-account');
        

        //Return normal page
        form = HTMLDom.createElement('form',['auth-input'],registerMenu,{method: 'post', action: 'return-normal-page', display: 'none'},'created-successfully-form');
        form.style.display = 'none';    
        registerParagraph = HTMLDom.createElement('div',['register-paragraph'], form, {}, 'created-notify-text');
        HTMLDom.createElement('p',[],registerParagraph,{innerText: 'You created ZenGaku account successfully! Please return login page to login.'});
        HTMLDom.createElement('br',[],registerParagraph,{});
        HTMLDom.createElement('button',['auth-button'],form,{innerText: 'Return'},'return-normal-page-button');

        return authContainer;
    }
    const addListener = (registerMenu) => {
        //Add event to close button 
        document.getElementsByClassName('close-line-container').item(0).addEventListener('click', () => {
            if(registerMenu != null) deleteRegisterMenu(registerMenu);
            else deleteRegisterMenu();  

            document.getElementById('tree-button').style.display = 'none';
            document.getElementById('login-button').style.display = 'block';
        });

        //Prevent event from form
        ['register-menu','register-verification','information-creation'].forEach(element => {
            document.getElementById(element).addEventListener('submit', (event) => {
                event.preventDefault();
            })         
        });

        //Add event to register
        document.getElementById('_register-button').addEventListener('click',() => {
            
            let inputList = document.getElementById('register-input').getElementsByTagName('input');
            
            let tmpIndex = 0;
            for(let inputElement of inputList){
                console.log('[Register.js]<createRegisterMenu>: inputValue[' + tmpIndex  +'] -> ' + inputElement.value);
                tmpIndex += 1;
            }
            let errorCode = RegisterAPI.registerAccount(
                inputList[0].value,
                inputList[1].value,
                inputList[2].value,
                inputList[3].value
            );
        })

        //Add event to verification
        document.getElementById('_verify-button').addEventListener('click', () => {
            RegisterAPI.verificateAccount(document.getElementById('verification-code').value);
            
        });

        //Add event to informationCreation
        document.getElementById('create-account').addEventListener('click', () => {
            let inputList = document.getElementById('information-creation').getElementsByTagName('input');
            RegisterAPI.createAccount(
                inputList[0].value,
                inputList[1].value,
                inputList[2].value
            );
        })


    }

    let registerMenu = graphicCreate();
    addListener(registerMenu);
}