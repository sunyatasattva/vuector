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
  },
  initializeObject(e) {
    return Object.assign(
      Tool.initializeObject(e),
      { type: 'rect' }
    );
  }
}
</script>

<style scoped>
</style>