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

}
