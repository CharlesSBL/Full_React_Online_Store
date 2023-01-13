// custom typy dannych
// pozwala dla webpacka oznaczac i TS, typy (svg, png)
// daje im typ any i exportuje ich jako default typu (any)
declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.scss" {
  const content: any;
  export default content;
}
