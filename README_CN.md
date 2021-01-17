# css-namespacing

`css-namespacing` 插件可以让你更快更准确地给CSS代码中指定的类添加命名空间

## 入门

开始之前，你要先通过npm安装 `css-namespacing`:

```console
$ npm install css-namespacing --save-dev
```

## 用法

1.通过在`option`对象中定义`namespace`的值,你可以给所有的类名添加指定的命名空间前缀.

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

2.通过定义`option`中的`not`，可以对与`not`中的正则表达式符合的类名进行过滤，被过滤的类名不会被添加前缀。***注意: `not`数组的元素类型必须是正则表达式.***

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

3.通过定义`option`中的`only`，可以只对`only`中指定类名添加命名空间.***注意: 如果 `only` 和 `not` 都被定义了, `only` 会有更高的优先级.***

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

4.支持注解@规则.你也可以在CSS代码中通过`@namespacing`中定义上述的`namespace` 和 `only` 以及 `not`.如果你想了解关于`@namespacing`的更多用法,请查看 [这里](#注解).

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

## 有效性
如果你通过查看更多测试用例去确定其有效性，可点击此[tests:unit](https://github.com/Hitotsubashi/css-namespacing/tree/master/tests/unit) 文件夹.
另外，你也可以通过[tests:file](https://github.com/Hitotsubashi/css-namespacing/tree/master/tests/file) 文件夹去对比看转化前后的CSS文件.

## 函数参数
|名称| 类型 |默认值|描述|是否必须|
|:---:|:-----: | :---: | :------: |:---:|
|**`data`**|`{String}`|`undefined`| 你要添加命名空间的CSS代码字符串  |`true`|
| **[`option`](#option)** | `{String}` |    `{}`   | 命名空间配置  |`false`|

### option
类型: `Object` 默认值: `{}`


- option.namespace

  类型:`String` 默认值:`cst-`

  命名空间前缀

- option.not

  类型:`Array<RegExp>` 默认值:`[]`

  被数组中的正则表达式匹配的类名不会被添加命名空间

- option.only

  类型:`Array<RegExp>` 默认值:`[]`

  只有数组中的正则表达式匹配的类名才会被添加命名空间

## 注解

1.你可以在`@namespacing`后面定义`prefix`的值，该值的作用与`option`中的`namespace`一样且有更高的优先级

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

2.你也可以定义`@namespacing`后面定义 `not` 和 `only`  ,此处的 `only` 和 `not` 会分别与 `option`中的`only` 和 `not` 合并.***注意: 此处 `not` 和 `only` 的数据结构与在`option`中的`not`和`only`一致***



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

## 支持 Webpack
查看 [css-namespacing-loader](https://github.com/Hitotsubashi/css-namespacing-loader).
## License

[MIT](./LICENSE)