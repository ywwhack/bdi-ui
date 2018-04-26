<template>
  <div id="app">
    <el-menu router :default-active="activeIndex" @select="select">
      <el-menu-item
        v-for="route in routes" :key="route.path"
        :index="route.path">
        {{ route.name }}
      </el-menu-item>
    </el-menu>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>  
</template>

<script>
import routes from './router/routes'

export default {
  data () {
    return {
      activeIndex: null
    }
  },

  methods: {
    select (index) {
      this.activeIndex = index
    }
  },

  created () {
    this.routes = routes
    // 刷新页面时，根据 route-path 更新 activeIndex
    const route = routes.find(item => item.path === this.$route.path)
    if (route) {
      this.activeIndex = route.path
    }
  }
}
</script>

<style lang="scss">
#app {
  overflow: hidden;
  display: flex;
  height: 100%;

  h2 {
    font-size: 28px;
    color: #1f2d3d;
    margin: 0;
  }
  h3 {
    font-size: 22px;
  }
  h2, h3, h4, h5 {
    font-weight: normal;
    color: #1f2f3d;
  }

  p {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }

  & > .content {
    overflow: auto;
    flex: 1;
    padding: 10px;

    h3 {
      margin: 55px 0 20px;
    }

    table {
      border-collapse: collapse;
      width: 100%;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 45px;
      line-height: 1.5em;

      strong {
        font-weight: normal;
      }

      td, th {
        border-bottom: 1px solid #d8d8d8;
        padding: 15px;
        max-width: 250px;
      }

      th {
        text-align: left;
        white-space: nowrap;
        color: #666;
        font-weight: normal;
      }

      td {
        color: #333;
      }

      th:first-child, td:first-child {
        padding-left: 10px;
      }
    }

    ul:not(.timeline) {
      margin: 10px 0;
      padding: 0 0 0 20px;
      font-size: 14px;
      color: #5e6d82;
      line-height: 2em;
    }
  }
}
</style>
