<template>
  <div id="app">
    <el-menu router :default-active="activeIndex" @select="select">
      <el-menu-item
        v-for="route in routes" :key="route.path"
        :index="route.path">
        {{ route.name }}
      </el-menu-item>
    </el-menu>
    <div ref="content" class="content">
      <a href="https://github.com/ywwhack/bdi-ui" class="github-corner">
        <svg viewBox="0 0 250 250">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path>
        </svg>
      </a>
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

  watch: {
    '$route': 'adjustGithubCornerPos'
  },

  methods: {
    select (index) {
      this.activeIndex = index
    },

    adjustGithubCornerPos () {
      const contentDom = this.$refs.content
      if (contentDom) {
        setTimeout(() => {
          const githubCornerDom = contentDom.getElementsByClassName('github-corner')[0]
          if (contentDom.scrollHeight > contentDom.clientHeight) {
            // 存在滚动条，将 github-corner 向左移动 15px（滚动条的宽度）
            githubCornerDom.style.right = '15px'
          } else {
            githubCornerDom.style.right = 0
          }
        }, 0)
      }
    }
  },

  created () {
    this.routes = routes
    // 刷新页面时，根据 route-path 更新 activeIndex
    const route = routes.find(item => item.path === this.$route.path)
    if (route) {
      this.activeIndex = route.path
    }
  },

  mounted () {
    this.adjustGithubCornerPos()
  }
}
</script>

<style lang="scss">
@import './styles/var.scss';

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

    & > .github-corner {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 1000;

      & > svg {
        width: 80px;
        height: 80px;
        color: #fff;
        fill: $--color-primary;
      }
    }

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
  }
}
</style>
