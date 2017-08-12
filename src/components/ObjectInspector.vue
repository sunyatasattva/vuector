<template>
  <div id="object-inspector" class="utility-panel">
    <h2>
      <icon name="crosshairs-gps" />
      Inspector
    </h2>
    <div v-if='object' class="object-inspector-inner">
      <section class="inspector-transform">
        <h3 class="section-title">Transform</h3>
        
        <draggable-number-input v-model="adjustedWidth" label="Width"/>

        <draggable-number-input v-model="adjustedHeight" label="Height"/>

        <draggable-number-input v-model="object.angle" label="Rotation"/>

        <div class="input-container input-opacity">
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
      </section>
      <section class="inspector-text" v-if='object.type === "textbox"'>
        <h3 class="section-title">Text</h3>
        
        <div class="buttons-group text-format">
          <input 
            type="checkbox" 
            name="font-weight" 
            id="font-weight" 
            v-model="object.fontWeight"
            :true-value="'bold'"
            :false-value="'normal'" />
          <label for="font-weight" @click="toggleStyle($event, 'fontWeight', 'bold')">
            <icon name="format-bold" />
          </label>
          <input 
            type="checkbox" 
            name="font-italic" 
            id="font-italic" 
            v-model="object.fontStyle"
            :true-value="'italic'"
            :false-value="''" />
          <label for="font-italic">
            <icon name="format-italic" />
          </label>
          <input 
            type="checkbox" 
            name="font-underline" 
            id="font-underline" 
            v-model="object.textDecoration"
            :true-value="'underline'"
            :false-value="''" />
          <label for="font-underline">
            <icon name="format-underline" />
          </label>
          <!-- @todo implement this
          <button
          class="button-toggle"
          :class="{ 
            'is-active': isSelectionStyled('fontWeight', 'bold')
          }"
          @click="toggleStyle('fontWeight', 'bold')">
            
          </button>
          -->
        </div>
        
        <div class="buttons-group text-alignment">
          <input type="radio" name="text-alignment" id="text-alignment-left" value="left" v-model="object.textAlign">
          <label for="text-alignment-left">
            <icon name="format-align-left" />
          </label>
          <input type="radio" name="text-alignment" id="text-alignment-center" value="center" v-model="object.textAlign">
          <label for="text-alignment-center">
            <icon name="format-align-center" />
          </label>
          <input type="radio" name="text-alignment"  id="text-alignment-right" value="right" v-model="object.textAlign">
          <label for="text-alignment-right">
            <icon name="format-align-right" />
          </label>
        </div>
        
        <div class="input-container input-background-color">
          <label for="object-background-color">
            <icon name="format-color-fill" />
          </label>
          <input 
            type="color"
            id="object-background-color"
            :style="{ opacity: object.backgroundColor ? 1 : 0 }"
            v-model="object.backgroundColor" />
        </div>
        
        <div class="input-container input-font-family">
          <label for="object-font-family">Font</label>
          <input type="text" name="object-font-family" v-model='object.fontFamily' />
        </div>
        
        <draggable-number-input v-model="object.fontSize" label="Size"/>
        
        <draggable-number-input v-model="object.lineHeight" label="Spacing" :step="0.25" />
        
      </section>
    </div>
    <div v-else class="object-inspector-inner no-object">
      No object selected.
    </div>
  </div>
</template>

<script>
import '../icons/crosshairs-gps';
import '../icons/format-align-center';
import '../icons/format-align-left';
import '../icons/format-align-right';
import '../icons/format-bold';
import '../icons/format-color-fill';
import '../icons/format-italic';
import '../icons/format-underline';
import DraggableNumberInput from './DraggableNumber.vue';

export default {
  name: 'object-inspector',
  props: [
    '$object',
    'object'
  ],
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
    },
    selectionStyle() {
      let selection = this.textSelection;
      
      return this.$object.getSelectionStyles();
    },
    textSelection() {
      let start = this.$object.selectionStart;

      if(!this.$object)
        return { start: 0, end: 0 };
      
      return {
        start: this.$object.selectionStart,
        end: this.$object.selectionEnd
      }
    }
  },
  methods: {
    isSelectionStyled(key, val) {
      if(this.textSelection.start !== this.textSelection.end) {
        console.log(this.textSelection);
        return this.$object.getSelectionStyles()[key] === val;
      }
      else
        return this.$object[key] === val;
    },
    toggleStyle(e, key, val) {
      let styles;
      
      if(this.$object.selectionStart !== this.$object.selectionEnd) {
        e.preventDefault();
        
        styles = this.$object.getSelectionStyles()[key];
        
        if(styles)
          this.$object.setSelectionStyles({ [key]: '' });
        else
          this.$object.setSelectionStyles({ [key]: val });
      }
//      else {
//        styles = this.$object[key];
//        
//        // @todo when adding support for fabricjs 2.0 on vue-fabric
//        // add removeStyle to flatten the characters
//        if(styles) 
//          this.$object.set(key, '');
//        else
//          this.$object.set(key, val);
//      }
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

  input[type=color] {
    cursor: pointer;
    
    &::-webkit-color-swatch {
      border: 0;
    }
  }
  
  input[type=number] {
    width: 45px;
  }
  
  input[type=range] {
    background:   #373737;
    border:       1px solid #333333;
    cursor:       pointer;
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
  
  .input-background-color,
  .object-size,
  .object-height,
  .object-spacing,
  .object-width {
    display: inline-block;
  }
  
  .button-toggle {
    &.is-active {
      background-color: #222;
    }
  }
  
  .input-container {
    padding: 10px;
    
    &.input-background-color {
      margin-left:   2px;
      padding-right: 0;

      input,
      label {
        width: 25px;
      }

      input {
        padding: 0;
        height: 28px;

        &::-webkit-color-swatch-wrapper {
          padding: 6px 3px;
        }
      }
      
      label {
        cursor: pointer;
      }
    }
    
    label {
      font-size: 0.8rem;
    }
  }
  
  .input-font-family input {
    width: 125px;
  }
  
  .object-opacity {
    input[type=number] {
      background: transparent;
      border:     0;
    }
  }
  
  .object-inspector-inner {
    font-size: 0;
    
    &.no-object {
      font-size: 0.8rem;
      padding: 10px;
    }
  }
  
  .section-title {
    font-size: 0.8rem;
    margin: 0;
    background-color: #393939;
    border-bottom: 1px solid #272727;
    padding: 5px 10px;
    text-transform: uppercase;
    font-weight: 200;
    border-top: 1px solid #5f5f5f;
  }
  
  .buttons-group {
    display: inline-block;
    padding: 10px;
    
    &.text-alignment {
      padding: 0;
    }
    
    input {
      display: none;
      
      &:checked + label,
      + label:active {
        background-color: #373737;
        border:           1px solid #333;
        box-shadow:       0px 1px 0px #616161;
      }
    }
    
    label {
      border:     1px solid transparent;
      box-sizing: content-box;
      cursor:     pointer;
      padding:    4px;
      width:      16px;
    }
  }
</style>