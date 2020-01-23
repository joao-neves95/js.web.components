/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


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
