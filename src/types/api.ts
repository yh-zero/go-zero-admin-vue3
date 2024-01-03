// api列表返回
export interface ApiListRespType {
  path: string; //'v1/sys/api/getApiList';
  description: string; //'获取api列表';
  apiGroup: string; //'api';
  method: string; //'GET';
  ID: number;
}
