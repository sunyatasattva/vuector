<template>
  <button 
    @click='selectTool()'
    :disabled='selectedTool.type === type' >
    <slot></slot>
  </button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'tool',
  props: [
    'opts',
    'type'
  ],
  computed: Object.assign(
    {
      options() {
        return Object.assign({
          angle: 0,
          fill: '#ffffff',
          name: this.type,
          opacity: 1
        }, this.opts);
      }
    },
    mapGetters([
      'selectedTool',
    ])
  ),
  methods: {
    selectTool() {
      this.$store.commit('SELECT_TOOL', this);
    }
  },
  watch: {
    options() {
      // @fixme that's a bit of a hack (*´･Д･)
      this.$store.commit('SELECT_TOOL', this);
    }
  },
  
  /*
   * Function supposed to be called from outside when drawing an object.
   */
  drawObject(obj, e) {
    let diffX = e.offsetX - obj.left;
    let diffY = e.offsetY - obj.top;

    if(diffX < 0) {
      obj.originX = 'right';
      obj.flipX = true;
    }
    else {
      obj.originX = 'left'
      obj.flipX = false;
    }

    if(diffY < 0) {
      obj.originY = 'bottom';
      obj.flipY = true;
    }
    else {
      obj.originY = 'top'
      obj.flipY = false;
    }

    obj.width = Math.max(Math.abs(diffX), 1);
    obj.height = Math.max(Math.abs(diffY), 1);
    
    return {
      diffX: diffX,
      diffY: diffY
    }
  },
  initializeObject(e, opts) {
    return Object.assign({
      type: 'object',
      width: 1,
      height: 1,
      left: e.offsetX,
      top: e.offsetY
    }, opts);
  }
}
</script>

<style scoped>
  button {
    text-align: center;
  }
  
  .svg-icon {
    margin: 0;
  }
</style>