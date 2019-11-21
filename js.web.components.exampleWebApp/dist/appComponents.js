// @import './header/header.template'
// @import './header/header.component'
// @import './nameList/nameList.template'
// @import './nameList/nameList.component'

'use strict';


const headerTemplate = `
<div class="container">
    <h1> <_> title </_> </h1>
</div>
`;


class HeaderComponent extends Component {

  constructor() {
    super( 'app-header', headerTemplate, [''] );

    this.title = 'My Website';
  }

}


const nameListTemplate = `
<div class="container">
    <ul>
        <_for c="name of names">
            <li> <_>name</_> </li>
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

