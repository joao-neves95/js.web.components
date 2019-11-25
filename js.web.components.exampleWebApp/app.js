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
