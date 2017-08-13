<template>
  <tool type="rect" :opts="$data">
    <icon name="square-outline" />
  </tool>
</template>

<script>
import '../../icons/square-outline';
import Tool from '../Tool.vue';

export default {
  name: 'tool-rect',
  components: {
    Tool
  },
  data() {
    return {
      stroke: '#ffffff'
    }
  },
  
  drawObject(obj, e) {
    Tool.drawObject(obj, e);
  },
  initializeObject(e, opts) {
    return Object.assign(
      Tool.initializeObject(e, opts),
      { type: 'rect' }
    );
  }
}
</script>

<style scoped>
</style>