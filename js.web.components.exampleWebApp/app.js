/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

'use strict';

new Startup()
  .addComponent( new HeaderComponent() )
  .addComponent( new NameListComponent() )
  .build();

/**
   * @type { Component | false } component
   */
const headerComponent = startup.components.getByKey( 'app-header' );

if ( headerComponent ) {
  headerComponent.state.myName = 'SHIVAYL';
}

const nameListComponent = startup.components.getByKey( 'app-nameList' );

if ( nameListComponent ) {
  nameListComponent.state.todoItems.push( 'Test for loops with property binding' );
}
