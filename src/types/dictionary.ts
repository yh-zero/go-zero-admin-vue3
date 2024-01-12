export interface DictionaryListResp {
  ID?: number;
  name: string; //字典名 中文
  type: string; //字典名 英文
  status: number;
  desc: string; //描述
  sysDictionaryInfoList: any[];
}

// 详情列表返回
export interface DictionaryDetailListResp {
  ID?: 1;
  label: string; //展示值
  value: number; //字典值
  extend: string; //拓展值
  status: number; //启用状态
  sort: number; //排序
  sysDictionaryID?: number; // 父级Id
}
