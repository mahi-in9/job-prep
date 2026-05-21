const KanbanBoard = {
  toDo: [],
  inProgress: [],
  done: [],
};

function addTask(title, description) {
  const task = { title, description };
  KanbanBoard.toDo.push(task);
}

function removeTask(title) {
  for (let column of ["toDo", "inProgress", "done"]) {
    const index = KanbanBoard[column].findIndex((task) => task.title === title);
    if (index !== -1) {
      KanbanBoard[column].splice(index, 1);
      return;
    }
  }
}

function moveTask(title, fromColum, toColum) {
  if (fromColum === toColum) {
    return;
  }

  const task = KanbanBoard[fromColum].find((task) => task.title === title);
  if (task) {
    const index = KanbanBoard[fromColum].indexOf(task);
    KanbanBoard[fromColum].splice(index, 1);
    KanbanBoard[toColum].push(task);
  }
}

function getTasks(column) {
  return KanbanBoard[column];
}

addTask("Task1", "this is the first task");
addTask("Task2", "This is the second task");

moveTask("Task1", "toDo", "inProgress");
console.log(getTasks("inProgress"));

removeTask("Task1");

console.log(getTasks("inProgress"));
