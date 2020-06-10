<template>
  <div class="bgc">
    <p>{{name}}</p>
    <ul>
      <li v-for="item in lists" :key="item">{{item}}</li>
    </ul>
    <div class="bgc">ddffa</div>
    <!-- <img src="./assets/images/moto.jpg" alt=""> -->
    <button @click="add">d</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '344',
      lists: [1,2,3]
    }
  },
  methods: {
    add() {
      this.lists.push(this.lists.length+1)
    }
  }
}
</script>
<style scoped lang="less">
@import 'css/index1.less';
@import 'css/main.less';
</style>

<style scoped lang="less">
.container{
  background: gold;
  height: 600px;
}
</style>
