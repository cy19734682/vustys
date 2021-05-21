<template>
  <div>
    <counterUpper class="counterNum" :amount="amount"/>
  </div>
</template>

<script>
  export default {
    name: "counterUpperR",
    components: {},
    data() {
      return {
        amount: ""
      }
    },
    mounted() {
      this.amount = "51515151.00"
    },
  }
</script>

<style scoped>
.counterNum{
  display: block;
  padding: 100px 0;
  text-align: center;
  font-size: 20px;
}
</style>