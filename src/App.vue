<template>
  <div id="app">
    <header class="main-header">
      <h1>
        Vuector
      </h1>
    </header>
    <toolbar />
    
    <fabric-canvas 
      ref="canvas"
      v-model="canvas"
      :activeObjectId="activeObjectId"
      :height=400
      backgroundColor="#fff"
      @mouseDown="addObject"
      @mouseUp="addObjectEnd"
      @mouseMove="mouseMove"
      @input="syncCanvas">
    </fabric-canvas>
    
    <div class="utilities-panel">
      <object-inspector :object='activeObject' />
      <layers-panel :objects='canvas.objects' />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ObjectInspector from './components/ObjectInspector.vue';
import LayersPanel from './components/LayersPanel.vue';
import * as Tools from './components/tools';
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
    addObjectEnd() {
      this.$refs.canvas.$canvas.selection = true;
      this.setAddingObject(false);
    },
    addObject(opts) {
      if(this.selectedTool.type === 'pointer')
        return;
      else {
        let newObject = Object.assign(this.selectedTool, {
          width: 1,
          height: 1,
          left: opts.e.offsetX,
          top: opts.e.offsetY
        });
        
        this.setAddingObject({ object: newObject });

        this.$store.commit('ADD_OBJECT', { object: newObject });
      }
    },
    mouseMove(opts) {
      if(this.isAddingObject){
        let obj = this.objects[this.objects.length - 1];
        
        this.canvas.selection = false;
        
        Tools[obj.type].drawObject(obj, opts.e);
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

<style lang='scss'>
  @import './styles/_variables';
  
  * {
    box-sizing: border-box;
  }
  
  body {
    background-color: #262626;
    font-family:      "Puritan", sans-serif;
    margin:           0;
  }
  
  input {
    outline: none;
  }
  
  .canvas-container {
    border:           1px solid #272727;
    display:          inline-block;
    
    /* @todo Temp! Until vue-fabric is fixed */
    width:  calc(100vw - 40px - #{$utilities-panel-width}) !important;
    height: 100vh !important;
  }
  
  .main-header {
    background:     #1b1b1b;
    color:          #fff;
    padding:        20px 0 20px 55px;
    text-transform: uppercase;
    
    h1 {
      margin: 0;
    }
  }
  
  .toolbar {
    display:        inline-block;
    margin-right:   -4px;
    vertical-align: top;
    width:          40px;
  }
  
  .utilities-panel {
    width: 250px;

    position: fixed;
    right:    0;
    top:      0;
  }
  
  .utility-panel {
    background-color: #535353;
    border-bottom:    1px solid #393939;
    color:            #d6d6d6;
    font-size:        0.8rem;
  }
  
  .utility-panel input {
    background-color: #373737;
    border:           1px solid #333;
    color:            #d6d6d6;
    padding:          2px;
  }
  
  .utility-panel h2 {
    background-color: #393939;
    border-bottom:    1px solid #272727;
    border-top:       1px solid #5f5f5f;
    font-family:      "Mada", sans-serif;
    font-size:        1rem;
    font-weight:      normal;
    letter-spacing:   1px;
    margin:           0;
    padding:          10px;
    padding-left:     25px;
    text-transform:   uppercase;
  }
</style>
