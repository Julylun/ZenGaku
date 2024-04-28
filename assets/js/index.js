let loginButton, menuButton, bgContent;

//Change the login button into tree icon
loginButton = document.getElementById("login-button");

loginButton.addEventListener("mousedown",function(){
    loginButton.addEventListener("mouseup",function(){
        document.getElementById("tree-button").style.display = "block";
        loginButton.style.display = "none";
        document.getElementById("login-menu").style.display = "block";
        

        document.getElementById("close-line-container").addEventListener("mousedown", function(){
            document.getElementById("close-line-container").addEventListener("mouseup", function(){
                document.getElementById("login-menu").style.display = "none";
                document.getElementById("tree-button").style.display = "none";
                loginButton.style.display = "block";
            })
        })
    })
});

//Create animation when clicking on the menu button
menuButton = document.getElementById("menu-button");
arrayOfborderDot = document.querySelectorAll(".border-dot");
bgContent = document.getElementById("opened-bg-content");

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
            // console.log("2");
            bgContent.id = "closed-bg-content";
            document.getElementById("logo-name").style.color = "white";
            document.getElementById("nav-bar").style.background = "linear-gradient(180deg, rgba(0, 0, 0, 0.517) 40%, rgba(0, 0, 0, 0) 100%)";
            
            for(let index = 0; index < arrayOfborderDot.length; index+=1) {
                arrayOfborderDot[index].className = "border-dot";
            }
        }
        menuButton.removeEventListener("mouseup", handleMouseUp);
        console.log(++count)
    })
    
    
    ;
});

