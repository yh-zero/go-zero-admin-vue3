import http from '../request';
import { UserListType, EditUserInfoType } from '@/types/userList';

// 新增用户
export const register = (data: UserListType): Promise<string> => {
  return http.post('/v1/sys/register', data);
};

// 获取用户列表
export const getUserList = (data: IProgressReq): Promise<IProgressResp<UserListType>> => {
  return http.get('/v1/sys/getUserList', data);
};

// 修改用户信息
export const editUserList = (data: EditUserInfoType) => {
  return http.put('/v1/sys/updateUserInfo', data);
};

// 重置密码
export const resetUserPassword = (data: { userId: number }) => {
  return http.put('/v1/sys/resetUserPassword', data);
};

// 删除用户
export const deleteUser = (data: { userId: number }) => {
  return http.delete('/v1/sys/deleteUser', data);
};
