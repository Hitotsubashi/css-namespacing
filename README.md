# css-namespacing

`css-namespacing` allows you to quickly and precisely add the named namespace to the classname specified in the CSS code

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

2.If you define `not` in `option`, it skips some classnames that match the regular expression in `not`. ***Note: The element in `not` must be a regular expression.***

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

3.If you define `only` in `option`, it adds a namespace to only those classnames that match the regular expression in `only`.***Note: If both `only` and `not` are defined in `options`, `only` will have a higher priority.***

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
 * output:
 * .box1,.cst-box2 .box3+.cst-box4,
 * .box5~.box6 .box7[class="box8 box9"]{
 *
 * }
 * /
```

4.Support at-rules.You can also define `namespace` or `only` or `not` in your css code with `@namespacing` atrule.If you want to learn more about this usage of `@namespacing`,check [here](#AtRule:@namespacing).
```javascript
const namespacing = require("css-namespacing")
const before=`
  @namespacing prefix('my-') not([/box2/])
  .box{}
  .box2{}
`
const after=namespacing(before)
console.log(after)
/**
 * output:
 * .my-box{}
 * .box2{}
 * /
```

## Availability
If you want to read more tests to check if it works, read my [tests:unit](https://github.com/Hitotsubashi/css-namespacing/tree/master/tests/unit) directory.
Also ,you can find some CSS files being namespacing from my [tests:file](https://github.com/Hitotsubashi/css-namespacing/tree/master/tests/file) directory.

## Options
|Name| Type |Default|Description|Necessary|
|:---:|:-----: | :---: | :------: |:---:|
|**`data`**|`{String}`|`undefined`| The CSS code string you want to add namespace with  |`true`|
| **[`option`](#option)** | `{String}` |    `{}`   | The options of namespacing  |`false`|

### option
Type: `Object` Default: `{}`


- option.namespace

  Type:`String` Default:`cst-`

  The namespace to prefix

- option.not

  Type:`Array<RegExp>` Default:`undefined`

  The classname that is not be prefixed with namespace

- option.only

  Type:`Array<RegExp>` Default:`undefined`

  Only the classname of the namespace will be added, and the classname that is not matched by a regular expression in `only` will not be added

## AtRule:@namespacing

1.You can define `prefix` after `@namespacing` to change in the namespace prefix, this value has higher priority than the `namespace` defined in the `option`.

```javascript
const namespacing = require("css-namespacing")
const before=`
  .box[title=W3School]
  {
    border:5px solid blue;
  }
  @namespacing prefix('my1-')
  .box1{
    font-size:1.5em;
  }
  @namespacing prefix('my2-')
  .box2{
    line-height:1.5;
  }
`
const after=namespacing(before,{namespace:'my-'})
console.log(after)
/**
 * output:
 * .my-box[title=W3School]
 *  {
 *    border:5px solid blue;
 *  }
 *  .my1-box1{
 *    font-size:1.5em;
 *   }
 *  .my2-box2{
 *    line-height:1.5;
 *  }
 * /
```

2.You can also define `not` or `only` after `@namespacing` ,The `only` and `not` in the @namespacing are merged with the `only` and `not` arrays in the `option`, respectively.***Note: The data structure of `not` and `only` here are the same as in `option`***



```javascript
const namespacing = require("css-namespacing")
const before=`
  .box{}
  .box2{}
  @namespacing not([/box3/])
  .box3{}
  .box{}
  .box2{}
`
const after=namespacing(before,{ not: [/box2/] })
console.log(after)
/**
 * output:
 * .cst-box{}
 * .box2{}
 * .box3{}
 * .cst-box{}
 * .box2{}
 * /
```

```javascript
const namespacing = require("css-namespacing")
const before=`
  .box{}
  .box2{}
  @namespacing only([/box2/])
  .box{}
  .box2{}
`
const after=namespacing(before,{ only: [/^box$/]})
console.log(after)
/**
 * output:
 * .cst-box{}
 * .box2{}
 * .cst-box{}
 * .cst-box2{}
 * /
```
## License

[MIT](./LICENSE)