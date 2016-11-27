<template>
  <div id="layers-panel">
    <ul>
      <layer v-for="object in objects" :object="object" />
    </ul>
  </div>
</template>

<script>
import Layer from './Layer.vue';

export default {
  name: 'layers-panel',
  props: ['objects'],
  components: {
    Layer
  }
}
</script>