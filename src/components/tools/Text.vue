<template>
  <tool type="textbox" :opts="$data">
    <icon name="format-text" />
  </tool>
</template>

<script>
import '../../icons/format-text';
import Tool from '../Tool.vue';

export default {
  name: 'tool-text',
  components: {
    Tool
  },
  data() {
    return {
      fontFamily: 'Helvetica, sans-serif',
      fontSize: 16,
      lineHeight: 1.25,
    }
  },
  
  drawObject(obj, e) {
    Tool.drawObject(obj, e);
  },
  initializeObject(e, opts) {
    return Object.assign(
      Tool.initializeObject(e, opts),
      { 
        type: 'textbox',
        
        fontWeight: 'normal',
        text: 'Some text...'
      }
    );
  }
}
</script>

<style scoped>
</style>