import * as HTMLDom from '../HTMLDom.js'
import * as DefaultData from '../../features/defaultData.js'
import * as SoundConfiguration from '../../features/ZenGakuWidget/soundConfiguration.js'
import * as Movement from '../../features/movement.js'

export {
    displaySoundConfiguration
}


function addElementToSoundBoard(audioName, iconLink,audioLink){
    let parentNode = document.getElementById('sound-config-item-container').getElementsByTagName('ul').item(0);
  
    let inputNode = document.createElement('input');
    inputNode.classList.add('sound-item-slider');
    inputNode.disabled = 1;
    inputNode.type = "range";
    inputNode.min = "0";
    inputNode.max = "100";
    inputNode.value = "50";
  
    SoundConfiguration.addChangeEventToSoundItem(inputNode);
  
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
  
    SoundConfiguration.addClickEventToSoundItem(inputNode);
  
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
    
    node.setAttribute('value',audioLink)
    // node.value = audioLink;

    node.appendChild(firstDivNode);
    node.appendChild(secondDivNode);
  
    parentNode.appendChild(node);
  
  
  };

const displaySoundConfiguration = () => {
    { //Remove background configuration if it is existed
        let tmpVal = document.getElementById('sound-config');
        if(tmpVal) {
            tmpVal.remove();
            return
        }
    }
    
    const createGraphic = () => {
        let content = document.getElementsByClassName('content').item(0);

        let soundConfiguration = HTMLDom.createElement('div',['auto-moving','sound-config-container','content-item'],content,{},'sound-config');

        HTMLDom.createElement('span',[],
            HTMLDom.createElement('div',[],
                HTMLDom.createElement('div',['content-item-title','background-config-title'],soundConfiguration,{},'sound-config-title')
            ,{})    
        ,{innerText: 'Sound Configuration'});

        HTMLDom.createElement('div',['config-line'],soundConfiguration,{});

        let contentContainer = HTMLDom.createElement('div',['content-container'],soundConfiguration,{},'sound-content-container');

        HTMLDom.createElement('img',['config-add-button'],
            HTMLDom.createElement('div',['config-add-button-container'],contentContainer,{})    
        ,{src: 'assets/resources/img/more-button-white.svg'},'sound-add-button');

        HTMLDom.createElement('div',['config-line'], contentContainer,{});


        let soundConfigAddContainer = HTMLDom.createElement('div',['sound-add-container'],contentContainer,{},'sound-add-container');
        soundConfigAddContainer.style.display = 'none';
        HTMLDom.createElement('input',['auth-text-field','sound-add-input'],soundConfigAddContainer,{placeholder: 'Type Audio name'},'audio-name-sound-input');
        HTMLDom.createElement('input',['auth-text-field','sound-add-input'],soundConfigAddContainer,{placeholder: "Paste your icon link (suggest white svg icon)"},'icon-link-sound-input');
        HTMLDom.createElement('input',['auth-text-field','sound-add-input'],soundConfigAddContainer,{placeholder: "Paste your audio link"},'audio-link-sound-input');
        HTMLDom.createElement('button',['auth-button'],soundConfigAddContainer,{innerText: 'Add'},'sound-add-container-button');
        
        let soundConfigItemContainer = HTMLDom.createElement('ul',[],
            HTMLDom.createElement('div',['choice-container'],contentContainer,{},'sound-config-item-container')    
        ,{},);

        HTMLDom.createElement('div',['config-line'],contentContainer,{});

        let soundConfigButtonContainer = HTMLDom.createElement('div',['content-button-container'],contentContainer,{});
        HTMLDom.createElement('span',[],
            HTMLDom.createElement('div',['content-button-item'],soundConfigButtonContainer,{},'sound-config-apply-button')    
        ,{innerText: 'Apply'});
        HTMLDom.createElement('span',[],
            HTMLDom.createElement('div',['content-button-item'],soundConfigButtonContainer,{},'sound-config-cancel-button')    
        ,{innerText: 'Cancel'});
        
        return soundConfiguration;
    }

    const createDefaultData = () => {
        for(let index = 0; index < DefaultData.SoundConfiguration.icon.length; index+=1) {
            addElementToSoundBoard(
                DefaultData.SoundConfiguration.name[index],
                DefaultData.SoundConfiguration.icon[index],
                DefaultData.SoundConfiguration.sound[index]
            );
        }
    }

    const addListener = (HTMLElementSoundConfig) => {
        document.getElementById('sound-config-apply-button').addEventListener('click', () => {
            displaySoundConfiguration();
        });
        document.getElementById('sound-config-cancel-button').addEventListener('click', () => {
            displaySoundConfiguration();
        });

        document.getElementById('sound-add-button').addEventListener('click', () => {
            document.getElementById('sound-add-container').style.display = 'flex';
            document.getElementById('sound-config-item-container').style.display = 'none';
        });

        document.getElementById('sound-add-container-button').addEventListener('click', () =>{
            addElementToSoundBoard(
                document.getElementById('audio-name-sound-input').value,
                document.getElementById('icon-link-sound-input').value,
                document.getElementById('audio-link-sound-input').value
            );
            document.getElementById('audio-name-sound-input').value = "";
            document.getElementById('icon-link-sound-input').value = "";
            document.getElementById('audio-link-sound-input').value = "";
            document.getElementById('sound-config-item-container').style.display = "block";
            document.getElementById('sound-add-container').style.display = "none";       
        })
        
        Movement.addMovement(document.getElementById('sound-config-title'),HTMLElementSoundConfig);
    }
 
    let soundConfigElement = createGraphic();
    addListener(soundConfigElement);
    createDefaultData();
}

// displaySoundConfiguration();
