// const taskList = document.getElementById('taskList');

// function addTask() {
//   const taskInput = document.getElementById('taskInput');
//   const priority = document.getElementById('priority').value;
//   const taskText = taskInput.value.trim();

//   if (taskText) {
//     const task = document.createElement('li');
//     task.className = `task ${priority}`;
//     task.innerHTML = `
//       <span>${taskText}</span>
//       <button onclick="toggleComplete(this)">Complete</button>
//       <button onclick="deleteTask(this)">Delete</button>
//     `;

//     taskList.appendChild(task);
//     taskInput.value = '';
//   }
// }

// function toggleComplete(button) {
//   const task = button.parentElement;
//   task.classList.toggle('completed');
// }

// function deleteTask(button) {
//   const task = button.parentElement;
//   task.classList.add('fade-out');
//   setTimeout(() => task.remove(), 300);
// }


document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.getElementById("todo-list");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const clearBtn = document.getElementById("clear-btn");

  // Add a new task
  addBtn.addEventListener("click", addTask);

  function addTask() {
    const taskText = todoInput.value.trim();
    if (taskText === "") return;

    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
        <input type="checkbox" class="check">
        <span contenteditable="true">${taskText}</span>
        <button class="delete-btn">&times;</button>
      `;

    todoList.appendChild(todoItem);
    todoInput.value = "";

    // Add event listeners for the new item
    todoItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(todoItem));
    todoItem.querySelector(".check").addEventListener("change", (e) => toggleComplete(todoItem, e.target.checked));
  }

  // Delete task
  function deleteTask(item) {
    item.classList.add("fade-out");
    setTimeout(() => item.remove(), 300);
  }

  // Toggle task completion
  function toggleComplete(item, isChecked) {
    item.classList.toggle("completed", isChecked);
  }

  // Filter tasks based on status
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");
      filterTasks(btn.getAttribute("data-filter"));
    });
  });

  function filterTasks(filter) {
    const tasks = todoList.querySelectorAll(".todo-item");
    tasks.forEach(task => {
      switch (filter) {
        case "all":
          task.style.display = "flex";
          break;
        case "completed":
          task.style.display = task.classList.contains("completed") ? "flex" : "none";
          break;
        case "pending":
          task.style.display = task.classList.contains("completed") ? "none" : "flex";
          break;
      }
    });
  }

  // Clear completed tasks
  clearBtn.addEventListener("click", () => {
    const completedTasks = todoList.querySelectorAll(".completed");
    completedTasks.forEach(task => task.remove());
  });
});
