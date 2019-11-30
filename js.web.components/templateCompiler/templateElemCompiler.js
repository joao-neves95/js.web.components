
/**
 * For <template compilation>.
 * This is used when there's property binding.
 */
class ____TemplateElemCompiler {
  constructor() { }

  /**
   * @param { string } propBlock
   */
  static PROP( propBlock ) {
    return '';
  }

  /**
   * @param { string } forBlock
   */
  static FOR( componentName, propertyToBind, iterationHook, templateToRepeat ) {

    let encodedForBlock = encodeURI(
      `<_for let="${iterationHook.join( ' ' )}">
          ${ templateToRepeat}
       </_for>
      `
    );

    return `
      <template data-component="${componentName}" data-binding="${propertyToBind}" data-token="${SYNTAX_TOKENS.For}">
        ${encodedForBlock}
      </template>
    `;
  }

  /**
   * @param { string } ifBlock
   */
  static IF( ifBlock ) {
    return '';
  }

}
