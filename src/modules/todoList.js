/* eslint-dsibale no-loop-func, no-func-assign, no-class-assign */
import deleteAnItem from './deleteTodoListItems.js';
import addAnItem from './addTodoList.js';

const addInput = document.querySelector('.todo-input');
const todos = localStorage.getItem('todos') !== null ? JSON.parse(localStorage.getItem('todos')) : [];
let index = todos.length;
const todoDiv = document.querySelector('.todo-list');
// const clearBtn = document.querySelector('.clear-button');

const render = () => {
  if (todos !== null) {
    todoDiv.innerHTML = '';
    todos.forEach((todo) => {
      const check = todo.completed === true ? 'checked' : '';
      todoDiv.innerHTML += `
        <div class="todos">
          <input type="checkbox" class="todo-check " value="${todo.completed}" ${check}>
          <input type="text" class="todo-desc clear-border ${check}" value="${todo.desc}">
          <i class="fa-solid fa-bars"></i>
          <button type="button" class="trash-btn"><i class="fa fa-trash"></i></button>
        </div>
      `;
    });
  }
  for (let i = 0; i < todoDiv.querySelectorAll('.todos').length; i += 1) {
    // eslint-disable-next-line no-loop-func, no-undef
    todoRow.querySelector('.trash-btn').addEventListener('click', () => {
      const updTodo = deleteAnItem(i, todos);
      for (let a = i; a < updTodo.length; a += 1) {
        updTodo[a].index -= 1;
      }
      index -= 1;
      localStorage.setItem('todos', JSON.stringify(updTodo));
      render();
    });

    // eslint-disable-next-line no-loop-func, no-undef
    todoRow.addEventListener('focusout', (e) => {
      // eslint-disable-next-line no-undef
      const parent = todoRow;
      const leavingParent = !parent.contains(e.relatedTarget);
      if (leavingParent) {
        // eslint-disable-next-line no-undef
        todoRow.classList.remove('active');
        // eslint-disable-next-line no-undef
        todoRow.querySelector('.todo-desc').classList.remove('active');
        // eslint-disable-next-line no-undef
        todoRow.querySelector('.fa-bars').style.display = 'flex';
        // eslint-disable-next-line no-undef
        todoRow.querySelector('.trash-btn').style.display = 'none';
      }
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

window.onload = render();