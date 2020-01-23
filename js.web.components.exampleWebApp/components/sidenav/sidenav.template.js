/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


const sidenavTemplate = `
<aside>
    <nav class="nav nav-pills flex-column">

        <_for let="item of navItems">
            <a class="nav-link" href="<_> item.url </_>">
                <_> item.label </_>
            </a>
        </_for>

    </nav>
</aside>
`;
