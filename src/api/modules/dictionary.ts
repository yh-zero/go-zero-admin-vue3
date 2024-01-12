import http from '../request';
import { DictionaryDetailListResp, DictionaryListResp } from '@/types/dictionary';

//新增字典列表
export const createSysDictionary = (data: DictionaryListResp): Promise<string> => {
  return http.post('/v1/sys/dictionary/createSysDictionary', data);
};
// 获取字典列表 全部
export const getSysDictionaryList = (): Promise<{ list: DictionaryListResp[] }> => {
  return http.get('/v1/sys/dictionary/getSysDictionaryList');
};
// 修改字典列表
export const updateSysDictionary = (data: DictionaryListResp): Promise<string> => {
  return http.put('/v1/sys/dictionary/updateSysDictionary', data);
};

// 删除字典
export const deleteSysDictionary = (data: { id: number }): Promise<string> => {
  return http.delete('/v1/sys/dictionary/deleteSysDictionary', data);
};

// ======================
// 获取字典详情列表
export const getSysDictionaryInfoList = (data: IProgressReq & { sysDictionaryID: number }): Promise<IProgressResp<DictionaryDetailListResp>> => {
  return http.get('/v1/sys/dictionary/getSysDictionaryInfoList', data);
};

// 新增字典详情
export const createSysDictionaryInfo = (data: DictionaryDetailListResp): Promise<string> => {
  return http.post('/v1/sys/dictionary/createSysDictionaryInfo', data);
};
// 修改字典详情
export const updateSysDictionaryInfo = (data: DictionaryDetailListResp): Promise<string> => {
  return http.put('/v1/sys/dictionary/updateSysDictionaryInfo', data);
};

// 删除字典详情
export const deleteSysDictionaryInfo = (data: { id: number }): Promise<string> => {
  return http.delete('/v1/sys/dictionary/deleteSysDictionaryInfo', data);
};
