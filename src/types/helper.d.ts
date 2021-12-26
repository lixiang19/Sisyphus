type ObjectKeys<T> =
  T extends object ? (keyof T)[] :
    T extends number ? [] :
      T extends Array<any> | string ? string[] :
        never;
interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>
}
interface IAnyPropObject {
  [key: any]: any;
  [index: number]: any;
  [property: string]: any
}
type BaseSize = {
  xs: string;
  sm: string,
  md: string,
  lg: string,
  xl: string,
  xxl: string,
  full: string,
  '1/2': string,
  '1/3': string,
  '2/3': string,
  '1/4': string,
  '3/4': string,
  'auto': string,
}
type Size= {
  [index: number]: string;
  [property: string]: string;
}&BaseSize
type SizeKey = keyof Size
type ISizeUse = {
  [key in SizeKey]: IAnyPropObject
}
type Pos = {
  t:string,
  r:string,
  b:string,
  l:string,
  x?:string,
  y?:string,
  all?:string
}
type PosKey = keyof Pos
type PosSize ={
  [key in PosKey]:ISizeUse
}
