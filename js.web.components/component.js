
class Component {

  /**
   * Events:
   * <void> onInit()
   * <void> onDestroy()
   *
   * @param { string } targetElement The name of the element where the element should be appended.
   * @param { string } templatePath The path of the template.
   * @param { string[] } stylePaths An array of stylesheet file paths to inject on the component.
   */
  constructor( targetElement, template, stylePaths ) {

    this.targetElement = targetElement;

    this.template = template;

    this.stylePaths = stylePaths;

    this.____private = {
      /** 
       *  type { string | null }
       *  @type { string | null }
       */
      compiledHtml: null
    };

  }

}
