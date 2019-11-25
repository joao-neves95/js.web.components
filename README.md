# js.web.components

## Observations:

**All of this can and will change in the future.**

js.web only supports the main browsers (I.e.: Firefox, Chrome, Opera, Safari).<br>
js.web does not support Internet Explorer.

## Specification

### Component Property Rendering:
`<_> [property-to-reder] </_>`

#### Example:

Component:
``` js
class TestComponent extends Component {

  constructor() {
    super( 'app-test', <template: string>, [''] );

    this.title = 'My Website';
  }

}
```

Template:
``` html
<div class="container">
    <h1> <_> title </_> </h1>
</div>
```

### Component State Property Rendering with Binding:
`<_> state.[property-to-reder] </_>`

#### Example:

Component:
``` js
class TestComponent extends Component {

  constructor() {
    super( 'app-test', <template: string>, [''] );

    this.state = this.createState( {
      myName: 'João Neves'
    } );
  }

}
```

Template:
``` html
<div class="container">
    <!-- DATA BINDING -->
    <p> <_> state.myName </_> </p>
</div>
```

### Component Property Iteration Rendering:

#### Example:

Component:
``` js
class NameListComponent extends Component {

  constructor() {
    super( 'app-nameList', <template: string>, [''] );

    this.names = ['John Doe', 'Oliver Hoe', 'Fiona Silva'];

  }

}
```

Template:
``` html
<div class="container">
    <ul>
        <_for let="person of names">
            <li> <_>person</_> </li>
        </_for>
    </ul>
</div>
```


## Features Roadmap:
- [x] Implement component property rendering
- [x] Implement component state property data binding
- [x] Implement for loop template with component property rendering from an array
- [ ] Implement for loop template with component property rendering from an object
- [ ] Implement component state property data binding for complex templates like for loops
- [ ] Implement if statement template
- [ ] Implement support for having sub-components (render components inside other components)

## Motivation:
My teacher told the class to make a project using HTML, CSS and JQuery.<br/>
I already had experience working with these technologies, so I've asked him if I could use Angular or other framework. He said no.<br/>
So, I decided to make my own framework.<br/>
It's inspired by Angular, React and even ASP.NET.<br/>
This is a work in progress.
