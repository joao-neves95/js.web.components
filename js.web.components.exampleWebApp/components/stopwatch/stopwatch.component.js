/*
 * Copyright (c) 2019 Jo�o Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


class StopwatchComponent extends Component {

  constructor() {
    super( 'app-stopwatch', stopwatchTemplate, [ '' ] );

    this.____secondsInterval;
    this.____minutesInterval;
    this.____hoursInterval;

  }

  startClock() {
    // Seconds.
    this.____secondsInterval = setInterval( () => {
      const elem = document.getElementById( 'seconds' );
      let time = parseInt( elem.innerText );

      if ( time === 60 ) {
        time = -1;
      }

      elem.innerText = time + 1;

    }, 1000 );

    // Minutes.
    this.____minutesInterval = setInterval( () => {
      const elem = document.getElementById( 'minutes' );
      let time = parseInt( elem.innerText )

      if ( time === 60 ) {
        time = -1;
      }

      elem.innerText = time + 1;

    }, 1000 * 60 );

    // Hours.
    this.____hoursInterval = setInterval( () => {
      const elem = document.getElementById( 'hours' );
      let time = parseInt( elem.innerText );

      if ( time === 23 ) {
        time = -1;
      }

      elem.innerText = time + 1;

    }, 1000 * 60 * 60 );
  }

  stopClock() {
    clearInterval( this.____secondsInterval );
    clearInterval( this.____minutesInterval );
    clearInterval( this.____hoursInterval );
  }

  restartClock() {
    document.getElementById( 'seconds' ).innerText = 0;
    document.getElementById( 'minutes' ).innerText = 0;
    document.getElementById( 'hours' ).innerText = 0;
  }

}
