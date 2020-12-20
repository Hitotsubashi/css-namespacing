# css-namespacing

The `css-namespacing` allows add a namespace to specified class names.

## Getting Started

To begin, you'll need to install `css-namespacing`:

```console
$ npm install css-namespacing --save-dev
```

## Usage

1.Define `namespace` in option,and you can prefix all classnames with specified namspace .

```javascript
const namespacing = require("css-namespacing")
const before=`
  .box .box1{
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.5;
  }
`
const after=namespacing(before,{namespace:'bsp-'})
console.log(after)
/**
 * output:
 *  .bsp-box .bsp-box1{
 *    font-size: 1.5em;
 *    font-weight: bold;
 *    line-height: 1.5;
 *  }
 * /
```

2.If you define `not` in `option`, it skips some classnames that match the regular expression in `not`. ***Note: The element in not must be a regular expression.***

```javascript
const namespacing = require("css-namespacing")
const before=`
  .box1,.box2 .box3+.box4,
  .box5~.box6 .box7[class="box8 box9"]{

  }
`
const after=namespacing(before,{not:[/box2/, /box4/, /box5/, /box9/]})
console.log(after)
/**
 * output:
 *  .cst-box1,.box2 .cst-box3+.box4,
 *  .box5~.cst-box6 .cst-box7[class="cst-box8 box9"]{
 *
 *  }
 * /
```

3.If you define `only` in `option`, it adds a namespace to only those classnames that match the regular expression in `only`.***Note: If both `only` and `not` are defined in `options`, only will have a higher priority.***

```javascript
const namespacing = require("css-namespacing")
const before=`
  .box1,.box2 .box3+.box4,
  .box5~.box6 .box7[class="box8 box9"]{

  }
`
const after=namespacing(before,{only: [/box2/, /box4/], not: [/box3/, /box4/] })
console.log(after)
/**
 * .box1,.cst-box2 .box3+.cst-box4,
 * .box5~.box6 .box7[class="box8 box9"]{
 *
 * }
 * /
```

## Availability
Here shows some complex tests of namespacing.
If you want to read more tests to check if it works, read my [tests:unit](https://github.com/Hitotsubashi/css-namespacing/tree/master/tests/unit) directory.
Also ,you can find some CSS files being namespacing from my [tests:file](https://github.com/Hitotsubashi/css-namespacing/tree/master/tests/file) directory.

**(1) code with attribute selector**

before namespacing:
```css
.box[class="box2"] .box3[class=box4] input[class~='box5']
{
  border:5px solid blue;
}

.planet[moons=abc][class="warning important"] {color:red;}
```

after namespacing:
```css
.cst-box[class="cst-box2"] .cst-box3[class="cst-box4"] input[class~="cst-box5"]
{
  border:5px solid blue;
}

.cst-planet[moons=abc][class="cst-warning cst-important"] {color:red;}
```

**(2) code with annotation**

before namespacing:
```css
/*!
* blabla....
* blabla...
*/
html {
  box-sizing: border-box; //bla..
  -ms-overflow-style: scrollbar; 
}
/* check-check */
/* check-check */
*,
*::before,
*::after {
  box-sizing: inherit;
}
/* check-check */
.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
```

after namespacing:
```css
/*!
* blabla....
* blabla...
*/
html {
  box-sizing: border-box; //bla..
  -ms-overflow-style: scrollbar; 
}
/* check-check */
/* check-check */
*,
*::before,
*::after {
  box-sizing: inherit;
}
/* check-check */
.cst-container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}
```

**(3) code with pesudo-class**

before namespacing:
```css
@media screen and (max-width: 300.5px) {
  body .box :not(.crazy, .fancy) {
    font-family: sans-serif;
    font-size: .5em
  }
}
```

after namespacing:
```css
@media screen and (max-width: 300.5px) {
  body .cst-box :not(.cst-crazy, .cst-fancy) {
    font-family: sans-serif;
    font-size: .5em
  }
}
```
## Options
|Name| Type |Default|Description|Necessary|
|:---:|:-----: | :---: | :------: |:---:|
|**`data`**|`{String}`|`undefined`| The CSS code string you want to add namespace with  |`true`|
| **[`option`](#option)** | `{String}` |    `{}`   | The options of namespacing  |`false`|

### option
Type: `Object` Default: `{}`


### option.namespace
Type:`String` Default:`cst-`

The namespace to prefix

### option.not

Type:`Array<RegExp>` Default:`undefined`

The classname that is not be prefixed with namespace

### option.only

Type:`Array<RegExp>` Default:`undefined`

Only the classname of the namespace will be added, and the classname that is not matched by a regular expression in `only` will not be added

## License

[MIT](./LICENSE)