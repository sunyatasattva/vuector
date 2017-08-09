<template>
  <div id='toolbar' class='toolbar'>
    <tool-pointer />
    <tool-rectangle />
    <tool-triangle />
    <tool-ellipse />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tool from './Tool.vue';
import * as Tools from './tools';
  
export default {
  name: 'toolbar',
  components: {
    'tool-ellipse': Tools.ellipse,
    'tool-pointer': Tools.pointer,
    'tool-rectangle': Tools.rect,
    'tool-triangle': Tools.triangle
  }
}
</script>

<style scoped lang="scss">
  button {
    background-color: #393939;
    border:           0;
    border-bottom:    1px solid #272727;
    border-top:       1px solid #5f5f5f;
    cursor:           pointer;
    outline:          none;
    width:            100%;
    height:           40px;
    
    &:disabled {
      background-color: #272727;
      border-bottom:    1px solid #1d1d1d;
      border-top:       1px solid #1d1d1d;
    }
  }
</style>