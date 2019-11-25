// @import './header/header.template'
// @import './header/header.component'
// @import './nameList/nameList.template'
// @import './nameList/nameList.component'

'use strict';


const headerTemplate = `
<div class="container">
    <h1> <_> title </_> </h1>
    <!-- DATA BINDING -->
    <p> <_> state.myName </_> </p>
</div>
`;

// RENDERED HTML
//
// <div class="container">
//     <h1> My Website </h1>
//     <!-- DATA BINDING -->
//     <p> <span data-component="app-header" data-binding="myName"> João Neves </span> </p>
// </div>
//


class HeaderComponent extends Component {

  constructor() {
    super( 'app-header', headerTemplate, [''] );

    this.title = 'My Website';

    this.state = this.createState( {
      myName: 'João Neves'
    } );
  }

}


const nameListTemplate = `
<div class="container">
    <ul>
        <_for let="person of names">
            <li> <_>person</_> </li>
        </_for>
    </ul>
</div>
`;

// compiled code reference:
`
<div class="container">
  <ul app-nameList_for_1>
    <li> John Doe </li>
    <li> Oliver Hoe </li>
    <li> Fiona Silva </li>
  </ul>
</div>
`;

// compiled template reference:
`
<template target="app-nameList_for_1" component="app-nameList" binding="names" type="for">
  <li> <_>name</_> </li>
</template>
`;


class NameListComponent extends Component {

  constructor() {
    super( 'app-nameList', nameListTemplate, [''] );

    this.names = ['John Doe', 'Oliver Hoe', 'Fiona Silva'];

  }

}

