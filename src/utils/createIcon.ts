import { App } from 'vue';
import * as antIcons from '@ant-design/icons-vue';
const loadAntIcons = (app: App) => {
  Object.keys(antIcons).forEach(iconName => {
    app.component(iconName, antIcons[iconName as keyof typeof antIcons]);
  });
};
export default loadAntIcons; // 导出
