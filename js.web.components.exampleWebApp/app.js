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
