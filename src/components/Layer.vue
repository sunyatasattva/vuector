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
    list-style-type: none;
    padding: 10px 20px;
  }
  
  .layer:hover {
    background-color: rgba(88, 102, 119, 0.5);
  }
  
  .layer.active {
    background-color: #586677;
  }
  
  .active {
    font-weight: bold;
  }
</style>