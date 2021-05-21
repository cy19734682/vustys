<template>
  <div>
    <div class="menuBox">
      <h3>目录</h3>
      <ol class="menuList">
        <li v-for="(item,index) of routeArr" :key="'menu'+index">
          <span style="margin-right: 8px">{{index+1}}.</span>
          <router-link class="rLinkN" :to="item.path">{{item.name}}</router-link>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    computed: {
      routeArr() {
        return this.$router.options.routes.filter(e => {
          if (e.name && e.name !== '首页') {
            return e
          }
        })
      },
    },
    data() {
      return {
      }
    },
    mounted() {
    },
  }
</script>

<style lang="less" scoped>
  .menuBox {
    padding: 20px 20px 20px 80px;
    overflow-y: auto;

    .menuList {
      display: flex;
      flex-wrap: wrap;
      list-style: none;

      > li {
        width: 250px;
        margin-right: 15px;
        line-height: 40px;

        .rLinkN {
          color: #46be87;
        }
      }
    }
  }
</style>
