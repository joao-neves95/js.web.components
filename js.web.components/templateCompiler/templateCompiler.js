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
   */
  static compile( startup, component ) {

    for ( let i = 0; i < component.template.length; ++i ) {
      this.currentChar = component.template[ i ];

      if ( this.currentChar !== SYNTAX_TOKENS.OpenTag && component.template[i + 1] !== SYNTAX_TOKENS.SyntaxTagToken ) {
        // Normal HTML.
        this.compiledHtml += this.currentChar;

      } else {
        // TODO: Turn this first if block into an independent method to be reusable.

        // VALUES RENDERER.
        // TODO: (VALUES RENDERER) Add property binding.
        if ( component.template[i + 2] === SYNTAX_TOKENS.CloseTag ) {
          // Jump this tokens (after "<_>").
          this.innerIndex = i + 3;

          while ( this.currentChar !== SYNTAX_TOKENS.OpenTag ) {
            this.currentChar = component.template[ this.innerIndex ];
            this.currentProperty += this.currentChar;
            ++this.innerIndex;
          }

          // PROPERTY ACCESSOR
          this.currentProperty = this.currentProperty.replace( /\s/g, '' );
          // In case its a nested property (part of an object).
          const splitedProperties = this.currentProperty.split( '.' );

          this.currentProperty = component;
          for ( let iProp; iProp < splitedProperties.length; ++iProp ) {
            this.currentProperty = this.currentProperty[splitedProperties[i]];
          }

          if ( !Utils.isNullOrUndefined( this.currentProperty ) ) {
            this.compiledHtml += component[ this.currentProperty ];

          } else {
            throw new Error(
              `Property "${splitedProperties.join( '.' )}" not defined in the component "${component.constructor.name}".`
            );
          }

        // COMPLEX TAGS COMPILER.
        } else {
          // The index of "<" in "<_".
          this.innerIndex = i;
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
      tag += this.currentChar;
      ++this.innerIndex;
    }

    return tag;
  },

  /**
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
