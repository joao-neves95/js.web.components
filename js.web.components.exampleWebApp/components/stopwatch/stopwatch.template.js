/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


const stopwatchTemplate = `
<div>
    <p> <span id="hours">0</span>:<span id="minutes">0</span>:<span id="seconds">0</span> </p>
</div>

<div>
    <button (click)="startClock()" id="start">START</button>
    <button (click)="stopClock()" id="stop">STOP</button>
    <button (click)="restartClock()" id="restart">RESTART</button>
</div>
`;
