/// <reference path="./node_modules/js.system.collections/dist/js.system.collections.js" />
/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class Startup {

  constructor() {

    this.recompileComponents = false;

    /** type Dictionary<Component>
     *  @type Dictionary<Component> */
    this.components = new Dictionary( true );

    /** @type { Page[] } */
    this.pages = [];

    return this;
  }

  alwaysRecompileComponents() {
    this.recompileComponents = true;
  }

  /**
   *
   * @param { Component } component
   */
  addComponent( component ) {
    this.components.add( component.name, component );
    return this;
  }

  /**
   *
   * @param { Component[] } components
   */
  addComponents( components ) {
    for ( let i = 0; i < components.length; ++i ) {
      this.components.add( components[ i ].name, components[ i ] );
    }
    return this;
  }

  /**
   *
   * @param { Page } page
   */
  addPage( page ) {
    return this;
  }

  build() {
    // Single page.
    if ( this.pages.length <= 0 ) {
      let thisCompiledHTML;

      this.components.forEachValue(
        /**
         * @param { Component } component
         */
        ( component ) => {
          thisCompiledHTML = TemplateCompiler.compile( component );

          Array.from( document.getElementsByTagName( component.name + SYNTAX_TOKENS.ComponentRef ) ).forEach( ( elem ) => {
            elem.innerHTML = thisCompiledHTML;
          } );

          let i;
          for ( i = 0; i < component.____private.templatesToInject.length; ++i ) {
            document.body.insertAdjacentHTML( 'beforeend', component.____private.templatesToInject[ i ] );
            this.____addEventListenersToMethodCalls( component );
            // To free after the initial compilation.
            this.____freeComponent( component );

            Array.from( document.querySelectorAll( `template[${DATA_SET_TAGS.Component_Prefixed()}="${component.name}"]` ) ).forEach( ( template ) => {

              // It was necessary to make an Observer out of the component, because components don't have access
              // to the TemplateCompiler.
              component.____private.subToCustomStateChange( template.dataset.binding, ( property, value ) => {
                // Create the same class type instance with all prototypes.
                let innerComponent = Object.create( component );
                // Assign all properties to the new instance.
                innerComponent = Object.assign( component );

                Array.from( document.querySelectorAll( `span[${DATA_SET_TAGS.Component_Prefixed()}="${innerComponent.name}"][${DATA_SET_TAGS.BindingTo_Prefixed()}="${property}"]` ) )
                  .forEach( ( elem ) => {
                    innerComponent.template = decodeURI( template.innerHTML );
                    elem.innerHTML = TemplateCompiler.compile( innerComponent );
                    this.____addEventListenersToMethodCalls( innerComponent );
                  } );

                // To free after custom changes.
                this.____freeComponent( component );
              } );

            } );

          }

        }
      );

      // One page app.
    } else {
      // TODO: One page build logic.
    }

    window.startup = this;
  }

  /**
   *
   * @param { MethodCallOnEvent } thisMethodCall
   */
  ____addEventListenersToMethodCalls( component ) {
    let thisMethodCall;
    let thisElem;
    for ( let i = 0; i < component.____private.methodCallsOnEvents.length; ++i ) {
      /** @type { MethodCallOnEvent } */
      thisMethodCall = component.____private.methodCallsOnEvents[ i ];
      thisElem = document.querySelector( `[${ DATA_SET_TAGS.EventMethodCall_Prefixed() }="${ thisMethodCall.identifier }"]` );

      if ( !thisElem ) {
        continue;
      }

      thisElem.addEventListener( thisMethodCall.eventName, ( e ) => {
        e.stopPropagation();
        const methodToCall = e.target.dataset[ DATA_SET_TAGS.EventMethodToCall() ];

        if ( !component[ methodToCall ] ) {
          throw new Error( `The method of the component "${component.name}" of name "${methodToCall}" not found. Method call ID: ${thisMethodCall.identifier}` );
        }

        component[ methodToCall ]( e );
        return false;
      } );
    }
  }

  /**
   *
   * @param { Component } component
   */
  ____freeComponent( component ) {
    component.____private.templatesToInject = [];
    component.____private.methodCallsOnEvents = [];
  }

}
