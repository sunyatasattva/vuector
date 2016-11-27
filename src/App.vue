<template>
  <div id="app">
    <fabric-canvas 
      ref="canvas"
      v-model="canvas"
      :activeObjectId="activeObjectId"
      :height=200
      @mouseDown="addObject"
      @mouseUp="setAddingObject(false)"
      @mouseMove="mouseMove"
      @input="syncCanvas">
    </fabric-canvas>
    
    <object-inspector :object='activeObject' />
    <layers-panel :objects='canvas.objects' />
    <toolbar />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ObjectInspector from './components/ObjectInspector.vue';
import LayersPanel from './components/LayersPanel.vue';
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'app',
  components: {
    LayersPanel,
    ObjectInspector,
    Toolbar
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
      'activeObjectId',
      'canvas',
      'isAddingObject',
      'objects',
      'selectedTool'
    ])
  ),
  methods: {
    // Check that object is not 0 width/height, also reset originX/Y for consistency
    //addObjectEnd(){},
    addObject(opts) {
      if(this.selectedTool === 'pointer')
        return;
      else {
        let newObject = {
          type: this.selectedTool,
          width: 1,
          height: 1,
          left: opts.e.offsetX,
          top: opts.e.offsetY
        }
        
        this.setAddingObject({ object: newObject });

        this.$store.commit('ADD_OBJECT', { object: newObject });
      }
    },
    mouseMove(opts) {
      if(this.isAddingObject){
        let obj = this.objects[this.objects.length - 1];
        let diffX = opts.e.offsetX - obj.left;
        let diffY = opts.e.offsetY - obj.top;
        // this for circle with snapping option
        //obj.radius = Math.max(obj.radius + (opts.e.movementX + opts.e.movementY) / 2, 0);
        if(diffX < 0) obj.originX = 'right';
        else obj.originX = 'left'

        if(diffY < 0) obj.originY = 'bottom';
        else obj.originY = 'top'
        
        obj.width = Math.max(Math.abs(diffX), 1);
        obj.height = Math.max(Math.abs(diffY), 1);
        
        console.log(diffX,diffY);
      }
    },
    syncCanvas(canvas) {
      this.$store.commit('SYNC_CANVAS', canvas);
    },
    setAddingObject(val) {
      this.$store.commit('SET_ADDING_OBJECT', val);
    }
  }
}
</script>
