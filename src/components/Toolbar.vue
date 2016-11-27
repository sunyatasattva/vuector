<template>
  <div id='toolbar'>
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

<style scoped>
</style>