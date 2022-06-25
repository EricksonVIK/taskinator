// reference to main via id page-content
var pageContentE1 = document.querySelector("#page-content");
console.dir(pageContentE1)

// creating variable to create and track tasks via id
var taskIdCounter =0;

// query selector used to turn the entire  form into a variable based on its class
var formE1 = document.querySelector("#task-form");
// ul object turned into a variable via class as well
var tasksToDoE1 = document.querySelector("#tasks-to-do");

// variables created from ul task in progress and task completed
var tasksInProgressE1 = document.querySelector("#tasks-in-progress");
var tasksCompletedE1 = document.querySelector("#tasks-completed");

// creating array for local storage
var tasks = []


var taskFormHandler =function(event){

    // stops form from reloading the page upon form submission
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name ='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    var isEdit = formE1.hasAttribute("data-task-id");
    // will list false for new submit and true for edited submit
    // console.log(isEdit);

    // package up data as an object - replacing with and if else statement based on status of is Edit
    // var taskDataObj ={
    //     name:taskNameInput,
    //     type:taskTypeInput,
    // }

    // isEdit has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId =formE1.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskE1 function
    else {
        var taskDataObj ={
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };

        // send it as an argument to createTaskE1
        createTaskE1(taskDataObj);

    };

    // confirming content on both input fields || = and ! = empty
    if (!taskNameInput || !taskTypeInput){
        alert ("You need to fill out the task form!");
        // return false stops the function
        return false;
    }

    // resets the field in after applying the function - reset is designed specifically for the form element
    formE1.reset();

    // // send it as an argument to createTaskE1
    // createTaskE1(taskDataObj);

}

var createTaskE1 = function(taskDataObj){

    // Create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    // add task id as a custom attribute
    listItemE1.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");
    // give the div a class name
    taskInfoE1.className="task-info";
    // add HTML content to div
    taskInfoE1.innerHTML="<h3 class = 'task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";

    // taskInfoE1 is addded to listItemE1
    listItemE1.appendChild(taskInfoE1);

    
    taskDataObj.id = taskIdCounter;

    tasks.push(taskDataObj);

    var taskActionsE1 = createTaskActions(taskIdCounter);
    // verifying the function worked prior to append
    // console.log(taskActionsE1);
    // adding created button with drop down menus
    listItemE1.appendChild(taskActionsE1);

    // li with nestled div are added to the html object (tasksToDoE1 was added above the function)
    tasksToDoE1.appendChild(listItemE1);
    
    // increase task counter for next unique id
    taskIdCounter++;

    // console.log(taskDataObj);
    // console.log(taskDataObj.status);
    saveTasks();
}

var createTaskActions = function(taskId){

    // create div to contain the elements/buttons
    var actionContainerE1 = document.createElement ("div");
    actionContainerE1.className = "task-actions";

    // create edit button
    var editButtonE1 = document.createElement("button");
    // add text, class, and id (set by taskIdCounter) to object
    editButtonE1.textContent = "Edit";
    editButtonE1.className = "btn edit-btn";
    editButtonE1.setAttribute("data-task-id", taskId)

    actionContainerE1.appendChild(editButtonE1);

    // create delete button
    var deleteButtonE1 =document.createElement("button");
    deleteButtonE1.textContent= "Delete";
    deleteButtonE1.className=   "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonE1);

    // adding dropdown menu
    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className ="select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);

    // loop to add the to do, in progress, done to option element under select object just created
    // first creating the array
    var statusChoices = ["To Do", "In Progress", "Completed"];
    // the loop statement
    for (var i=0; i<statusChoices.length; i++){
        // create option element to be nestled under select element
        var statusOptionE1 = document.createElement("option");
        // adding the array created
        statusOptionE1.textContent = statusChoices [i];
        statusOptionE1.setAttribute("value", statusChoices[i]);

        statusSelectE1.appendChild(statusOptionE1);

    }


    actionContainerE1.appendChild(statusSelectE1);

    // ran createTaskActions in console to ensure the div and 2 buttons were created
    return actionContainerE1;
};

// clicking on the button - we used submit vs clicking, otherwise clicking on any of the fields would've submitted new entry
formE1.addEventListener("submit", taskFormHandler);

// // adding function for event listner
var taskButtonHandler = function(event){
    // reporting the elements on which the event (click in this case) occurs
    console.log(event.target);

    // get target element from event
    var targetE1 = event.target;
    
    // identifying which button was clicked to assign the targetE1 variable
    if (targetE1.matches(".edit-btn")){
        var taskId = targetE1.getAttribute("data-task-id");
        editTask(taskId);
    } // delete button identified
    else if (event.target.matches(".delete-btn")) {
        // confirms the delete button was clicked.
    // console.log("You clicked a delete button!");
        var taskId =event.target.getAttribute("data-task-id");
        deleteTask(taskId);
        // console.log("You clicked a delete button!");

    };
    console.dir(event.target);

    // if (event.target.matches(".delete-btn")) {
    //     var taskId = event.target.getAttribute("data-task-id");
    // }
};

// deleting the task
var deleteTask = function(taskId) {
    console.log("deleted task # " + taskId);
    // creating an array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i=0; i<tasks.length; i++){
        // if task[i].id dowsn't match the vale of taskId, let's keep and push it into the new array
        if (tasks[i].id !== parseInt(taskId)){
            updatedTaskArr.push(tasks[i]);
        }
    }

    // reassign taks array to be the same as updatedTaskArr array
    tasks = updatedTaskArr;
    // verify the task id is coming from delete task
    // selecting a list item using .task-item, narrowing search for .task-item that has specific data-task-id
    // no space between ...item[data...] to show that both properties must be on the same element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // removes the taskSelected in this case associated with the proper data-task-id
    taskSelected.remove();
    saveTasks();
}

// editTask function
var editTask = function(taskId){
    console.log("editing task #" + taskId);

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

    // get content from task name and type using taskSelected instead of document before the querySelector limits search
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    // console.log(taskName);

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // console.log(taskType);
    // debugger; before and after the loop displays the values associated to each based on taskId
    // loop throught the tasks array and task object with new content  - parseNet function converts string to a number
    // for (var i=0; i <tasks.length; i++){
    //     if (tasks[i].id === parseInt(taskId)){
    //         tasks[i].name= taskName;
    //         tasks[i].type = taskType;
    //     }
    // };
    // console.log(tasks);
    // debugger;
    // adds the name and type back into form elements
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    // changes submit to edit on button
    document.querySelector("#save-task").textContent = "Save Task";
    // carries the associated id to the edit
    // 2 purposes - keeps track of task being edited & a specific task is being edited
    formE1.setAttribute("data-task-id", taskId);
};

var completeEditTask = function(taskName, taskType, taskId) {
    
    // find the matching task list items
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    // removing the data-task-id (ensures new tasks will be submitted following the edit) and resetting button to add task
    formE1.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    for (var i=0; i <tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].name= taskName;
            tasks[i].type = taskType;
        }
    };
    console.log(tasks);

    saveTasks();
}

var taskStatusChangeHandler = function(event){
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id and task...E1 completed at the top of the script
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    if (statusValue === "to do"){
        tasksToDoE1.appendChild(taskSelected);
    }
    else if (statusValue === "in progress"){
        tasksInProgressE1.appendChild(taskSelected);
    }
    else if (statusValue === "completed"){
        tasksCompletedE1.appendChild(taskSelected);
    };

    // update tasks in task array
    for (var i=0; i<tasks.length; i++){
        if (tasks[i].id === parseInt(taskId)){
            tasks[i].status = statusValue;
        }
    };
    console.log(tasks);
    saveTasks();
};

var saveTasks = function(){
    // setItem saves - getItem retrieves -- JSON (JavaScript Object Notation) stringify converts arrays into a string for saving
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function(){
    var tasks = localStorage.getItem("tasks")
    console.log(tasks);
    if (tasks === null){
        var tasks = [];
        return false;
    }

    tasks= JSON.parse(tasks)
    console.log(tasks);
// //     // ul object turned into a variable via class as well
//      var savedToDoE1 = document.querySelector("#tasks-to-do");

// // // variables created from ul task in progress and task completed
//     var savedInProgressE1 = document.querySelector("#tasks-in-progress");
//     var savedCompletedE1 = document.querySelector("#tasks-completed");
// 
// debugger;
    for(var i=0; i<tasks.length; i++){
        createTaskE1(tasks[i]);
        console.log(tasks[i].status)

    };
//     console.log(tasks[i]);
// debugger;

};

pageContentE1.addEventListener("click", taskButtonHandler);

pageContentE1.addEventListener("change", taskStatusChangeHandler);

loadTasks ();