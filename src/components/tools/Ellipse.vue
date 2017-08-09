<template>
  <tool type="ellipse">Ellipse</tool>
</template>

<script>
import Tool from '../Tool.vue';

export default {
  name: 'tool-ellipse',
  components: {
    Tool
  },
  
  drawObject(obj, e) {
    let diff = Tool.drawObject(obj, e);
    
    obj.rx = Math.abs(diff.diffX / 2);
    
    // Creates a circle if shift is pressed
    if(e.shiftKey)
      obj.ry = obj.rx;
    else
      obj.ry = Math.abs(diff.diffY / 2);
  },
  initializeObject(e) {
    return Object.assign(
      Tool.initializeObject(e),
      { type: 'ellipse' }
    );
  }
}
</script>

<style scoped>
</style>