/* eslint-dsibale no-loop-func, no-func-assign, no-class-assign */
import deleteAnItem from './deleteTodoListItems.js';
import addAnItem from './addTodoList.js';
import updTodo from './updateTodoList.js';
import checkTodo from './checkTodoList.js';
import clearAllCompleted from './clearAllCompletedTodos.js';

const addInput = document.querySelector('.todo-input');
let todos = localStorage.getItem('todos') !== null ? JSON.parse(localStorage.getItem('todos')) : [];
let index = todos.length;
const todoDiv = document.querySelector('.todo-list');
const clearBtn = document.querySelector('.clear-button');

const render = () => {
  if (todos !== null) {
    todoDiv.innerHTML = '';
    todos.forEach((todo) => {
      const check = todo.completed === true ? 'checked' : '';
      todoDiv.innerHTML += `
        <div class="todos">
          <input type="checkbox" class="todo-check" value="${todo.completed}" ${check}>
          <input type="text" class="todo-desc clear-border" value="${todo.desc}">
          <i class="fa-solid fa-bars"></i>
          <button type="button" class="trash-btn"><i class="fa fa-trash"></i></button>
        </div>
      `;
    });
  }
  for (let i = 0; i < todoDiv.querySelectorAll('.todos').length; i += 1) {
    //  update checked status
    const todoRow = todoDiv.querySelectorAll('.todos')[i];
    // eslint-disable-next-line no-loop-func
    todoRow.querySelector('.todo-check').addEventListener('click', () => {
      const result = checkTodo(i, todos);
      localStorage.setItem('todos', JSON.stringify(result));
      render();
    });

    //  change color and icon on input focus

    todoRow.addEventListener('focusin', () => {
      todoRow.classList.add('active');
      todoRow.querySelector('.todo-desc').classList.add('active');
      todoRow.querySelector('.trash-btn').style.display = 'block';
      todoRow.querySelector('.fa-bars').style.display = 'none';
    });

    // eslint-disable-next-line no-loop-func
    todoRow.querySelector('.trash-btn').addEventListener('click', () => {
      const updTodo = deleteAnItem(i, todos);
      for (let a = i; a < updTodo.length; a += 1) {
        updTodo[a].index -= 1;
      }
      index -= 1;
      localStorage.setItem('todos', JSON.stringify(updTodo));
      render();
    });

    todoRow.addEventListener('focusout', (e) => {
      const parent = todoRow;
      const leavingParent = !parent.contains(e.relatedTarget);
      if (leavingParent) {
        todoRow.classList.remove('active');
        todoRow.querySelector('.todo-desc').classList.remove('active');
        todoRow.querySelector('.fa-bars').style.display = 'flex';
        todoRow.querySelector('.trash-btn').style.display = 'none';
      }
    });
    //  update description
    // eslint-disable-next-line no-loop-func
    todoRow.querySelector('.todo-desc').addEventListener('change', (e) => {
      const result = updTodo(i, todos, e.target.value);
      localStorage.setItem('todos', JSON.stringify(result));
    });
  }
};
addInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    if (addInput.value !== '') {
      const todoVal = addInput.value;
      addInput.value = '';
      index += 1;
      const updTodo = addAnItem({ index, desc: todoVal, completed: false }, todos);
      localStorage.setItem('todos', JSON.stringify(updTodo));
      render();
    }
  }
});

clearBtn.addEventListener('click', () => {
  /* eslint-disable prefer-const */
  todos = clearAllCompleted(todos);
  index = todos.length;
  localStorage.setItem('todos', JSON.stringify(todos));
  render();
});

window.onload = render();