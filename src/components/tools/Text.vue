<template>
  <tool type="textbox">
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
  
  drawObject(obj, e) {
    Tool.drawObject(obj, e);
  },
  initializeObject(e) {
    return Object.assign(
      Tool.initializeObject(e),
      { 
        type: 'textbox',
        
        fontFamily: 'Helvetica, sans-serif',
        fontSize: 16,
        fontWeigth: 'normal',
        lineHeight: 1.25,
        text: 'Some text...'
      }
    );
  }
}
</script>

<style scoped>
</style>