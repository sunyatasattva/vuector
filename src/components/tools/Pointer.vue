<template>
  <tool type="pointer" :opts="$data">
    <icon name="cursor-default-outline" />
  </tool>
</template>

<script>
import '../../icons/cursor-default-outline';
import Tool from '../Tool.vue';

export default {
  name: 'tool-pointer',
  components: {
    Tool
  },
  data() {
    return {
      fill: null,
      opacity: null
    }
  }
}
</script>

<style scoped>
</style>