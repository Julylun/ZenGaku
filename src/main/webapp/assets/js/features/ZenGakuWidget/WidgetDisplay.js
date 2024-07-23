import * as TodoList from '../../components/ZenGakuWidget/todolist.js'
import * as Calculator from '../../components/ZenGakuWidget/calculator.js'
import * as ZenGakuAssistant from '../../components/ZenGakuWidget/ZenGakuAssistant.js'
import * as Timer from '../../components/ZenGakuWidget/counter.js'
import * as BackgroundConfiguration from '../../components/ZenGakuWidget/backgroundConfiguration.js'
import * as SoundConfiguration from '../../components/ZenGakuWidget/soundConfiguration.js'
// import * as Quotes from '../../components/ZenGakuWidget/'

export {
    widgetListenerInit
}
const widgetListenerInit = () => {
    ['mouseup','ontouchcancel'].forEach(_event => {
        document.getElementById('timer-feature').addEventListener(_event, () => {
            Timer.displayCounter();  
        });

        document.getElementById('background-config-feature').addEventListener(_event, () => {
            BackgroundConfiguration.displayBackgroundConfiguration();
        });

        document.getElementById('sound-board-feature').addEventListener(_event, () => {
            SoundConfiguration.displaySoundConfiguration();
        });

        document.getElementById('to-do-feature').addEventListener(_event, () => {
            TodoList.displayToDoList();
        });

        document.getElementById('calculator-feature').addEventListener(_event, () => {
            Calculator.displayCalculator();
        });

        document.getElementById('zengaku-assistant-feature').addEventListener(_event, () => {
            ZenGakuAssistant.displayZenGakuAssistant();
        });

        document.getElementById('quotes-feature').addEventListener(_event, () => {
            
        });
        document.getElementById('laicos-feature').addEventListener(_event, () => {
            window.location.href = '/laicos.jsp';
        });

    })
    
}
