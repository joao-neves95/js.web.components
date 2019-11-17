
class ____HTMLBlocksCompiler {

  constructor() { }

  /**
   * 
   * @param { Component } component
   * @param { string } propertyBlockContent The value inside "<_> propertyBlockContent </_>"
   * 
   * @returns { object }
   */
  static PROP( component, propertyBlockContent ) {
    propertyBlockContent = propertyBlockContent.replace( /\s/g, '' );
    // In case its a nested property (part of an object).
    const splitedProperties = this.currentProperty.split( '.' );

    propertyBlockContent = component;
    for ( let iProp; iProp < splitedProperties.length; ++iProp ) {
      propertyBlockContent = propertyBlockContent[splitedProperties[i]];
    }

    return propertyBlockContent;
  }

  /** 
   * @param { string } forBlock
   */
  static FOR( forBlock ) {
    return '';
  }

  /** 
   * @param { string } ifBlock
   */
  static IF( ifBlock ) {
    return '';
  }

}
