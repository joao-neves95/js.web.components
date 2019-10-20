

class Dom {

  /**
   * 
   * @param { string } query
   */
  static get( query ) {
    return document.querySelectorAll( query );
  }

  /**
   * 
   * @param { string } id
   */
  static getById( id ) {
    return document.getElementById( id );
  }

  /**
   * 
   * @param { string } className
   */
  static getByClass( className ) {
    return document.getElementsByClassName( className );
  }

  /**
   * 
   * @param { string } className
   */
  static getByClassFirst( className ) {
    return Dom.getByClass( className )[0];
  }

  /**
   * 
   * @param { HTMLElementTagNameMap } tagName
   */
  static getByTag( tagName ) {
    return document.getElementsByTagName( tagName );
  }

  /**
   * 
   * @param { string } tagName
   */
  static getByTagFirst( tagName ) {
    return Dom.getByTag( tagName )[0];
  }

  /**
   * 
   * @param { string } event
   * @param { HTMLElement } elem
   * @param { Function } eventHandler
   */
  static on( event, elem, eventHandler ) {
    elem.addEventListener( event, ( e ) => {
      return eventHandler( e );
    } );
  }

}
