const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const count = document.getElementById("count");

function addTask() {

    if(taskInput.value.trim() === ""){
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="check">

            <span>${taskInput.value}</span>

            <small class="status">Active</small>
        </div>

        <div class="actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    const checkbox = li.querySelector(".check");
    const status = li.querySelector(".status");
    const text = li.querySelector("span");

    checkbox.addEventListener("change", function(){

        if(this.checked){
            text.classList.add("completed");
            status.textContent = "✔ Completed";
        }else{
            text.classList.remove("completed");
            status.textContent = "Active";
        }

        saveTasks();
    });

    li.querySelector(".delete-btn")
      .addEventListener("click", function(){
          li.remove();
          updateCount();
          saveTasks();
      });

    li.querySelector(".edit-btn")
.addEventListener("click", function(){

    const span = li.querySelector("span");

    if(this.textContent === "Edit"){

        const currentText = span.textContent;

        span.innerHTML = `
            <input
                type="text"
                class="edit-input"
                value="${currentText}">
        `;

        this.textContent = "Save";

    }else{

        const input =
            span.querySelector(".edit-input");

        const updatedText =
            input.value.trim();

        if(updatedText !== ""){
            span.textContent = updatedText;
        }

        this.textContent = "Edit";

        saveTasks();
    }
});

    taskList.appendChild(li);

    taskInput.value = "";

    updateCount();
    saveTasks();
}

function updateCount(){
    count.textContent =
        taskList.querySelectorAll("li").length;
}

function showAll(){

    document.querySelectorAll("#taskList li")
        .forEach(task=>{
            task.style.display="flex";
        });
}

function showActive(){

    document.querySelectorAll("#taskList li")
        .forEach(task=>{

            const checked =
                task.querySelector(".check").checked;

            task.style.display =
                checked ? "none" : "flex";
        });
}

function showCompleted(){

    document.querySelectorAll("#taskList li")
        .forEach(task=>{

            const checked =
                task.querySelector(".check").checked;

            task.style.display =
                checked ? "flex" : "none";
        });
}

function saveTasks(){
    localStorage.setItem(
        "todoTasks",
        taskList.innerHTML
    );
}

window.onload = function(){

    localStorage.removeItem("todoTasks");

    updateCount();
};