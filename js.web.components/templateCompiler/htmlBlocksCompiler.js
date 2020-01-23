/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

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
      tag += currentChar;
      ++innerIndex;

    } while ( currentChar !== SYNTAX_TOKENS.CloseTag && currentChar !== ' ' && currentChar !== '=' );

    return [innerIndex, tag.substring( 0, tag.length - 1 )];
  }

  /**
   * Call this on the '(' index of the event property.
   *
   * Returns [ innerIndex<number>, methodCallOnEvent<MethodCallOnEvent>, compiledEventPropertyHTML<string> ]
   *
   * @param { Component } component
   * @param { number } innerIndex The index of '(' of '(<event-name>)="<property-name>" '
   *
   * @returns { [number, MethodCallOnEvent, string] }
   */
  static EVENT( component, innerIndex ) {
    // Just as a precaution.
    if (component.template[innerIndex] != SYNTAX_TOKENS.OpenEventTag) {
      throw new Error( `Expected an open event token "${SYNTAX_TOKENS.OpenEventTag}" on the the template of the component "${component.name}"` );

    } else {
      ++innerIndex;
    }

    let thisEventName = '';

    do {
      thisEventName += component.template[innerIndex];
      ++innerIndex;

      if ( innerIndex > component.template.length ) {
        throw new Error( `COMPILATION ERROR: Could not find the event name on the template of the component "${component.name}".\n
        This is most likely a syntax error. The close event token "${SYNTAX_TOKENS.CloseEventTag}" was not found.` );
      }

    } while ( component.template[innerIndex] !== SYNTAX_TOKENS.CloseEventTag );

    // Jump to '"' of '(<event-name>)="'
    innerIndex += 2;

    if ( component.template[innerIndex] !== '"' ) {
      throw new Error( `COMPILATION ERROR: Could not find the '"' token on the template of the component "${component.name}".\n
      This is most likely a syntax error on the event property.` );

    } else {
      ++innerIndex;
    }

    let thisMethodName = '';

    do {
      thisMethodName += component.template[innerIndex];
      ++innerIndex;

      if ( innerIndex > component.template.length ) {
        throw new Error( `COMPILATION ERROR: Could not find the method name to call on the template of the component "${component.name}".\n
This is most likely a syntax error on the event property. The method call token ('(') was not found.` );
      }

    } while ( component.template[innerIndex] !== '(' )

    innerIndex += 3;
    const thisUniqueId = Utils.randomAlphaNumStr( 6 );

    return [
      innerIndex,
      new MethodCallOnEvent(
        thisUniqueId,
        thisEventName,
        thisMethodName,
        EventType.DOM
      ),
      ` ${ DATA_SET_TAGS.EventMethodCall_Prefixed() }="${ thisUniqueId }" ${ DATA_SET_TAGS.EventMethodToCall_Prefixed() }="${ thisMethodName }" `
    ];
  }

  /**
   * Returns [ innerIndex<number>, property<object>,  ]
   *
   * @param { Component } component
   * @param { number } innerIndex The index after "<_>" of "<_> propertyBlockContent </_>"
   *
   * @returns { [number, object] }
   */
  static PROP( component, innerIndex, ignorePropertyBinding = false ) {
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
    innerIndex += 3;

    thisProperty = thisProperty.replace( /\s/g, '' );
    // In case its a nested property (part of an object).
    const splitedProperties = thisProperty.split( '.' );
    const isPropertyBinding = splitedProperties[0] === 'state' && !ignorePropertyBinding;

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
      thisProperty = `
        <span
          ${ DATA_SET_TAGS.Component_Prefixed() }="${ component.name }"
          ${ DATA_SET_TAGS.BindingTo_Prefixed() }="${ splitedProperties[splitedProperties.length - 1] }"
          data-token="${ SYNTAX_TOKENS.SyntaxTagToken }">

          ${thisProperty}
        </span>
      `;
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
