class Utils {

  constructor() {
    throw new Error( 'Static class' );
  }

  static isNullOrUndefined( vlaue ) {
    return value === null || value === undefined;
  }

}