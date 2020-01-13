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
