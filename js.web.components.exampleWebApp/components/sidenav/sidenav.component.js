
class SidenavComponent extends Component {

  constructor() {
    super( 'app-sidenav', sidenavTemplate, [''] );

    this.navItems = [
      new NavItemViewModel( 'Todo List', 'todo-list' ),
      new NavItemViewModel( 'Stopwatch', 'stopwatch' ),
      new NavItemViewModel( 'Documentation', 'documentation' )
    ];

  }

}
