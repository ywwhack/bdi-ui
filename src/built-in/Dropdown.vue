<template>
  <el-dropdown ref="dropdown" trigger="click" @visible-change="changeVisible">
    <div class="el-select" :class="[sizeClass.select]">
      <div
        class="el-input el-input--suffix"
        :class="{ 'is-focus': visible, [sizeClass.input]: true }">
        <input
          readonly
          autocomplete="false"
          type="text"
          placeholder="请选择"
          rows="2"
          class="el-input__inner"
          :value="title"
          :title="title">
        <span class="el-input__suffix">
          <span class="el-input__suffix-inner">
            <span
              class="el-select__caret el-input__icon el-icon-arrow-up"
              :class="{ 'is-reverse': visible }">
            </span>
          </span>
        </span>
      </div>
    </div>
    <el-dropdown-menu slot="dropdown" style="padding: 0;">
      <slot></slot>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>

export default {
  props: {
    size: {
      type: String,
      default: 'small'
    },
    title: String
  },

  data () {
    return {
      visible: false
    }
  },

  computed: {
    sizeClass ({ size }) {
      return {
        select: `el-select--${size}`,
        input: `el-input--${size}`
      }
    }
  },

  methods: {
    // 对外提供的组件方法，用于主动折叠 dropdown
    fold () {
      if (this.$refs.dropdown) {
        this.$refs.dropdown.hide()
      }
    },

    changeVisible (visible) {
      this.visible = visible
    }
  }
}
</script>
