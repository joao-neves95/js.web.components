
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
