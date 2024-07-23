import * as HTMLDom from '../HTMLDom.js'
import * as BackgroundConfiguration from '../../features/ZenGakuWidget/backgroundConfiguration.js'
import * as DefaultData from '../../features/defaultData.js'
import * as Movement from '../../features/movement.js'

export {
    displayBackgroundConfiguration
}
//Var




//A funticon is used to add element to BackGround Configuration
const addDefaultData = () => {
    for(let index = 0; index < DefaultData.BackgoundConfiguration.name.length; index+=1) {
        addElementToBackgroundConfig(
            DefaultData.BackgoundConfiguration.name[index],
            DefaultData.BackgoundConfiguration.url[index]
        )        
    }
}


//Thừa
const addElementFromInput = () => {
    addElementToBackgroundConfig(
        document.getElementsByClassName('background-config-name-field').item(0).value,
        document.getElementsByClassName("background-config-text-field").item(0).value
    )
    document.getElementsByClassName('background-choice').item(0).style.display = "flex";
    document.getElementsByClassName('background-config-add-content').item(0).style.display = "none";
  
    document.getElementsByClassName('background-config-name-field').item(0).value=""
    document.getElementsByClassName("background-config-text-field").item(0).value = "";
}

function addElementToBackgroundConfig(name,backgroundURL){
    let node = document.createElement("li");
    let p = document.createElement("p");
  
    node.classList.add("background-config-item");
  
    if(new URL(backgroundURL).hostname == "www.youtube.com"){
      node.classList.add("video");
      backgroundURL = "https://www.youtube.com/embed/" + BackgroundConfiguration.getYotubeId(backgroundURL);
    }
  
    node.setAttribute('value',backgroundURL);
  
    p.innerHTML = name;
    node.appendChild(p);
  
    document.getElementsByClassName('background-choice').item(0).getElementsByTagName("ul").item(0).appendChild(node);
    BackgroundConfiguration.addSelectedBCItemListener();
}


const displayBackgroundConfiguration = () => {
    { //Remove background configuration if it is existed
        let tmpVal = document.getElementById('background-config');
        if(tmpVal) {
            tmpVal.remove();
            return
        }
    }
    
    const createGraphic = () => {
        let content = document.getElementsByClassName('content').item(0);

        let backgroundConfiguration = HTMLDom.createElement('div',['auto-moving','background-config-container','content-item'],content,{},'background-config');

        HTMLDom.createElement('span',[],
            HTMLDom.createElement('div',[],
                HTMLDom.createElement('div',['content-item-title','background-config-title'],backgroundConfiguration,{})
            ,{})    
        ,{innerText: 'Background Configuration'});

        HTMLDom.createElement('div',['config-line'],backgroundConfiguration,{});

        let contentContainer = HTMLDom.createElement('div',['content-container'],backgroundConfiguration,{});

        HTMLDom.createElement('img',['config-add-button','background-config-add-button'],
            HTMLDom.createElement('div',['config-add-button-container'],contentContainer,{})    
        ,{src: 'assets/resources/img/more-button-white.svg'},'bgcf-bt');

        HTMLDom.createElement('div',['config-line'], contentContainer,{});


        let backgroundConfigAddContent = HTMLDom.createElement('div',['background-config-add-content'],contentContainer,{});
        backgroundConfigAddContent.style.display = 'none';
        let backgroundConfigTypeBox = HTMLDom.createElement('div',['background-config-type-box'],backgroundConfigAddContent,{});
        HTMLDom.createElement('input',['auth-text-field','background-config-field','background-config-name-field'],backgroundConfigTypeBox,{placeholder: 'Type background name'},'');
        HTMLDom.createElement('input',['auth-text-field','background-config-field','background-config-text-field'],backgroundConfigTypeBox,{placeholder: "Paste your image/youtube's video link here"},'');
        HTMLDom.createElement('button',['auth-button','background-config-add-link-button'],backgroundConfigTypeBox,{innerText: 'Add'});
        
        let listContainer = HTMLDom.createElement('ul',[],
            HTMLDom.createElement('div',['choice-container','background-choice'],contentContainer,{})    
        ,{},);

        HTMLDom.createElement('div',['config-line'],contentContainer,{});

        let backgroundConfigButtonContainer = HTMLDom.createElement('div',['content-button-container','background-config-button-container'],contentContainer,{});
        HTMLDom.createElement('span',[],
            HTMLDom.createElement('div',['content-button-item'],backgroundConfigButtonContainer,{},'background-config-apply-button')    
        ,{innerText: 'Apply'});
        HTMLDom.createElement('span',[],
            HTMLDom.createElement('div',['content-button-item'],backgroundConfigButtonContainer,{},'background-config-cancel-button')    
        ,{innerText: 'Cancel'});
        
        return backgroundConfiguration;
    }

    const addListener = (backgroundConfiguration) => {
        document.getElementById('background-config-apply-button').addEventListener('click', () => {
            BackgroundConfiguration.changeBackground();
        });
        document.getElementById('background-config-cancel-button').addEventListener('click', () => {
            displayBackgroundConfiguration();
        });
        document.getElementById('bgcf-bt').addEventListener('click', () => {
            document.getElementsByClassName('background-config-add-content').item(0).style.display = 'flex';
            document.getElementsByClassName('background-choice').item(0).style.display = 'none';
        });
        document.getElementsByClassName('background-config-add-link-button').item(0).addEventListener('click', () => {
            addElementToBackgroundConfig(
               document.getElementsByClassName('background-config-name-field').item(0).value,
               document.getElementsByClassName('background-config-text-field').item(0).value,
            )
            document.getElementsByClassName('background-config-add-content').item(0).style.display = 'none';
            document.getElementsByClassName('background-choice').item(0).style.display = 'flex';

            //Add here
        });

        Movement.addMovement(document.getElementsByClassName('background-config-title').item(0),backgroundConfiguration);
    }
 
    let bgElement = createGraphic();
    addListener(bgElement);
    addDefaultData();
}
