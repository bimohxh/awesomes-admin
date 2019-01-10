
## 开发流程

``` bash
# 安装依赖
npm install

# 启动开发服务器

# 虚拟机执行
npm start

# windows 下执行
npm run dev

# 发布（开发时候不用管）
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 关于

#### 框架选型
mvvm: vue

UI: tabler


#### 页面
页面文件都在 `/src/pages/` 目录下，后缀名为 `.vue`

比如访问地址是：`/account/info`，那么页面为 `/src/pages/account/info.vue`

#### 路由

当然只有页面是不够的，还需要配置路由 `/src/router/index.js`，格式为：

```javascript
const HomeLogin = () => import('@/pages/home/login')

...

{
  path: '/login',
  name: 'HomeLogin',
  component: HomeLogin
}

```

#### 组件

公用的组件要放到 `/src/components/` 目录下，一个组件也是一个 `.vue` 文件


#### 菜单

顶部菜单的配置文件是 `/src/lib/menu.json`

#### 权限

每次登陆后拿到当前账号的权限，会去做下面两个级别的权限过滤

- 页面级别
- 元素级别（菜单、按钮）

