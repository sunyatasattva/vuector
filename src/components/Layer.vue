<template>
  <li class='layer' @click='selectObject(object)'>
    {{object.type}}
  </li>
</template>

<script>
export default {
  name: 'layer',
  props: ['object'],
  methods: {
    selectObject(object) {
      this.$store.commit('SELECT_OBJECT', object);
    }
  }
}
</script>