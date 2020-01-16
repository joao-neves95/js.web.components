/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


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
      <template
        ${ DATA_SET_TAGS.Component_Prefixed() }="${ componentName }"
        ${ DATA_SET_TAGS.BindingTo_Prefixed() }="${ propertyToBind }"
        data-token="${SYNTAX_TOKENS.For}"
      >
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
