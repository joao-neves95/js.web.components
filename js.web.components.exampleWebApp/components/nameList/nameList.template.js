﻿/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

const nameListTemplate = `
<div class="container">
    <ul>
        <_for let="person of names">
            <li> <_>person</_> </li>
        </_for>
    </ul>
</div>

<div class="container">
    <label>New Item:
        <input id="new-todo-item" name="new-todo-item" type="text" required />
    <label>
    <button (click)="addItem()"
            class="btn btn-success" type="button">
        Add Item
    </button>
</div>

<div class="container">
    <ul>
        <_for let="todoItem of state.todoItems">
            <li> <_>todoItem</_> </li>
        </_for>
    </ul>
</div>

`;
