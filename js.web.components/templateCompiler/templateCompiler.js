// At the end refactor all of this.

class TemplateCompiler {
  constructor() {

    this.compiledHtml = '';

    this.innerIndex = 0;
    this.currentChar = '';
    this.currentSymbol = '';
    this.currentBlock = '';
    this.currentProperty = '';
  }

  // #region COMPILE

  // TODO: Break this up into multiple methods (not static).
  /**
   *
   * @param { Startup } startup
   * @param { Component } component
   * 
   * @return { string } The compiled HTML
   */
  static compile( startup, component ) {

    for ( let i = 0; i < component.template.length; ++i ) {
      this.currentChar = component.template[ i ];

      if ( this.currentChar === SYNTAX_TOKENS.OpenTag && ( component.template[i + 1] === SYNTAX_TOKENS.SyntaxTagToken || component.template[i + 1] === SYNTAX_TOKENS.ComponentRef ) ) {

        if ( component.template[i + 1] === SYNTAX_TOKENS.ComponentRef ) {
          this.innerIndex = i + 2;
          this.currentSymbol = this.____private.getThisTag( component.template );
          // Check in the startup instance if the component has already been compiled.
          // If not, compile it.

        } else if ( component.template[i + 2] === SYNTAX_TOKENS.CloseTag ) {
          // VALUES RENDERER.
          // TODO: (VALUES RENDERER) Add property binding.
          // Jump this tokens (after "<_>").
          this.innerIndex = i + 3;

          while ( this.currentChar !== SYNTAX_TOKENS.OpenTag ) {
            this.currentChar = component.template[this.innerIndex];

            if ( this.currentChar === ' ' ) {
              continue;
            }

            this.currentProperty += this.currentChar;
            ++this.innerIndex;
          }

          this.currentProperty += ____HTMLBlocksCompiler.currentProperty( component, this.currentProperty );

          if ( !Utils.isNullOrUndefined( this.currentProperty ) ) {
            this.compiledHtml += component[ this.currentProperty ];

          } else {
            throw new Error(
              `Property "${splitedProperties.join( '.' )}" not defined in the component "${component.constructor.name}".`
            );
          }

        // COMPLEX TAGS COMPILER.
        } else {
          // The index after in "<_".
          this.innerIndex = i + 2;
          this.currentSymbol = this.____private.getThisTag( component.template );
          this.currentBlock = this.____private.getThisComplexBlock( component.template );

          switch ( this.currentSymbol ) {
            case SYNTAX_TOKENS.For:
              this.compiledHtml += ____HTMLBlocksCompiler.FOR( thisBlock );
              break;

            case SYNTAX_TOKENS.If:
              this.compiledHtml += ____HTMLBlocksCompiler.IF( thisBlock );
              break;

            default:
              throw new Error(
                `Unknown symbol "${SYNTAX_TOKENS.OpenTag}${SYNTAX_TOKENS.SyntaxTagToken}${this.currentSymbol}" on the template of the component "${component.constructor.name}".`
              );
          }
        }

        // Advance forward.
        i = this.innerIndex;

      } else {
        // Normal HTML.
        this.compiledHtml += this.currentChar;
      }

    } // end of FOR.

    // This is because, in the future, this class will not be static.
    const compiledHtml = this.compiledHtml;
    this.compiledHtml = '';
    this.innerIndex = 0;
    this.currentChar = '';
    this.currentSymbol = '';
    this.currentBlock = '';
    this.currentProperty = '';

    if ( !startup.recompileComponents || startup.pages.length <= 0 ) {
      component.template = null;
      component.____private.this.compiledHtml = compiledHtml;
    }

    return compiledHtml;
  }

  // #endregion COMPILE

}

// #region PRIVATE METHODS

/**
 * Internal methods.
 * This methods use and change "this.currentChar" and "this.innerIndex".
 */
TemplateCompiler.prototype.____private = {

 /**
  * Make sure to call this after "<_ or </_"
  * @param { string } template
  */
  getThisTag: ( template ) => {
    let tag = '';

    while ( this.currentChar !== SYNTAX_TOKENS.CloseTag ) {
      this.currentChar = template[this.innerIndex];

      if ( this.currentChar === ' ' ) {
        continue;
      }

      tag += this.currentChar;
      ++this.innerIndex;
    }

    return tag;
  },

  /**
   * Get the value inside a complex template tag.
   * Make sure to call this in the index of "<" in "<_".
   * @param { string } template
   */
  getThisComplexBlock: ( template ) => {
    let thisBlock = '';
    let closeToken = '';

    let blockEnded = false;
    while ( !blockEnded ) {
      this.currentChar = template[this.innerIndex];
      thisBlock += this.currentChar;
      ++this.innerIndex;

      if ( this.currentChar === SYNTAX_TOKENS.OpenTag &&
           component.template[this.innerIndex + 1] === SYNTAX_TOKENS.ClosingTag &&
           component.template[this.innerIndex + 2] === SYNTAX_TOKENS.SyntaxTagToken
      ) {
        closeToken = this.getThisTag( component.template );

        if ( closeToken === SYNTAX_TOKENS.For ) {
          blockEnded = true;
        }
      }

      return thisBlock;
    }
  }

};

// #endregion PRIVATE METHODS
