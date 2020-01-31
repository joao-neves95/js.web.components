/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

const todoListTemplate = `
<div id="todoList">
  <div class="input-wrapper">
    <form class="form-inline">

      <label for="new-todo-item">New Item:
          <input id="new-todo-item" class="form-control" name="new-todo-item" type="text" required />
      <label>
      <button (click)="addItem()"
              class="btn btn-success" type="button">
          Add Item
      </button>

    </form>
  </div>

  <div class="output-wrapper">
    <p>Todo Items: </p>
    <ul>

        <_for let="todoItem of state.todoItems">
            <li>
              <i (click)="toggleDone()"
                class="far fa-check-circle pointer">
              </i>
              <_>todoItem</_>
              <i (click)="removeItem()" class="far fa-trash-alt pointer"></i>
            </li>
        </_for>

    </ul>
  </div>
</div>
`;
