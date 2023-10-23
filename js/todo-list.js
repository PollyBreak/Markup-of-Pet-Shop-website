window.addEventListener('load',()=>{ //window - is an object represents a browser window
  //the 'load' event starts when the whole page has loaded

  const form = document.querySelector("#task-form"); //querySelector returns the first element with this selector
  const input = document.querySelector("#new-task");
  const listItem = document.querySelector("#tasks");

  form.addEventListener('submit',(e)=>{
    e.preventDefault(); //helps not to reload page after pressing the button
    const task = input.value;
    if (!task) {
      // alert('write a task');
    } else {
      const newTask = document.createElement("div");
      newTask.classList.add("todo"); //add class
      const newTaskContent = document.createElement("div");
      newTaskContent.classList.add("list-content");
      newTask.appendChild(newTaskContent); //add newTaskContent(div) into newTask(div)

      const newTaskInput = document.createElement('input');
      newTaskInput.classList.add('todo-text');
      newTaskInput.type = 'text';
      newTaskInput.value = task;
      newTaskInput.setAttribute('readonly', 'readonly');

      newTaskContent.appendChild(newTaskInput);

      const newTaskActions = document.createElement("div");
      newTaskActions.classList.add("todo-actions");
      const newTaskDelete = document.createElement("button");
      const newTaskEdit = document.createElement("button");
      const newTaskDone = document.createElement("button");

      newTaskEdit.classList.add("todo-edit");
      newTaskEdit.innerHTML="EDIT";

      newTaskDone.classList.add("todo-done");
      newTaskDone.innerHTML="DONE";

      newTaskDelete.classList.add("todo-delete");
      newTaskDelete.innerHTML="❌";

      newTaskActions.appendChild(newTaskEdit);
      newTaskActions.appendChild(newTaskDone);
      newTaskActions.appendChild(newTaskDelete);

      newTask.appendChild(newTaskActions);

      listItem.appendChild(newTask);
      input.value=""; //cleans input after adding a new task

      newTaskDelete.addEventListener('click', ()=>{
        listItem.removeChild(newTask);
      });

      newTaskEdit.addEventListener('click', ()=>{
        if (newTaskEdit.innerText === "EDIT") {
          newTaskEdit.innerText = "SAVE";
          newTaskInput.removeAttribute("readonly");
          newTaskInput.classList.add('editing');
          newTaskInput.focus(); //makes input active
        } else {
          newTaskEdit.innerText = "EDIT";
          newTaskInput.classList.remove('editing');
          newTaskInput.setAttribute("readonly", "readonly");
        }
      });

      newTaskDone.addEventListener('click', ()=>{
        if (newTaskDone.innerText === "DONE") {
          newTaskDone.innerText = "NOT DONE";
          newTaskDone.classList.add('not-done');
          newTaskInput.classList.add('done');
        } else {
          newTaskDone.innerText = "DONE";
          newTaskDone.classList.remove('not-done');
          newTaskInput.classList.remove('done');
        }
      })

    }
  });

  //handlers for already existing tasks:
  const deleteButtons = document.querySelectorAll(".todo-delete");
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const taskToDelete = button.closest('.todo');
      listItem.removeChild(taskToDelete);
    });
  });
  const editButtons = document.querySelectorAll(".todo-edit");
  editButtons.forEach((button) => {
    button.addEventListener('click', ()=> {
      const todoItem = button.closest('.todo');
      const todoText = todoItem.querySelector('.todo-text');
      if (button.innerText.toLowerCase() === "edit") {
        button.innerText = "SAVE";
        todoText.removeAttribute("readonly");
        todoText.classList.add('editing');
        todoText.focus();
      } else {
        button.innerText = "EDIT";
        todoText.classList.remove('editing');
        todoText.setAttribute("readonly", "readonly");
      }
    })
  });
  const doneButtons = document.querySelectorAll(".todo-done");
  doneButtons.forEach((button) => {
    button.addEventListener('click', ()=> {
      const todoItem = button.closest('.todo');
      const todoText = todoItem.querySelector('.todo-text');
      if (button.innerText === "DONE") {
        button.innerText = "NOT DONE";
        button.classList.add('not-done');
        todoText.classList.add('done');
      } else {
        button.innerText = "DONE";
        button.classList.remove('not-done');
        todoText.classList.remove('done');
      }
    })
  });

});
