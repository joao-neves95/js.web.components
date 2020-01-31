/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class TodoListComponent extends Component {

  constructor() {
    super( 'app-todoList', todoListTemplate, [ '' ] );

    this.state = {
      todoItems: this.createState( [ 'Study', 'Learn data structures' ], 'todoItems' )
    };
  }

  addItem() {
    const input = document.getElementById( 'new-todo-item' ).value;

    if (input.length > 0) {
      this.state.todoItems.push( input );
    }

  }

  /**
   *
   * @param { Event } e
   * @ param { HTMLElement } e
   */
  toggleDone( e ) {
    if ( e.target.classList.contains( 'far' ) ) {
      e.target.classList.replace( 'far', 'fas' );

      console.log( e.target )

      e.target.parentElement.style.textDecoration = 'line-through';

    } else {
      e.target.classList.replace( 'fas', 'far' );
      e.target.parentElement.style.textDecoration = 'none';
    }

  }

  overDel( e ) {
    e.target.classList.replace( 'far', 'fas' );

    setTimeout( () => {
      e.target.classList.replace( 'fas', 'far' );
    }, 2000 );

  }

  removeItem( e ) {
    const itemIdx = this.state.todoItems.findIndex( val => val === e.target.parentElement.innerText.trim() );

    console.log(itemIdx)

    if ( itemIdx >= 0 ) {
      this.state.todoItems.splice( itemIdx, 1 );
    }

  }

}
