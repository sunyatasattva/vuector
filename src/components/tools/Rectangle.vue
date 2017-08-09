<template>
  <tool type="rect">Rect</tool>
</template>

<script>
import Tool from '../Tool.vue';

export default {
  name: 'tool-rect',
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