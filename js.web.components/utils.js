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
      result += Utils.____ALLOWED_APLHANUM_RANDOM_CHARS[ Math.floor( Math.random() * Utils.____ALLOWED_APLHANUM_RANDOM_CHARS().length ) ];
    }

    return result;
  }

}
