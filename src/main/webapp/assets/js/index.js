//Define------
///////////////////
//-------Login - Register---------------
const loginMenu = document.getElementById("login-menu");
const loginButton = document.getElementById("login-button");
const closeLineList = document.getElementsByClassName("close-line-container");
const authMenuList = document.getElementsByClassName("auth-menu");
const registerButton = document.getElementById("register-button");
const registerMenu = document.getElementById("register-menu");
const haveAccountButton = document.getElementById("have-account-button");
const treeButton = document.getElementById("tree-button");
//--------------menu---------------------
const menuButton = document.getElementById("menu-button");
const arrayOfborderDot = document.querySelectorAll(".border-dot");
const bgContent = document.getElementById("opened-bg-content");
//////////////////
// --------

//Servlet
let verificationLevel = document.getElementById("vf-lv").value;


function displayLoginMenu(){
    treeButton.style.display = "block";
    loginButton.style.display = "none";
    loginMenu.style.display = "block";
    registerMenu.style.display = "none";
}

haveAccountButton.addEventListener("mousedown",function handleMouseDown(){
    haveAccountButton.addEventListener("mouseup",displayLoginMenu);
    
});

//Display register menu and close login menu when clicking on the "I don't have...".
registerButton.addEventListener("mousedown",function(){
    registerButton.addEventListener("mouseup",function(){
        loginMenu.style.display = "none";
        registerMenu.style.display = "block";
    })
});

//Change the login button into tree icon and display login menu
loginButton.addEventListener("mousedown",function(){
    loginButton.addEventListener("mouseup",displayLoginMenu);

for(let closeLine of closeLineList){
    closeLine.addEventListener("mousedown", function(){
        closeLine.addEventListener("mouseup", function(){
            for(let authMenu of authMenuList){
                authMenu.style.display = "none";    
            }
            document.getElementById("tree-button").style.display = "none";
            loginButton.style.display = "block";
        })
    })
}
});

//Create animation when clicking on the menu button
let count = 0;
menuButton.addEventListener("mousedown", function handleMouseDown(){
    menuButton.addEventListener("mouseup", function handleMouseUp(){
        if(arrayOfborderDot[0].className == "border-dot"){
            bgContent.id = "opened-bg-content";
            document.getElementById("logo-name").style.color = "black";
            document.getElementById("nav-bar").style.background = "rgba(0,0,0,0)";
            bgContent.style.display = "block";
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
        menuButton.removeEventListener("mouseup", handleMouseUp); //don't remove this
    });
});

if(verificationLevel == 1) {
    registerMenu.style.display = "block";
    let tmpArr = document.getElementsByClassName("auth-input")
    for(let tmpItem of tmpArr){
        tmpItem.style.display = "none";
    }
    document.getElementById("register-verification").style.display = "flex";
    document.getElementById("step_1").className = "step-box step-box-success";
    document.getElementById("step_2").className = "step-box step-box-processing"
} else {

}

