let contentContainer = document.getElementsByClassName('content').item(0);
let contentManager = new Array();
let background = "";
let isVideo = false;

let url = "?autoplay=1&mute=1&controls=0&start=26&origin=https%3A%2F%2Flifeat.io&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3&fs=0&amp"

function changeBackgroundPicture(srcPath){
  // document.getElementById('background-video').style.display = 'none';
  document.body.style.backgroundImage = "url('" + srcPath +"')";
}

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

let fooItemList = document.getElementsByClassName("foo-item");
console.log(fooItemList)
for(let fooItem of fooItemList){
  fooItem.addEventListener('click',function(){
    for(let _fooItem of fooItemList) {
      _fooItem.classList.remove("foo-item-selected");
    }
    fooItem.classList.add('foo-item-selected');
    isVideo = false;
    for(let className of fooItem.classList){
      if(className == "video"){
        isVideo = true;
      }
    }
    background = fooItem.getAttribute("value");
  })
}

document.getElementById('foo-apply-button').addEventListener('click',function(){
  var videoElement = document.getElementById('background-video');
  if(isVideo){
    // videoElement.getElementsByTagName('source').item(0).setAttribute('src', background);
    videoElement.setAttribute('src', (background + url));
    // videoElement.style.display = "block";
    document.getElementsByClassName('video-container').item(0).style.display = "flex";
    videoElement.load();
    videoElement.play();
  } else {
    document.getElementsByClassName('video-container').item(0).style.display = "none";
    videoElement.pause();
    changeBackgroundPicture(background);
  }
  
})

document.getElementById('foo-cancel-button').addEventListener('click',function(){
  document.getElementById('foo').style.display = "none";
})

addMovement(document.getElementsByClassName('foo-title').item(0),document.getElementById('foo'));

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