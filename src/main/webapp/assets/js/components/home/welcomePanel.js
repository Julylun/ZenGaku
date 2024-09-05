import * as HTMLDom from '../HTMLDom.js'
import * as DefaultData from '../../features/defaultData.js'

export {
    createWelcomePanel
}

const removeWelcomePanel = () => {
    document.getElementById('welcome').remove();
    document.getElementById('temp-black-background').remove();
    alert('Hiện tại website Zengaku đang trong quá trình cập nhật phân đoạn nên có thể sập hoặc lỗi bất cứ lúc nào, bên cạnh đó một số chức năng của website cũng có thể chạy không đúng trong thời điểm hiện tại. Chúc các bạn sử dụng website vui vẻ.')
}
const createWelcomePanel = () => {
    if(sessionStorage.getItem('isDisplayed_welcomePanel') != null) {
        return;
    }
    const createGraphic = () => {
        let welcomePanel = HTMLDom.createElement('div',[],document.body,{},'welcome');
        HTMLDom.createElement('div',[],document.body,{},'temp-black-background');

        let welcomeHead = HTMLDom.createElement('div',[],welcomePanel,{},'welcome-head');
        
        HTMLDom.createElement('p',['welcome__head--title'],
            HTMLDom.createElement('div',[],welcomeHead,{},'welcome-head-first-text-container')    
        ,{innerText: 'WELCOME TO'});

        let welcomeHeadSecondTextContainer = HTMLDom.createElement('div',[],welcomeHead,{},'welcome-head-second-text-container');
        HTMLDom.createElement('p',['welcome__head--title'],welcomeHeadSecondTextContainer,{innerText: 'ZENGAKU'},'welcome-head-zengaku-text');
        HTMLDom.createElement('p',[],welcomeHeadSecondTextContainer,{innerText: 'early\naccess'},'welcome-head-earlyaccess-text');

        HTMLDom.createElement('div',['welcome-line'],welcomePanel,{});

        HTMLDom.createElement('p',[],
            HTMLDom.createElement('div',[],welcomePanel,{},'welcome-content-container')    
        ,{innerHTML: DefaultData.WELCOME_PANEL.NOTIFICATION_TEXT},'welcome-content-item');

        let welcomeButtonContainer = HTMLDom.createElement('div',[],welcomePanel,{},'welcome-button-container');
        HTMLDom.createElement('button',[],welcomeButtonContainer,{innerText: 'Try now'},'welcome-try-now-button');
        HTMLDom.createElement('button',[],welcomeButtonContainer,{innerText: 'Take a tour'},'welcome-take-a-tour-button');
        sessionStorage.setItem('isDisplayed_welcomePanel',true);
    }
    const addListener = () => {
        document.getElementById('welcome-try-now-button').addEventListener('click', removeWelcomePanel);
        document.getElementById('welcome-take-a-tour-button').addEventListener('click', removeWelcomePanel);
    }

    createGraphic();
    addListener();
}

createWelcomePanel();

// background: linear-gradient(180deg, rgba(0, 0, 0, 0.517) 40%, rgba(0, 0, 0, 0) 100%);