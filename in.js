function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();

    if (taskText !== "") {
        var taskList = document.getElementById("taskList");

        var li = document.createElement("li");
        li.innerText = taskText;
        
        var deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerText = "Delete";
        deleteButton.onclick = function() {
            li.remove();
        }

        li.appendChild(deleteButton);
        taskList.appendChild(li);

        taskInput.value = "";
    }
}
