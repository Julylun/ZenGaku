import * as NotificationComponents from './components/notificationPanel.js'
import * as WidgetDisplay from './features/ZenGakuWidget/WidgetDisplay.js'
// import "./indexInitFunction.js";
//Init

// addNotificationPanel('assets/resources/img/meomeo.jpg');

//Register code
const STATUS_NON_STATUS_REGISTERED = 0;
const STATUS_REGISTERED = 1;
const STATUS_VERIFICATED = 2;
const STATUS_CREATED = 3;
const STATUS_CHANGED_PASSWORD = 400;
const STATUS_FORGET_EMAIL_SENT = 300;
const STATUS_LOGIN_FAILED = -101;


//Define------
///////////////////
const loadingFrame = document.getElementsByClassName("loading-layer").item(0);
//-------Login - Register---------------
const authMenuList = document.getElementsByClassName("auth-menu");

const closeLineList = document.getElementsByClassName("close-line-container");

const loginMenu = document.getElementById("login-menu");
const loginButton = document.getElementById("login-button");

const haveAccountButton = document.getElementById("have-account-button");
const registerButton = document.getElementById("register-button");
const registerMenu = document.getElementById("register-menu");


const forgetAccountButton = document.getElementById("forget-button");
const forgetMenu = document.getElementById("forget-menu");

const treeButton = document.getElementById("tree-button");
//--------------menu---------------------
const menuButton = document.getElementById("menu-button");
const arrayOfborderDot = document.querySelectorAll(".border-dot");
const bgContent = document.getElementById("opened-bg-content");
//////////////////
// --------

//Servlet
let verificationLevel = document.getElementById("vf-lv").value;
let loginStatus = sessionStorage.getItem('loginStatus');
if(loginStatus == null) loginStatus = "false";



//function

function hideAllAuthMenu(){
    for(let authMenu of authMenuList){
        authMenu.style.display = "none";
    }
}

function displayLoginMenu(){
    treeButton.style.display = "block";
    loginButton.style.display = "none";
    loginMenu.style.display = "block";
    registerMenu.style.display = "none";
}

function safeReload(){
    window.location.reload();
}


//Listener
function getAccessToken() {
    return new Promise((resolve, reject) => {
        let formData = new FormData();
        formData.append("refreshToken", localStorage.getItem('refreshToken'));

        fetch('api/getAccessToken', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.AccessJWT) {
                console.log("Refresh access token complete");
                localStorage.setItem('authToken', data.AccessJWT);
                resolve(true);
            } else {
                console.log("Refresh token is not available");
                localStorage.removeItem('refreshToken');
                resolve(false);
            }
        })
        .catch(error => {
            console.error("Occur error while getting AT - ", error);
            reject(false);
        });

        console.log("là refresh dữ chưa");
    });
}



//This funtion is having a bug which will generate four access tokens when the old access token is expired and the refresh token is avaiable
function relogin(){
    if(localStorage.getItem('authToken') && (loginStatus == "false")){
        const data = {
            authToken: localStorage.getItem("authToken")
        }
        fetch('/ZenGaku_Full_war/relogin',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
                throw new Error('Unauthorized');
            })
            .then((data) => {
                if(data.isApprove == "true"){
                    sessionStorage.setItem('loginStatus',true);
                    sessionStorage.setItem('userId',data.userId);
                    sessionStorage.setItem('userFirstName',data.firstName);
                    sessionStorage.setItem('userLastName',data.lastName);
                    sessionStorage.setItem('userAvtHref',data.avtHref);
                    safeReload();
                    return true;
                } else { // <--- the bug occurs here
                    sessionStorage.setItem('loginStatus',false);
                    getAccessToken()
                    .then(isTrue => {
                        if(isTrue){
                            console.log("Test3");
                            return relogin();
                        }
                        console.log("authToken is expired")
                    return false;
                    })
                    // console.log(boolValue);
                }

            })
            .catch(error =>{
                sessionStorage.setItem('loginStatus',false);
                console.error('Error: ', error);
                return false;
            })
    }
    else {
        console.log('No token found or it is still login');
        return false;
    }
}

relogin();
    

loginMenu.addEventListener('submit', function (event){
   event.preventDefault();
   let tmpUsername = document.getElementById("login-username-input");
   let tmpPassword = document.getElementById("login-password-input");
   const formData = new FormData(event.target);

   const data = {
       userName: formData.get('userName'),
       userPassword: formData.get('userPassword')
   };

   fetch('/ZenGaku_Full_war/login',{
       method: 'POST',
       headers: {
           // 'Content-Type': 'application/x-www-form-urlencoded'
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
    })
       .then(response => response.json())
       .then(data =>{
            console.log(data);
            if(data.accessJWT){
                localStorage.setItem('authToken', data.accessJWT);
                console.log("AT: " + data.accessJWT)
                localStorage.setItem("refreshToken", data.refreshJWT)
                console.log("RT: " + data.refreshJWT)
                
                sessionStorage.setItem('loginStatus',true);
                sessionStorage.setItem('loginStatus',true);
                sessionStorage.setItem('userId',data.userId);
                sessionStorage.setItem('userFirstName',data.firstName);
                sessionStorage.setItem('userLastName',data.lastName);
                sessionStorage.setItem('userAvtHref',data.avtHref);
                
                safeReload();
            }else {
                sessionStorage.setItem('loginStatus',false);
                safeReload();
           }
       })
       .catch(error => {
           console.log('Error occurs when login: ', error);
       })
});


function getForgetAccept(){
    var acceptContainer = document.createElement("input");
    acceptContainer.type = "hidden";
    acceptContainer.value = "${sessionScope.isAcceptForgetPassword}"
    document.appendChild(acceptContainer);
}
window.addEventListener("forgetPasswordAccepted",function(){
    console.log("OKAYYYYYY");
    getForgetAccept();

});
haveAccountButton.addEventListener("mousedown",function handleMouseDown(){
    haveAccountButton.addEventListener("mouseup",displayLoginMenu);
});

document.getElementById('background-config-feature').addEventListener('click',function(){
    document.getElementById('background-config').style.display = "block";
})

//Display forget nmenu and close all auth menu
forgetAccountButton.addEventListener("mousedown",function(){
    forgetAccountButton.addEventListener("mouseup",function(){
        console.log("Pressed")
        hideAllAuthMenu();
        forgetMenu.style.display = "block";
    })
});

//Display register menu and close login menu when clicking on the "I don't have...".
registerButton.addEventListener("mousedown",function(){
    registerButton.addEventListener("mouseup",function(){
        hideAllAuthMenu();
        registerMenu.style.display = "block";

    })
});

//Change the login button into tree icon and display login menu
loginButton.addEventListener("mousedown",function(){
    loginButton.addEventListener("mouseup",displayLoginMenu);
});

for(let closeLine of closeLineList){
    closeLine.addEventListener("mousedown", function(){
        closeLine.addEventListener("mouseup", function(){
            hideAllAuthMenu();
            loginButton.style.display = "block";
            document.getElementById("tree-button").style.display = "none";
            closeLine.removeEventListener("mousedown",function (){});
            closeLine.removeEventListener("mouseup",function (){});
        })
    })
}


window.addEventListener('resize',function(){
    if(window.innerWidth < 767){
        if(arrayOfborderDot[0].className == "border-dot"){
            bgContent.id = "closed-bg-content";
            
        } else {
            bgContent.id = "opened-bg-content";
        }
    } else {
        if(arrayOfborderDot[0].className == "border-dot"){
            bgContent.id = "big-closed-bg-content";
            
        } else {
            bgContent.id = "big-opened-bg-content";
        }
    }
})
//Create animation when clicking on the menu button
let count = 0;
menuButton.addEventListener("mousedown", function handleMouseDown(){
    menuButton.addEventListener("mouseup", function handleMouseUp(){
        hideAllAuthMenu();
        if(window.innerWidth < 767){
            if(arrayOfborderDot[0].className == "border-dot"){
                bgContent.id = "opened-bg-content";
                document.getElementById("logo-name").style.color = "black";
                document.getElementById("nav-bar").style.background = "rgba(0,0,0,0)";
                bgContent.style.display = "flex";
                for(let index = 0; index < arrayOfborderDot.length; index+=1) {
                    arrayOfborderDot[index].className = "black-border-dot";
                }
            }
            else {
                bgContent.id = "closed-bg-content";
                document.getElementById("logo-name").style.color = "white";
                document.getElementById("nav-bar").style.background = "linear-gradient(180deg, rgba(0, 0, 0, 0.517) 40%, rgba(0, 0, 0, 0) 100%)";
    
                for(let index = 0; index < arrayOfborderDot.length; index+=1) {
                    arrayOfborderDot[index].className = "border-dot";
                }
            }
        }
        else {
            if(arrayOfborderDot[0].className == "border-dot"){
                bgContent.id = "big-opened-bg-content";
                
                for(let index = 0; index < arrayOfborderDot.length; index+=1) {
                    arrayOfborderDot[index].className = "black-border-dot";
                }
                bgContent.style.display = "block";
            }
            else {
                bgContent.id = "big-closed-bg-content";
                for(let index = 0; index < arrayOfborderDot.length; index+=1) {
                    arrayOfborderDot[index].className = "border-dot";
                }
            }
            

        }
        
        menuButton.removeEventListener("mouseup", handleMouseUp); //don't remove this
    });
});


//Base verification Code (Level) to display/hide login/register/forget components
if(verificationLevel == STATUS_REGISTERED) {
    registerMenu.style.display = "block";
    let tmpArr = document.getElementsByClassName("auth-input")
    for(let tmpItem of tmpArr){
        tmpItem.style.display = "none";
    }
    document.getElementById("register-verification").style.display = "flex";
    document.getElementById("step_1").className = "step-box step-box-success";
    document.getElementById("step_2").className = "step-box step-box-processing";
} else if(verificationLevel == STATUS_FORGET_EMAIL_SENT){
    // hideAllAuthMenu();
    forgetMenu.style.display = "block";
    document.getElementById("recovery-email-auth").style.display = "none";
    document.getElementById("recovery-notify-text").style.display = "flex";
    document.getElementById("changed-password-notify-text").style.display = "none";
} else if(verificationLevel == STATUS_VERIFICATED){
    // hideAllAuthMenu();
    let tmpArr = document.getElementsByClassName("auth-input")
    for(let tmpItem of tmpArr){
        tmpItem.style.display = "none";
    }
    registerMenu.style.display = "block";
    document.getElementById("information-creation").style.display = "flex";
    document.getElementById("step_1").className = "step-box step-box-success";
    document.getElementById("step_2").className = "step-box step-box-success";
    document.getElementById("step_3").className = "step-box step-box-processing";
}
else if(verificationLevel == STATUS_CREATED) {
    let tmpArr = document.getElementsByClassName("auth-input")
    for(let tmpItem of tmpArr){
        tmpItem.style.display = "none";
    }
    registerMenu.style.display = "block";
    document.getElementById("created-successfully-form").style.display = "flex";
    document.getElementById("step_1").className = "step-box step-box-success";
    document.getElementById("step_2").className = "step-box step-box-success";
    document.getElementById("step_3").className = "step-box step-box-success";
} else if(verificationLevel == STATUS_CHANGED_PASSWORD) {
    hideAllAuthMenu();
    forgetMenu.style.display = "block";
    document.getElementById("recovery-email-auth").style.display = "none";
    document.getElementById("recovery-notify-text").style.display = "none";
    document.getElementById("changed-password-notify-text").style.display = "flex";
} else if(verificationLevel == STATUS_LOGIN_FAILED) {
    console.log("HAHAHAHAHAHAH")
     hideAllAuthMenu();
     loginMenu.style.display = "block";
    for(let tmpItem of document.getElementsByClassName("failed-notify-element")){
        tmpItem.style.display = "flex";
    }
    document.addEventListener("mousedown",function () {
        document.addEventListener("mouseup",function (){
            for(let tmpItem of document.getElementsByClassName("failed-notify-element")){
                tmpItem.style.display = "none";
            }
            document.removeEventListener("mouseup",function (){});
            document.removeEventListener("mousedown",function (){});
        })
    })
}

if(loginStatus == "true") {
    treeButton.style.display = "block";
    loginButton.style.display = "none"; 
    console.log("signed in");
}


//Loading frame
window.addEventListener('load',function(){
    loadingFrame.style.display = "none";
})


//Notify panel
let isNotificationPanelAppear = false;
document.getElementById('tree-button').addEventListener('click',function(){
    document.getElementById('notify-panel').style.display = 'block';
    NotificationComponents.addNotificationPanel();
    document.addEventListener('click',function(event){
        let tmp = document.getElementById('notify-panel');
        
        if(tmp.offsetLeft < event.clientX && event.clientX <tmp.offsetLeft+tmp.offsetWidth
            && tmp.offsetTop < event.clientY && event.clientY < tmp.offsetHeight+tmp.offsetTop
        ){
        }
        else {
            // document.getElementById('notify-panel').style.display = 'none';
            document.getElementById('notify-panel').innerHTML = "";
            document.getElementById('notify-panel').style.display = 'none';
        }
    })
})










//TEST
WidgetDisplay.widgetListenerInit();






