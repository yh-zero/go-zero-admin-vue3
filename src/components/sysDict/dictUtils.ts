import { DiceDetail, DiceDetailReq } from '@/types/dictionary';
import { getSysDictionaryDetails } from '@/api/modules/dictionary';
// 根据类型获取字典详情
export async function getDictDetailByType(req: DiceDetailReq): Promise<DiceDetail> {
  const res = await getSysDictionaryDetails(req);
  return res;
}
