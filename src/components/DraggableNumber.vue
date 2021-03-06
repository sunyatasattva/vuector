<template>
  <div class="input-container" :class="inputName" @mousedown="dragStart">
    <label :for="inputName">{{ label }}</label>
    <input
      type="number"
      :max="max"
      :min="min"
      :name="inputName"
      :step="step"
      :value="value"
      @input="adjustValue($event.target.value)"
      @change="change">
  </div>
</template>

<script>
export default {
  name: 'draggable-number-input',
  props: {
    label: {
      type: String,
      required: true
    },
    max: {
      type: Number
    },
    min: {
      type: Number
    },
    value: {
      type: Number,
      required: true
    },
    step: {
      type: Number,
      default: 1
    }
  },
  computed: {
    boundAdjust() {
      return this.adjustValue.bind(this);
    },
    boundEnd() {
      return this.dragEnd.bind(this);
    },
    inputName() {
      return `object-${this.label.toLowerCase().replace(" ", "-")}`;
    }
  },
  data() {
    return {
      isDragging: false
    }
  },
  methods: {
    adjustValue(val) {
      let newVal = !isNaN(val) ? Number(val) :
        Number(this.value + -val.movementY * this.step);
      
      if(this.min)
        newVal = Math.max(newVal, this.min);
      if(this.max)
        newVal = Math.min(newVal, this.max);
      
      this.$emit('input', newVal);
      this.$emit('change', newVal);
    },
    change(e) {
      this.$emit('change', e);
    },
    dragStart() {
      this.isDragging = true;
      
      document.body.style['cursor'] = 'ns-resize';
      document.body.style['user-select'] = 'none';
      
      document.addEventListener('mousemove', this.boundAdjust);
      document.addEventListener('mouseup', this.boundEnd);
    },
    dragEnd() {
      this.isDragging = false;
      
      document.body.style['cursor'] = '';
      document.body.style['user-select'] = '';
      
      document.removeEventListener('mousemove', this.boundAdjust);
      document.removeEventListener('mouseup', this.boundEnd);
    }
  }
}
</script>

<style scoped>
  label {
    cursor: ns-resize;
  }
</style>