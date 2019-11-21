// @import './header/header.template'
// @import './header/header.component'

'use strict';


const headerTemplate = `
<div class="container">
    <h1> <_> title </_> </h1>
</div>
`;

// copiled code reference:
// no template required.
`
<div class="container">
    <h1> My Website </h1>
</div>
`;


class HeaderComponent extends Component {

  constructor() {
    super( 'app-header', headerTemplate, [''] );

    this.title = 'My Website';
  }

}

