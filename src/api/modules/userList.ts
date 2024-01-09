import http from '../request';
import { UserListType, EditUserInfoType } from '@/types/userList';

// 获取用户列表
export const getUserList = (data: IProgressReq): Promise<IProgressResp<UserListType>> => {
  return http.get('/v1/sys/getUserList', data);
};

// 修改用户信息
export const editUserList = (data: EditUserInfoType) => {
  return http.put('/v1/sys/updateUserInfo', data);
};
