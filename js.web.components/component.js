
class Component {

  /**
   * Events:
   * <void> onInit()
   * <void> onDestroy()
   *
   * @param { string } name The name of the component. To render this component, use a reference to this name ("&component-name").
   * @param { string } template The template.
   * @param { string | string[] } stylesheet The stylesheet string, or an array, to inject on the component.
   */
  constructor( name, template, stylesheet ) {

    if ( Utils.isNullOrUndefinedOrEmptyStr( name ) ) {
      throw new Error( 'You must provide a component name.' );
    }

    // TODO: Add an underscore to internal properties.
    this.name = name;

    this.template = template;

    this.stylesheet = stylesheet;

    this.state = null;

    this.____private = {
      /** 
       *  type { string | null }
       *  @type { string | null }
       */
      compiledHtml: null
    };

  }

  createState = ( stateObj ) => {
    const thisComponent = this;

    return new Proxy( stateObj, {
      set( target, property, value ) {
        target[property] = value;
        document.querySelector( `[data-component="${thisComponent.name}"][data-binding="${property}"]` ).innerHTML = thisComponent.state[property];

        return true;
      }
    } );
  }

}
