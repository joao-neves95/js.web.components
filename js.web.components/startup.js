/// <reference path="./utils.js" />
/// <reference path="./node_modules/js.system.collections/dist/js.system.collections.js" />


class Startup {

  constructor() {

    this.recompileComponents = false;

    this.components = new List();
    this.pages = [];
  }

  addComponent( component ) {
    this.components.add( component );
  }

  addPage() {}

  build() {
    // Single page.
    if ( this.pages.length <= 0 ) {
      this.components.forEach( ( component ) => {
        const compiledHtml = TemplateCompiler.compile( this, component );

        Array.from( document.getElementsByTagName( component.targetElement ) ).forEach( ( elem ) => {
          elem.innerHTML = compiledHtml;
        } );
      } );

    // One page app.
    } else {
      // TODO: One page build logic.
    }
  }

}
