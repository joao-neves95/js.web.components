class TemplateCompiler {
  constructor() {}

  // TODO: Break this up into multiple methods (not static).
  /**
   *
   * @param { Startup } startup
   * @param { Component } component
   */
  static compile( startup, component ) {
    let compiledHtml = '';

    let innerIndex;
    let currentChar = '';
    let currentSymbol;
    let currentProperty;

    for ( let i = 0; i < component.template.length; ++i ) {
      currentSymbol = '';
      currentProperty = '';
      currentChar = component.template[ i ];

      if ( currentChar !== SYNTAX_TOKENS.OpenTag && component.template[i + 1] !== SYNTAX_TOKENS.SyntaxTagToken ) {
        compiledHtml += currentChar;

      } else {
        // TODO: Turn this first if block into an independent method to be reusable.

        // VALUES RENDERER.
        if ( component.template[i + 2] === SYNTAX_TOKENS.CloseTag ) {
          // Jump this tokens.
          innerIndex = i + 3;

          while ( currentChar !== SYNTAX_TOKENS.OpenTag ) {
            currentChar = component.template[ innerIndex ];
            currentProperty += currentChar;
            ++innerIndex;
          }

          // PROPERTY ACCESSOR
          // In case its a nested property (part of an object).
          const splitedProperties = currentProperty.split( '.' );

          currentProperty = component;
          for ( let iProp; iProp < splitedProperties.length; ++iProp ) {
            currentProperty = currentProperty[splitedProperties[i]];
          }

          if ( !Utils.isNullOrUndefined( currentProperty ) ) {
            compiledHtml += component[ currentProperty ];

          } else {
            throw new Error(
              `Property "${splitedProperties.join( '.' )}" not defined in the component "${component.constructor.name}".`
            );
          }

        // COMPLEX TAGS COMPILER.
        } else {
          // Jump this tokens (complex tag).
          innerIndex = i + 2;

          while ( currentChar !== SYNTAX_TOKENS.CloseTag ) {
            currentChar = component.template[ innerIndex ];
            currentSymbol += currentChar;
            ++innerIndex;
          }

          switch ( currentSymbol ) {
            case SYNTAX_TOKENS.For:
              break;

            case SYNTAX_TOKENS.If:
              break;

            default:
              throw new Error(
                `Unknown symbol "${SYNTAX_TOKENS.OpenTag}${SYNTAX_TOKENS.SyntaxTagToken}${currentSymbol}" on the template of the component "${component.constructor.name}".`
              );
          }

        }

        // Advance forward.
        i = innerIndex;
      }

    }

    if ( !startup.recompileComponents || startup.pages.length <= 0 ) {
      component.template = null;
      component.____private.compiledHtml = compiledHtml;
    }

    return compiledHtml;
  }

}
