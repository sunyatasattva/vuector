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