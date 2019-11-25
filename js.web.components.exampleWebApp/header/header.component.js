
class HeaderComponent extends Component {

  constructor() {
    super( 'app-header', headerTemplate, [''] );

    this.title = 'My Website';

    this.state = this.createState( {
      myName: 'João Neves'
    } );
  }

}
