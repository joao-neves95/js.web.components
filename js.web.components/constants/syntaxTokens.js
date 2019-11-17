
const SYNTAX_TOKENS = Object.freeze( {

  OpenTag: '<',
  ClosingTag: '/',
  CloseTag: '>',
  SyntaxTagToken: '_',
  ComponentRef: '&',

  // Boolean()
  Equal: '==',
  EqualStrict: '===',
  NotEqual: '!=',
  NotEqualStrict: '!==',
  Lesser: '<',
  LesserOrEqual: '<=',
  Greater: '>',
  GreaterOrEqual: '>=',

  For: 'for',
  If: 'if',

  //
  Assignement: '='
  //

} );
