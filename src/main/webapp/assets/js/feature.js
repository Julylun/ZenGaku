//Constant
const TIMER_POMODORO_MODE = 0;
const TIMER_SHORTBREAK_MODE = 1;
const TIMER_LONGBREAK_MODE = 2;

//Background variable
let contentContainer = document.getElementsByClassName('content').item(0);
let contentManager = new Array();
let background = "";
let isVideo = false;

//Audio variable
let audioArr = new Array();
const url = "?autoplay=1&mute=1&controls=0&start=26&origin=https%3A%2F%2Flifeat.io&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3&fs=0&amp"

//Timer variable
let timerMode = TIMER_SHORTBREAK_MODE;
class Time {
  constructor(hour, minute, second){
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }
};

let pomodoroTime = new Time(0,0,10);
let shortBreakTime = new Time(0,15,0);
let longBreakTime = new Time(0,40,0);

class AudioModel {
  constructor(audioPath,name){
    this.audioTag = new Audio(audioPath);
    this.name = name;
  }
  play(){
    this.audioTag.play();
  }
  pause(){
    this.audioTag.pause();
  }
  setLoop(isLoop){
    this.audioTag.loop = isLoop;
  }
  setVolume(volumeValue){
    this.audioTag.volume = volumeValue/100;
  }
  remove(){
    delete this.audioTag;
    delete this.name;
  }
}

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
  function mouseMove(event){
        newPosX = cursorX - event.clientX;
        newPosY = cursorY - event.clientY;

        cursorX = event.clientX;
        cursorY = event.clientY;

        movementElement.style.top = (movementElement.offsetTop - newPosY) + "px";
        movementElement.style.left = (movementElement.offsetLeft - newPosX) + "px";
        if(movementElement.offsetTop < 0){
          movementElement.style.top = "0px";
        }
        
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
  document.getElementsByClassName('background-choice').item(0).style.display = "flex";
  document.getElementsByClassName('background-config-add-content').item(0).style.display = "none";
  document.getElementById('background-config').style.display = "none";
})

//Hide all content when click on add button
document.getElementsByClassName('background-config-add-button').item(0).addEventListener('click',function(){
  document.getElementsByClassName('background-choice').item(0).style.display = "none";
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

  document.getElementsByClassName('background-choice').item(0).getElementsByTagName("ul").item(0).appendChild(node);

  document.getElementsByClassName('background-choice').item(0).style.display = "flex";
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
//END BACKGROUND CONFIGURATION FEATURE----------------------------------------------------------
//-------------------------------------------------------------------------------------------

//SOUNDBOARD CONFIGURATION FEATURE----------------------------------------------------------

function addElementToSoundBoard(audioName, iconLink,audioLink){

  // <li class = "sound-config-item" value ="assets/resources/audio/ChillWind.mp3">
  //                       <div class ="sound-config-item-top">
  //                           <img src="assets/resources/img/defaultAudioImg/wind.svg">
  //                           <p>Chill wind</p>
  //                           <label class = "custom-check-box-container">
  //                               <input type="checkbox" class = "sound-item-check-box">
  //                           </label>
  //                       </div>
  //                       <div class = "sound-config-item-bottom">
  //                           <input class = "sound-item-slider" disabled ="1" type="range" min="0" max="100" value="50">
  //                           <p>50%</p>
  //                       </div>
  //                   </li>

  let parentNode = document.getElementById('sound-config-item-container').getElementsByTagName('ul').item(0);

  let inputNode = document.createElement('input');
  inputNode.classList.add('sound-item-slider');
  inputNode.disabled = 1;
  inputNode.type = "range";
  inputNode.min = "0";
  inputNode.max = "100";
  inputNode.value = "50";

  addChangeEventToSoundItem(inputNode);

  let pNode = document.createElement('p');
  pNode.innerHTML = "50%";

  let secondDivNode = document.createElement('div');
  secondDivNode.classList.add('sound-config-item-bottom');
  secondDivNode.appendChild(inputNode);
  secondDivNode.appendChild(pNode);

  let imgNode = document.createElement('img');
  imgNode.src = iconLink;

  pNode = document.createElement('p');
  pNode.innerHTML = audioName;

  inputNode = document.createElement('input');
  inputNode.type = "checkbox";
  inputNode.classList.add('sound-item-check-box');

  addClickEventToSoundItem(inputNode);

  let labelNode = document.createElement('label');
  labelNode.classList.add('custom-check-box-container');
  labelNode.appendChild(inputNode);
  
  let firstDivNode = document.createElement('div');
  firstDivNode.classList.add('sound-config-item-top');
  firstDivNode.appendChild(imgNode);
  firstDivNode.appendChild(pNode);
  firstDivNode.appendChild(labelNode);

  let node = document.createElement('li');
  node.classList.add('sound-config-item');
  node.value = audioLink;
  node.appendChild(firstDivNode);
  node.appendChild(secondDivNode);

  parentNode.appendChild(node);


};

function addAudioToList(soundConfigItem){
  let audioName = soundConfigItem.parentElement.parentElement.getElementsByTagName('p').item(0).innerHTML;
  audioArr.push(new AudioModel(soundConfigItem.parentElement.parentElement.parentElement.getAttribute('value'),audioName));
  audioArr[audioArr.length-1].setLoop(true);
  audioArr[audioArr.length-1].play();
}
function removeAudioFromList(soundConfigItem){
  let audioName = soundConfigItem.parentElement.parentElement.getElementsByTagName('p').item(0).innerHTML;
  let index = 0
  for(let audioItem of audioArr){
    if(audioName == audioItem.name){
      audioItem.pause();
      audioItem.remove();
      delete audioItem;
      audioArr.splice(audioArr.indexOf(audioItem),1);
      console.log("deleted");
      console.log(audioItem);
      return;
    }
  }
  console.log(audioArr.length);
}

function getAudioModelFromArray(name){
  for(let audioItem of audioArr){
    if(name == audioItem.name){
      return audioItem;
    }
  }
}
 
//all of SoundConfigItems are add event listener used to detect user clicking on checkbox
//then add audio to array and play it.


function addClickEventToSoundItem(soundConfigItem){
  soundConfigItem.addEventListener('click',function(){
    if(soundConfigItem.checked){
      addAudioToList(soundConfigItem);
      soundConfigItem.parentElement.parentElement.parentElement.getElementsByTagName('div').item(1).getElementsByClassName('sound-item-slider').item(0).disabled = false;
    } else {
      removeAudioFromList(soundConfigItem);
      soundConfigItem.parentElement.parentElement.parentElement.getElementsByTagName('div').item(1).getElementsByClassName('sound-item-slider').item(0).disabled = true;
    }
  })
}

function addChangeEventToSoundItem(soundItemSlider){
  soundItemSlider.addEventListener('mousedown',function(){
    if(!soundItemSlider.disabled){
      function a(){
        let value = parseInt(soundItemSlider.value);
        soundItemSlider.parentElement.getElementsByTagName('p').item(0).innerHTML = value + "%";
        tmpAudioModel.setVolume(value);
      }
      let tmpAudioModel = getAudioModelFromArray(soundItemSlider.parentElement.parentElement.getElementsByTagName('div').item(0).getElementsByTagName('p').item(0).innerHTML);
      console.log(tmpAudioModel);
      document.addEventListener('mousemove',a)
      document.addEventListener('mouseup',function(){
        document.removeEventListener('mousemove',a);
        document.removeEventListener('mouseup',null);
      })
    }}
  )
}

document.getElementById('sound-add-button').addEventListener('click',function(){
  document.getElementById('sound-config-item-container').style.display = "none";
  document.getElementById('sound-add-container').style.display = "flex";
})
document.getElementById('sound-add-container-button').addEventListener('click',function(){
  addElementToSoundBoard(
    document.getElementById('audio-name-sound-input').value,
    document.getElementById('icon-link-sound-input').value,
    document.getElementById('audio-link-sound-input').value
  )
  document.getElementById('audio-name-sound-input').value = "";
  document.getElementById('icon-link-sound-input').value = "";
  document.getElementById('audio-link-sound-input').value = "";
  document.getElementById('sound-config-item-container').style.display = "block";
  document.getElementById('sound-add-container').style.display = "none";
})



for(let soundConfigItem of document.getElementsByClassName('sound-item-check-box')){
  addClickEventToSoundItem(soundConfigItem);
}

for(let soundItemSlider of document.getElementsByClassName('sound-item-slider')){
  addChangeEventToSoundItem(soundItemSlider);   
}
 

document.getElementById('sound-board-feature').addEventListener('click',function(){
  document.getElementById('sound-config').style.display = "block";
})
//Hide the sound board when user clicks on cancel button
document.getElementById('sound-config-apply-button').addEventListener('click',function(){
  document.getElementById('sound-config').style.display = "none";
})
document.getElementById('sound-config-cancel-button').addEventListener('click',function(){
  document.getElementById('sound-config').style.display = "none";
})

//END SOUND CONFIGURATION FEATURE----------------------------------------------------------
//-------------------------------------------------------------------------------------------

//TIMER CONFIGURATION FEATURE----------------------------------------------------------
function getCircularPosition(angleDegrees, radius, centerX, centerY) {
  let angleRadians = angleDegrees * (Math.PI / 180);

  let x = centerX + radius * Math.cos(angleRadians);
  let y = centerY - radius * Math.sin(angleRadians);

  return { x: x, y: y };
}

function getDistance(x1, y1, x2, y2){
  return Math.sqrt(Math.pow(x2-x1,2)+Math.pow(y2-y1,2));
}
function totalSecond(hour, min, sec){
  min+= hour*60;
  sec+=min*60;
  return sec;
}

let countIdInterval;
function counter(hour, min, sec){
  let counterHour = hour;
  let counterMin = min;
  let counterSec = sec;
  let counterText = document.getElementById('timer-count-text');
  let timerContainer = document.getElementById('timer-container');
  let timerCircle = document.getElementById('timer-circle');
  console.log(timerCircle.offsetTop + " " + timerCircle.offsetLeft); 

  counterText.innerHTML = "";
  function setText(h,m,s){
    counterText.innerHTML = "";
    if(h != 0)
    counterText.innerHTML = h + ":";
    counterText.innerHTML += m + ":" + s;

    
    
    // let circlePos =
    // getCircularPosition((totalSecond(hour,min,sec) - totalSecond(h,m,s))/totalSecond(hour,min,sec)*360
    // ,getDistance(
    //   timerCircle.offsetLeft + timerCircle.offsetWidth/2,
    //   timerCircle.offsetTop + timerCircle.offsetHeight/2,
    //   timerContainer.offsetLeft + timerContainer.offsetWidth/2,
    //   timerContainer.offsetTop + timerContainer.offsetHeight/2
    // ),timerContainer.offsetLeft + timerContainer.offsetWidth/2, timerContainer.offsetTop + timerContainer.offsetHeight/2);

    // timerCircle.style.left = circlePos.x + "px";
    // timerCircle.style.top = circlePos.y + "px";
    // console.log(circlePos);
  }

  setText(hour,min,sec);
  countIdInterval = setInterval(function(){
    counterSec -= 1;
    if(counterSec == -1){
      counterMin -= 1;
      counterSec = 60;
    }
    if(counterMin == -1){
      counterHour -= 1;
      counterMin = 60;
    }
    if(counterHour == 0 && counterMin == 0 && counterSec == -1){
      clearInterval(countIdInterval);
    }
    setText(counterHour,counterMin,counterSec);
  }, 1000)
}

document.getElementById('timer-start-button').addEventListener('click',function(){
  let choiceContainer = document.getElementById('timer-choice-container');
  var animationTime = 0;
  var intervalId = setInterval(function(){
    animationTime+= 20;
    choiceContainer.style.fontSize = "calc(4vw - " + (animationTime/20*0.16) +"vw)";
    if(animationTime > 500){
      clearInterval(intervalId);
      animationTime = 0;
      document.getElementById('timer-logo').style.height = "8.2vw";
      document.getElementById('timer-logo').style.width = "8.2vw";
      document.getElementById('timer-logo').style.left = "calc((85vw - 8.2vw) / 2)";
      document.getElementById('timer-logo').style.top = "calc(85vw* 13 / 100)"
      id = setInterval(function(){
        animationTime+=20;
        if(animationTime > 300){
          clearInterval(id);
          document.getElementById('timer-count-container').style.display = "flex";
          let time;
          switch(timerMode){
            case TIMER_POMODORO_MODE:{
              time = pomodoroTime;
              break;
            }
            case TIMER_SHORTBREAK_MODE: {
              time = shortBreakTime;
              break;
            }
            case TIMER_LONGBREAK_MODE: {
              time = longBreakTime;
              break;
            }
          }
          counter(time.hour,time.minute,time.second);
        }
        choiceContainer.style.height = "calc(85vw - "+ (animationTime/20*2.3) +"vw)"
      
      }, 20)
    } 
  },20)
});


for(let timerChoiceItem of document.getElementsByClassName('timer-choice-item')){
  timerChoiceItem.addEventListener('click',function(){  
    console.log(timerChoiceItem.getAttribute('value'));
    switch (timerChoiceItem.getAttribute('value') ){
      case "0":{
        timerMode = TIMER_POMODORO_MODE;
        break;
      }
      case "1":{
        timerMode = TIMER_SHORTBREAK_MODE;
        break;
      }
      case "2":{
        timerMode = TIMER_LONGBREAK_MODE;
        
        break;
      }
    }
    for(let _timerChoiceItem of document.getElementsByClassName('timer-choice-item')){
      _timerChoiceItem.classList.remove('timer-choice-selected');
    }
    timerChoiceItem.classList.add('timer-choice-selected');
  }
  )
}



//END TIMER CONFIGURATION FEATURE----------------------------------------------------------
//-------------------------------------------------------------------------------------------



//ADD MOVEMENT--------------------------------------------------------------------------------------

addMovement(document.getElementsByClassName('background-config-title').item(0),document.getElementById('background-config'));
addMovement(document.getElementsByClassName('background-config-title').item(1), document.getElementById('sound-config'));

//ADD LISTENER-------------------------------------------------------------------------------------- 
window.addEventListener('resize',function(){
  for(let contentItem of document.getElementsByClassName('content-item')){
    
    if((contentItem.offsetLeft + contentItem.offsetWidth) > window.innerWidth){
      contentItem.style.left = (window.innerWidth - contentItem.offsetWidth)+ "px";
    }
    else if(contentItem.offsetLeft < 0){
      contentItem.style.left = (contentItem.offsetLeft + contentItem.offsetWidth) + "px";
    }

    if(contentItem.offsetTop + contentItem.offsetHeight > window.innerHeight){
      contentItem.style.top = (window.innerHeight - contentItem.offsetHeight) + "px";
    }
    else if (contentItem.offsetTop < 0){
      contentItem.style.top = (contentItem.offsetTop + contentItem.offsetHeight) + "px";
    }
  }
})

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