<template>
  <tool type="triangle">
    <icon name="triangle-outline" />
  </tool>
</template>

<script>
import '../../icons/triangle-outline';
import Tool from '../Tool.vue';

export default {
  name: 'tool-triangle',
  components: {
    Tool
  },
  
  drawObject(obj, e) {
    Tool.drawObject(obj, e);
  },
  initializeObject(e) {
    return Object.assign(
      Tool.initializeObject(e),
      { type: 'triangle' }
    );
  }
}
</script>

<style scoped>
</style>