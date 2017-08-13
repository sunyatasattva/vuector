<template>
  <tool type="brush" :opts="$data">
    <icon name="brush" />
  </tool>
</template>

<script>
import '../../icons/brush';
import Tool from '../Tool.vue';

export default {
  name: 'tool-brush',
  components: {
    Tool
  },
  data() {
    return {
      color: '#fcfd43',
      width: 1
    }
  }
}
</script>

<style scoped>
</style>