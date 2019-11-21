
class ____HTMLBlocksCompiler {

  constructor() { }

  /**
   * Returns [ innerIndex<number>, property<object> ]
   * @param { Component } component
   * @param { number } innerIndex The index after "<_>" of "<_> propertyBlockContent </_>"
   * 
   * @returns { object }
   */
  static PROP( component, innerIndex ) {
    let thisProperty = '';
    let currentChar;

    do {
      currentChar = component.template[innerIndex];
      ++innerIndex;

      if ( currentChar === ' ' ) {
        continue;

      } else {
        thisProperty += currentChar;
      }

    } while ( component.template[innerIndex + 1] !== SYNTAX_TOKENS.OpenTag );

    // Jump to after the "</_>"
    innerIndex += 4;

    thisProperty = thisProperty.replace( /\s/g, '' );
    // In case its a nested property (part of an object).
    const splitedProperties = thisProperty.split( '.' );

    thisProperty = component;
    for ( let i = 0; i < splitedProperties.length; ++i ) {
      thisProperty = thisProperty[splitedProperties[i]];
    }

    if ( Utils.isNullOrUndefined( thisProperty ) ) {
      throw new Error(
        `Property "${splitedProperties.join( '.' )}" not defined in the component "${component.constructor.name}".`
      );
    }

    return [innerIndex, thisProperty];
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
