/* The main todo List
  - Will contain all todos in this application
*/
let todos = [];

/* Getting the various dom elements, and placing them into variables
  - todoList = The list itself, where the todo items are displayed.
  - todoInput = The input field, where user gives a name to the todo
  - addButton = Where user clicks to add an todo to the array list
  - clearCompletedButton = Clear away all completed todo items
*/
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
const clearCompletedButton = document.getElementById("clear-completed");

// Create todo item element
const createTodoElement = (todo) => {
  // List element and the todo-item css class
  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");

  // Checkbox to mark as completed
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.classList.add("custom-checkbox");
  checkbox.addEventListener("change", () => toggleTodo(todo.id));

  // Span, which contain the todo text itself
  const textContainer = document.createElement("span");
  textContainer.textContent = todo.text;

  // If an todo is completed, display it as such with a line through
  if (todo.completed) {
    textContainer.style.textDecoration = "line-through";
    textContainer.style.opacity = "0.5";
  }

  /* Delete Button
    - Styles with the css class delete-button
    - Added the text Delete to it
  */
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";

  /* Delete Event Listener
    - Waits for the user to click the delete button on the todo
    - Then passes the ID of the todo, down to the delete todo function
    - Which will then delete it from the array
  */
  deleteButton.addEventListener("click", () => deleteTodo(todo.id));

  // Adds the Checkbox, Span and Delete Button to the list item
  listItem.appendChild(checkbox);
  listItem.appendChild(textContainer);
  listItem.appendChild(deleteButton);

  /* Returns the list item once it is built up.
    - This happens for every single object within the todo array.
    - Looping through it
  */
  return listItem;
};

// Hide Clear Completed button if todo array is empty
const toggleClearCompletedButton = () => {
  if (todos.length >= 1) {
    clearCompletedButton.classList.remove("hide-button");
  } else {
    clearCompletedButton.classList.add("hide-button");
  }
};

/* Render todos
  - Clears the list itself, to be re-buildt with latest version of the todo list.
  - Using an map() due to the hint given in the assignment.
    - Each loop, triggers the createTodoElement function.
    - Creating a new listItem based on the object in the list.
    - Adding it then to the todoList itself.
*/
const renderTodos = () => {
  todoList.innerHTML = "";
  todoList.append(...todos.map(createTodoElement));

  // Displays state on the clear completed button
  toggleClearCompletedButton();
};

/* Add todo
  - Adding a new Todo object to the todo array.
  - First getting the text from the input itself.
      - Using trim()
  - Then check if it is empty or not.
  - If it got content then i create the new Object that will go into the todo array.
    - Using Date.not() to create an unique ID.
    - And the text itself of course.
  - Pushing it to the todo array
  - Clearing the input field value, since the action is completed.
  - Getting the latest version of the todo list and displays it.
*/
const addTodo = () => {
  const text = todoInput.value.trim();
  if (text !== "") {
    const newTodo = {
      id: Date.now(),
      text: text,
    };
    todos.push(newTodo);
    todoInput.value = "";
    renderTodos();
  }
};

/* Delete todo
  - Takes the ID of the todo to remove from the list.
  - Filters through it
  - Getting the latest version of the todo list.
*/
const deleteTodo = (id) => {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
};

// Listens to the click of the add todo button and trigger the addTodo function
addButton.addEventListener("click", addTodo);

// When hitting enter on the input, it adds the todo aswell.
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// Removes completed tasks
const clearCompletedTodos = () => {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
};

// Toggle if something is completed or not
const toggleTodo = (id) => {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed; // Toggle between true/false
  }
  renderTodos();
};

// Clears all completed todos when clicked
clearCompletedButton.addEventListener("click", clearCompletedTodos);

// Initial render
renderTodos();
