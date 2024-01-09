declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

declare type RefType<T> = T | null;

declare type LabelValueOptions = {
  label: string;
  value: any;
  [key: string]: string | number | boolean;
}[];

declare type EmitType = (event: string, ...args: any[]) => void;

declare type TargetContext = '_self' | '_blank';

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

// 分页请求参数
declare interface IProgressReq {
  pageNo: number;
  pageSize: number;
}
// 分页结果返回
declare interface IProgressResp<T> {
  total: number;
  pageNo: number;
  pageSize: number;
  list: T[];
}
declare interface BaseData {
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}
// 选择类型
declare interface SelectType {
  value: any;
  label: string;
}
// 请求返回
declare interface RespType<T> {
  code: number;
  message: string;
  result: T;
  returnData: string;
  success: boolean;
  timestamp: number;
}
