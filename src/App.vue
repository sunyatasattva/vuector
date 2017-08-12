<template>
  <div 
     id="app"
     :class="{ 'is-adding': this.selectedTool.type !== 'pointer'}"
  >
    <header class="main-header">
      <h1>
        Vuector
        <div class="save-button">
          <button-with-options>
            <icon name="download" slot="button" />

            <ul slot="options">
              <li @click="saveCanvas('png')">
                <icon name="file-image" /> PNG
              </li>
              <li @click="saveCanvas('svg')">
                <icon name="vector-curve" /> SVG
              </li>
              <li @click="saveCanvas('json')">
                <icon name="code-braces" /> JSON
              </li>
            </ul>
          </button-with-options>
        </div>
      </h1>
    </header>
    <toolbar />
    
    <fabric-canvas
      tabindex=0
      ref="canvas"
      v-model="canvas"
      :activeObjectId="activeObjectId"
      :height=400
      backgroundColor="#fff"
      @keyup.delete="deleteActiveObject"
      @objectAdded="objectAdded"
      @mouseDown="addObject"
      @mouseUp="addObjectEnd"
      @mouseMove="mouseMove"
      @input="syncCanvas">
    </fabric-canvas>
    
    <div class="utilities-panel">
      <object-inspector :object='activeObject' :$object='$activeObject' />
      <layers-panel :objects='canvas.objects' />
    </div>
  </div>
</template>

<script>
import './icons/code-braces';
import './icons/download';
import './icons/file-image';
import './icons/vector-curve';
import * as Tools from './components/tools';
import { mapGetters } from 'vuex';
import ButtonWithOptions from './components/ButtonWithOptions.vue';
import LayersPanel from './components/LayersPanel.vue';
import ObjectInspector from './components/ObjectInspector.vue';
import Toolbar from './components/Toolbar.vue';

export default {
  name: 'app',
  components: {
    ButtonWithOptions,
    LayersPanel,
    ObjectInspector,
    Toolbar
  },
  computed: Object.assign(
    {
      $activeObject() {
        let activeObjectId = this.activeObjectId;
        
        if(!this.isMounted)
          return;
        
        return this.$refs.canvas.$canvas.getObjects()
          .find((obj) => obj._uid === activeObjectId);
      },
      activeObject() {
        return this.canvas.objects.find((obj) => {
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
  data() {
    return {
      isMounted: false
    }
  },
  methods: {
    // Check that object is not 0 width/height, also reset originX/Y for consistency
    addObjectEnd() {
      this.$refs.canvas.$canvas.selection = true;
      this.setAddingObject(false);
    },
    addObject(opts) {
      const tool = this.selectedTool.type;
      
      if(tool === 'pointer')
        return;
      else {
        let newObject = Tools[tool].initializeObject(opts.e);
        
        this.setAddingObject({ object: newObject });

        this.$store.commit('ADD_OBJECT', { object: newObject });
      }
    },
    deleteActiveObject() {
      this.$store.commit('DELETE_OBJECT', this.activeObject);
    },
    mouseMove(opts) {
      if(this.isAddingObject){
        let obj = this.objects[this.objects.length - 1];
        
        this.canvas.selection = false;
        
        Tools[obj.type].drawObject(obj, opts.e);
      }
    },
    objectAdded(opts) {
      if(!this.isAddingObject || opts.target._uid === this.activeObjectId)
        return;
      else
        this.$store.commit('SELECT_OBJECT', opts.target);
    },
    saveCanvas(type) {
      let file;
      let link = document.createElement("a");
      
      switch(type) {
          case 'json':
            file = this.$refs.canvas.$canvas.toJSON();
            file = JSON.stringify(file);
            file = `data:text/json;charset=utf-8,${file}`;
            break;
          case 'png':
            file = this.$refs.canvas.$canvas.toDataURL('png');
            break;
          case 'svg':
            file = this.$refs.canvas.$canvas.toSVG();
            file = `data:image/svg+xml;utf8,${file}`;
            break;
      }
      
      link.download = `vuector.${type}`;
      link.href = file;
      
      document.body.appendChild(link);
      
      link.click();
      
      document.body.removeChild(link);
    },
    syncCanvas(canvas) {
      this.$store.commit('SYNC_CANVAS', canvas);
    },
    setAddingObject(val) {
      this.$store.commit('SET_ADDING_OBJECT', val);
    }
  },
  mounted() {
    this.isMounted = true;
  }
}
</script>

<style lang='scss'>
  @import './styles/_mixins';
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
  
  label {
    cursor: pointer;
  }
  
  .canvas-container {
    border:           1px solid #272727;
    display:          inline-block;
    
    /* @todo Temp! Until vue-fabric is fixed */
    width:  calc(100vw - 40px - #{$utilities-panel-width}) !important;
    height: 100vh !important;
  }
  
  .is-adding {
    canvas {
      cursor: crosshair !important;
    }
  }
  
  .main-header {
    background:     #1b1b1b;
    color:          #fff;
    padding:        20px 0 20px 55px;
    text-transform: uppercase;
    position:       relative;
    width:          calc(100% - 250px);
    
    h1 {
      margin: 0;
    }
  }
  
  .save-button {
    position: absolute;
    right:    35px;
    top:      0;
    
    .button-options {
      li {
        background-color: #222;
        cursor:           pointer;
        padding:          10px;
        width:            75px;
        
        &:hover {
          background-color: #586677;
          
          &:active {
            background-color: #404c5a;
          }
        }
      }
      
      ul {
        border:          1px solid #292929;
        box-shadow:      0px 1px 4px #0c0c0c;
        font-size:       0.8rem;
        font-weight:     normal;
        list-style-type: none;
        margin:          0;
        padding:         0;
      }
    }
  }
  
  .svg-icon {
    margin-right: 10px;
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
    box-shadow:       0px 1px 0px #616161;
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
    text-transform:   uppercase;
  }
</style>
