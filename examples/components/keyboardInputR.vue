<template>
  <div class="inputNum">
    <div class="item">
      <div class="buyLabel">购买金额：</div>
      <div class="buyInput">
        <KeyboardInput ref="keyInput" :placeholder='"请最低输入1000元"' inter="14" decimal="2" v-model="totPrice"/>
      </div>
    </div>
    <div style="padding-top: 50px">
      <div>输入的值为：{{totPrice}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "keyboardInputR",
    components: {},
    data() {
      return {
        totPrice: ""
      }
    },
    mounted() {
    },
  }
</script>

<style scoped lang="less">
.inputNum{
  padding: 50px 10px;
  .item{
  }
  .buyLabel{
    width: 80px;
    display: inline-block;
    vertical-align: top;
    height: 25px;
  }
  .buyInput{
    border-bottom: 0.5px solid #EDEDED;
    width: calc(~"100% - 80px");
    display: inline-block;
    vertical-align: top;
    height: 25px;
  }
}
</style>