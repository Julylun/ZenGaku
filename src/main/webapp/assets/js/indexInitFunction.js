export {
    addNotificationPanel,
    addRegisterMenu,
    addForgetMenu,
    addRegisterStepOne,
    addRegisterStepSecond
}


function createElement(tag, classNameS, parent, attributes = {}, id) {
    let element = document.createElement(tag);
    // if (className) element.className = className;
    if(!classNameS.length == 0)
    for(let className of classNameS) {
        element.classList.add(className);
    }
    for (let key in attributes) {
        element[key] = attributes[key];
    }
    console.log(id)
    if (id) element.id = id;
    if (parent) parent.appendChild(element);
    
    return element;
}

function createNotificationItem(title, contentText) {
    let parent = createElement('div', ['notify-content-item']);

    let child = createElement('div', ['notify-content-item-icon-layer'], parent);
    createElement('img', [], child, { src: 'assets/resources/img/notify-notification-icon.svg' });

    let textContainer = createElement('div', ['notify-content-item-text-container'], parent);
    createElement('p', ['notify-title'], textContainer, { innerHTML: title });
    createElement('p', ['notify-message'], textContainer, { innerHTML: contentText });

    let lineContainer = createElement('div', ['notify-line-container'], parent);
    createElement('div', ['notify-light-line'], lineContainer);

    return parent;
}

function addNotificationPanel(imgPath) {
    let notificationDivTag = document.getElementById("notify-panel");

    let accountDisplay = createElement('div', ['notify-account-display'], notificationDivTag);
    let avatarContainer = createElement('div', ['notify-avatar-container'], accountDisplay);
    createElement('img', [], avatarContainer, { src: imgPath });

    let textContainer = createElement('div', ['notify-text-container'], accountDisplay);

    let textOnTop = createElement('div', ['notify-text-on-top'], textContainer);
    createElement('p', '', textOnTop, { innerHTML: "Hello" });

    let dayXaHoi = createElement('div', ['notify-text-day-xa-hoi'], textContainer);
    createElement('p', ['notify-account-name'], dayXaHoi, { innerText: "NAME" });
    createElement('p', ['notify-account-point'], dayXaHoi, { innerText: "1234 tree points" });

    let boldLineContainer = createElement('div', ['notify-line-container'], notificationDivTag);
    createElement('div', ['notify-bold-line'], boldLineContainer);

    let contentDisplay = createElement('div', ['notify-content-display'], notificationDivTag);
    contentDisplay.appendChild(createNotificationItem("Mèo con đang buồn đấy!", "Mùa nuôi mèo đến rồi, cậu chủ thì vẫn ngồi lì ở ra đó."));
    contentDisplay.appendChild(createNotificationItem("Đã Lâu lắm rồi cậu chủ không trở lại.", "Có nằm mơ cũng không tin được mình bị cậu chủ đối xử như vậy."));
    contentDisplay.appendChild(createNotificationItem("Cậu chủ, lại chơi với mèo đi.", "Cậu chủ thật là không có lương tâm gì cả, đã bao ngày xa cách như vậy."));

    let bottomPanel = createElement('div', ['notify-bottom-panel'], notificationDivTag);
    let buttonContainer = createElement('div', ['notify-button-container'], bottomPanel);
    createElement('img', ['notify-exit-button'], buttonContainer, { src: 'assets/resources/img/notify-logout.svg' });
}

function addForgetMenu(){
    let authContainerDivTag = document.getElementById('auth-container');

    let authMenu = createElement('div',['auth-menu'],authContainerDivTag,{style: 'display: block;'},'forget-menu');   
    
    let closeButton = createElement('div',['close-button'],authMenu);
    let closeButtonContainer = createElement('div',['close-line-container'],closeButton)
    createElement('div',['close-line','close-left-line'],closeButtonContainer);
    createElement('div',['close-line','close-right-line'],closeButtonContainer);

    createElement('p',[],createElement('div',['auth-logo-name'],authMenu,{},'forget-password-name'),{innerText: "Forget Password"})

    let recoveryEmailAuth = createElement('form',['auth-input'],authMenu,{method: 'post', action: 'recover', style: 'display: flex'})
    createElement('input',['auth-text-field'],recoveryEmailAuth,{name: 'userRecoveryEmail', type: 'email', placeholder: 'Type your recovery email address'},'recovery-email-input')
    createElement('button',['auth-button'],recoveryEmailAuth,{innerText: 'Confirm'},"Confirm")
}

function addRegisterMenu(){
    let authContainerDivTag = document.getElementById('auth-container');
    let authMenu = createElement('div',['auth-menu'],authContainerDivTag,{style: 'display: block;'},'register-menu');

    let closeButton = createElement('div',['close-button'],authMenu);
    let closeButtonContainer = createElement('div',['close-line-container'],closeButton)
    createElement('div',['close-line','close-left-line'],closeButtonContainer);
    createElement('div',['close-line','close-right-line'],closeButtonContainer);

    let step = createElement('div',[], authMenu,{}, 'step');
    let stepBox = createElement('div',['step-box'],step,{},'step_1');
    createElement('div',['step-circle'],stepBox,{});
    createElement('p',[],stepBox, {innerText: 'Account'});
    stepBox = createElement('div',['step-box'],step,{},'step_2');
    createElement('div',['step-circle'],stepBox,{});
    createElement('p',[],stepBox, {innerText: 'Verification'});
    stepBox = createElement('div',['step-box'],step,{},'step_3');
    createElement('div',['step-circle'],stepBox,{});
    createElement('p',[],stepBox, {innerText: 'Information'});

    
    createElement('p',[],createElement('div', ['auth-logo-name'],authMenu, {}, 'register-login-name'),{innerText: 'Register'});
}

function addRegisterStepOne(){
    let authMenu = document.getElementById('register-menu');

    let registerAccount = createElement('form',['auth-input'],authMenu,{style: 'display: flex;', method: 'post', action: 'register_account'},'register-input');
    createElement('input',['auth-text-field'],registerAccount,{name: 'userName',type: 'text', placeholder: 'Username'},'register-username-input');
    createElement('input',['auth-text-field'],registerAccount,{name: 'userPassword',type: 'password', placeholder: 'Type your strong password'},'register-password-input');
    createElement('input',['auth-text-field'],registerAccount,{name: 'repeatUserPassword',type: 'password', placeholder: 'Repeat your strong password'},'register-username-input');
    createElement('input',['auth-text-field'],registerAccount,{name: 'userEmail',type: 'email', placeholder: 'Type your email address'},'register-email-input');
    createElement('button',['auth-button'],registerAccount,{innerText: 'Register'},'_register-button');
    
    createElement('p',[],createElement('div',['other-button'],registerAccount,{}),{innerText: 'Hey, I have an account.'},'have-account-button');
}

function split(string,begin,end){
    let newString = "";
    for(let index = begin; index < end; index++){
        newString += string[index];
    }
    return newString;
}

function addRegisterStepSecond(){
    let authMenu = document.getElementById('register-menu');

    let registerAccount = createElement('form',['auth-input'],authMenu,{style: 'display: flex;', method: 'post', action: 'register_verification',},'register-verification');

    let registerParagraph = createElement('div',['register-paragraph'],registerAccount,{});
    createElement('p',[],registerParagraph,{innerText: 'We sent an email containning verification code to ${sessionScope.userEmail}.'});
    createElement('br',[],registerParagraph,{});

    createElement('input',['auth-text-field'],registerAccount,{
        name: 'verificationCode', onkeypress: 'if(this.value.length==6) return false', placeholder: 'Code - 6 digits'
    },'verification-code')
    
    document.getElementById('verification-code').addEventListener('keyup',function(){
        let tmpVal = document.getElementById('verification-code');
        if(tmpVal.value[tmpVal.value.length-1] < '0' || tmpVal.value[tmpVal.value.length-1] > '9'){
            tmpVal.value = split(tmpVal.value,0,tmpVal.value.length-1);
            return
        }
        if(tmpVal.value.length>6) tmpVal.value = split(tmpVal.value,0,tmpVal.value.length-1);
    })
    
    createElement('button',['auth-button'],registerAccount,{innerText: 'Verify'},'_verify_button');
    //Im testing animation of register form
}   

function addRegisterStepThird(){
    let authMenu = document.getElementById('register-menu');

    let registerAccount = createElement('form',['auth-input'],authMenu,{style: 'display: flex;', method: 'post', action: 'information_creation'},'information-creation');

    createElement('input',['auth-text-field'],registerAccount,{name: 'userLastName',type: 'text', placeholder: 'Type your last name'},'last-name-input');
    createElement('input',['auth-text-field'],registerAccount,{name: 'userFirstName',type: 'text', placeholder: 'Type your first name'},'first-name-input');
    createElement('input',['auth-text-field'],registerAccount,{name: 'userBirthday',type: 'date'},'birthday-input');
    createElement('button',['auth-button'],registerAccount,{innerText: 'Create'},'create-account');
}

function addRegisterFinalStep(){
    let authMenu = document.getElementById('register-menu');

    let registerAccount = createElement('form',['auth-input'],authMenu,{style: 'display: flex;', method: 'post', action: 'return-normal-page'},'created-successfully-form');

    let createdNotifyTextDivTag = createElement('div',['register-paragraph'],registerAccount,{},'created-notify-text');
    createElement('p',[],createdNotifyTextDivTag,{innerText: 'You created ZenGaku account successfully! Please return login page to login.'})
    createElement('br',[],createdNotifyTextDivTag,{});
    createElement('button',['auth-button'],registerAccount,{innerText: 'Return'},'return-normal-page-button')
}

function setRegisterStep(stepIndex){
    let stepList = document.getElementsByClassName('step-box');
    
    stepList[0].classList.remove('step-box-processing');
    stepList[1].classList.remove('step-box-processing');
    stepList[2].classList.remove('step-box-processing');

    stepList[2-stepIndex].classList.add('step-box-processing');
}


addNotificationPanel("");
// addForgetMenu("")
// addRegisterMenu();
// addRegisterStepOne();   
// addRegisterStepSecond();
// addRegisterStepThird();
// addRegisterFinalStep();