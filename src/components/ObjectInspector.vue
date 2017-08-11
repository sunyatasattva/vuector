<template>
  <div id="object-inspector" class="utility-panel">
    <h2>Inspector</h2>
    <div v-if='object' class="object-inspector-inner">
      <section class="inspector-transform">
        <h3 class="section-title">Transform</h3>
        
        <div class="input-container input-width">
          <label for="object-width">Width</label>
          <input type="number" name="object-width" v-model='adjustedWidth' />
        </div>

        <div class="input-container input-height">
          <label for="object-height">Height</label>
          <input type="number" name="object-height" v-model='adjustedHeight' />
        </div>

        <div class="input-container input-rotation">
          <label for="object-angle">Rotation</label>
          <input type="number" name="object-angle" v-model='object.angle' />
        </div>

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
        
        <div class="input-container input-font-family">
          <label for="object-font-family">Font</label>
          <input type="text" name="object-font-family" v-model='object.fontFamily' />
        </div>
        
        <div class="input-container input-font-size">
          <label for="object-font-size">Size</label>
          <input type="number" name="object-font-size" v-model='object.fontSize' />
        </div>
        
        <div class="input-container input-line-height">
          <label for="object-line-height">Spacing</label>
          <input type="number" name="object-line-height" v-model='object.lineHeight' />
        </div>
        
        <button
          class="button-toggle"
          :class="{ 
            'is-active': isSelectionStyled('fontWeight', 'bold')
          }"
          @click="toggleStyle('fontWeight', 'bold')">Bold</button>
        
        <div class="text-alignment">
          <input type="radio" name="text-alignment" value="left" v-model="object.textAlign">
          <input type="radio" name="text-alignment" value="center" v-model="object.textAlign">
          <input type="radio" name="text-alignment" value="right" v-model="object.textAlign">
        </div>
      </section>
    </div>
    <div v-else class="object-inspector-inner no-object">
      No object selected.
    </div>
  </div>
</template>

<script>
export default {
  name: 'object-inspector',
  props: [
    '$object',
    'object'
  ],
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
    textSelection() {
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
    toggleStyle(key, val) {
      let styles;
      
      if(this.$object.selectionStart !== this.$object.selectionEnd) {
        styles = this.$object.getSelectionStyles()[key];
        
        if(styles)
          this.$object.setSelectionStyles({ [key]: '' });
        else
          this.$object.setSelectionStyles({ [key]: val });
      }
      else {
        styles = this.$object[key];
        
        // @todo when adding support for fabricjs 2.0 on vue-fabric
        // add removeStyle to flatten the characters
        if(styles) 
          this.$object.set(key, '');
        else
          this.$object.set(key, val);
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
  
  .input-font-size,
  .input-height,
  .input-line-height,
  .input-width {
    display: inline-block;
  }
  
  .button-toggle {
    &.is-active {
      background-color: #222;
    }
  }
  
  .input-container {
    padding: 10px;
    
    label {
      font-size: 0.8rem;
    }
  }
  
  .input-opacity {
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
</style>