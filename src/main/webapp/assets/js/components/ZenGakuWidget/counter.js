import * as HTMLDom from '../HTMLDom.js'
import * as CounterFunction from '../../features/ZenGakuWidget/counter.js'
import * as Movement from '../../features/movement.js'

export {
    displayCounter
}


const displayCounter = () => {
    { //Remove background configuration if it is existed
        let tmpVal = document.getElementById('timer-container');
        if(tmpVal) {
            tmpVal.remove();
            return
        }
    }
    const createGraphic = () => {
        let content = document.getElementsByClassName('content').item(0);

        let counter = HTMLDom.createElement('div',['auto-moving'], content, {}, 'timer-container');

        HTMLDom.createElement('div',[],counter,{},'timer-background');

        HTMLDom.createElement('img',[],
            HTMLDom.createElement('div',[],counter,{},'timer-move-area')
        ,{src: "assets/resources/img/moving-icon-white.svg"},'timer-move-area-img');

        HTMLDom.createElement('div',[],
            HTMLDom.createElement('div',[],counter,{},'timer-ring')
        ,{},'timer-circle');

        HTMLDom.createElement('img',['timer-logo'],counter,{src: 'assets/resources/img/tree-icon.png'},'timer-logo');

        let timerChoiceContainer = HTMLDom.createElement('div',[],counter,{},'timer-choice-container');
        HTMLDom.createElement('p',[],timerChoiceContainer,{value: '-1', innerText: 'BREAK'},'break-label').style.display = 'none'
        let choice = HTMLDom.createElement('p',['timer-choice-item'],timerChoiceContainer,{innerText: 'Pomodoro'},'timer-choice-pomodoro').setAttribute('value','0')
        HTMLDom.createElement('p',['timer-choice-item','timer-choice-selected'],timerChoiceContainer,{innerText: 'Short break'},'timer-choice-shortbreak').setAttribute('value','1')
        HTMLDom.createElement('p',['timer-choice-item'],timerChoiceContainer,{innerText: 'Long break'},'timer-choice-longbreak').setAttribute('value','2')

        HTMLDom.createElement('div',[],
            HTMLDom.createElement('div',[],counter,{},'timer-count-container')    
        ,{innerText: '60:60:60'},'timer-count-text');

        let timeEndContainer = HTMLDom.createElement('div',[],counter, {}, 'timer-end-container');
        HTMLDom.createElement('p',[],timeEndContainer,{innerText: 'END'},'timer-end-label').style.display = 'none';
        timeEndContainer.style.display = 'none';

        HTMLDom.createElement('p',[],
            HTMLDom.createElement('div',['timer-button'],counter,{},'timer-start-button')
        ,{innerText: 'Start'});

        let timerPauseButton = HTMLDom.createElement('div',['timer-button'],counter,{},'timer-pause-button');
        HTMLDom.createElement('p',[], timerPauseButton,{innerText: 'Pause'});
        timerPauseButton.style.display = 'none';

        let timerSkipButton = HTMLDom.createElement('div',['timer-button'],counter,{},'timer-skip-button');
        HTMLDom.createElement('p',[], timerSkipButton,{innerText: 'Skip'});
        timerSkipButton.style.display = 'none';
        
        let timerStopButton = HTMLDom.createElement('div',['timer-button'],counter,{},'timer-stop-button');
        HTMLDom.createElement('p',[], timerStopButton,{innerText: 'Stop'});
        timerStopButton.style.display = 'none';

        let timerContinueButton = HTMLDom.createElement('div',['timer-button'],counter,{},'timer-continue-button');
        HTMLDom.createElement('p',[],timerContinueButton,{innerText: 'Continue'});
        timerContinueButton.style.display = 'none';

        return counter;
    }
    const addListener = (HTMLCounter) => {
        CounterFunction.counterDefaultConfig();
        Movement.addMovement(document.getElementById('timer-move-area'),HTMLCounter);
    }
    
    let counter = createGraphic();
    addListener(counter);
}

// displayCounter();
