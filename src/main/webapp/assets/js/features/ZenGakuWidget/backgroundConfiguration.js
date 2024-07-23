import * as DefaultData from '../defaultData.js'

export {
    getYotubeId,
    addSelectedBCItemListener,
    changeBackground
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



//change background when click on apply button
const changeBackground = () => {
    var videoElement = document.getElementById('background-video');
    if(DefaultData.BackgoundConfiguration.isVideoSelecting){
      // videoElement.getElementsByTagName('source').item(0).setAttribute('src', background);
      videoElement.setAttribute('src', (DefaultData.BackgoundConfiguration.currentBackground + DefaultData.BackgoundConfiguration.defaultURL));
      // videoElement.style.display = "block";
      document.getElementsByClassName('video-container').item(0).style.display = "flex";
      // videoElement.load();
      // videoElement.play();
    } else {
      document.getElementsByClassName('video-container').item(0).style.display = "none";
      // videoElement.pause();
      changeBackgroundPicture(DefaultData.BackgoundConfiguration.currentBackground);
    }
}
    