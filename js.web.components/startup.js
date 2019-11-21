/// <reference path="./node_modules/js.system.collections/dist/js.system.collections.js" />

class Startup {

  constructor() {

    this.recompileComponents = false;

    /** @type List<Component> */
    this.components = new List();

    /** @type { Page[] } */
    this.pages = [];

    return this;
  }

  alwaysRecompileComponents() {
    this.recompileComponents = true;
  }

  /**
   * 
   * @param { Component } component
   */
  addComponent( component ) {
    this.components.add( component );
    return this;
  }

  /**
   * 
   * @param { Component[] } components
   */
  addComponents( components ) {
    for ( let i = 0; i < components.length; ++i ) {
      this.components.add( components[i] );
    }
  }

  /**
   * 
   * @param { Page } page
   */
  addPage( page ) {
    return this;
  }

  build() {
    // Single page.
    if ( this.pages.length <= 0 ) {
      this.components.forEach( ( component ) => {
        const compiledHtml = TemplateCompiler.compile( this, component );

        Array.from( document.getElementsByTagName( component.name + SYNTAX_TOKENS.ComponentRef ) ).forEach( ( elem ) => {
          elem.innerHTML = compiledHtml;
        } );
      } );

    // One page app.
    } else {
      // TODO: One page build logic.
    }
  }

}
