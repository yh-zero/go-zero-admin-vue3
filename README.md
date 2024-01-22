## go-zero-admin

### 后端：[https://github.com/yh-zero/go-zero-admin](https://github.com/yh-zero/go-zero-admin)
### 前端：[https://github.com/yh-zero/go-zero-admin-vue3](https://github.com/yh-zero/go-zero-admin-vue3)

## vite + pinia  + ts + antDesignVue4.x + tailwindCss + formily2.x

## 安装依赖
```js
  yarn install
```

## 启动项目
```js
  yarn dev
```

### 目录结构
```js
|-- go-zero-admin                           # 项目根目录
    |-- vite.config.ts                      # Vite 配置文件
    |-- build                                # 构建相关文件夹
    |   |-- proxy.ts                         # 代理配置文件
    |-- public                               # 静态资源文件夹
    |-- src                                  # 源代码文件夹
    |   |-- App.vue                          # 根组件
    |   |-- env.d.ts                         # 环境声明文件
    |   |-- main.ts                          # 入口文件
    |   |-- style.css                        # 公共样式文件
    |   |-- tailwind.css                     # Tailwind CSS 文件
    |   |-- vite-env.d.ts                    # Vite 环境声明文件
    |   |-- api                               # API相关文件夹
    |   |   |-- http.ts                       # HTTP 请求封装
    |   |   |-- modules                       # API模块文件夹
    |   |       |-- api.ts                    # API模块文件
    |   |-- assets                            # 资源文件夹
    |   |-- components                        # 组件文件夹
    |   |   |-- Layout                        # 布局组件文件夹
    |   |   |-- Loading                       # 加载组件文件夹
    |   |   |-- sysDict                       # 系统字典组件文件夹
    |   |-- config                            # 配置文件夹
    |   |-- directives                        # 自定义指令文件夹
    |   |-- hooks                             # 自定义钩子文件夹
    |   |-- router                            # 路由配置文件夹
    |   |-- store                             # 状态管理文件夹
    |   |-- styles                            # 样式文件夹
    |   |-- types                             # 类型声明文件夹
    |   |-- utils                             # 工具函数文件夹
    |   |-- views                             # 视图文件夹
    |-- types                                 # 全局类型声明文件夹
```
### 提交代码 yarn commit 命令
