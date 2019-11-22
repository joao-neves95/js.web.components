// At the end refactor all of this.

class TemplateCompiler {
  constructor() {

    this.compiledHtml;

    this.innerIndex;
    this.currentChar;
    this.currentSymbol;
    this.currentBlock;
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
    this.compiledHtml = '';

    for ( let i = 0; i < component.template.length; ++i ) {
      this.currentChar = component.template[i];

      if ( this.currentChar === SYNTAX_TOKENS.OpenTag && component.template[i + 1] === SYNTAX_TOKENS.SyntaxTagToken ) {

        // TODO: Change to acomodate the new syntax: "app-<someName>&"
        if ( component.template[i + 1] === SYNTAX_TOKENS.ComponentRef ) {
          this.innerIndex = i + 2;
          // TODO: Check in the startup instance if the component has already been compiled.
          // If not, compile it.

        } else if ( component.template[i + 2] === SYNTAX_TOKENS.CloseTag ) {
          // VALUES RENDERER.
          // TODO: (VALUES RENDERER) Add property binding.
          // Jump this tokens (after "<_>").
          this.innerIndex = i + 3;

          const propResponse = ____HTMLBlocksCompiler.PROP( component, this.innerIndex );
          this.innerIndex = propResponse[0];
          this.compiledHtml += propResponse[1];

        // COMPLEX TAGS COMPILER.
        } else {
          // The index after in "<_".
          this.innerIndex = i + 2;
          const tagResponse = ____HTMLBlocksCompiler.getThisTag( component.template, this.innerIndex );
          this.innerIndex = tagResponse[0];
          this.currentSymbol = tagResponse[1];
          this.currentBlock = this.____private.getThisComplexBlock( SYNTAX_TOKENS.For, component.template );

          switch ( this.currentSymbol ) {
            case SYNTAX_TOKENS.For:
              console.log( 'FOR block' );
              const forBlockResponse = ____HTMLBlocksCompiler.FOR( this.currentBlock );
              this.innerIndex += this.currentBlock.length;

              console.log( 'Iteration Hook:', forBlockResponse[0] );
              console.log( 'Template to Repeat:', forBlockResponse[1] );
              break;

            case SYNTAX_TOKENS.If:
              // this.compiledHtml += ____HTMLBlocksCompiler.IF( thisBlock );
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


    if ( !startup.recompileComponents || startup.pages.length <= 0 ) {
      component.template = null;
      component.____private.compiledHtml = compiledHtml;
    }

    return compiledHtml;
  }

  // #endregion COMPILE

  // #region PRIVATE METHODS

  /**
   * Internal methods.
   * This methods use and change "this.currentChar" and "this.innerIndex".
   */
  static get ____private() {
    return {
      /**
       * Get the value inside a complex template tag.
       * Make sure to call this in the index of "<" in "<_".
       * @param { string } template
       */
      getThisComplexBlock: ( TAG_SYNTAX_TOKEN, template ) => {
        let thisBlock = '';
        let tagResponse;
        let closeToken = null;

        let blockEnded = false;
        while ( !blockEnded ) {

          if ( template[this.innerIndex] === SYNTAX_TOKENS.OpenTag &&
               template[this.innerIndex + 1] === SYNTAX_TOKENS.ClosingTag &&
               template[this.innerIndex + 2] === SYNTAX_TOKENS.SyntaxTagToken &&
               template[this.innerIndex + 3] !== SYNTAX_TOKENS.CloseTag
          ) {
            this.innerIndex += 3;

            tagResponse = ____HTMLBlocksCompiler.getThisTag( template, this.innerIndex );
            closeToken = tagResponse[1];

            if ( closeToken === TAG_SYNTAX_TOKEN ) {
              blockEnded = true;
              this.innerIndex = tagResponse[0];
            }

          } else {
            thisBlock += template[this.innerIndex];
            ++this.innerIndex;
          }
        }

        return thisBlock;
      }
    };
  }

  // #endregion PRIVATE METHODS

} // end of class
