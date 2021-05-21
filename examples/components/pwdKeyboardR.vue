<template>
  <div class="inputNum">
    <div class="item">
      <div class="btn" @click="openPwd">交易密码</div>
      <div style="padding-top: 100px">密码：{{password}}</div>
    </div>
    <pwdKeyboard  ref="pwdKeyboard" title="请输入交易密码" @onComplete="completeFun" />
  </div>
</template>

<script>
  export default {
    name: "pwdKeyboardR",
    components: {},
    data() {
      return {
        password: ""
      }
    },
    mounted() {
    },
    methods:{
      openPwd(){
        this.$refs.pwdKeyboard.open()
      },
      completeFun(val){
        this.password = val
      }
    }
  }
</script>

<style scoped lang="less">
.inputNum{
  padding: 50px 10px;
  .btn{
    width: 150px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    text-align: center;
    border:1px solid #979696;
  }
}
</style>