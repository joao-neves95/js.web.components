/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

// @import<<DIR './viewModels'
// @import './components/sidenav/sidenav.template'
// @import './components/sidenav/sidenav.component'
// @import './components/header/header.template'
// @import './components/header/header.component'
// @import './components/nameList/nameList.template'
// @import './components/nameList/nameList.component'
// @import './components/stopwatch/stopwatch.template'
// @import './components/stopwatch/stopwatch.component'

'use strict';

/*
 * Copyright (c) 2019 Jo�o Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


class NavItemViewModel {

  constructor( label, url, ) {

    this.label = label;
    this.url = url;

  }

}

/*
 * Copyright (c) 2019 Jo�o Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


const sidenavTemplate = `
<aside>
    <nav class="nav nav-pills flex-column">

        <_for let="item of navItems">
            <a class="nav-link" href="<_> item.url </_>">
                <_> item.label </_>
            </a>
        </_for>

    </nav>
</aside>
`;

/*
 * Copyright (c) 2019 Jo�o Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


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

/*
 * Copyright (c) 2019 Jo�o Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


const stopwatchTemplate = `
<div>
    <p> <span id="hours">0</span>:<span id="minutes">0</span>:<span id="seconds">0</span> </p>
</div>

<div>
    <button (click)="startClock()" id="start">START</button>
    <button (click)="stopClock()" id="stop">STOP</button>
    <button (click)="restartClock()" id="restart">RESTART</button>
</div>
`;

/*
 * Copyright (c) 2019 Jo�o Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


class StopwatchComponent extends Component {

  constructor() {
    super( 'app-stopwatch', stopwatchTemplate, [ '' ] );

    this.____secondsInterval;
    this.____minutesInterval;
    this.____hoursInterval;

  }

  startClock() {
    // Seconds.
    this.____secondsInterval = setInterval( () => {
      const elem = document.getElementById( 'seconds' );
      let time = parseInt( elem.innerText );

      if ( time === 60 ) {
        time = -1;
      }

      elem.innerText = time + 1;

    }, 1000 );

    // Minutes.
    this.____minutesInterval = setInterval( () => {
      const elem = document.getElementById( 'minutes' );
      let time = parseInt( elem.innerText )

      if ( time === 60 ) {
        time = -1;
      }

      elem.innerText = time + 1;

    }, 1000 * 60 );

    // Hours.
    this.____hoursInterval = setInterval( () => {
      const elem = document.getElementById( 'hours' );
      let time = parseInt( elem.innerText );

      if ( time === 23 ) {
        time = -1;
      }

      elem.innerText = time + 1;

    }, 1000 * 60 * 60 );
  }

  stopClock() {
    clearInterval( this.____secondsInterval );
    clearInterval( this.____minutesInterval );
    clearInterval( this.____hoursInterval );
  }

  restartClock() {
    document.getElementById( 'seconds' ).innerText = 0;
    document.getElementById( 'minutes' ).innerText = 0;
    document.getElementById( 'hours' ).innerText = 0;
  }

}

