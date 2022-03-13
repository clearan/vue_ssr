<template>
<div>我是一个组件</div>
  <p>{{name}}</p>
  <button @click="say">点我</button>
  <demo msg="你好啊" @hello="showMsg">
    <template v-slot:qwe><span>我是slot</span></template>
  </demo>
</template>

<script>
// ref 定义基本类型数据  也可以用来定义对象或数组，内部自动通过reactive转为代理对象
// reactive 对象或者数组

// ref通过Object.defineProperty的get和set来实现响应式
// reactive通过Proxy实现响应式，并通过Reflect操作源对象内部的数据

// ref操作数据需要.value 模块中不需要
// reactive不需要

// setup的执行时机，再beforeCreate之前执行一次 this是undefined
import {h, ref, reactive} from 'vue'
import demo from './components/demo.vue'
export default {
  name: "app",
  components: {demo},
  setup() {
    let name = ref('周杰伦')
    let obj = ref({
      age: 30,
      list: {
        id: 1,
        result: {
          name: 'clear'
        }
      }
    })
    let m = reactive({
      name: 'cc'
    })
    console.log('m', m)
    function say() {
      name.value = '刘德华'
      console.log(obj)
      console.log(obj.value.list)
      console.log(obj.value.list.result)
      m.b = '我是新增的'
      console.log(m)
    }
    function showMsg(value) {
      console.log('收到参数', value)
    }
    return {
      name,
      say,
      showMsg
    }
    // return () => {
    //   return h('h1','clear') // 返回渲染函数，此时template里面的无效了
    // }
  },
}
</script>

<style scoped>

</style>
