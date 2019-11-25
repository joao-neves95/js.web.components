
class ____HTMLBlocksCompiler {

  constructor() { }

  /**
   * Make sure to call this after "<_ or </_"
   * Returns [ innerIndex<number>, tag<string> ]
   * 
   * @param { string } template
   * 
   * @returns { [number, string] }
   */
  static getThisTag( template, innerIndex ) {
    let currentChar = '';
    let tag = '';

    do {
      currentChar = template[innerIndex];
      ++innerIndex;

      tag += currentChar;

    } while ( currentChar !== SYNTAX_TOKENS.CloseTag && currentChar !== ' ' && currentChar !== '=' );

    return [innerIndex, tag.substring( 0, tag.length - 1 )];
  }

  /**
   * Returns [ innerIndex<number>, property<object>,  ]
   * 
   * @param { Component } component
   * @param { number } innerIndex The index after "<_>" of "<_> propertyBlockContent </_>"
   * 
   * @returns { [number, object] }
   */
  static PROP( component, innerIndex ) {
    let thisProperty = '';
    let currentChar;

    while ( component.template[innerIndex] !== SYNTAX_TOKENS.OpenTag ) {
      currentChar = component.template[innerIndex];

      if ( currentChar !== ' ' ) {
        thisProperty += currentChar;
      }

      ++innerIndex;
    }

    // Jump to after the "</_>"
    innerIndex += 4;

    thisProperty = thisProperty.replace( /\s/g, '' );
    // In case its a nested property (part of an object).
    const splitedProperties = thisProperty.split( '.' );
    const isPropertyBinding = splitedProperties[0] === 'state';

    thisProperty = component;
    for ( let i = 0; i < splitedProperties.length; ++i ) {
      thisProperty = thisProperty[splitedProperties[i]];
    }

    if ( Utils.isNullOrUndefined( thisProperty ) ) {
      throw new Error(
        `Property "${splitedProperties.join( '.' )}" not defined in the component "${component.constructor.name}".`
      );
    }

    if ( isPropertyBinding ) {
      thisProperty = `<span data-component="${component.name}" data-binding="${splitedProperties[splitedProperties.length - 1]}"> ${thisProperty} </span>`;
    }

    return [innerIndex, thisProperty];
  }

  // TODO: THIS IS JUST AN IDEA. REFACTOR.  
  /** 
   *  Returns [iterationHook<string>, templateToRepeat<string>]
   *  
   * @param { string } forBlock
   * 
   * @return { [string, string] }
   */
  static FOR( forBlock ) {
    let iterationHook = '';

    let i;
    // GET ITERATION HOOK.
    for ( i = 0; i < forBlock.length; ++i ) {

      if ( forBlock[i] === 'l' && forBlock[i + 1] === 'e' && forBlock[i + 2] === 't' ) {
        // Jump to after the 'let="'.
        i += 5;

        while ( forBlock[i] !== '"' ) {
          iterationHook += forBlock[i];
          ++i;
        }

        // Jump to after the '">'
        i += 2;
        break;
      }
    }

    let templateToRepeat = '';

    for ( ; i < forBlock.length; ++i ) {
      templateToRepeat += forBlock[i];
    }

    return [iterationHook, templateToRepeat];
  }

  /** 
   * @param { string } ifBlock
   */
  static IF( ifBlock ) {
    return '';
  }

}
