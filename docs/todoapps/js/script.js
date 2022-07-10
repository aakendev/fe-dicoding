const todos = [];
const RENDER_EVENT = "render-todo";

document.addEventListener(RENDER_EVENT, () => {
  const uncompletedTODOList = document.getElementById("todos");
  uncompletedTODOList.innerHTML = "";

  const completedTODOList = document.getElementById("completed-todos");
  completedTODOList.innerHTML = "";

  for (const todoItem of todos) {
    const todoElement = makeTodo(todoItem);
    if (!todoItem.isCompleted) {
      uncompletedTODOList.append(todoElement);
    } else {
      completedTODOList.append(todoElement);
    }
  }
});

const generateID = () => {
  return +new Date();
};

const generateTodoObject = (id, task, timestamp, isCompleted) => {
  return {
    id,
    task,
    timestamp,
    isCompleted,
  };
};

const addTodo = () => {
  const textTodo = document.getElementById("title").value;
  const timeStamp = document.getElementById("date").value;

  const generatedID = generateID();
  const todoObject = generateTodoObject(
    generatedID,
    textTodo,
    timeStamp,
    false
  );

  todos.push(todoObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
};

document.addEventListener("DOMContentLoaded", () => {
  const submitForm = document.getElementById("form");
  submitForm.addEventListener("submit", (ev) => {
    ev.preventDefault();
    addTodo();
  });
});

const findTodo = (todoId) => {
  for (const todoItem of todos) {
    if (todoItem.id === todoId) {
      return todoItem;
    }
  }
  return null;
};

const findTodoIndex = (todoId) => {
  for (const index in todos) {
    if (todos[index].id === todoId) {
      return index;
    }
  }
  return -1;
};

const addTaskToCompleted = (todoId) => {
  const todoTarget = findTodo(todoId);

  if (todoTarget === null) return;

  todoTarget.isCompleted = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const removeTaskFromCompleted = (todoId) => {
  const todoTarget = findTodoIndex(todoId);

  if (todoTarget === -1) return;

  todos.splice(todoTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const undoTaskFromCompleted = (todoId) => {
  const todoTarget = findTodo(todoId);

  if (todoTarget === null) return;

  todoTarget.isCompleted = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
};

const makeTodo = (todoObject) => {
  const textTitle = document.createElement("h2");
  textTitle.innerText = todoObject.task;

  const textTimeStamp = document.createElement("p");
  textTimeStamp.innerText = todoObject.timestamp;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(textTitle, textTimeStamp);

  const container = document.createElement("div");
  container.classList.add("item", "shadow");
  container.append(textContainer);
  container.setAttribute("id", `todo-${todoObject.id}`);

  if (todoObject.isCompleted) {
    const undoButton = document.createElement("button");
    undoButton.classList.add("undo-button");

    undoButton.addEventListener("click", () => {
      undoTaskFromCompleted(todoObject.id);
    });

    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");

    trashButton.addEventListener("click", () => {
      removeTaskFromCompleted(todoObject.id);
    });

    container.append(undoButton, trashButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", () => {
      addTaskToCompleted(todoObject.id);
    });

    container.append(checkButton);
  }

  return container;
};
