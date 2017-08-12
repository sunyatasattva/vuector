<template>
  <div id="object-inspector" class="utility-panel">
    <h2>Inspector</h2>
    <div v-if='object' class="object-inspector-inner">
      <draggable-number-input v-model="adjustedWidth" label="Width"/>
      
      <draggable-number-input v-model="adjustedHeight" label="Height"/>
      
      <draggable-number-input v-model="object.angle" label="Rotation"/>
      
      <div class="input-container object-opacity">
        <label for="object-opacity">Opacity</label>
        <input type="range" name="object-opacity" v-model='object.opacity' min='0' max='1' step='0.01' />
        <input 
          type="number"
          name="object-opacity" 
          min='0'
          max='100'
          step='1'
          v-bind:value='Math.ceil(object.opacity * 100)'
          @input='object.opacity = $event.target.value / 100'
        />
      </div>
      
      <div class="input-container input-color">
        <label for="object-fill">Color</label>
        <input type="color" name="object-fill" v-model='object.fill' />
      </div>
    </div>
    <div v-else class="object-inspector-inner no-object">
      No object selected.
    </div>
  </div>
</template>

<script>
import DraggableNumberInput from './DraggableNumber.vue';

export default {
  name: 'object-inspector',
  props: ['object'],
  components: {
    DraggableNumberInput
  },
  computed: {
    adjustedHeight: {
      get() {
        if(this.object)
        return Math.round(this.object.height * this.object.scaleY);
      },
      set(val) {
        let diff = val - this.adjustedHeight;
        this.object.height += diff / this.object.scaleY;
      }
    },
    adjustedWidth: {
      get() {
        if(this.object)
        return Math.round(this.object.width * this.object.scaleX);
      },
      set(val) {
        let diff = val - this.adjustedWidth;
        this.object.width += diff / this.object.scaleX;
      }
    }
  }
}
</script>

<style lang="scss">
  input,
  label { vertical-align: middle; }
  
  label {
    display: inline-block;
    width:   60px;
  }

  input[type=number] {
    width: 45px;
  }
  
  input[type=range] {
    background:   #373737;
    border: 1px solid #333333;
    cursor: pointer;
    margin-right: 10px;
    padding:      0;
    width:        113px;
    height:       3px;
    -webkit-appearance: none;
  }
  
  input[type=range]:focus {
    outline: none;
  }
  
  input[type=range]::-webkit-slider-thumb {
    background:         linear-gradient(to bottom, #636363 0%, #525252 20%, #424242 100%);
    border:             1px solid #333333;
    border-radius:      25px;
    box-shadow:         0px 0px 5px #404040;
    cursor:             pointer;
    margin-top:         0px;
    width:              12px;
    height:             12px;
    -webkit-appearance: none;
  }
  
  .object-height,
  .object-width {
    display: inline-block;
  }
  
  .input-container {
    padding: 10px 0;
    
    label {
      font-size: 0.8rem;
    }
  }
  
  .object-opacity {
    input[type=number] {
      background: transparent;
      border:     0;
    }
  }
  
  .object-width {
    margin-right: 20px;
  }
  
  .object-inspector-inner {
    font-size: 0;
    padding: 10px;
    
    &.no-object {
      font-size: 0.8rem;
    }
  }
</style>