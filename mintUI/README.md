# mintui

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### ESLint配置

在vscode配置文件setting.json中添加如下配置，保存文件时会自动修复格式错误：
```
"eslint.autoFixOnSave": true,
"eslint.validate": [
    "javascript",
    "html",
    {
        "language": "vue",
        "autoFix": true
    },
    {
        "language": "javascript",
        "autoFix": true
    },
],
```
