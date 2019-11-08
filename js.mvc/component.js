
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
  constructor( targetElement, templatePath, stylePaths ) {

    this.targetElement = targetElement;

    this.templatePath = templatePath;

    this.stylePaths = stylePaths;

  }

}
