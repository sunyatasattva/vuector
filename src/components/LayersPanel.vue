<template>
  <div id="layers-panel">
    <ul>
      <li v-for="object in objects" @click='selectObject(object)'>
        {{object.type}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'layers-panel',
  props: ['objects'],
  methods: {
    selectObject(object) {
      this.$emit('selectObject', object);
    }
  }
}
</script>