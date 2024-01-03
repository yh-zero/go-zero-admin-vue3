export {};

declare global {
  /**
   * 现在声明进入全局命名空间的类型，或者增加全局命名空间中的现有声明。
   */
  // 分页请求参数
  interface IProgressReq {
    pageNo: number;
    pageSize: number;
  }
  // 分页结果返回
  interface IProgressResp<T> {
    total: number;
    pageNo: number;
    pageSize: number;
    list: T[];
  }
  interface BaseData {
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string;
  }
  // 选择类型
  interface SelectType {
    value: any;
    label: string;
  }
}
