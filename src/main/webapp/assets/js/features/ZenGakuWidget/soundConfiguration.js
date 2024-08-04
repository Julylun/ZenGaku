import * as DefaultData from '../defaultData.js'
import * as DataAPI from '../user/DataAPI.js'

export {
    addClickEventToSoundItem,
    addChangeEventToSoundItem,
    addItemToSavedData
}

class AudioModel {
    constructor(audioPath,name){
      this.audioTag = new Audio(audioPath);
      this.name = name;
    }
    play(){
        console.log(this.audioTag.src)
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
  
  function removeAudioFromList(soundConfigItem){
  let audioName = soundConfigItem.parentElement.parentElement.getElementsByTagName('p').item(0).innerHTML;
  let index = 0
  for(index = 0; index < DefaultData.SoundConfiguration.audioList.length; index += 1){
    if(audioName == DefaultData.SoundConfiguration.audioList[index].name){
      DefaultData.SoundConfiguration.audioList[index].pause();
      DefaultData.SoundConfiguration.audioList[index].remove();
      delete DefaultData.SoundConfiguration.audioList[index];
      DefaultData.SoundConfiguration.audioList.splice(DefaultData.SoundConfiguration.audioList.indexOf(DefaultData.SoundConfiguration.audioList[index]),1);
      console.log("deleted");
      console.log(DefaultData.SoundConfiguration.audioList[index]);
      return;
    }
  }
  console.log(DefaultData.SoundConfiguration.audioList.length);
}

function getAudioModelFromArray(name){
    for(let audioItem of DefaultData.SoundConfiguration.audioList){
      if(name == audioItem.name){
        return audioItem;
      }
    }
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

  /**
   * Add sound item to savedData and default data
   * @param {string} _name 
   * @param {string} iconUrl 
   * @param {string} soundUrl 
   */
  const addItemToSavedData = (_name, iconUrl, soundUrl) => {
    let savedData = JSON.parse(sessionStorage.data);

    let savedData__arrayOfName = savedData.soundConfiguration.data.name;
    let savedData__arrayOfIconUrl = savedData.soundConfiguration.data.iconUrl;
    let savedData__arrayOfSoundUrl = savedData.soundConfiguration.data.soundUrl;
    savedData__arrayOfName.push(_name);
    savedData__arrayOfIconUrl.push(iconUrl);
    savedData__arrayOfSoundUrl.push(soundUrl);

    savedData.soundConfiguration.data.name = savedData__arrayOfName;
    savedData.soundConfiguration.data.iconUrl = savedData__arrayOfIconUrl;
    savedData.soundConfiguration.data.soundUrl = savedData__arrayOfSoundUrl;

    console.log(savedData);
    sessionStorage.setItem('data',JSON.stringify(savedData));
    DataAPI.uploadSavedData(localStorage.authToken, sessionStorage.data);
    console.log(JSON.parse(sessionStorage.data));
    DefaultData.soundConfigurationLoad(savedData);
  }

  function addAudioToList(soundConfigItem){
    let audioName = soundConfigItem.parentElement.parentElement.getElementsByTagName('p').item(0).innerHTML;
    // console.log(soundConfigItem.parentElement.parentElement.parentElement.getAttribute('value'))
    DefaultData.SoundConfiguration.audioList.push(new AudioModel(soundConfigItem.parentElement.parentElement.parentElement.getAttribute('value'),audioName));
    DefaultData.SoundConfiguration.audioList[DefaultData.SoundConfiguration.audioList.length-1].setLoop(true);
    DefaultData.SoundConfiguration.audioList[DefaultData.SoundConfiguration.audioList.length-1].play();
  }