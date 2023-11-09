function addTask() {
    var taskInput = document.getElementById("taskInput");
    var timeLimit = document.getElementById("timeLimit");
    var dueDate = document.getElementById("dueDate");
    var priority = document.getElementById("priority");
    var taskList = document.getElementById("taskList");

    if (taskInput.value !== "") {
        var li = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                li.style.textDecoration = "line-through";
            } else {
                li.style.textDecoration = "none";
            }
            saveData();
        });

        var label = document.createElement("label");
        label.textContent = taskInput.value;

        var priorityLabel = document.createElement("label");
        priorityLabel.classList.add("priority-label");
        priorityLabel.textContent = "Priority: " + priority.value;

        var timeLimitLabel = document.createElement("label");
        timeLimitLabel.classList.add("time-limit-label");
        timeLimitLabel.textContent = "Time Limit: " + timeLimit.value;

        var dueDateLabel = document.createElement("label");
        dueDateLabel.classList.add("due-date-label");
        dueDateLabel.textContent = "Due Date: " + dueDate.value;

        var subtaskList = document.createElement("ul");
        subtaskList.classList.add("subtask-list");

        var subtaskInput = document.createElement("input");
        subtaskInput.type = "text";
        subtaskInput.placeholder = "Add subtask";
        subtaskInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter" && this.value !== "") {
                var subtaskItem = document.createElement("li");
                subtaskItem.textContent = "- " + this.value;
                subtaskList.appendChild(subtaskItem);
                this.value = "";
                saveData();
            }
        });
        

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            li.remove();
            saveData();
        };

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(priorityLabel);
        li.appendChild(timeLimitLabel);
        li.appendChild(dueDateLabel);
        li.appendChild(subtaskList);
        li.appendChild(subtaskInput);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

        taskInput.value = "";
        timeLimit.value = "";
        dueDate.value = "";
        priority.value = "low";

        saveData();
    }
}

function saveData() {
    var tasks = [];
    var taskItems = document.getElementById("taskList").getElementsByTagName("li");

    for (var i = 0; i < taskItems.length; i++) {
        var taskItem = taskItems[i];

        var taskObject = {
            task: taskItem.querySelector("label").textContent,
            priority: taskItem.querySelector(".priority-label").textContent,
            timeLimit: taskItem.querySelector(".time-limit-label").textContent,
            dueDate: taskItem.querySelector(".due-date-label").textContent,
            subtasks: []
        };

        var subtaskItems = taskItem.querySelector(".subtask-list").getElementsByTagName("li");
        for (var j = 0; j < subtaskItems.length; j++) {
            taskObject.subtasks.push(subtaskItems[j].textContent.substring(2)); // Remove the "- " prefix
        }

        tasks.push(taskObject);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', function() {
    var taskList = document.getElementById("taskList");
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function(taskObject) {
        var li = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", function() {
            if (this.checked) {
                li.style.textDecoration = "line-through";
            } else {
                li.style.textDecoration = "none";
            }
            saveData();
        });

        var label = document.createElement("label");
        label.textContent = taskObject.task;

        var priorityLabel = document.createElement("label");
        priorityLabel.classList.add("priority-label");
        priorityLabel.textContent = taskObject.priority;

        var timeLimitLabel = document.createElement("label");
        timeLimitLabel.classList.add("time-limit-label");
        timeLimitLabel.textContent = taskObject.timeLimit;

        var dueDateLabel = document.createElement("label");
        dueDateLabel.classList.add("due-date-label");
        dueDateLabel.textContent = taskObject.dueDate;

        var subtaskList = document.createElement("ul");
        subtaskList.classList.add("subtask-list");

        taskObject.subtasks.forEach(function(subtask) {
            var subtaskItem = document.createElement("li");
            subtaskItem.textContent = "- " + subtask;
            subtaskList.appendChild(subtaskItem);
        });

        var subtaskInput = document.createElement("input");
        subtaskInput.type = "text";
        subtaskInput.placeholder = "Add subtask";
        subtaskInput.addEventListener("keydown", function(event) {
            if (event.key === "Enter" && this.value !== "") {
                var subtaskItem = document.createElement("li");
                subtaskItem.textContent = "- " + this.value;
                subtaskList.appendChild(subtaskItem);
                this.value = "";
                saveData();
            }
        });

        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function() {
            li.remove();
            saveData();
        };

        li.appendChild(checkbox);
        li.appendChild(label);
        li.appendChild(priorityLabel);
        li.appendChild(timeLimitLabel);
        li.appendChild(dueDateLabel);
        li.appendChild(subtaskList);
        li.appendChild(subtaskInput);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
});
