<template>
  <div class="tool-options utility-panel" v-if="tool.type !== 'pointer'">
    <div class="file-details" v-if="tool.type === 'image'">
      <span v-if="tool.options.fileName">
        <strong>Filename: </strong>
        {{ tool.options.fileName }}
        ({{ tool.options.width }}px &times; {{ tool.options.height }}px)
      </span>
      <span v-else>
        Select an image from your computer&hellip;
      </span>
    </div>
    <div class="brush-details" v-else-if="tool.type === 'brush'">
      <div class="input-container input-color" v-if="tool.options.color">
        <input type="color" id="options-color" name="options-color" v-model='tool.options.color' @change="updateBrushProps" />
      </div>
      
      <draggable-number-input :min="0" :max="100" v-model="tool.options.width" label="Brush Size" @change="updateBrushProps" />
    </div>
    <div v-else>
      <div class="input-container input-color" v-if="tool.options.fill">
        <input type="color" id="options-fill" name="options-fill" v-model='tool.options.fill' />
      </div>
      
      <div class="input-container input-color" v-if="tool.options.stroke">
        <input type="color" id="options-stroke" name="options-stroke" v-model='tool.options.stroke' />
      </div>

      <draggable-number-input
        :min="0"
        :max="100"
        v-if="tool.options.opacity"
        label="Opacity"
        :value="Math.ceil(tool.options.opacity * 100)"
        @input="tool.options.opacity = $event / 100"
      />

      <draggable-number-input 
        v-if="!isNaN(tool.options.angle)" 
        v-model="tool.options.angle" 
        label="Rotation" />

      <div class="input-container input-font-family" v-if="tool.options.fontFamily">
        <label for="object-font-family">Font</label>
        <input type="text" name="object-font-family" v-model="tool.options.fontFamily" />
      </div>

      <draggable-number-input v-if="tool.options.fontSize" v-model="tool.options.fontSize" label="Size"/>
    </div>
  </div>
</template>

<script>
import '../icons/delete';
import '../icons/eye';
import '../icons/eye-off';
import DraggableNumberInput from './DraggableNumber.vue';

export default {
  name: 'tool-options',
  props: ['tool'],
  components: {
    DraggableNumberInput
  },
  computed: {
  },
  methods: {
    updateBrushProps(e) {
      this.$parent.setDrawingBrushProps();
    }
  }
}
</script>

<style lang="scss">
  @import '../styles/_mixins';
  @import '../styles/_variables';
  
  .tool-options {
    border-bottom: 1px solid #272727;
    border-top:    1px solid #5f5f5f;
    margin-top:    1px;
    width:         calc(100vw - #{$utilities-panel-width} - #{$toolbar-panel-width});
    position:      absolute;
    left:          $toolbar-panel-width + 1;
    z-index:       1;
    
    label {
      margin-right: 10px;
      width:        auto;
    }
    
    .file-details {
      padding: 12px 10px;
    }
    
    .input-container {
      display: inline-block;
      padding: 8px 10px;
    }

    .object-opacity input[type="number"] {
      background-color: #373737;
    }
  }
</style>