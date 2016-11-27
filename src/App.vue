<template>
  <div id="app">
    <fabric-canvas 
      ref="canvas"
      v-model="canvas"
      :activeObjectId="activeObjectId"
      :height=200
      @mouseDown="addObject"
      @input="syncCanvas">
    </fabric-canvas>
    <ol>
      <li v-for="object in canvas.objects">
        <b><input type="text" v-model="object.fill"></b>
        <input type="number" v-model="object.scaleX">
      </li>
    </ol>
    
    <object-inspector :object='activeObject' />
    <layers-panel :objects='canvas.objects' />
  </div>
</template>

<script>
import ObjectInspector from './components/ObjectInspector.vue';
import LayersPanel from './components/LayersPanel.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'app',
  components: {
    LayersPanel,
    ObjectInspector
  },
  computed: Object.assign(
    {
      activeObject() {
        return this.objects.find((obj) => {
          return obj._uid === this.activeObjectId
        });
      }
    },
    mapGetters([
      'canvas',
      'objects',
      'activeObjectId'
    ])
  ),
  methods: {
    addObject(opts) {
      console.log(opts);
      if(opts.target)
        return;
      this.state.canvas.objects.push({
        type: 'circle',
        radius: 20,
        left: opts.e.offsetX,
        top: opts.e.offsetY
      });
    },
    syncCanvas(canvas) {
      this.$store.commit('SYNC_CANVAS', canvas);
    }
  }
}
</script>
