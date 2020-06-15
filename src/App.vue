<template>
  <div class="bgc">
    xxxxx
    <p class="base">{{name}}</p>
    <ul>
      <li v-for="item in lists" :key="item">{{item}}</li>
    </ul>
    <button @click="add">d</button>
    <div class="bgc">ddffa</div>
    <div class="img"></div>
    <img src="./assets/images/moto.jpg" alt="">
    <img src="./assets/images/moto.jpg" alt="">
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
  created() {
    console.log(111);
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
@import 'css/base.less';
@import 'css/main.less';
</style>

<style scoped lang="less">
.container{
  background: gold;
  height: 600px;
}
</style>
