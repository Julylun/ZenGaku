import * as DefaultData from '../defaultData.js'
import * as DataAPI from '../user/DataAPI.js'

export {
    getYotubeId,
    addSelectedBCItemListener,
    changeBackground,
    addItemToSavedData
}

function changeBackgroundPicture(srcPath){
    document.body.style.backgroundImage = "url('" + srcPath +"')";
}

function getYotubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
  
    return (match && match[2].length === 11)
      ? match[2]
      : null;
}

function addSelectedBCItemListener(){
  let backgroundConfigItemList = document.getElementsByClassName("background-config-item");
  function addListener(){
    for(let _backgroundConfigItem of backgroundConfigItemList) {
      _backgroundConfigItem.classList.remove("background-config-item-selected");
    }
    this.classList.add('background-config-item-selected');
    DefaultData.BackgoundConfiguration.isVideoSelecting = false;
    for(let className of this.classList){
      if(className == "video"){
        DefaultData.BackgoundConfiguration.isVideoSelecting = true;
      }
    }
    DefaultData.BackgoundConfiguration.currentBackground = this.getAttribute("value");
  }
  for(let backgroundConfigItem of backgroundConfigItemList){
    backgroundConfigItem.removeEventListener('click',addListener)
  }
  for(let backgroundConfigItem of backgroundConfigItemList){
    backgroundConfigItem.addEventListener('click',addListener)
  }
}

const addItemToSavedData = (_name, url) => {
  let savedData = JSON.parse(sessionStorage.data);

  let savedData__arrayOfName = savedData.backgroundConfiguration.data.name;
  let savedData__arrayOfUrl = savedData.backgroundConfiguration.data.url;
  savedData__arrayOfName.push(_name);
  savedData__arrayOfUrl.push(url);

  savedData.backgroundConfiguration.data.name = savedData__arrayOfName;
  savedData.backgroundConfiguration.data.url = savedData__arrayOfUrl;

  console.log(savedData);
  sessionStorage.setItem('data',JSON.stringify(savedData));
  DataAPI.uploadSavedData(localStorage.authToken, sessionStorage.data);
  console.log(JSON.parse(sessionStorage.data));
  DefaultData.backgroundConfigurationLoad(savedData);
}



//change background when click on apply button
const changeBackground = (filePath) => {
  var videoElement = document.getElementById('background-video');
  if(filePath){
    if(getYotubeId(filePath) != null) {
      console.log("default video");
      videoElement.setAttribute('src', (filePath + DefaultData.BackgoundConfiguration.defaultURL));
      document.getElementsByClassName('video-container').item(0).style.display = "flex";
    } else {
      console.log("default image");
      document.getElementsByClassName('video-container').item(0).style.display = "none";
      changeBackgroundPicture(filePath);
    }
  } else {
    if(DefaultData.BackgoundConfiguration.isVideoSelecting){
      videoElement.setAttribute('src', (DefaultData.BackgoundConfiguration.currentBackground + DefaultData.BackgoundConfiguration.defaultURL));

      document.getElementsByClassName('video-container').item(0).style.display = "flex";

    } else {
      document.getElementsByClassName('video-container').item(0).style.display = "none";

      changeBackgroundPicture(DefaultData.BackgoundConfiguration.currentBackground);
    }
    //Save data after changing background
    if(sessionStorage.data){
      let json = JSON.parse(sessionStorage.data);
      json.backgroundConfiguration.data.currentBackground = DefaultData.BackgoundConfiguration.currentBackground;
      sessionStorage.setItem('data',JSON.stringify(json));
      if(sessionStorage.loginStatus) DataAPI.uploadSavedData(localStorage.authToken,sessionStorage.data);
    }
  }
}
    