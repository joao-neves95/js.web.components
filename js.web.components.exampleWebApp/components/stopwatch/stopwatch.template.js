/*
 * Copyright (c) 2019 Jo�o Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


const stopwatchTemplate = `

<div id="stopwatch" class="jumbotron" style="display: none;">

  <div class="stopwatch-wrapper">
    <p class="text-monospace font-italic"> <span id="hours">0</span>:<span id="minutes">0</span>:<span id="seconds">0</span> </p>
  </div>

  <div class="stopwatch-btn-wrapper d-flex justify-content-center">
    <div class="btn-group" role="group" aria-label="Stopwatch control buttons">

      <button (click)="startClock()" id="start"
              type="button" class="btn btn-success">
        START
      </button>

      <button (click)="stopClock()" id="stop"
              type="button" class="btn btn-danger">
        STOP
      </button>

      <button (click)="restartClock()" id="restart"
              type="button" class="btn btn-secondary">
        RESTART
      </button>

    </div>
  </div>

</div>
`;
