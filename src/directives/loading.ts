import type { Directive, App } from 'vue';
import { createLoading } from '@/components/Loading/createLoading';
const loadingDirective: Directive = {
  mounted(el: any, binding: any) {
    // 获取使用指令的el 身上所绑定的属性
    const tip = el.getAttribute('loading-tip');
    const background = el.getAttribute('loading-background');
    const size = el.getAttribute('loading-size');
    //是否全屏loading  使用时候可以 v-load:foo.fullscreen="true|false"
    const fullscreen = !!binding.modifiers.fullscreen;
    const instance = createLoading(
      {
        tip: tip || '',
        background,
        size: size || 'large',
        loading: !!binding.value,
        absolute: !fullscreen,
      },
      fullscreen ? document.body : el,
    );
    // 更新时候用到 所以将loading实例绑定在el上
    el.instance = instance;
  },

  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
    }
  },

  unmounted(el) {
    el?.instance?.close();
  },
};

export function setupLoadingDirective(app: App, name: string) {
  app.directive(name, loadingDirective);
}

export default loadingDirective;
