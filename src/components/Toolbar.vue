<template>
  <div id='toolbar' class='toolbar'>
    <tool-pointer />
    <tool-circle />
    <tool-rectangle />
    <tool-triangle />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tool from './Tool.vue';
import Circle from './tools/Circle.vue';
import Pointer from './tools/Pointer.vue';
import Rectangle from './tools/Rectangle.vue';
import Triangle from './tools/Triangle.vue';

export default {
  name: 'toolbar',
  components: {
    'tool-circle': Circle,
    'tool-pointer': Pointer,
    'tool-rectangle': Rectangle,
    'tool-triangle': Triangle
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