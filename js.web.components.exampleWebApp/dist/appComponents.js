/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

// @import<<DIR './viewModels'
// @import './components/sidenav/sidenav.template'
// @import './components/sidenav/sidenav.component'
// @import './components/header/header.template'
// @import './components/header/header.component'
// @import './components/todoList/todoList.template'
// @import './components/todoList/todoList.component'
// @import './components/stopwatch/stopwatch.template'
// @import './components/stopwatch/stopwatch.component'
// @import './components/documentation/documentation.template'
// @import './components/documentation/documentation.component'

'use strict';

/*
 * Copyright (c) 2019 Jo�o Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */


class NavItemViewModel {

  constructor( label, url, ) {

    this.label = label;
    this.url = url;

  }

}

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
            <a (click)="openPage()"
               class="nav-link" href="#<_> item.url </_>">

                <_> item.label </_>
            </a>
        </_for>

    </nav>
</aside>
`;

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class SidenavComponent extends Component {

  constructor() {
    super( 'app-sidenav', sidenavTemplate, [ '' ] );

    this.navItems = [
      new NavItemViewModel( 'Todo List', 'todoList' ),
      new NavItemViewModel( 'Stopwatch', 'stopwatch' ) //,
      //new NavItemViewModel( 'Documentation', 'documentation' )
    ];

  }

  openPage( e ) {
    const thisUrl = e.target.hash.slice( 1 );
    let thisElemDisplay;
    for ( let i = 0; i < this.navItems.length; ++i ) {
      if ( this.navItems[i].url !== thisUrl ) {
        thisElemDisplay = 'none';

      } else {
        thisElemDisplay = 'block';
      }

      document.getElementById( this.navItems[i].url ).style.display = thisElemDisplay;
    }
  }

}

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

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class HeaderComponent extends Component {

  constructor() {
    super( 'app-header', headerTemplate, [''] );

    this.title = 'js.web.components';

    this.state = this.createState( {
      myName: 'João Neves'
    } );
  }

}

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

const todoListTemplate = `
<div id="todoList">
  <div class="input-wrapper">
    <form class="form-inline">

      <label for="new-todo-item">New Item:
          <input id="new-todo-item" class="form-control" name="new-todo-item" type="text" required />
      <label>
      <button (click)="addItem()"
              class="btn btn-success" type="button">
          Add Item
      </button>

    </form>
  </div>

  <div class="output-wrapper">
    <p>Todo Items: </p>
    <ul>

        <_for let="todoItem of state.todoItems">
            <li>
              <i (click)="toggleDone()"
                class="far fa-check-circle pointer">
              </i>
              <_>todoItem</_>
              <i (click)="removeItem()" class="far fa-trash-alt pointer"></i>
            </li>
        </_for>

    </ul>
  </div>
</div>
`;

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class TodoListComponent extends Component {

  constructor() {
    super( 'app-todoList', todoListTemplate, [ '' ] );

    this.state = {
      todoItems: this.createState( [ 'Study', 'Learn data structures' ], 'todoItems' )
    };
  }

  addItem() {
    const input = document.getElementById( 'new-todo-item' ).value;

    if (input.length > 0) {
      this.state.todoItems.push( input );
    }

  }

  /**
   *
   * @param { Event } e
   * @ param { HTMLElement } e
   */
  toggleDone( e ) {
    if ( e.target.classList.contains( 'far' ) ) {
      e.target.classList.replace( 'far', 'fas' );
      e.target.parentElement.style.textDecoration = 'line-through';

    } else {
      e.target.classList.replace( 'fas', 'far' );
      e.target.parentElement.style.textDecoration = 'none';
    }

  }

  overDel( e ) {
    e.target.classList.replace( 'far', 'fas' );

    setTimeout( () => {
      e.target.classList.replace( 'fas', 'far' );
    }, 2000 );

  }

  removeItem( e ) {
    const itemIdx = this.state.todoItems.findIndex( val => val === e.target.parentElement.innerText.trim() );

    if ( itemIdx >= 0 ) {
      this.state.todoItems.splice( itemIdx, 1 );
    }

  }

}

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

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

// https://markdowntohtml.com/

const documentationTemplate = `
<h1 id="js-web-components">js.web.components</h1>
<hr>
<h2 id="observations-">Observations:</h2>
<p><strong>All of this can and will change in the future.</strong></p>
<p>js.web only supports the main browsers (I.e.: Firefox, Chrome, Opera, Safari).<br>
js.web does not support Internet Explorer.</p>
<hr>
<h2 id="specification">Specification</h2>
<h3 id="component-property-rendering-">Component Property Rendering:</h3>
<p><code>&lt;_&gt; [property-to-reder] &lt;/_&gt;</code></p>
<h4 id="example-">Example:</h4>
<p>Template:</p>
<pre><code class="lang-html">const testTemplate = \`<span class="javascript">
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">_</span>&gt;</span> title <span class="hljs-tag">&lt;/<span class="hljs-name">_</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;
</span></span>\`;
</code></pre>
<p>Component:</p>
<pre><code class="lang-js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TestComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  constructor() {
    <span class="hljs-keyword">super</span>( <span class="hljs-symbol">'app</span>-test', testTemplate, [''] );

    <span class="hljs-keyword">this</span>.title = <span class="hljs-symbol">'My</span> <span class="hljs-type">Website</span>';
  }

}
</code></pre>
<h3 id="component-state-property-rendering-with-binding-">Component State Property Rendering with Binding:</h3>
<p><code>&lt;_&gt; state.[property-to-reder] &lt;/_&gt;</code></p>
<h4 id="example-">Example:</h4>
<p>Template:</p>
<pre><code class="lang-html">const testTemplate = \`<span class="javascript">
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
    <span class="xml"><span class="hljs-comment">&lt;!-- DATA BINDING --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">_</span>&gt;</span> state.myName <span class="hljs-tag">&lt;/<span class="hljs-name">_</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</span>\`;
</code></pre>
<p>Component:</p>
<pre><code class="lang-js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TestComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  constructor() {
    <span class="hljs-keyword">super</span>( <span class="hljs-symbol">'app</span>-test', testTemplate, [''] );

    <span class="hljs-keyword">this</span>.state = <span class="hljs-keyword">this</span>.createState( {
      myName: <span class="hljs-symbol">'Jo</span>ão <span class="hljs-type">Neves</span>'
    } );
  }

}
</code></pre>
<h3 id="component-property-iteration-rendering-">Component Property Iteration Rendering:</h3>
<h4 id="example-">Example:</h4>
<p>Template:</p>
<pre><code class="lang-html">const nameListTemplate = \`<span class="javascript">
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">_for</span> <span class="hljs-attr">let</span>=<span class="hljs-string">"person of names"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">_</span>&gt;</span>person<span class="hljs-tag">&lt;/<span class="hljs-name">_</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">_for</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;
</span></span>\`;
</code></pre>
<p>Component:</p>
<pre><code class="lang-js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">NameListComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  constructor() {
    <span class="hljs-keyword">super</span>( <span class="hljs-symbol">'app</span>-nameList', nameListTemplate, [''] );

    <span class="hljs-keyword">this</span>.names = [<span class="hljs-symbol">'John</span> <span class="hljs-type">Doe</span>', <span class="hljs-symbol">'Oliver</span> <span class="hljs-type">Hoe</span>', <span class="hljs-symbol">'Fiona</span> <span class="hljs-type">Silva</span>'];

  }

}
</code></pre>
<h3 id="component-property-iteration-rendering-with-property-binding-">Component Property Iteration Rendering with Property Binding:</h3>
<h4 id="example-">Example:</h4>
<p>Template:</p>
<pre><code class="lang-html">const todoListTemplate = \`<span class="javascript">
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">_for</span> <span class="hljs-attr">let</span>=<span class="hljs-string">"todoItem of state.todoItems"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">_</span>&gt;</span> todoItem <span class="hljs-tag">&lt;/<span class="hljs-name">_</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">_for</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;
</span></span>\`;
</code></pre>
<p>Component:</p>
<pre><code class="lang-js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoListComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  constructor() {
    <span class="hljs-keyword">super</span>( <span class="hljs-symbol">'app</span>-todoList', todoListTemplate, [''] );

    <span class="hljs-keyword">this</span>.state = {
      todoItems: <span class="hljs-keyword">this</span>.createState( [<span class="hljs-symbol">'Stud</span>y', <span class="hljs-symbol">'Learn</span> design patterns', <span class="hljs-symbol">'Learn</span> data structures'], <span class="hljs-symbol">'todoItem</span>s' )
    };

  }

}
</code></pre>
<h3 id="component-method-calls-from-template-dom-events-">Component Method Calls From Template DOM Events:</h3>
<h4 id="example-">Example:</h4>
<p>Template:</p>
<pre><code class="lang-html">const todoListTemplate = \`<span class="javascript">
&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"container"</span>&gt;
    <span class="xml"><span class="hljs-comment">&lt;!-- Here is the event listener calling the component method. --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"addItem()"</span>
            <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-success"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>
        Add Item
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
</span>\`;
</code></pre>
<p>Component:</p>
<pre><code class="lang-js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoListComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  constructor() {
    <span class="hljs-keyword">super</span>( <span class="hljs-symbol">'app</span>-todoList', todoListTemplate, [''] );
  }

  <span class="hljs-comment">// The method to call.</span>
  addItem() {
    console.log( <span class="hljs-symbol">'Someone</span> called me!' );
  }

}
</code></pre>
<h3 id="component-method-calls-from-template-dom-events-with-property-binding-">Component Method Calls From Template DOM Events (with property binding):</h3>
<h4 id="example-">Example:</h4>
<p>Template:</p>
<pre><code class="lang-html">const todoListTemplate = \`
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>New Item:
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"new-todo-item"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"new-todo-item"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">required</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- Here is the event listener calling the component method. --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> (<span class="hljs-attr">click</span>)=<span class="hljs-string">"addItem()"</span>
            <span class="hljs-attr">class</span>=<span class="hljs-string">"btn btn-success"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>&gt;</span>
        Add Item
    <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">_for</span> <span class="hljs-attr">let</span>=<span class="hljs-string">"todoItem of state.todoItems"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span> <span class="hljs-tag">&lt;<span class="hljs-name">_</span>&gt;</span>todoItem<span class="hljs-tag">&lt;/<span class="hljs-name">_</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">_for</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
\`;
</code></pre>
<p>Component:</p>
<pre><code class="lang-js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoListComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  constructor() {
    <span class="hljs-keyword">super</span>( <span class="hljs-symbol">'app</span>-todoList', todoListTemplate, [''] );

    <span class="hljs-keyword">this</span>.state = {
      todoItems: <span class="hljs-keyword">this</span>.createState( [<span class="hljs-symbol">'Stud</span>y', <span class="hljs-symbol">'Learn</span> design patterns', <span class="hljs-symbol">'Learn</span> data structures'], <span class="hljs-symbol">'todoItem</span>s' )
    };
  }

  <span class="hljs-comment">// The method to call.</span>
  addItem() {
    <span class="hljs-keyword">this</span>.state.todoItems.push( document.getElementById( <span class="hljs-symbol">'new</span>-todo-item' ).value );
  }

}
</code></pre>
<hr>
<h2 id="features-roadmap-">Features Roadmap:</h2>
<ul>
<li>[x] Implement component property rendering</li>
<li>[x] Implement component state property data binding</li>
<li>[x] Implement &quot;for&quot; loop template with component property rendering for arrays</li>
<li>[x] Implement component state property data binding for &quot;for&quot; loops</li>
<li>[x] Implement component method calls from template events</li>
<li>[ ] Implement component scoped style injections</li>
<li>[ ] Implement &quot;for&quot; loop template with component property rendering for objects</li>
<li>[ ] Implement &quot;if&quot; statement template</li>
<li>[ ] Implement support for having sub-components (render components inside other components)</li>
<li>[ ] Implement multiple pages</li>
<li>[ ] Optimize (space and time)</li>
</ul>
<hr>
<h2 id="motivation-">Motivation:</h2>
<p>My teacher told the class to make a project using HTML, CSS and JQuery.<br/>
I already had experience working with these technologies, so I decided to make my own framework.<br/>
It&#39;s inspired by Angular, React and even ASP.NET.<br/>
This is a work in progress.</p>

`;

/*
 * Copyright (c) 2019 João Pedro Martins Neves (shivayl) - All Rights Reserved.
 *
 * All content is licensed under the GNU Lesser General Public License (LGPL),
 * version 3, located in the root of this project, under the name "LICENSE.md".
 *
 */

class DocumentationComponent extends Component {

  constructor() {
    super( 'app-documentation', documentationTemplate, [''] );
  }

}

