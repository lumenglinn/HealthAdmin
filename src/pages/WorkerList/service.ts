import request from '@/utils/request';
import { TableListParams, TableListItem } from './data';

// export async function queryRule(params?: TableListParams) {
//   return request('/api/rule', {
//     params,
//   });
// }

// export async function removeRule(params: { key: number[] }) {
//   return request('/api/rule', {
//     method: 'POST',
//     data: {
//       ...params,
//       method: 'delete',
//     },
//   });
// }

// export async function addRule(params: TableListItem) {
//   return request('/api/rule', {
//     method: 'POST',
//     data: {
//       ...params,
//       method: 'post',
//     },
//   });
// }

// export async function updateRule(params: TableListParams) {
//   return request('/api/rule', {
//     method: 'POST',
//     data: {
//       ...params,
//       method: 'update',
//     },
//   });
// }


export interface createParamsType {
  // userName: string;
  // password: string;
  // mobile: string;
  // captcha: string;
}

// 新增/更新护工
export async function updateWorker(type: string, params: createParamsType): Promise<any> {
  return request(`/api/pc/server/${type}/server`, {
    method: 'POST',
    data: params,
  });
}

export interface updateLineStatusParamsType {
  serverId: string;
  onlineStatus: string;
}

// 护工上线，下线
export async function updateLineStatus(params: updateLineStatusParamsType): Promise<any> {
  return request(`/api/pc/server/update/onlineStatus`, {
    method: 'POST',
    data: params,
  });
}

export interface updateReviewedParamsType {
  serverId: string;
  reviewStatus: string;
}

// 护工上架，下架 
export async function updateReviewed(params: updateReviewedParamsType): Promise<any> {
  return request(`/api/pc/server/update/reviewed`, {
    method: 'POST',
    data: params,
  });
}

export interface queryListParamsType {
  reviewStatus: string;
  name?: string;
  onlineStatus?: string;
  pageSize?: number;
  pageNum?: number;
}

// 护工列表
export async function queryList(params: queryListParamsType): Promise<any> {
  return request(`/api/pc/server/query/server/list`, {
    method: 'POST',
    data: params,
  });
}

export interface queryWorkerParamsType {
  serverId: string;

}

// 护工个人信息
export async function queryWorker(params: queryWorkerParamsType): Promise<any> {
  return request(`/api/pc/server/query/server`, {
    method: 'POST',
    data: params,
  });
}

export interface queryHospitalParamsType {
  city: string;
  area: string;
}

// 查询医院列表
export async function queryHospital(params: queryHospitalParamsType): Promise<any> {
  return request(`/api/base/query/list/hospital`, {
    method: 'POST',
    data: params,
  });
}

// 护工技能
export async function querySkill(): Promise<any> {
  return request(`/api/base/query/list/skill`, {
    method: 'POST',
  });
}

// 上传头像 /upload/server/pic