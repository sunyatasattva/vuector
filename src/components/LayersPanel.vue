<template>
  <div id="layers-panel" class="utility-panel">
    <h2>
      <icon name="layers" />
      Layers
    </h2>
    <ul>
      <layer v-for="object in objects" :object="object" />
    </ul>
  </div>
</template>

<script>
import '../icons/layers';
import Layer from './Layer.vue';

export default {
  name: 'layers-panel',
  props: ['objects'],
  components: {
    Layer
  }
}
</script>


<style scoped>
  #layers-panel ul {
    padding: 0;
  }
</style>