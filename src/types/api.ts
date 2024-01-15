// api列表返回
export interface ApiListRespType {
  path: string; //'v1/sys/api/getApiList';
  description: string; //'描述';
  apiGroup: string; //'api组';
  method: keyof typeof ApiMethodEnum; //'GET';
  ID: number;
}
export interface ListSearchType {
  path: string;
  description: string;
  apiGroup: string;
  method: string;
  orderKey: string;
  desc: boolean;
}

export enum ApiMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}
