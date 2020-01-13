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
