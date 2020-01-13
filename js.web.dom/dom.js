/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */



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
