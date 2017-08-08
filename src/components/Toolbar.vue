<template>
  <div id='toolbar' class='toolbar'>
    <tool tool='pointer'>Pointer</tool>
    <tool tool='circle'>Circle</tool>
    <tool tool='rect'>Rect</tool>
    <tool tool='triangle'>Triangle</tool>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tool from './Tool.vue';

export default {
  name: 'toolbar',
  components: {
    Tool
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