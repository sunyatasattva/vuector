<template>
  <tool type="circle">Circle</tool>
</template>

<script>
import Tool from '../Tool.vue';

export default {
  name: 'tool-circle',
  components: {
    Tool
  },
  
  drawObject(obj, e) {
    Tool.drawObject(obj, e);
    
    obj.radius = Math.max(
      obj.radius +
      (e.movementX + e.movementY) / 2,
    0);
  }
}
</script>

<style scoped>
</style>