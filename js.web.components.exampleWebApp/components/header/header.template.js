/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

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
