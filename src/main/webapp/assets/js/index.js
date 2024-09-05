import * as NotificationComponents from './components/notificationPanel.js'
import * as Menu from './components/home/menu.js'
import * as AuthMenu from './components/home/login.js'
import * as Browser from '../js/features/system/browser.js'
import * as DefaultLoader from '../js/features/home/defaultLoader.js'
import * as NotificationServer from './features/NotificationServer.js'

// import "./indexInitFunction.js";
//Init


//Define------
///////////////////
const loadingFrame = document.getElementsByClassName("loading-layer").item(0);
//-------Login - Register---------------
const authMenuList = document.getElementsByClassName("auth-menu");

const loginButton = document.getElementById("login-button");

const treeButton = document.getElementById("tree-button");
//--------------menu---------------------
const menuButton = document.getElementById("menu-button");
const arrayOfborderDot = document.querySelectorAll(".border-dot");
let bgContent;
//////////////////
// --------

//Servlet
// let verificationLevel = document.getElementById("vf-lv").value;
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
    AuthMenu.createLoginMenu();
    loginButton.style.display = "none";
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



//This function is having a bug which will generate four access tokens when the old access token is expired and the refresh token is available
function relogin(){
    if(localStorage.getItem('authToken') && (loginStatus == "false")){
        const data = {
            authToken: localStorage.getItem("authToken")
        }
        fetch('/relogin',{
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
                    sessionStorage.setItem('data',data.data);
                    Browser.safeReload();
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
   

//Change the login button into tree icon and display login menu
async function _default(){
    loginButton.addEventListener("mousedown",function(){
        loginButton.addEventListener("mouseup",displayLoginMenu);
    });
    
    window.addEventListener('resize',function(){
        if(bgContent != null)
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
    
    //IMPORTANT <----
    //Create animation when clicking on the menu button
    let count = 0;
    menuButton.addEventListener("mousedown", function handleMouseDown(){
        menuButton.addEventListener("mouseup", function handleMouseUp(){
            hideAllAuthMenu();
            if(window.innerWidth < 767){
                if(arrayOfborderDot[0].className == "border-dot"){
                    // bgContent.id = "opened-bg-content";
                    bgContent = Menu.createMenu();
                    document.getElementById("logo-name").style.color = "black";
                    document.getElementById("nav-bar").style.background = "rgba(0,0,0,0)";
                    bgContent.style.display = "flex";
                    for(let index = 0; index < arrayOfborderDot.length; index+=1) {
                        arrayOfborderDot[index].className = "black-border-dot";
                    }
                }
                else {
                    bgContent.id = "closed-bg-content";
                    Menu.deleteMenu(bgContent);
                    bgContent = null;
                    document.getElementById("logo-name").style.color = "white";
                    document.getElementById("nav-bar").style.background = "linear-gradient(180deg, rgba(0, 0, 0, 0.517) 40%, rgba(0, 0, 0, 0) 100%)";
        
                    for(let index = 0; index < arrayOfborderDot.length; index+=1) {
                        arrayOfborderDot[index].className = "border-dot";
                    }
                }
            }
            else {
                if(arrayOfborderDot[0].className == "border-dot"){
                    bgContent = Menu.createMenu();
                    bgContent.id = "big-opened-bg-content";
                    
                    for(let index = 0; index < arrayOfborderDot.length; index+=1) {
                        arrayOfborderDot[index].className = "black-border-dot";
                    }
                    bgContent.style.display = "block";
                }
                else {
                    bgContent.id = "big-closed-bg-content";
                    Menu.deleteMenu(bgContent);
                    bgContent = null;
                    for(let index = 0; index < arrayOfborderDot.length; index+=1) {
                        arrayOfborderDot[index].className = "border-dot";
                    }
                }
                
    
            }
            
            menuButton.removeEventListener("mouseup", handleMouseUp); //don't remove this
        });
    });
    
    
    
    if(loginStatus == "true") {
        treeButton.style.display = "block";
        loginButton.style.display = "none"; 
        DefaultLoader.loadDataFromUserData();
        console.log("signed in");
        NotificationServer.connectToServer();
    }
    
    
    //Loading frame
    window.addEventListener('load',function(){
        loadingFrame.style.display = "none";
    })
    
    
    //Notify panel | treeButton
    let isNotificationPanelAppear = false;
    document.getElementById('tree-button').addEventListener('click',async function(){
        if(loginStatus == 'false') return;
        document.getElementById('notify-panel').style.display = 'block';
        await NotificationComponents.addNotificationPanel();
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
}



relogin();
// WidgetDisplay.widgetListenerInit();
await _default();

if(Notification.permission == 'default') {
    Notification.requestPermission();
}





