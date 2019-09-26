# VueJS
<!-- @author DHJT 2019-01-22 -->

```js
const vm = new VUE({
    el: '#demo',
    data: {

    },
    methods: {
        reverseMessage: function () {
            this.message = this.message.split('').reverse().join('')
        }
    }
})
```
## Vue CLI
```sh
npm install -g @vue/cli
# OR
yarn global add @vue/cli
npm install  -g @vue/cli-init

````

### 样式绑定

条件渲染指令
v-if
v-else
v-show
