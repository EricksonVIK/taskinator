// query selector used to turn the entire  form into a variable based on its class
var formE1 = document.querySelector("#task-form");
// ul object turned into a variable via class as well
var tasksToDoE1 = document.querySelector("#tasks-to-do");

var taskFormHandler =function(event){

    event.preventDefault();
    var taskNameInput = document.querySelector("input[name ='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // Create list item
    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoE1 = document.createElement("div");

    // give the div a class name
    taskInfoE1.className="task-info";

    // add HTML content to div
    taskInfoE1.innerHTML="<h3 class = 'task-name'>" + taskNameInput + "</h3><span class = 'task-type'>" + taskTypeInput + "</span>";
    
    // taskInfoE1 is addded to listItemE1
    listItemE1.appendChild(taskInfoE1);
    
    // li with nestled div are added to the html object (tasksToDoE1 was added above the function)
    tasksToDoE1.appendChild(listItemE1);

    console.dir(listItemE1);

}

// clicking on the button - we used submit vs clicking, otherwise clicking on any of the fields would've submitted new entry
formE1.addEventListener("submit", taskFormHandler);


