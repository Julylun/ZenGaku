import * as TodoList from '../../components/ZenGakuWidget/todolist.js'
import * as Calculator from '../../components/ZenGakuWidget/calculator.js'
import * as ZenGakuAssistant from '../../components/ZenGakuWidget/ZenGakuAssistant.js'

export {
    widgetListenerInit
}
const widgetListenerInit = () => {
    ['mouseup','ontouchcancel'].forEach(_event => {
        document.getElementById('to-do-feature').addEventListener(_event, () => {
            TodoList.displayToDoList();
        });
        document.getElementById('calculator-feature').addEventListener(_event, () => {
            Calculator.displayCalculator();
        });
        document.getElementById('zengaku-assistant-feature').addEventListener(_event, () => {
            ZenGakuAssistant.displayZenGakuAssistant();
        })
    })
    
}
