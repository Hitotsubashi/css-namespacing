declare interface Option{
  namespace:string
  not:Array<RegExp>
  only:Array<RegExp>
}

declare interface Segment{
  source:string
  option:Option
}

declare interface HandlerRecord{
  [prop:string]:string
}

declare interface SchemaCheck{
  schema:object
  config:object
}