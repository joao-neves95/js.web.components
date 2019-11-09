/// <reference path="./../../js.mvc/component.js" />

class Header extends Component {

  constructor() {
    super( 'app-nameList', nameListTemplate, [''] );

    this.$names = ['John Doe', 'Oliver Hoe', 'Fiona Silva'];

  }

}
