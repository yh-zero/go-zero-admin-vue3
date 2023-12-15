## 移动端模板

## vite + pinia  + ts + ViewUIPlus + tailwindCss 

### 常用目录别名

```js
alias: {
  '@': '/src',
}
```

### scss 支持、variables.scss、common.scss

选择 scss 作为 css 预处理，并对 variables、common.scss 作全局引入。
```js
css: {
    preprocessorOptions: {
      // 引入公用的样式
      scss: {
        additionalData: `@import "@/styles/common.scss";@import "@/styles/variable.scss";`,
      }
    }
  }
```
### 模块化自动注册
vuex, router 模块化<br>
使用 vite import.meta.globEager 方法获取文件上下文<br>
下面用路由自动注册为例

```js
//模块化路由，将router 文件夹下的ts文件内路由自动导入
const routesModules = import.meta.globEager('./**/*.ts')
const modules: Array<RouteRecordRaw> = []
Object.keys(routesModules).forEach(key => {
  modules.push(...routesModules[key].default)
})
routes = routes.concat(modules)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
```
