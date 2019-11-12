class TemplateCompiler {
  constructor() {}

  // TODO: Break this up into multiple methods (not static).
  /**
   *
   * @param { Component } component
   */
  static compile( component ) {
    let compiledHtml = '';

    let innerIndex;
    let currentChar = '';
    let currentSymbol;
    let currentProperty;
    for ( let i = 0; i < component.template.length; ++i ) {
      currentSymbol = '';
      currentProperty = '';
      currentChar = component.template[ i ];

      if ( currentChar === '<' && component.template[ i + 1 ] === '_' ) {

        // TODO: Turn this first if block into an independent method to be reusable.
        // VALUES RENDERER.
        if ( component.template[ i + 2 ] === '>' ) {
          innerIndex = i + 3;

          while ( currentChar !== '<' ) {
            currentChar = component.template[ innerIndex ];
            currentProperty += currentChar;
            ++innerIndex;
          }

          // TODO: Use a more advanced reflexion. This will always give an error in case it's an object an not just a property.
          if ( !Utils.isNullOrUndefined( component[ currentProperty ] ) ) {
            compiledHtml += component[ currentProperty ];

          } else {
            // TODO: Add a not hardcoded solution.
            throw new Error( `Property "${currentProperty}" not defined in the component "${component.constructor.name}".` );
          }

        } else {
          innerIndex = i + 2;

          while ( currentChar !== '>' ) {
            currentChar = component.template[ innerIndex ];
            currentSymbol += currentChar;
            ++innerIndex;
          }

          switch (currentSymbol) {
            case 'for':
              break;

            default:
              // TODO: Add a not hardcoded solution.
              throw new Error( `Unknown symbol "<_${currentSymbol}>" on the template of the component "${component.constructor.name}".` );
          }

        }

        i = innerIndex;

      } else {
        compiledHtml += currentChar;
      }

    }
  }

}
