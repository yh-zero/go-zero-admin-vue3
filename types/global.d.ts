export {};

declare global {
  /**
   * 现在声明进入全局命名空间的类型，或者增加全局命名空间中的现有声明。
   */

  declare type Nullable<T> = T | null;
  declare type NonNullable<T> = T extends null | undefined ? never : T;
  declare type Recordable<T = any> = Record<string, T>;
  declare type Key = string | number;
}
