
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

    if ( Utils.isNullOrUndefinedOrEmptyStr( targetElement ) ) {
      throw new Error( 'You must provide a component name.' );
    }

    this.name = name;

    this.template = template;

    this.stylesheet = stylesheet;

    this.____private = {
      /** 
       *  type { string | null }
       *  @type { string | null }
       */
      compiledHtml: null
    };

  }

}
