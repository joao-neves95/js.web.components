/// <reference path="./utils.js" />
/// <reference path="./node_modules/js.system.collections/dist/js.system.collections.js" />

// TODO: Rebrand js.mvc to js.components

// TODO: Turn into a singleton.
class Startup {

  constructor() {
    this.components = new List();
  }
  constructor() {
    this.pages = [];
  }

  addComponent( component ) {
    this.components.add( component );
  }

  addPage() {}

  build() {
    // Single page.
    if ( Utils.isNullOrUndefined( window.startup ) ) {
      this.components.forEach( ( component ) => {
        const compiledHtml = TemplateCompiler.compile( component );

        Array.from( document.getElementsByTagName( component.targetElement ) ).forEach( ( elem ) => {
          elem.innerHTML = compiledHtml;
        } );
      } );

    // One page app.
    } else {}
  }

}
