// creating variable to create and track tasks via id
var taskIdCounter =0;

// query selector used to turn the entire  form into a variable based on its class
var formE1 = document.querySelector("#task-form");
// ul object turned into a variable via class as well
var tasksToDoE1 = document.querySelector("#tasks-to-do");

var taskFormHandler =function(event){

    // stops form from reloading the page upon form submission
    event.preventDefault();

    var taskNameInput = document.querySelector("input[name ='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // package up data as an object
    var taskDataObj ={
        name:taskNameInput,
        type:taskTypeInput,
    }

    // confirming content on both input fields || = and ! = empty
    if (!taskNameInput || !taskTypeInput){
        alert ("You need to fill out the task form!");
        // return false stops the function
        return false;
    }

    // resets the field in after applying the function - reset is designed specifically for the form element
    formE1.reset();

    // send it as an argument to createTaskE1
    createTaskE1(taskDataObj);

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

    var taskActionsE1 = createTaskActions(taskIdCounter);
    // verifying the function worked prior to append
    // console.log(taskActionsE1);
    // adding created button with drop down menus
    listItemE1.appendChild(taskActionsE1);

    // li with nestled div are added to the html object (tasksToDoE1 was added above the function)
    tasksToDoE1.appendChild(listItemE1);
    
    // increase task counter for next unique id
    taskIdCounter++;
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


