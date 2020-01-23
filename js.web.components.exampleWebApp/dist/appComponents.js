/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

// @import<<DIR './viewModels'
// @import './sidenav/sidenav.template'
// @import './sidenav/sidenav.component'
// @import './header/header.template'
// @import './header/header.component'
// @import './nameList/nameList.template'
// @import './nameList/nameList.component'

'use strict';


class NavItemViewModel {

  constructor( label, url, ) {

    this.label = label;
    this.url = url;

  }

}


const sidenavTemplate = `
<aside>
    <nav class="nav flex-column">

        <_for let="item of navItems">
            <a class="nav-link active" href="<_> item.url </_>">
                <_> item.label </_>
            </a>
        </_for>

    </nav>
</aside>
`;


class SidenavComponent extends Component {

  constructor() {
    super( 'app-sidenav', sidenavTemplate, [''] );

    this.navItems = [
      new NavItemViewModel( 'Todo List', 'todo-list' ),
      new NavItemViewModel( 'Stopwatch', 'stopwatch' ),
      new NavItemViewModel( 'Documentation', 'documentation' )
    ];

  }

}

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


const headerTemplate = `
<div class="container">
    <h1> <_> title </_> </h1>
    <!-- DATA BINDING -->
    <p> <_> state.myName </_> </p>
</div>
`;

// RENDERED HTML
//
// <div class="container">
//     <h1> My Website </h1>
//     <!-- DATA BINDING -->
//     <p> <span data-component="app-header" data-binding="myName"> João Neves </span> </p>
// </div>
//

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


class HeaderComponent extends Component {

  constructor() {
    super( 'app-header', headerTemplate, [''] );

    this.title = 'My Website';

    this.state = this.createState( {
      myName: 'João Neves'
    } );
  }

}

/*
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

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


class NameListComponent extends Component {

  constructor() {
    super( 'app-nameList', nameListTemplate, [''] );

    this.names = ['John Doe', 'Oliver Hoe', 'Fiona Silva'];

    this.state = {
      todoItems: this.createState( ['Study', 'Learn design patterns', 'Learn data structures'], 'todoItems' )
    };
  }

  addItem() {
    this.state.todoItems.push( document.getElementById( 'new-todo-item' ).value );
  }

}

