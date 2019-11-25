'use strict';

window.startup = new Startup()
  .addComponent( new HeaderComponent() )
  .addComponent( new NameListComponent() )
  .build();

startup.components.forEach(
  /**
   * @type { Component } component
   */
  ( component ) => {
    // State property binding test.
    if ( component.name === 'app-header' ) {
      component.state.myName = 'SHIVAYL';
    }
  }
);
