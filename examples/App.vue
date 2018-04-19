<template>
  <div>
    <bdi-index-filter></bdi-index-filter>
    <bdi-logic-selector></bdi-logic-selector>
    <bdi-menu></bdi-menu>
    <el-button>bdi ui</el-button>
  </div>  
</template>

<script>
import { Button } from 'element-ui'

export default {
  components: {
    ElButton: Button
  }
}
</script>
