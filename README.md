# css-namespacing

The `css-namespacing` allows add a namespace to all class names.

## Getting Started

To begin, you'll need to install `css-namespacing`:

```console
$ npm install css-namespacing --save-dev
```

## Usage

```javascript
const namespacing = require("css-namespacing")
const before=`
  .box .box1{
    font-size: 1.5em;
    font-weight: bold;
    line-height: 1.5;
  }
`
const after=namespacing(before,'bsp-')
console.log(after)
// output:
// .bsp-box .bsp-box1{
//   font-size: 1.5em;
//   font-weight: bold;
//   line-height: 1.5;
// }
```
## Availability
Here shows some tests of namespacing.
If you want to read more tests to check if it works, read my [tests:unit](https://github.com/Hitotsubashi/css-namespacing/tree/master/tests/unit) directory.
Also ,you can find some CSS files being namespacing in my [tests:file](https://github.com/Hitotsubashi/css-namespacing/tree/master/tests/file) directory.

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

## Options
|           Name            |                   Type                    |   Default   | Description     |
| :-------------: | :---------------------------------------: | :---------: | :-------------- |
|   **`data`**    | `{String}` | `undefined` | The CSS code string you want to add namespace with  |
| **`namespace`** | `{String}` |    `cst-`   | The value of namespace  |

## License

[MIT](./LICENSE)