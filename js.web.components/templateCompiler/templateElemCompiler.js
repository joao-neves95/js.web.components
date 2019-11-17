
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
  static FOR( forBlock ) {

    /** @type { HTMLTemplateElement } */
    const template = this.____private.createTemplate();
    template.id = '';
    template.innerHTML = '';

    return '';
  }

  /** 
   * @param { string } ifBlock
   */
  static IF( ifBlock ) {
    return '';
  }

}

____TemplateElemCompiler.prototype.____private = {

  createTemplate: () => {
    return document.createElement( 'template' );
  }

}
