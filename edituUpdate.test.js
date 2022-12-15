/*
* @jest-environment jsdom
*/

import updateTodo from './src/modules/updateTodoList.js';
import clearAllCompleted from './src/modules/clearAllCompletedTodos.js';
import checkTodo from './src/modules/checkTodoList.js';

describe('todo functions UPDATE, CLEAR & CHECK', () => {
  test('update a todo', () => {
    const todos = [
      {
        desc: 'first',
        completed: false,
        index: 0,
      },
      {
        desc: 'second',
        completed: false,
        index: 1,
      },
    ];
    const i = 0;
    const result = updateTodo(i, todos, 'new');
    expect(result).toEqual([{ desc: 'new', completed: false, index: 0 }, { desc: 'second', completed: false, index: 1 }]);
    localStorage.setItem('todos', JSON.stringify(result));
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual(result);
    document.body.innerHTML = '';
    for (let i = 0; i < result.length; i += 1) {
      document.body.innerHTML += '<div class="works">'
        + '  <ul id="list"><li></li></ul>'
        + '</div>';
    }
    const list = document.querySelectorAll('.works');
    expect(list).toHaveLength(result.length);
  });

  test('check a todo', () => {
    const todos = [
      {
        desc: 'first',
        completed: false,
        index: 0,
      },
      {
        desc: 'second',
        completed: false,
        index: 1,
      },
    ];
    const i = 0;
    const result = checkTodo(i, todos);
    expect(result).toEqual([{ desc: 'first', completed: true, index: 0 }, { desc: 'second', completed: false, index: 1 }]);
    localStorage.setItem('todos', JSON.stringify(result));
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual(result);
    document.body.innerHTML = '';
    for (let i = 0; i < result.length; i += 1) {
      document.body.innerHTML += '<div class="works">'
        + '  <ul id="list"><li></li></ul>'
        + '</div>';
    }
    const list = document.querySelectorAll('.works');
    expect(list).toHaveLength(result.length);
  });

  test('clear all completed todos', () => {
    const todos = [
      {
        desc: 'first',
        completed: true,
        index: 1,
      },
      {
        desc: 'second',
        completed: false,
        index: 2,
      },
    ];
    const result = clearAllCompleted(todos);
    expect(result).toEqual([{ desc: 'second', completed: false, index: 1 }]);
    localStorage.setItem('todos', JSON.stringify(result));
    expect(JSON.parse(localStorage.getItem('todos'))).toEqual(result);
    document.body.innerHTML = '';
    for (let i = 0; i < result.length; i += 1) {
      document.body.innerHTML += '<div class="works">'
        + '  <ul id="list"><li></li></ul>'
        + '</div>';
    }
    const list = document.querySelectorAll('.works');
    expect(list).toHaveLength(result.length);
  });
});