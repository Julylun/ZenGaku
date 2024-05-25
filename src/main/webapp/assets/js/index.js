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
    if(localStorage.getItem('authToken') && (loginStatus == "false")){
        const data = {
            authToken: localStorage.getItem("authToken")
        }
        fetch('http://localhost:8080/ZenGaku_Full_war/relogin',{
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
                if(data.isApprove){
                    sessionStorage.setItem('loginStatus',true);
                    safeReload();
                } else {
                    sessionStorage.setItem('loginStatus',false);
                    console.log("authToken is expired")
                }

            })
            .catch(error =>{
                sessionStorage.setItem('loginStatus',false);
                console.error('Error: ', error);
            })
    }
    else {
        console.log('No token found, login will be continue...');
    }

loginMenu.addEventListener('submit', function (event){
   event.preventDefault();
   let tmpUsername = document.getElementById("login-username-input");
   let tmpPassword = document.getElementById("login-password-input");
   const formData = new FormData(event.target);

   const data = {
       userName: formData.get('userName'),
       userPassword: formData.get('userPassword')
   };

   fetch('http://localhost:8080/ZenGaku_Full_war/login',{
       method: 'POST',
       headers: {
           // 'Content-Type': 'application/x-www-form-urlencoded'
           'Content-Type': 'application/json'
       },
       body: JSON.stringify(data)
    })
       .then(response => response.json())
       .then(data =>{
           if(data.token){
               localStorage.setItem('authToken', data.token);
               sessionStorage.setItem('loginStatus',true);
               safeReload();
           } else {
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



window.addEventListener('load',function(){
    loadingFrame.style.display = "none";
})

//quote
document.addEventListener('DOMContentLoaded', function() {
    const quote = document.getElementById("quote");
    const author = document.getElementById("author");
    const closeBtn = document.querySelector('.close-btn');
    const quoteBox = document.querySelector('.quote-box');
    const api_url = "https://api.quotable.io/random";

    async function getQuote(url) {
        const response = await fetch(url);
        var data = await response.json();

        quote.innerHTML = data.content;
        author.innerHTML = data.author;
    }

    document.getElementById("new-quote").addEventListener("click", function() {
        getQuote(api_url);
    });

    closeBtn.addEventListener('click', function() {
        quoteBox.style.display = 'none';
    });

    getQuote(api_url);
});

