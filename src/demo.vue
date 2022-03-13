<template>
  <div class="container">Current user is: {{ name }}</div>
  <input type="text" v-model="name">
  <p>{{age}}</p>
</template>

<script>
import {reactive, toRefs, onMounted} from "vue";

export default {
  name: 'App',
  setup() {
    onMounted(() => {
      console.log(111)
    })
    const obj = reactive({
      name: 'jay',
      age: 30
    })
    return {
      ...toRefs(obj)
    }

  }
}
</script>
<style>
.container {
  background-color: pink;
  width: 300px;
  height: 100px;
}
</style>
