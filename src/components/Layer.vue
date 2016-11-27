<template>
  <li class='layer' :class='{ active: isActive }' @click='selectObject(object)'>
    {{object.type}}
  </li>
</template>

<script>
export default {
  name: 'layer',
  props: ['object'],
  computed: {
    isActive() {
      return this.$store.getters.activeObjectId === this.object._uid;
    }
  },
  methods: {
    selectObject(object) {
      this.$store.commit('SELECT_OBJECT', object);
    }
  }
}
</script>

<style scoped>
  .layer {
    cursor: pointer;  
  }

  .active {
    font-weight: bold;
  }
</style>