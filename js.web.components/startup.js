﻿/// <reference path="./node_modules/js.system.collections/dist/js.system.collections.js" />

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
      this.components.add( components[i].name, components[i] );
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
            document.body.insertAdjacentHTML( 'beforeend', component.____private.templatesToInject[i] );

            Array.from( document.querySelectorAll( `template[${DATA_SET_TAGS.Component_Prefixed}="${component.name}"]` ) ).forEach( ( template ) => {

              component.____private.subToCustomStateChange( template.dataset.binding, ( property, value ) => {
                /** @type { Component } */
                const innerComponent = Object.assign( {}, component );

                Array.from( document.querySelectorAll( `span[${DATA_SET_TAGS.Component_Prefixed}="${component.name}"][${DATA_SET_TAGS.BindingTo_Prefixed}="${property}"]` ) )
                  .forEach( ( elem ) => {
                    innerComponent.template = decodeURI( template.innerHTML );
                    elem.innerHTML = TemplateCompiler.compile( innerComponent );
                  } );
              } );

            } );

          }

          component.____private.templatesToInject = [];

          let thisMethodCall;
          for ( i = 0; i < component.____private.methodCallsOnEvents.length; ++i ) {
            /** @type { MethodCallOnEvent } */
            thisMethodCall = component.____private.methodCallsOnEvents[i];

            document.querySelector( `[${ DATA_SET_TAGS.EventMethodCall_Prefixed }="${ thisMethodCall.identifier }"]` )
              .addEventListener( thisMethodCall.eventName, ( e ) => {
                component[ e.target.dataset[ DATA_SET_TAGS.EventMethodToCall ] ]();
              });
          }

          component.____private.methodCallsOnEvents = [];
        }
      );

    // One page app.
    } else {
      // TODO: One page build logic.
    }

    window.startup = this;
  }

}
