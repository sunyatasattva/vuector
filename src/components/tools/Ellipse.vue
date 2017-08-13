<template>
  <tool type="ellipse" :opts="$data">
    <icon name="circle-outline" />
  </tool>
</template>

<script>
import '../../icons/circle-outline';
import Tool from '../Tool.vue';

export default {
  name: 'tool-ellipse',
  components: {
    Tool
  },
  data() {
    return {}
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
  initializeObject(e, opts) {
    return Object.assign(
      Tool.initializeObject(e, opts),
      { type: 'ellipse' }
    );
  }
}
</script>

<style scoped>
</style>