export {
    counterDefaultConfig,
    startButtonAddEvent,
    timerButtonAddEvent
}

let endAudioClock = new Audio("assets/resources/audio/endTimerSound.mp3");
let breakSound = new Audio("assets/resources/audio/breakSound.mp3")
endAudioClock.loop = false;


//Constant
const TIMER_POMODORO_MODE = 0;
const TIMER_SHORTBREAK_MODE = 1;
const TIMER_LONGBREAK_MODE = 2;

//Timer variable
let timerMode = TIMER_SHORTBREAK_MODE;
class Time {
  constructor(hour, minute, second, breakTime, repeatNumber){
    this.hour = hour;
    this.minute = minute;
    this.second = second;
    this.breakTime = breakTime;
    this.repeatNumber = repeatNumber;
  }
};

let pomodoroTime = new Time(0,0,10,1,1);
let shortBreakTime = new Time(0,15,0,0,0);
let longBreakTime = new Time(0,40,0,0,0);



//TIMER CONFIGURATION FEATURE----------------------------------------------------------

// let isTimerAppear = false;
// document.getElementById('timer-feature').addEventListener('click',function(){
//   if(isTimerAppear) document.getElementById('timer-container').style.display = "none";
//   else document.getElementById('timer-container').style.display = "block";
//   isTimerAppear = !isTimerAppear;
// })

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
function setCounterText(h,m,s, counterElement){
  counterElement.innerHTML = "";
  if(h != 0)
    counterElement.innerHTML = h + ":";
  if(m < 10){
    counterElement.innerHTML += '0' + m + ":";
  } else {
    counterElement.innerHTML += m + ":";
  }
  if(s < 10){
    counterElement.innerHTML += '0' + s + "";
  } else {
    counterElement.innerHTML += s;
  }
}

function resetCounterStyle(){
  let timerCircle = document.getElementById('timer-ring');
  document.getElementsByClassName('timer-logo').item(0).id = "timer-logo";
  document.getElementById('timer-end-label').style.display = "none";
  document.getElementById('timer-choice-container').style.fontSize = null;
  document.getElementById('timer-choice-container').style.maxHeight = null;
  document.getElementsByClassName('timer-choice-selected').item(0).style.fontSize = null;
  document.getElementsByClassName('timer-choice-selected').item(0).style.display = null;
  document.getElementById('timer-start-button').style.display = 'flex';
  document.getElementById('timer-count-container').style.display = 'none';
  document.getElementById('timer-count-text').style.fontSize = null;
  timerCircle.style.animation = "none";
  timerCircle.style.transform = "rotate(0)";
  timerCircle.offsetHeight;
  timerCircle.style.animation = null;

  timerButtonAddEvent();
}

function stopCounter(){
  let counterText = document.getElementById('timer-count-text');
  let nameLabel = document.getElementsByClassName('timer-choice-selected').item(0);
  let animationTimeout = 0;
  document.getElementById('timer-stop-button').style.display = 'none';
  document.getElementById('timer-continue-button').style.display = 'none';
  document.getElementById('timer-pause-button').style.display = 'none';
  let id = setInterval(function(){
    counterText.style.fontSize = "min("+ (14-animationTimeout*10)/14 +"vw,56px)"
    nameLabel.style.fontSize = "min("+ (5-animationTimeout*10)/5 + "vw,20px)";
    animationTimeout += 10;
    if((14-animationTimeout*10)/14 < 0 && (5-animationTimeout*10)/5 < 0){
      clearInterval(id);
      id = setInterval(function(){
        counterText.style.display = "none"
        nameLabel.style.display = "none";
        clearInterval(id);
        if(document.getElementById('timer-logo-actived') == null){
          document.getElementById('timer-logo').id = 'timer-logo-ended';
        } else {
          document.getElementById('timer-logo-actived').id = 'timer-logo-ended';
        }
        document.getElementById('timer-end-container').style.display = "flex";
        let tmpRule = false;
        animationTimeout = 0;
        endAudioClock.play();
        id = setInterval(function(){
          if(tmpRule){
            document.getElementById('timer-end-label').style.display = "flex";
          } else{
            document.getElementById('timer-end-label').style.display = "none";
          }
          tmpRule = !tmpRule;
          animationTimeout+= 800;
          if(animationTimeout >= 4800){
            clearInterval(id);
            resetCounterStyle();
            return;
          }
        },800)
      },400)
    }
  },200);
}

function counter(hour, min, sec, breakTime, repeatNumber){
  let isPaused;
  let counterHour;
  let counterMin;
  let counterSec;
  let timerCircle = document.getElementById('timer-ring');
  let counterText = document.getElementById('timer-count-text');
  function getSecond(h,m,s){
    return ((h*60)+m)*60+s;
  }
  function clickOnPause(){
    timerCircle.style.animationPlayState = "paused";
    // console.log((getSecond(counterHour,counterMin,counterSec) + " " +getSecond(hour,min,sec) + " " +  ( 360 - 360 * getSecond(counterHour,counterMin,counterSec)/getSecond(hour,min,sec))));
    isPaused = true;
    document.getElementById('timer-pause-button').style.display = "none";
    document.getElementById('timer-continue-button').style.display = "flex";
    document.getElementById('timer-stop-button').style.display = "flex";
    setCounterText(counterHour,counterMin,counterSec,counterText);
  }
  function clickOnContinue(){
    isPaused = false;
    document.getElementById('timer-pause-button').style.display = "flex";
    document.getElementById('timer-continue-button').style.display = "none";
    document.getElementById('timer-stop-button').style.display = "none";
    timerCircle.style.animationPlayState = "running";
  }
  function clickOnStop(){
    clearInterval(countIdInterval);
    stopCounter();
  }
  function counterInit(){
    isPaused = false;
    counterHour = hour;
    counterMin = min;
    counterSec = sec;
    timerCircle.style.animation = "none";
    timerCircle.style.transform = "rotate(0)";
    timerCircle.offsetHeight;
    timerCircle.style.animation = null;
    timerCircle.style.animation = "circle "+ ((hour*60)+min)*60+sec  +"s linear";
    document.getElementById('break-label').style.display = 'none';
    document.getElementsByClassName('timer-choice-selected').item(0).style.display = "block";
    document.getElementById('timer-skip-button').style.display = "none";
    document.getElementById('timer-pause-button').style.display = "flex";
    document.getElementById('timer-pause-button').addEventListener('click',clickOnPause);
    document.getElementById('timer-continue-button').addEventListener('click',clickOnContinue);
    document.getElementById('timer-stop-button').addEventListener('click',clickOnStop);
    counterText.style.display = "flex";
  }
  counterInit();
  
  setCounterText(hour,min,sec,counterText);
  countIdInterval = setInterval(function(){
    if(!isPaused){
      counterSec -= 1;
      if(counterSec == -1){
        counterMin -= 1;
        counterSec = 59;
      }
      if(counterMin == -1){
        counterHour -= 1;
        counterMin = 59;
      }
      if(counterHour < 0){
        console.log("Timer: time out!")
        clearInterval(countIdInterval);
        if(repeatNumber > 0){
          breakSound.play();
          breakCounter(hour, min, sec, breakTime, repeatNumber);
          return;
        } else {
          // console .log("AAA")
          clickOnStop();
          return;
        }
      }
      setCounterText(counterHour,counterMin,counterSec,counterText);
    }
  }, 1000)
}

function breakCounter(hour, min, sec, breakTime, repeatNumber) {
  let isSkiped;
  let counterHour;
  let counterMin;
  let counterSec;
  let timerCircle = document.getElementById('timer-ring');
  let counterText = document.getElementById('timer-count-text');
  function clickOnSkip(){
    isSkiped = true;
    timerCircle.style.transform = "rotate(0)";
    timerCircle.offsetHeight;
    timerCircle.style.animation = "null";
    timerCircle.style.animation = "circle "+ 1  +"s linear";
  }
  function counterInit(){
    isSkiped = false;
    counterHour = 0;
    counterMin = 0;
    counterSec = breakTime+5;
    timerCircle.style.animation = "none";
    timerCircle.style.transform = "rotate(0)";
    timerCircle.offsetHeight;
    timerCircle.style.animation = "null";
    timerCircle.style.animation = "circle "+ ((counterHour*60)+counterMin)*60+counterSec  +"s linear";
    document.getElementById('break-label').style.display = 'block';
    document.getElementsByClassName('timer-choice-selected').item(0).style.display = "none";

    document.getElementById('timer-skip-button').style.display = "flex";
    document.getElementById('timer-pause-button').style.display = "none";
    document.getElementById('timer-skip-button').addEventListener('click',clickOnSkip);
    console.log("Repeat: " + repeatNumber);
  }
  counterInit();

  setCounterText(counterHour,counterMin,counterSec, counterText);
  countIdInterval = setInterval(function(){
      counterSec -= 1;
      if(counterSec == -1){
        counterMin -= 1;
        counterSec = 59;
      }
      if(counterMin == -1){
        counterHour -= 1;
        counterMin = 59;
      }
      if(counterHour < 0 || isSkiped){
        console.log("Timer: break time out!")
        clearInterval(countIdInterval);
        document.getElementById('timer-skip-button').removeEventListener('click',clickOnSkip);
        counter(hour, min, sec, breakTime, repeatNumber-1);
        return;
      }
      setCounterText(counterHour,counterMin,counterSec, counterText);
  }, 1000)
}

function timerButtonAddEvent(){
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
}

function startButtonAddEvent() {
    console.log(document.getElementById('timer-start-button'));
    document.getElementById('timer-start-button').addEventListener('mousedown',function(){
        console.log("HEHEHE")
    });
    document.getElementById('timer-start-button').addEventListener('click',function(){
        let choiceContainer = document.getElementById('timer-choice-container');
        var animationTime = 0;
        console.log("[counter/feature]<startButtonAddEvent>: clicked");
        document.getElementById('timer-pause-button').style.display = "flex";
        document.getElementById('timer-start-button').style.display = "none";
        document.getElementById('timer-logo').id = 'timer-logo-actived';
        var intervalId = setInterval(function(){
          animationTime+= 20;
          choiceContainer.style.fontSize = "min(calc(4vw - " + (animationTime/20*0.16) +"vw),20px)";
          if(animationTime > 500){
            clearInterval(intervalId);
            animationTime = 0;
            let id = setInterval(function(){
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
                counter(time.hour,time.minute,time.second, time.breakTime, time.repeatNumber);
              }
              choiceContainer.style.height = "min(calc(85vw - "+ (animationTime/20*2.3) +"vw),192.797)";
              choiceContainer.style.maxHeight = "calc(340px - "+ animationTime*0.460009375+"px)"; //total: 192.797px
            }, 20)
          } 
        },20)
      }
    );
}


const counterDefaultConfig = () => {
    
    startButtonAddEvent();
    timerButtonAddEvent();
    
    
}
