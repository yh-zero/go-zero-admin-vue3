import { App } from 'vue';
import * as antIcons from '@ant-design/icons-vue';
import { setIcon } from '@/utils/iconList';
const loadAntIcons = (app: App) => {
  const iconList: string[] = [];
  Object.keys(antIcons).forEach((iconName: string) => {
    iconList.push(iconName);
    app.component(iconName, antIcons[iconName as keyof typeof antIcons]);
  });
  setIcon(iconList);
};
export default loadAntIcons; // 导出
