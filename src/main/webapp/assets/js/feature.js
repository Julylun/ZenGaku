let contentContainer = document.getElementsByClassName('content').item(0);
let contentManager = new Array();
let background = "";
let isVideo = false;

let url = "?autoplay=1&mute=1&controls=0&start=26&origin=https%3A%2F%2Flifeat.io&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3&fs=0&amp"

function changeBackgroundPicture(srcPath){
  // document.getElementById('background-video').style.display = 'none';
  document.body.style.backgroundImage = "url('" + srcPath +"')";
}


//FUNCTION------------------------------------------------------------------------------
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

function addMovement(pressedElement,movementElement){
  console.log("changed");
  function mouseMove(event){
    console.log("changed");
        newPosX = cursorX - event.clientX;
        newPosY = cursorY - event.clientY;

        cursorX = event.clientX;
        cursorY = event.clientY;

        movementElement.style.top = (movementElement.offsetTop - newPosY) + "px";
        movementElement.style.left = (movementElement.offsetLeft - newPosX) + "px";
  }
  pressedElement.addEventListener("mousedown", function(e){
      e.preventDefault();
      
      cursorX = e.clientX;
      cursorY = e.clientY;
      
      document.addEventListener("mousemove",mouseMove);
      document.addEventListener("mouseup", function(){
          document.removeEventListener("mousemove", mouseMove)
      });
  });
}

//END FUNCTION------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------


//BACKGROUND CONFIGURATION FEATURES----------------------------------------------------------

//change item to selected status when click on and remove the selection of previous selected item
function addSelectedBCItemListener(){
  let backgroundConfigItemList = document.getElementsByClassName("background-config-item");
  function addListener(){
    for(let _backgroundConfigItem of backgroundConfigItemList) {
      _backgroundConfigItem.classList.remove("background-config-item-selected");
    }
    this.classList.add('background-config-item-selected');
    isVideo = false;
    for(let className of this.classList){
      if(className == "video"){
        isVideo = true;
      }
    }
    background = this.getAttribute("value");
  }
  for(let backgroundConfigItem of backgroundConfigItemList){
    backgroundConfigItem.removeEventListener('click',addListener)
  }
  for(let backgroundConfigItem of backgroundConfigItemList){
    backgroundConfigItem.addEventListener('click',addListener)
  }
}

addSelectedBCItemListener();




//change background when click on apply button
document.getElementById('background-config-apply-button').addEventListener('click',function(){
  var videoElement = document.getElementById('background-video');
  if(isVideo){
    // videoElement.getElementsByTagName('source').item(0).setAttribute('src', background);
    videoElement.setAttribute('src', (background + url));
    // videoElement.style.display = "block";
    document.getElementsByClassName('video-container').item(0).style.display = "flex";
    // videoElement.load();
    // videoElement.play();
  } else {
    document.getElementsByClassName('video-container').item(0).style.display = "none";
    // videoElement.pause();
    changeBackgroundPicture(background);
  }
})

//Hide the Background Configuration box when click on cancel button
document.getElementById('background-config-cancel-button').addEventListener('click',function(){
  document.getElementsByClassName('background-config-choice').item(0).style.display = "flex";
  document.getElementsByClassName('background-config-add-content').item(0).style.display = "none";
  document.getElementById('background-config').style.display = "none";
})

//Hide all content when click on add button
document.getElementsByClassName('background-config-add-button').item(0).addEventListener('click',function(){
  document.getElementsByClassName('background-config-choice').item(0).style.display = "none";
  document.getElementsByClassName('background-config-add-content').item(0).style.display = "flex";
})

//A funticon is used to add element to BackGround Configuration
function getYotubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11)
    ? match[2]
    : null;
}
function addElementToBackgroundConfig(){
  let node = document.createElement("li");
  let p = document.createElement("p");
  let backgroundURL = document.getElementsByClassName("background-config-text-field").item(0).value;

  node.classList.add("background-config-item");

  if(new URL(backgroundURL).hostname == "www.youtube.com"){
    node.classList.add("video");
    backgroundURL = "https://www.youtube.com/embed/" + getYotubeId(document.getElementsByClassName("background-config-text-field").item(0).value);
  }

  node.setAttribute('value',backgroundURL);

  p.innerHTML = document.getElementsByClassName('background-config-name-field').item(0).value;
  node.appendChild(p);

  document.getElementsByClassName('background-config-choice').item(0).getElementsByTagName("ul").item(0).appendChild(node);

  document.getElementsByClassName('background-config-choice').item(0).style.display = "flex";
  document.getElementsByClassName('background-config-add-content').item(0).style.display = "none";

  document.getElementsByClassName('background-config-name-field').item(0).value=""
  document.getElementsByClassName("background-config-text-field").item(0).value = "";
  addSelectedBCItemListener();
}

//Add element to Background configuration when click on add button
document.getElementsByClassName('background-config-add-link-button').item(0).addEventListener('click', function(e){
  e.preventDefault();
  addElementToBackgroundConfig();
})
//END BACKGROUND CONFIGURATION FEATURES----------------------------------------------------------
//-------------------------------------------------------------------------------------------


//ADD MOVEMENT--------------------------------------------------------------------------------------

addMovement(document.getElementsByClassName('background-config-title').item(1),document.getElementById('background-config'));

//END ADD MOVEMENT--------------------------------------------------------------------------------------

// document.getElementById('background-config-feature').addEventListener('click',function(){
//         let backgroundConfigFeatureTag = document.createElement("div");
//         backgroundConfigFeatureTag.classList.add("content-item");
//         let tempId = "content-id-" + makeid(32);

//         console.log(tempId);
//         backgroundConfigFeatureTag.id = tempId;
//         backgroundConfigFeatureTag.innerHTML
//             = "";
//         contentContainer.appendChild();
// })