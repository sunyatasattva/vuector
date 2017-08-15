<template>
  <span class="editable-span">
    <span 
      v-if="!isEditing"
      @click="isEditing = !isEditing">
        <slot></slot>
    </span>
    <input
      type="text"
      autofocus
      v-else
      ref="$input"
      :value="value"
      @change="updateValue"
      @focus="$event.target.select()"
      @keyup.enter="isEditing = !isEditing" />
  </span>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'editable-span',
  props: ['value'],
  data() {
    return {
      isEditing: false
    }
  },
  methods: {
    updateValue(e) {
      this.$emit('update', e.target.value);
    }
  },
  watch: {
    isEditing(val) {
      if(val)
        Vue.nextTick(() => this.$refs.$input.focus());
    }
  }
}
</script>

<style>
</style>