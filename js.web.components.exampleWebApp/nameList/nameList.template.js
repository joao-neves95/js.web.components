
const nameListTemplate = `
<div class="container">
    <ul>
        <_for c="let name of names">
            <li> <_r>name</_r> </li>
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
  <li> <_r>name</_r> </li>
</template>
`;
