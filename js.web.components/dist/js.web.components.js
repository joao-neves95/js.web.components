/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

// $import 'js.system.collections/dist/js.system.collections.js'
// @import<<DIR './constants'
// @import<<DIR './enums'
// @import<<DIR './models'
// @import './utils'
// @import './component'
// @import './page'
// @import './templateCompiler/templateElemCompiler'
// @import './templateCompiler/htmlBlocksCompiler'
// @import './templateCompiler/templateCompiler'
// @import './router'
// @import './startup'

'use strict';

/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

// Temporary.
// @import './lib/errors'
// @import './lib/collection'
// @import './lib/dictionary'
// @import './lib/list'

/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

try {
  'use strict';

} catch ( e ) {
  //;
}

class Errors {
  static get existingKey() { throw new Error( 'An item with the same key has already been added.' ); };

  static get noTypeProvided() { throw new Error( 'No type provided on Collection instantiation.' ) };

  static wrongType( type ) { throw new Error( `The value is not from the same type as the List<${type}>` ); };
}

try {
  module.exports = Errors;

} catch ( e ) {
  //;
}

/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

let ____errors0;

try {
  'use strict';
  ____errors0 = require( './errors' );

} catch ( e ) {
  ____errors0 = Errors;
}

class Collection {
  constructor( uniqueKeys = false, type = 'any' ) {
    this.elements = [];
    this.uniqueKeys = uniqueKeys;

    if ( !type ) throw ____errors0.noTypeProvided;
    this.type = type;
  }

  get length() {
    return this.elements.length;
  }

  get isEmpty() {
    return this.length <= 0;
  }

  /**
   * (private)
   */
  get __last() {
    return this.elements[this.length - 1];
  }

  /**
   * Get all elements from the Collection.
   * For Dictionary is best to use .getAllValues()
   * 
   * Returns elements[]
   */
  getAll() {
    return this.elements;
  }

  /**
   * Get an item from the Collection by index.
   * In of beeing a Dictionary it will retun an object containing the key and value ( { key: value } )
   * 
   * @param { number } index
   */
  get( index ) {
    return this.elements[index];
  }

  /**
   * Remove all elements from the Collection.
   */
  clear() {
    this.elements = [];
  }

  removeFirst() {
    this.____splice( 0 );
  }

  removeLast() {
    this.____splice( this.length - 1 );
  }

  /**
   * (private)
   * @param {any} value
   */
  __isCorrectType( value ) {
    switch ( this.type ) {
      case 'any':
        return true;
      case 'int':
        return this.__isInt( value );
      case 'float':
        return this.__isFloat( value );
        // Used for primitive types.
        // 'string' | 'number' | 'boolean'
      default:
        return typeof value === this.type;
    }
  }

  /**
   * (private) 
   */
  __forEach( Callback ) {
    for ( let i = 0; i < this.elements.length; ++i ) {
      Callback( this.elements[i] );
    }
  }

  /**
   * (private)
   * No type safety. For private class use.
   * @param {Type} value
   */
  ____push( value ) {
    this.elements.push( value );
  }

  /**
    * (private)
    * No checks. For private class use.
    * @param {Number} index
    */
  ____splice( index ) {
    this.elements.splice( index, 1 );
  }

  /**
 * (private)
 * @param {Number} value
 */
  __isInt( value ) {
    if ( typeof value !== 'number' )
      return false;

    return value % 1 === 0;
  }

  /**
   * (private)
   * @param {Number} value
   */
  __isFloat( value ) {
    if ( typeof value !== 'number' )
      return false;

    return value % 1 !== 0;
  }
}

try {
  module.exports = Collection;

} catch ( e ) {
  //;
}

/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

let ____errors1;
let ____collection1;

try {
  'use strict';
  ____errors1 = require( './errors' );
  ____collection1 = require( './collection' );

} catch ( e ) {
  ____errors1 = Errors;
  ____collection1 = Collection;
}

class Dictionary extends ____collection1 {
  /**
   * Dictionary of key-value pairs.
   * @param {Boolean} uniqueKeys Whether the keys should be unique or not.
   * Optional. It defaults to false
   * @default {false}
   */
  constructor( uniqueKeys ) {
    super( uniqueKeys, 'any' );
  }

  /**
   * Returns the last element of the Dictionary or false.
   *
   * @returns { any }
   */
  get lastValue() {
    try {
      return Object.values( this.__last )[0];

    } catch ( e ) {
      return false;
    }
  }

  /**
   * Returns an array with all the dictionary's values.
   *
   * @returns { any[] }
   */
  getAllValues() {
    let allValues = [];

    for ( let i = 0; i < this.elements.length; ++i ) {
      allValues.push( Object.values( this.elements[i] )[0] );
    }

    return allValues;
  }

  /**
   * Returns an array with all the dictionary's keys.
   *
   * @returns { any[] }
   */
  getAllKeys() {
    const allKeys = [];

    for ( let i = 0; i < this.elements.length; ++i ) {
      allKeys.push( Object.keys( this.elements[i] )[0] );
    }

    return allKeys;
  }

  add( key, value ) {
    if ( this.uniqueKeys ) {
      if ( this.findIndexOfKey( key ) !== false )
        throw new Error( ____errors1.existingKey );
    }

    this.____push( { [key]: value } );
  }

  /*
   * Removes an item in the Dictionary with the provided key.
   * @return { bool }
   */
  remove( key ) {
    const index = this.findIndexOfKey( key );
    if ( index === false )
      return false;

    this.____splice( index, 1 );
    return true;
  }

  /*
   * Updates an item in the Dictionary with the provided key.
   * @param { any } key
   * @param { any } newValue
   * @return { bool }
   */
  updateByKey( key, newValue ) {
    const index = this.findIndexOfKey( key );
    if ( index === false )
      return false;

    return this.updateByIndex( index, newValue );
  }

  /*
   * Updates an item in the Dictionary with the provided index.
   * @param { any } key
   * @param { any } newValue
   * @return { bool }
   */
  updateByIndex( idx, newValue ) {
    try {
      Object.defineProperty( this.elements[idx], key, {
        value: newValue
      } );

      return true;

    } catch ( e ) {
      return false;
    }
  }

  /**
   * Get a value with its index. Returns an array with the values.
   * @param {number} index
   * @return {any[]}
   */
  getByIndex( index ) {
    return Object.values( this.elements[index] )[0];
  }

  /**
   * Get a key with its index.
   * @param {number} index
   * @return {any}
   */
  getKeyByIndex( index ) {
    return Object.keys( this.elements[index] )[0];
  }

  /**
   * Returns the value by key or false if not found.
   *
   * @param { any } key
   * @returns { any | false }
   */
  getByKey( key ) {
    try {
      const elementAndIndex = this.____getElementAndIndexByKey( key );
      if ( elementAndIndex === false )
        return false;

      return Object.values( elementAndIndex[1] )[0];

    } catch ( e ) {
      console.error( e );
    }
  }

  /**
   * Returns the index of the provided key, or false if not found.
   *
   * @param {any} key
   *
   * @returns { number | false }
   */
  findIndexOfKey( key ) {
    const elementAndIndex = this.____getElementAndIndexByKey( key );
    if ( elementAndIndex === false )
      return false;

    return elementAndIndex[0];
  }

  /**
   * (private)
   * Returns an array with the index and the respective key-value pair object, or false in case it does not find the provided key.
   *
   * [index<number>, keyValuePair<object>]
   *
   * @param { any } key
   * @returns { Object | false }
   */
  ____getElementAndIndexByKey( key ) {
    let currKeyValPair;

    for ( let i = 0; i < this.elements.length; i++ ) {
      currKeyValPair = this.elements[i];

      if ( Object.keys( currKeyValPair )[0] === key )
        return [i, currKeyValPair];
    }

    return false;
  }

  forEachValue( Callback ) {
    this.__forEach( ( item ) => {
      Callback( Object.values( item )[0] );
    } );
  }
}

try {
  module.exports = Dictionary;

} catch ( e ) {
  //;
}

/*
 * Copyright (c) 2019 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

let ____errors2;
let ____collection2;

try {
  'use strict';
  ____errors2 = require( './errors' );
  ____collection2 = require( './collection' );

} catch ( e ) {
  ____errors2 = Errors;
  ____collection2 = Collection;
}

/**
 * @typedef { List }
 * @extends Collection
 * */
class List extends ____collection2 {
  /**
   * 
   * The Type of the list.
   * @param {String} type
   * ('string' | 'number' | 'int' | 'float' | 'boolean' | 'any')
   * Default: 'any'.
   */
  constructor( type ) {
    super( false, type );
  }

  /**
   * Returns the last element of the List or false.
   *
   * @returns { any }
   */
  get last() {
    try {
      return this.__last;

    } catch ( e ) {
      return false;
    }
  }

  /**
   * Add a new item to the List<T>.
   * @param { any } value
   */
  add( value ) {
    const canPush = this.__isCorrectType( value );

    if ( canPush === false )
      throw ____errors2.wrongType( this.type );

    return this.____push( value );
  }

  update( index, value ) {
    const canPush = this.__isCorrectType( value );

    if ( canPush === false )
      throw ____errors2.wrongType( this.type );

    this.elements[index] = value;
  }

  /**
   * Returns true if the List contains the value, or false if it does not.
   * 
   * @param {any} value
   */
  contains( value ) {
    return this.elements.includes( value );
  }

  /**
   * Remove an new item from the List<T> by index.
   * @param {Number} index
   */
  remove( index ) {
    this.splice( index );
  }

  forEach( Callback ) {
    this.__forEach( ( item ) => {
      Callback( item );
    } );
  }
}

try {
  module.exports = List;

} catch ( e ) {
  //;
}



const DATA_SET_PREFIX = 'data-';

class DATA_SET_TAGS {
  static ComponentId() { return 'componentid' }
  static ComponentId_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.ComponentId() }
  static Component() { return 'component' }
  static Component_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.Component() }
  static BindingTo() { return 'binding' }
  static BindingTo_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.BindingTo() }
  static EventMethodCall() { return 'eventmethodcall' }
  static EventMethodCall_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.EventMethodCall() }
  static EventMethodToCall() { return 'eventmethodname' }
  static EventMethodToCall_Prefixed() { return DATA_SET_PREFIX + DATA_SET_TAGS.EventMethodToCall() }
}

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

const SYNTAX_TOKENS = Object.freeze( {

  OpenTag: '<',
  ClosingTag: '/',
  CloseTag: '>',
  SyntaxTagToken: '_',
  ComponentRef: '&',
  OpenEventTag: '(',
  CloseEventTag: ')',

  For: 'for',
  If: 'if',

  // Boolean()
  Equal: '==',
  EqualStrict: '===',
  NotEqual: '!=',
  NotEqualStrict: '!==',
  Lesser: '<',
  LesserOrEqual: '<=',
  Greater: '>',
  GreaterOrEqual: '>=',


} );


const EventType = Object.freeze({
  DOM: 1
});

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class CompiledTemplateModel {

  constructor() {

    this.compiledHtml = '';

    /** @type { HTMLTemplateElement[] } */
    this.compiledTemplateElems = [];

  }

}


class MethodCallOnEvent {

  /**
   *
   * @param { string } identifier A unique identifier for this event method call.
   * @param { string } eventName The name of the event (E.g: 'click')
   * @param { string } methodName The name of the method to call.
   * @param { string } eventType The type of the event. Use the EventType enum.accordion
   */
  constructor( identifier, eventName, methodName, eventType = EventType.DOM ) {
    this.identifier = identifier;
    this.eventName = eventName;
    this.methodName = methodName;
    this.eventType = eventType;
  }

}

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class Utils {

  constructor() {
    throw new Error( 'Static class' );
  }

  static isNullOrUndefined( value ) {
    return value === null || value === undefined;
  }

  static isNullOrUndefinedOrEmptyStr( value ) {
    return value === '' || Utils.isNullOrUndefined( value );
  }

  static ____ALLOWED_APLHANUM_RANDOM_CHARS() { return "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" };

  /**
   * Returns a pseudo-random string.
   * @param { number } length
   */
  static randomAlphaNumStr( length ) {
    let result = '';

    for (let i = 0; i < length; ++i) {
      result += Utils.____ALLOWED_APLHANUM_RANDOM_CHARS()[ Math.floor( Math.random() * Utils.____ALLOWED_APLHANUM_RANDOM_CHARS().length ) ];
    }

    return result;
  }

}

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

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class Page {

  constructor() { }

}

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

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class ____HTMLBlocksCompiler {

  constructor() { }

  /**
   * Make sure to call this after "<_ or </_"
   * Returns [ innerIndex<number>, tag<string> ]
   *
   * @param { string } template
   *
   * @returns { [number, string] }
   */
  static getThisTag( template, innerIndex ) {
    let currentChar = '';
    let tag = '';

    do {
      currentChar = template[innerIndex];
      tag += currentChar;
      ++innerIndex;

    } while ( currentChar !== SYNTAX_TOKENS.CloseTag && currentChar !== ' ' && currentChar !== '=' );

    return [innerIndex, tag.substring( 0, tag.length - 1 )];
  }

  /**
   * Call this on the '(' index of the event property.
   *
   * Returns [ innerIndex<number>, methodCallOnEvent<MethodCallOnEvent>, compiledEventPropertyHTML<string> ]
   *
   * @param { Component } component
   * @param { number } innerIndex The index of '(' of '(<event-name>)="<property-name>" '
   *
   * @returns { [number, MethodCallOnEvent, string] }
   */
  static EVENT( component, innerIndex ) {
    // Just as a precaution.
    if (component.template[innerIndex] != SYNTAX_TOKENS.OpenEventTag) {
      throw new Error( `Expected an open event token "${SYNTAX_TOKENS.OpenEventTag}" on the the template of the component "${component.name}"` );

    } else {
      ++innerIndex;
    }

    let thisEventName = '';

    do {
      thisEventName += component.template[innerIndex];
      ++innerIndex;

      if ( innerIndex > component.template.length ) {
        throw new Error( `COMPILATION ERROR: Could not find the event name on the template of the component "${component.name}".\n
        This is most likely a syntax error. The close event token "${SYNTAX_TOKENS.CloseEventTag}" was not found.` );
      }

    } while ( component.template[innerIndex] !== SYNTAX_TOKENS.CloseEventTag );

    // Jump to '"' of '(<event-name>)="'
    innerIndex += 2;

    if ( component.template[innerIndex] !== '"' ) {
      throw new Error( `COMPILATION ERROR: Could not find the '"' token on the template of the component "${component.name}".\n
      This is most likely a syntax error on the event property.` );

    } else {
      ++innerIndex;
    }

    let thisMethodName = '';

    do {
      thisMethodName += component.template[innerIndex];
      ++innerIndex;

      if ( innerIndex > component.template.length ) {
        throw new Error( `COMPILATION ERROR: Could not find the method name to call on the template of the component "${component.name}".\n
This is most likely a syntax error on the event property. The method call token ('(') was not found.` );
      }

    } while ( component.template[innerIndex] !== '(' )

    innerIndex += 3;
    const thisUniqueId = Utils.randomAlphaNumStr( 6 );

    return [
      innerIndex,
      new MethodCallOnEvent(
        thisUniqueId,
        thisEventName,
        thisMethodName,
        EventType.DOM
      ),
      ` ${ DATA_SET_TAGS.EventMethodCall_Prefixed() }="${ thisUniqueId }" ${ DATA_SET_TAGS.EventMethodToCall_Prefixed() }="${ thisMethodName }" `
    ];
  }

  /**
   * Returns [ innerIndex<number>, property<object>,  ]
   *
   * @param { Component } component
   * @param { number } innerIndex The index after "<_>" of "<_> propertyBlockContent </_>"
   *
   * @returns { [number, object] }
   */
  static PROP( component, innerIndex, ignorePropertyBinding = false ) {
    let thisProperty = '';
    let currentChar;

    while ( component.template[innerIndex] !== SYNTAX_TOKENS.OpenTag ) {
      currentChar = component.template[innerIndex];

      if ( currentChar !== ' ' ) {
        thisProperty += currentChar;
      }

      ++innerIndex;
    }

    // Jump to after the "</_>"
    innerIndex += 3;

    thisProperty = thisProperty.replace( /\s/g, '' );
    // In case its a nested property (part of an object).
    const splitedProperties = thisProperty.split( '.' );
    const isPropertyBinding = splitedProperties[0] === 'state' && !ignorePropertyBinding;

    thisProperty = component;
    for ( let i = 0; i < splitedProperties.length; ++i ) {
      thisProperty = thisProperty[splitedProperties[i]];
    }

    if ( Utils.isNullOrUndefined( thisProperty ) ) {
      throw new Error(
        `Property "${splitedProperties.join( '.' )}" not defined in the component "${component.constructor.name}".`
      );
    }

    if ( isPropertyBinding ) {
      thisProperty = `
        <span
          ${ DATA_SET_TAGS.Component_Prefixed() }="${ component.name }"
          ${ DATA_SET_TAGS.BindingTo_Prefixed() }="${ splitedProperties[splitedProperties.length - 1] }"
          data-token="${ SYNTAX_TOKENS.SyntaxTagToken }">

          ${thisProperty}
        </span>
      `;
    }

    return [innerIndex, thisProperty];
  }

  // TODO: THIS IS JUST AN IDEA. REFACTOR.
  /**
   *  Returns [iterationHook<string>, templateToRepeat<string>]
   *
   * @param { string } forBlock
   *
   * @return { [string, string] }
   */
  static FOR( forBlock ) {
    let iterationHook = '';

    let i;
    // GET ITERATION HOOK.
    for ( i = 0; i < forBlock.length; ++i ) {

      if ( forBlock[i] === 'l' && forBlock[i + 1] === 'e' && forBlock[i + 2] === 't' ) {
        // Jump to after the 'let="'.
        i += 5;

        while ( forBlock[i] !== '"' ) {
          iterationHook += forBlock[i];
          ++i;
        }

        // Jump to after the '">'
        i += 2;
        break;
      }
    }

    let templateToRepeat = '';

    for ( ; i < forBlock.length; ++i ) {
      templateToRepeat += forBlock[i];
    }

    return [iterationHook, templateToRepeat];
  }

  /**
   * @param { string } ifBlock
   */
  static IF( ifBlock ) {
    return '';
  }

}

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

// TODO: In the future refactor all of this like the property and event compilation is organized.

class TemplateCompiler {
  constructor() { }

  // #region COMPILE

  /**
   *
   * @param { Startup } startup
   * @param { Component } component
   *
   * @return { string } The compiled HTML
   */
  static compile( component ) {
    let compiledHtml = '';
    let innerIndex = 0;
    let currentChar = '';
    let currentSymbol = '';
    let currentBlock = '';

    for ( let i = 0; i < component.template.length; ++i ) {
      currentChar = component.template[i];

      if ( currentChar === SYNTAX_TOKENS.OpenTag && component.template[i + 1] === SYNTAX_TOKENS.SyntaxTagToken ) {

        if ( component.template[i + 2] === SYNTAX_TOKENS.CloseTag ) {
          // VALUES COMPILER.
          // Jump this tokens (after "<_>").
          innerIndex = i + 3;

          const propResponse = ____HTMLBlocksCompiler.PROP( component, innerIndex );
          innerIndex = propResponse[0];
          compiledHtml += propResponse[1];

        // COMPLEX TAGS COMPILER.
        } else {
          // The index after in "<_".
          innerIndex = i + 2;
          const tagResponse = ____HTMLBlocksCompiler.getThisTag( component.template, innerIndex );
          innerIndex = tagResponse[0];
          currentSymbol = tagResponse[1];

          switch ( currentSymbol ) {

            // #region FOR

            case SYNTAX_TOKENS.For:
              let blockResponse = this.____private.getThisComplexBlock( SYNTAX_TOKENS.For, component.template, innerIndex );
              currentBlock = blockResponse[1];
              innerIndex = blockResponse[0];

              //                          (0)      (1)         (2)
              // (0) Iteration hook: " [variable] of/in [componentProperty] "
              // (1) Template to repeate example: " <li> <_> [variable] </_> </li> "
              blockResponse = ____HTMLBlocksCompiler.FOR( currentBlock );
              blockResponse[0] = blockResponse[0].split( ' ' );

              // TODO: Check for every built-in property of Component.
              if ( blockResponse[0][0] === 'name' ) {
                throw new Error(
                  `Atempt to use a variable name equal to a built in Component property ("${blockResponse[0][0]}") in the template of the component "${component.name}": "${blockResponse[0].join( ' ' )}"`
                );
              }

              /** @type { Component } */
              let innerComponent = Object.assign( {}, component );
              // The "<" token is a hack.
              innerComponent.template = blockResponse[0][2] + '<';
              const propValues = ____HTMLBlocksCompiler.PROP( innerComponent, 0, true )[1];

              const splitedProperties = blockResponse[0][2].split( '.' );
              const hasPropertyBinding = splitedProperties[0] === 'state';

              if ( hasPropertyBinding ) {
                component.____private.templatesToInject.push(
                  ____TemplateElemCompiler.FOR(
                    component.name,
                    splitedProperties[splitedProperties.length - 1], blockResponse[0], blockResponse[1]
                  )
                );

                compiledHtml += `
                  <span
                    ${ DATA_SET_TAGS.Component_Prefixed() }="${ component.name }"
                    ${ DATA_SET_TAGS.BindingTo_Prefixed() }="${ splitedProperties[splitedProperties.length - 1] }"
                  >`;
              }

              switch ( blockResponse[0][1] ) {
                case 'of':
                  innerComponent.template = blockResponse[1];

                  for ( const val of propValues ) {
                    innerComponent[blockResponse[0][0]] = val;
                    compiledHtml += TemplateCompiler.compile( innerComponent );
                  }

                  break;

                case 'in':
                  throw new Error( 'The "for in" loop NOT YET IMPLEMENTED.' );

                default:
                  throw new Error( `Unknown "for" statement: "${blockResponse[0]}"` );
              }

              if ( hasPropertyBinding ) {
                compiledHtml += '</span>';
              }

              break;

            // #endregion FOR

            case SYNTAX_TOKENS.If:
              throw new Error( `The "if" statement was NOT YET IMPLEMENTED.` );
              // compiledHtml += ____HTMLBlocksCompiler.IF( thisBlock );
              break;

            default:
              throw new Error(
                `Unknown symbol "${SYNTAX_TOKENS.OpenTag}${SYNTAX_TOKENS.SyntaxTagToken}${currentSymbol}" on the template of the component "${component.constructor.name}".`
              );
          }
        }

        // Advance forward.
        i = innerIndex;

      // EVENTS.
      } else if ( currentChar === SYNTAX_TOKENS.OpenEventTag ) {
        const eventResult = ____HTMLBlocksCompiler.EVENT( component, i );
        compiledHtml += eventResult[2];
        component.____private.methodCallsOnEvents.push( eventResult[1] );
        i = eventResult[0];

      } else {
        // Normal HTML.
        compiledHtml += currentChar;
      }

    } // end of FOR.

    return compiledHtml;
  }

  // #endregion COMPILE

  // #region PRIVATE METHODS

  /**
   * Internal methods.
   * This methods use and change "currentChar" and "innerIndex".
   */
  static get ____private() {
    return {
      /**
       * Get the value inside a complex template tag.
       * Make sure to call this in the index of "<" in "<_".
       *
       * Returns [ innerIndex: number, block: string ]
       *
       * @param { string } template
       *
       * @return { [number, string] }
       */
      getThisComplexBlock: ( TAG_SYNTAX_TOKEN, template, innerIndex ) => {
        let thisBlock = '';
        let tagResponse;
        let closeToken = null;

        let blockEnded = false;
        while ( !blockEnded ) {

          // "</_" && !"</_>"
          if ( template[innerIndex] === SYNTAX_TOKENS.OpenTag &&
               template[innerIndex + 1] === SYNTAX_TOKENS.ClosingTag &&
               template[innerIndex + 2] === SYNTAX_TOKENS.SyntaxTagToken &&
               template[innerIndex + 3] !== SYNTAX_TOKENS.CloseTag
          ) {
            innerIndex += 3;

            tagResponse = ____HTMLBlocksCompiler.getThisTag( template, innerIndex );
            closeToken = tagResponse[1];

            if ( closeToken === TAG_SYNTAX_TOKEN ) {
              blockEnded = true;
              innerIndex = tagResponse[0];
            }

          } else {
            thisBlock += template[innerIndex];
            ++innerIndex;
          }

          // Nothing found.
          if ( !template[innerIndex] ) {
            throw new Error( `Could not find the close tag of "<_${TAG_SYNTAX_TOKEN}>".
Probably a syntax error.
Template:
"${template}"` );
          }
        }

        return [innerIndex, thisBlock];
      }
    };
  }

  // #endregion PRIVATE METHODS

} // end of class

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


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

