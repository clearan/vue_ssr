<template>
<button @click="handleClick">测试出发app组件的hello事件</button>
 <div>
   姓：<input type="text" v-model="person.firstName">
   名：<input type="text" v-model="person.lastName">
   <div>{{person.fullName}}</div>
   <div>
     <input type="text" v-model="person.fullName">
   </div>
 </div>
  <p>{{sum}}</p>
  <button @click="sum++">点我</button>
  <hr>
  <div>
    姓名<span>{{result.name}}</span>
    年龄<span>{{result.age}}</span>
    薪资<span>{{result.job.j1.salary}}</span>
  </div>
  <button @click="result.name+='!'">更新姓名</button>
  <button @click="result.age+=1">更新年龄</button>
  <button @click="result.job.j1.salary+=1">涨薪</button>
</template>

<script>
import {computed, reactive, ref, watch} from "vue";

export default {
  name: "demo",
  props: ['msg'],
  emits: ['hello'], // 向父组件抛出的自定义事件，可以不写
  setup(props, context) {
    // props:
    console.log('props', props)
    console.log('context', context)
    console.log('attrs', context.attrs) // 相当于vue2中的attrs
    console.log('slot', context.slots)
    function handleClick() {
      context.emit('hello', 666) // 触发自定义事件
    }
    const person = reactive({
      firstName: '张',
      lastName: '三',
    })
    /*person.fullName = computed(() => {
      return person.firstName + person.lastName
    })*/
    person.fullName = computed({
      get() {
        return person.firstName + '-'+ person.lastName
      },
      set(val) {
        console.log(val)
        const name = val.split('-')
        person.firstName = name[0]
        person.lastName = name[1]
      }
    })
    const sum = ref(0)
    watch(sum, (newVal, oldVal) => {
      console.log(newVal,oldVal)
    })
    const result = reactive({
      name: '梁以熏',
      age: 17,
      job: {
        j1: {
          salary: 20
        }
      }
    })
    watch(result, (newVal, oldVal) => {
      // console.log(111, newVal, oldVal)
    }, {deep: false}) // 此处deep设置无效

    // 监听对象中的某个属性，需要写成函数的形式
    watch(()=> result.name, (newVal, oldVal) => {
      console.log(222, newVal, oldVal)
    })

    watch(() => result.job, (newVal, oldVal) => {
      console.log(333, newVal, oldVal)
    })
    return {
      result,
      person,
      sum,
      handleClick
    }
  },
}
</script>

<style scoped>

</style>
