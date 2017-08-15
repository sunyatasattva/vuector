<template>
  <tool type="line" title="Draw straight line" :opts="$data">
    <icon name="vector-line" />
  </tool>
</template>

<script>
import '../../icons/vector-line';
import Tool from '../Tool.vue';

export default {
  name: 'tool-line',
  components: {
    Tool
  },
  data() {
    return {
      fill: null,
      originX: 'left',
      originY: 'top',
      angle: NaN, // We set it to NaN to hide it in options panel
      stroke: '#ffffff',
      strokeWidth: 2
    }
  },
  
  drawObject(obj, e) {
    Tool.drawObject(obj, e);
    
    obj.angle = 0; // Back to a number, ready for manipulation
    obj.x1 = -obj.width / 2;
    obj.x2 = obj.width / 2;
    obj.y1 = -obj.height / 2;
    obj.y2 = obj.height / 2;
  },
  initializeObject(e, opts) {
    return Object.assign(
      Tool.initializeObject(e, opts),
      { 
        type: 'line',
        x1: -1,
        y1: -1,
        x2: 1,
        y2: 1
      }
    );
  }
}
</script>

<style scoped>
</style>