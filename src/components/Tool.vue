<template>
  <button 
    @click='selectTool()'
    :disabled='selectedTool.type === type' >
    <slot></slot>
  </button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'tool',
  props: ['type'],
  computed: mapGetters([
    'selectedTool',
  ]),
  methods: {
    selectTool() {
      this.$store.commit('SELECT_TOOL', this);
    }
  }
}
</script>

<style scoped>
</style>