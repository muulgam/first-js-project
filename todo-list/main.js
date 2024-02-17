let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskBoard = document.getElementById("task-board");
let tabs = document.querySelectorAll(".task-tab");
let taskList = [];
let filterList = [];
let mode = "all";

addButton.addEventListener("click", addTask);

tabs.forEach(tab => {
  tab.addEventListener("click", function(event) {
    filter(event.target.id);
  });
});

function addTask() {
  let taskContent = taskInput.value;
  if(taskContent === '') {
    alert('Please enter a task');
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskContent,
    isComplete: false
  };
  taskList.push(task);
  taskInput.value = ''; 
  filter(mode); 
}

function render(tasks) {
  let resultHTML = '';
  tasks.forEach(task => {
    resultHTML += `<div class="task${task.isComplete ? ' task-done' : ''}">
      <div>${task.taskContent}</div>
      <div>
        <button onclick="toggleComplete('${task.id}')">Check</button> 
        <button onclick="deleteTask('${task.id}')">Delete</button>
      </div>
    </div>`;
  });
  taskBoard.innerHTML = resultHTML;
}

function toggleComplete(id) {
  let task = taskList.find(task => task.id === id);
  if (task) {
    task.isComplete = !task.isComplete;
  }
  filter(mode); 
}

function deleteTask(id) {
  taskList = taskList.filter(task => task.id !== id);
  filter(mode); 
}

function filter(mode) {
  let filteredTasks;
  switch (mode) {
    case "all":
      filteredTasks = taskList;
      break;
    case "ongoing":
      filteredTasks = taskList.filter(task => !task.isComplete);
      break;
    case "done":
      filteredTasks = taskList.filter(task => task.isComplete);
      break;
    default:
      filteredTasks = taskList;
  }
  render(filteredTasks);
  updateTabHighlight(mode);
}

function updateTabHighlight(mode) {
  tabs.forEach(tab => {
    if (tab.id === mode) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });
}

function randomIDGenerate() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Initial render
filter(mode);
