import * as TodoList from '../../components/ZenGakuWidget/todolist.js'

export {
    widgetListenerInit
}
const widgetListenerInit = () => {
    ['mouseup','ontouchcancel'].forEach(_event => {
        document.getElementById('to-do-feature').addEventListener(_event, () => {
            TodoList.displayToDoList();
        })
    })
    
}