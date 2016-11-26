<template>
  <div id="object-inspector">
    <label for="object-width">Width</label>
    <input type="number" name="object-width" v-model='adjustedWidth' />
    <label for="object-height">Height</label>
    <input type="number" name="object-height" v-model='adjustedHeight' />
    <label for="object-angle">Rotation</label>
    <input type="number" name="object-angle" v-model='object.angle' />
    <label for="object-opacity">Opacity</label>
    <input type="number" name="object-opacity" v-model='object.opacity' step='0.1' />
    <label for="object-fill">Color</label>
    <input type="text" name="object-fill" v-model='object.fill' />
  </div>
</template>

<script>
export default {
  name: 'object-inspector',
  props: ['object'],
  computed: {
    adjustedHeight: {
      get() {
        return Math.round(this.object.height * this.object.scaleY);
      },
      set(val) {
        let diff = val - this.adjustedHeight;
        this.object.height += diff / this.object.scaleY;
      }
    },
    adjustedWidth: {
      get() {
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