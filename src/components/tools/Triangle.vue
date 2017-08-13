<template>
  <tool type="triangle" :opts="$data">
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
  data() {
    return {}
  },
  
  drawObject(obj, e) {
    Tool.drawObject(obj, e);
  },
  initializeObject(e, opts) {
    return Object.assign(
      Tool.initializeObject(e, opts),
      { type: 'triangle' }
    );
  }
}
</script>

<style scoped>
</style>