/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


class Component {

  /**
   * Events:
   * <void> afterRendered()
   *
   * @param { string } name The name of the component. To render this component, use a reference to this name ("&component-name").
   * @param { string } template The template.
   * @param { string | string[] } stylesheet The stylesheet string, or an array, to inject on the component.
   */
  constructor( name, template, stylesheet ) {

    if ( Utils.isNullOrUndefinedOrEmptyStr( name ) ) {
      throw new Error( 'You must provide a component name.' );
    }

    this._id = Utils.randomAlphaNumStr( 6 );

    // TODO: Add an underscore to internal properties.
    this.name = name;


    this.template = template;

    this.stylesheet = stylesheet;

    /**
     * @type { ProxyConstructor | null } */
    this.state = null;

    this.____private = {
      /**
       * type { MethodCallOnEvent[] }
       * @type { MethodCallOnEvent[] }
       */
      methodCallsOnEvents: [],

      /**
       *  type { string[] }
       *  @type { string[] }
       */
      templatesToInject: [],

      /**
       * Dictionary<property: string, Callbacks: List<Function>> of observer callbacks (functions) organized by properties
       * for complex elements.
       */
      customStateObservers: new Dictionary(),

      /**
       * @param { string } property property
       * @param { Function } Callback Callback( property, value )
       */
      subToCustomStateChange: ( property, Callback ) => {
        const callbacksIdx = this.____private.customStateObservers.findIndexOfKey( property );

        if ( !callbacksIdx ) {
          let newList = new List();
          newList.add( Callback );

          this.____private.customStateObservers.add( property, newList );

        } else {
          const callbackList = this.____private.customStateObservers.getByIndex( callbacksIdx );
          callbackList.add( Callback );
          this.____private.customStateObservers.updateByKey( property, callbackList );
        }

      }
    };

  }

  /**
   *
   * @param { object } stateObj
   * @param { string | null } arrayName For arrays you **must** specify the exact same name of the property that has the array, otherwise it can be null.
   */
  createState( stateObj, arrayName = null ) {
    const thisComponent = this;

    return new Proxy( stateObj, {
      set( target, property, value, receiver ) {
        target[property] = value;

        if ( Array.isArray( target ) ) {
          if ( !arrayName ) {
            throw new Error( `You must specify the array name to create a state. In the component "${thisComponent.name}"` );
          }

          property = arrayName;
        }

        const element = document.querySelector( `[data-component="${thisComponent.name}"][data-binding="${property}"]` );

        if ( element.dataset.token === SYNTAX_TOKENS.SyntaxTagToken ) {
          element.innerHTML = thisComponent.state[property];

        } else {
          const callbackList = thisComponent.____private.customStateObservers.getByKey( property );

          if ( !callbackList ) {
            return true;

          } else {
            callbackList.forEach( ( Callback ) => {
              Callback( property, value );
            } );
          }

        }

        return true;
      }
    } );
  }
}
