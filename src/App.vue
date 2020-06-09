<template>
  <div class="container">
    {{name}}
    <ul>
      <li v-for="item in lists" :key="item">{{item}}</li>
    </ul>
    <button @click="add">add</button>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data () {
    return {
      name: '34',
      lists: [1,2,3]
    }
  },
  created () {},
  methods: {
    add() {
      this.lists.push(this.lists.length+1)
    }
  }
}
</script>
<style >
.container{
  background: red;
}
</style>
