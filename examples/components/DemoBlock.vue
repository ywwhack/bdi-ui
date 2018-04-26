<template>
  <div
    class="demo-block"
    :class="{ 'hover': hovering }"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div
      class="demo-block-control"
      @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      hovering: false,
      isExpanded: false
    }
  },

  computed: {
    iconClass ({ isExpanded }) {
      return isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
    },

    controlText ({ isExpanded }) {
      return isExpanded ? '隐藏代码' : '显示代码'
    },

    codeArea () {
      return this.$refs.meta
    },

    codeAreaHeight () {
      const descriptionDom = this.$el.getElementsByClassName('description')[0]
      const highlightDom = this.$el.getElementsByClassName('highlight')[0]
      return descriptionDom
        ? descriptionDom.clientHeight + highlightDom.clientHeight + 22 /* 22 = descriptionDom 元素的 margin + border */
        : highlightDom.clientHeight
    }
  },

  watch: {
    'isExpanded' (val) {
      // 1px 是 meta 的 border-top
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
    }
  }
}
</script>

<style lang="scss">
.demo-block {
  position: relative;
  border: solid 1px #ebebeb;
  border-radius: 3px;
  transition: .2s;

  &.hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
  }

  code {
    font-family: Menlo, Monaco, Consolas, Courier, monospace;
  }

  .source {
    padding: 24px;
  }

  .meta {
    background-color: #fafafa;
    border-top: solid 1px #eaeefb;
    overflow: hidden;
    height: 0;
    transition: height .2s;
  }

  .description {
    padding: 20px;
    box-sizing: border-box;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin: 10px;
    background-color: #fff;

    p {
      margin: 0;
      line-height: 26px;
    }

    code {
      color: #5e6d82;
      background-color: #e6effb;
      margin: 0 4px;
      display: inline-block;
      padding: 1px 5px;
      font-size: 12px;
      border-radius: 3px;
      height: 18px;
      line-height: 18px;
    }
  }

  .highlight {
    pre {
      margin: 0;
    }

    code.hljs {
      margin: 0;
      border: none;
      max-height: none;
      border-radius: 0;

      &::before {
        content: none;
      }
    }
  }

  .demo-block-control {
    border-top: solid 1px #eaeefb;
    height: 44px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: center;
    margin-top: -1px;
    color: #d3dce6;
    cursor: pointer;
    position: relative;

    i {
      font-size: 16px;
      line-height: 44px;
      transition: .3s;
      &.hovering {
        transform: translateX(-40px);
      }
    }

    > span {
      position: absolute;
      transform: translateX(-30px);
      font-size: 14px;
      line-height: 44px;
      transition: .3s;
      display: inline-block;
    }

    &:hover {
      color: #409eff;
      background-color: #f9fafc;
    }

    .text-slide-enter,
    .text-slide-leave-active {
      opacity: 0;
      transform: translateX(10px);
    }
  }
}
</style>
