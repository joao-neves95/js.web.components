// @import './header/header.template'
// @import './header/header.component'
// @import './nameList/nameList.template'
// @import './nameList/nameList.component'

'use strict';


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


class HeaderComponent extends Component {

  constructor() {
    super( 'app-header', headerTemplate, [''] );

    this.title = 'My Website';

    this.state = this.createState( {
      myName: 'João Neves'
    } );
  }

}


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

