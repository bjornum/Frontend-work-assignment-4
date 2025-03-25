/* The main todo List
  - Will contain all todos in this application
*/
let todos = [
  { id: 1, text: "Learn JavaScript" },
  { id: 2, text: "Build a to-do app" },
  { id: 3, text: "Master DOM manipulation" },
];

/* Getting the various dom elements, and placing them into variables
  - todoList = The list itself, where the todo items are displayed.
  - todoInput = The input field, where user gives a name to the todo
  - addButton = Where user clicks to add an todo to the array list
*/
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");

// Create todo item element
function createTodoElement(todo) {
  // List element and the todo-item css class
  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");

  // Span, which contain the todo text itself
  const textContainer = document.createElement("span");
  textContainer.textContent = todo.text;

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

  // Adds the span and delete button to the list item
  listItem.appendChild(textContainer);
  listItem.appendChild(deleteButton);

  /* Returns the list item once it is built up.
    - This happens for every single object within the todo array.
    - Looping through it
  */
  return listItem;
}

/* Render todos
  - Clears the list itself, to be re-buildt with latest version of the todo list.
  - Using an map() due to the hint given in the assignment.
    - Each loop, triggers the createTodoElement function.
    - Creating a new listItem based on the object in the list.
    - Adding it then to the todoList itself.
*/
function renderTodos() {
  todoList.innerHTML = "";
  todoList.append(...todos.map(createTodoElement));
}

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
function addTodo() {
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
}

/* Delete todo
  - Takes the ID of the todo to remove from the list.
  - Filters through it
  - Getting the latest version of the todo list.
*/
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
}

// Listens to the click of the add todo button and trigger the addTodo function
addButton.addEventListener("click", addTodo);

// When hitting enter on the input, it adds the todo aswell.
todoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTodo();
  }
});

// Initial render
renderTodos();
