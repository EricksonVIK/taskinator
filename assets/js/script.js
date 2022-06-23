// var buttonE1 = document.querySelector("#save-task");
var formE1 = document.querySelector("#task-form");
var tasksToDoE1 = document.querySelector("#tasks-to-do");

var createTaskHandler =function(event){

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name ='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // Create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    // create div to hold task infor and add to list item
    var taskInfoE1 = document.createElement("div");
    // give the div a class name
    taskInfoE1.className="task-info";

    // add HTML content to div
    taskInfoE1.innerHTML="<h3 class = 'task-name'>" + taskNameInput + "</h3><span class = 'task-type'>" + taskTypeInput + "</span>";
    
    listItemE1.appendChild(taskInfoE1);
    
    // add entire itemto list
    tasksToDoE1.appendChild(listItemE1)

}

formE1.addEventListener("submit", createTaskHandler);


