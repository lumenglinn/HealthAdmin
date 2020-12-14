import request from '@/utils/request';

export interface queryIncomeParamsType {
  startDateTime?: string;
  endDateTime?: string;
  pageSize?: string;
  pageNum?: string;
}

// 统计日期收入
export async function queryIncome(params: queryIncomeParamsType): Promise<any> {
  return request(`/api/pc/finance/query/sum/income`, {
    method: 'POST',
    data: params,
  });
}