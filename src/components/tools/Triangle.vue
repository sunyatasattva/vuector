<template>
  <tool type="triangle">Triangle</tool>
</template>

<script>
import Tool from '../Tool.vue';

export default {
  name: 'tool-triangle',
  components: {
    Tool
  },
  
  drawObject(obj, e) {
    Tool.drawObject(obj, e);
  }
}
</script>

<style scoped>
</style>