import * as HTMLDom from '../HTMLDom.js'
import * as Movement from '../../features/movement.js'
export {
    displayToDoList,
    addTask,
    toggleStrikethrough,
    updateTaskCompleted,
    updateTaskStatus,
    filterTasks,
    getCurrentDateTime,

}

let tasks = [];
const displayToDoList = () => {
    let todolist = document.getElementById("to-do-list");
    if(todolist != null) {
        todolist.remove();
        return;
    }
    todolist = HTMLDom.createElement("div",['auto-moving'],document.getElementsByClassName("content").item(0),{},"to-do-list");

    HTMLDom.createElement("h1",[],todolist,{innerText: "My check-list"},"task-temp-move-point");
    
    HTMLDom.createElement("p",[],
        HTMLDom.createElement("div",[],todolist,{})
    ,{innerText: "What is your next challenge?"},"next-challenge");

    HTMLDom.createElement("ul",[],todolist,{},"task-list");

    let taskListContainer = HTMLDom.createElement("div",['task-list-container'],todolist,{});
    HTMLDom.createElement("p",[],taskListContainer,{innerText: "No tasks"},"task-status");
    let button = HTMLDom.createElement("button",[],taskListContainer,{innerText: "+ Add task"}, "add-task");
    button.addEventListener('click', () => {
        addTask();
    })

    let filterContainer = HTMLDom.createElement("div",['filter-container'],todolist,{});
    button = HTMLDom.createElement("button",[],filterContainer,{innerText: "All"},"task-all-button");
    button.addEventListener('click',() => {
        filterTasks('all');
    })
    button = HTMLDom.createElement("button",[],filterContainer,{innerText: "Completed"},"task-completed-button");
    button.addEventListener('click',() => {
        filterTasks('completed');
    })
    button = HTMLDom.createElement("button",[],filterContainer,{innerText: "Incomplete"},"task-incomplete-button");
    button.addEventListener('click',() => {
        filterTasks('incomplete');
    })
    Movement.addMovement(document.getElementById("task-temp-move-point"),document.getElementById("to-do-list"));
}




function addTask() {
    const nextChallenge = document.getElementById('next-challenge');
    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');

    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    const taskTitle = document.createElement('div');
    taskTitle.className = 'task-title';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', toggleStrikethrough);

    const titleInput = document.createElement('textarea');
    titleInput.placeholder = 'Type something...';

    taskTitle.appendChild(checkbox);
    taskTitle.appendChild(titleInput);

    const taskDetails = document.createElement('div');
    taskDetails.className = 'task-details';

    const timeSpan = document.createElement('span');
    timeSpan.textContent = getCurrentDateTime();

    taskDetails.appendChild(timeSpan);

    taskInfo.appendChild(taskTitle);
    taskInfo.appendChild(taskDetails);
    listItem.appendChild(taskInfo);

    taskList.insertBefore(listItem, taskList.firstChild);

    tasks.push({ element: listItem, completed: false });

    updateTaskStatus();

    if (nextChallenge) {
        nextChallenge.remove();
    }

    filterTasks('all');
}

function toggleStrikethrough(event) {
    const checkbox = event.target;
    const listItem = checkbox.closest('li');

    const task = tasks.find(task => task.element === listItem);

    if (!task) {
        return;
    }

    const input = listItem.querySelector('textarea');

    if (checkbox.checked) {
        input.classList.add('strikethrough');
    } else {
        input.classList.remove('strikethrough');
    }

    task.completed = checkbox.checked;
    updateTaskStatus();
}

function updateTaskCompleted(taskElement, completed) {
    const task = tasks.find(t => t.element === taskElement);
    if (task) {
        task.completed = completed;
    }
}

function updateTaskStatus() {
    const taskStatus = document.getElementById('task-status');
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.completed).length;

    taskStatus.textContent = `Completed ${completedTasks} of ${totalTasks}`;
}

function filterTasks(filter) {
    tasks.forEach(task => {
        switch (filter) {
            case 'all':
                task.element.style.display = 'flex';
                break;
            case 'completed':
                task.element.style.display = task.completed ? 'flex' : 'none';
                break;
            case 'incomplete':
                task.element.style.display = task.completed ? 'none' : 'flex';
                break;
        }
    });
}

function getCurrentDateTime() {
    const now = new Date();
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };
    return now.toLocaleString('en-US', options);
}
