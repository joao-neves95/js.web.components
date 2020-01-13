// TODO: In the future refactor all of this like the property and event compilation is organized.

class TemplateCompiler {
  constructor() { }

  // #region COMPILE

  /**
   *
   * @param { Startup } startup
   * @param { Component } component
   *
   * @return { string } The compiled HTML
   */
  static compile( component ) {
    let compiledHtml = '';
    let innerIndex = 0;
    let currentChar = '';
    let currentSymbol = '';
    let currentBlock = '';

    for ( let i = 0; i < component.template.length; ++i ) {
      currentChar = component.template[i];

      if ( currentChar === SYNTAX_TOKENS.OpenTag && component.template[i + 1] === SYNTAX_TOKENS.SyntaxTagToken ) {

        if ( component.template[i + 2] === SYNTAX_TOKENS.CloseTag ) {
          // VALUES COMPILER.
          // Jump this tokens (after "<_>").
          innerIndex = i + 3;

          const propResponse = ____HTMLBlocksCompiler.PROP( component, innerIndex );
          innerIndex = propResponse[0];
          compiledHtml += propResponse[1];

        // COMPLEX TAGS COMPILER.
        } else {
          // The index after in "<_".
          innerIndex = i + 2;
          const tagResponse = ____HTMLBlocksCompiler.getThisTag( component.template, innerIndex );
          innerIndex = tagResponse[0];
          currentSymbol = tagResponse[1];

          switch ( currentSymbol ) {

            // #region FOR

            case SYNTAX_TOKENS.For:
              let blockResponse = this.____private.getThisComplexBlock( SYNTAX_TOKENS.For, component.template, innerIndex );
              currentBlock = blockResponse[1];
              innerIndex = blockResponse[0];

              //                          (0)      (1)         (2)
              // (0) Iteration hook: " [variable] of/in [componentProperty] "
              // (1) Template to repeate example: " <li> <_> [variable] </_> </li> "
              blockResponse = ____HTMLBlocksCompiler.FOR( currentBlock );
              blockResponse[0] = blockResponse[0].split( ' ' );

              // TODO: Check for every built-in property of Component.
              if ( blockResponse[0][0] === 'name' ) {
                throw new Error(
                  `Atempt to use a variable name equal to a built in Component property ("${blockResponse[0][0]}") in the template of the component "${component.name}": "${blockResponse[0].join( ' ' )}"`
                );
              }

              /** @type { Component } */
              let innerComponent = Object.assign( {}, component );
              // The "<" token is a hack.
              innerComponent.template = blockResponse[0][2] + '<';
              const propValues = ____HTMLBlocksCompiler.PROP( innerComponent, 0, true )[1];

              const splitedProperties = blockResponse[0][2].split( '.' );
              const hasPropertyBinding = splitedProperties[0] === 'state';

              if ( hasPropertyBinding ) {
                component.____private.templatesToInject.push( ____TemplateElemCompiler.FOR( component.name, splitedProperties[splitedProperties.length - 1], blockResponse[0], blockResponse[1] ) );
                compiledHtml += `<span ${DATA_SET_TAGS.Component_Prefixed}="${component.name}" ${DATA_SET_TAGS.BindingTo_Prefixed}="${splitedProperties[splitedProperties.length - 1]}">`;
              }

              switch ( blockResponse[0][1] ) {
                case 'of':
                  innerComponent.template = blockResponse[1];

                  for ( const val of propValues ) {
                    innerComponent[blockResponse[0][0]] = val;
                    compiledHtml += TemplateCompiler.compile( innerComponent );
                  }

                  break;

                case 'in':
                  throw new Error( 'The "for in" loop NOT YET IMPLEMENTED.' );

                default:
                  throw new Error( `Unknown "for" statement: "${blockResponse[0]}"` );
              }

              compiledHtml += '</span>';

              break;

            // #endregion FOR

            case SYNTAX_TOKENS.If:
              throw new Error( `The "if" statement was NOT YET IMPLEMENTED.` );
              // compiledHtml += ____HTMLBlocksCompiler.IF( thisBlock );
              break;

            default:
              throw new Error(
                `Unknown symbol "${SYNTAX_TOKENS.OpenTag}${SYNTAX_TOKENS.SyntaxTagToken}${currentSymbol}" on the template of the component "${component.constructor.name}".`
              );
          }
        }

        // Advance forward.
        i = innerIndex;

      // EVENTS.
      } else if ( currentChar === SYNTAX_TOKENS.OpenEventTag ) {
        const eventResult = ____HTMLBlocksCompiler.EVENT( component, i );
        compiledHtml += eventResult[2];
        component.____private.methodCallsOnEvents.push( eventResult[1] );
        i = eventResult[0];

      } else {
        // Normal HTML.
        compiledHtml += currentChar;
      }

    } // end of FOR.

    return compiledHtml;
  }

  // #endregion COMPILE

  // #region PRIVATE METHODS

  /**
   * Internal methods.
   * This methods use and change "currentChar" and "innerIndex".
   */
  static get ____private() {
    return {
      /**
       * Get the value inside a complex template tag.
       * Make sure to call this in the index of "<" in "<_".
       *
       * Returns [ innerIndex: number, block: string ]
       *
       * @param { string } template
       *
       * @return { [number, string] }
       */
      getThisComplexBlock: ( TAG_SYNTAX_TOKEN, template, innerIndex ) => {
        let thisBlock = '';
        let tagResponse;
        let closeToken = null;

        let blockEnded = false;
        while ( !blockEnded ) {

          // "</_" && !"</_>"
          if ( template[innerIndex] === SYNTAX_TOKENS.OpenTag &&
               template[innerIndex + 1] === SYNTAX_TOKENS.ClosingTag &&
               template[innerIndex + 2] === SYNTAX_TOKENS.SyntaxTagToken &&
               template[innerIndex + 3] !== SYNTAX_TOKENS.CloseTag
          ) {
            innerIndex += 3;

            tagResponse = ____HTMLBlocksCompiler.getThisTag( template, innerIndex );
            closeToken = tagResponse[1];

            if ( closeToken === TAG_SYNTAX_TOKEN ) {
              blockEnded = true;
              innerIndex = tagResponse[0];
            }

          } else {
            thisBlock += template[innerIndex];
            ++innerIndex;
          }

          // Nothing found.
          if ( !template[innerIndex] ) {
            throw new Error( `Could not find the close tag of "<_${TAG_SYNTAX_TOKEN}>".
Probably a syntax error.
Template:
"${template}"` );
          }
        }

        return [innerIndex, thisBlock];
      }
    };
  }

  // #endregion PRIVATE METHODS

} // end of class
