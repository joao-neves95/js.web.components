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
