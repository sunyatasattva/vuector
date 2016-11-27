<template>
  <button 
    @click='selectTool({ tool: tool })'
    :disabled='selectedTool === tool' >
    <slot></slot>
  </button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'tool',
  props: ['tool'],
  computed: mapGetters([
    'selectedTool',
  ]),
  methods: {
    selectTool(tool) {
      this.$store.commit('SELECT_TOOL', tool);
    }
  }
}
</script>

<style scoped>
</style>