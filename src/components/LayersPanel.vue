<template>
  <div id="layers-panel" class="utility-panel">
    <h2>
      <icon name="layers" />
      Layers
    </h2>
    <draggable v-model="sortedObjects" element="ul">
      <layer v-for="object in sortedObjects" :object="object" />
    </draggable>
  </div>
</template>

<script>
import '../icons/layers';
import Layer from './Layer.vue';
import Draggable from 'vuedraggable';

export default {
  name: 'layers-panel',
  props: ['objects'],
  components: {
    Draggable,
    Layer
  },
  computed: {
    sortedObjects: {
      get() {
        return this.objects.slice().reverse();
      },
      set(value) {
        return this.$store.commit(
          'UPDATE_OBJECTS',
          value.slice().reverse()
        );
      }
    }
  }
}
</script>


<style scoped>
  #layers-panel ul {
    padding: 0;
  }
  
  .sortable-chosen {
    background-color: #777;
  }
</style>