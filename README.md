# js.web.components

---

## Observations:

**All of this can and will change in the future.**

js.web only supports the main browsers (I.e.: Firefox, Chrome, Opera, Safari).<br>
js.web does not support Internet Explorer.

---

## Specification

### Component Property Rendering:
`<_> [property-to-reder] </_>`

#### Example:

Template:
``` html
const testTemplate = `
<div class="container">
    <h1> <_> title </_> </h1>
</div>
`;
```

Component:
``` js
class TestComponent extends Component {

  constructor() {
    super( 'app-test', testTemplate, [''] );

    this.title = 'My Website';
  }

}
```

### Component State Property Rendering with Binding:
`<_> state.[property-to-reder] </_>`

#### Example:

Template:
``` html
const testTemplate = `
<div class="container">
    <!-- DATA BINDING -->
    <p> <_> state.myName </_> </p>
</div>
`;
```

Component:
``` js
class TestComponent extends Component {

  constructor() {
    super( 'app-test', testTemplate, [''] );

    this.state = this.createState( {
      myName: 'João Neves'
    } );
  }

}
```

### Component Property Iteration Rendering:

#### Example:

Template:
``` html
const nameListTemplate = `
<div class="container">
    <ul>
        <_for let="person of names">
            <li> <_>person</_> </li>
        </_for>
    </ul>
</div>
`;
```

Component:
``` js
class NameListComponent extends Component {

  constructor() {
    super( 'app-nameList', nameListTemplate, [''] );

    this.names = ['John Doe', 'Oliver Hoe', 'Fiona Silva'];

  }

}
```

### Component Property Iteration Rendering with Property Binding:

#### Example:

Template:
``` html
const todoListTemplate = `
<div class="container">
    <ul>
        <_for let="todoItem of state.todoItems">
            <li> <_> todoItem </_> </li>
        </_for>
    </ul>
</div>
`;
```

Component:
``` js
class TodoListComponent extends Component {

  constructor() {
    super( 'app-todoList', todoListTemplate, [''] );

    this.state = {
      todoItems: this.createState( ['Study', 'Learn design patterns', 'Learn data structures'], 'todoItems' )
    };

  }

}
```

### Component Method Calls From Template DOM Events:

#### Example:

Template:
``` html
const todoListTemplate = `
<div class="container">
    <!-- Here is the event listener calling the component method. -->
    <button (click)="addItem()"
            class="btn btn-success" type="button">
        Add Item
    </button>
</div>
`;
```

Component:
``` js
class TodoListComponent extends Component {

  constructor() {
    super( 'app-todoList', todoListTemplate, [''] );
  }

  // The method to call.
  addItem() {
    console.log( 'Someone called me!' );
  }

}
```

### Component Method Calls From Template DOM Events (with property binding):

#### Example:

Template:
``` html
const todoListTemplate = `
<div class="container">
    <label>New Item:
        <input id="new-todo-item" name="new-todo-item" type="text" required />
    <label>
    <!-- Here is the event listener calling the component method. -->
    <button (click)="addItem()"
            class="btn btn-success" type="button">
        Add Item
    </button>
</div>

<div class="container">
    <ul>
        <_for let="todoItem of state.todoItems">
            <li> <_>todoItem</_> </li>
        </_for>
    </ul>
</div>
`;
```

Component:
``` js
class TodoListComponent extends Component {

  constructor() {
    super( 'app-todoList', todoListTemplate, [''] );

    this.state = {
      todoItems: this.createState( ['Study', 'Learn design patterns', 'Learn data structures'], 'todoItems' )
    };
  }

  // The method to call.
  addItem() {
    this.state.todoItems.push( document.getElementById( 'new-todo-item' ).value );
  }

}
```

---

## Features Roadmap:
- [x] Implement component property rendering
- [x] Implement component state property data binding
- [x] Implement "for" loop template with component property rendering for arrays
- [x] Implement component state property data binding for "for" loops
- [x] Implement component method calls from template events
- [ ] Implement component scoped style injections
- [ ] Implement "for" loop template with component property rendering for objects
- [ ] Implement "if" statement template
- [ ] Implement support for having sub-components (render components inside other components)
- [ ] Implement multiple pages
- [ ] Optimize (space and time)

---

## Motivation:
My teacher told the class to make a project using HTML, CSS and JQuery.<br/>
I already had experience working with these technologies, so I decided to make my own framework.<br/>
It's inspired by Angular, React and even ASP.NET.<br/>
This is a work in progress.
