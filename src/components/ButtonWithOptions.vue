<template>
  <div class="button-with-options-container">
    <button 
      @click="showOptions = !showOptions"
      :class=" { 'is-active': showOptions }"
      :title="title">
      <slot name="button"></slot>
    </button>
    <div class="button-options" v-if="showOptions">
      <slot name="options"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'button-with-options',
  data() {
    return {
      showOptions: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/_mixins';
  
  .button-with-options-container {
    display:  inline-block;
    position: relative;
  }
  
  button,
  .button-options {
    position: absolute;
  }
  
  button {
    @extend %raised-button;
    
    cursor:  pointer;
    z-index: 2;
  }
  
  .button-options {
    top:     30px;
    z-index: 1;
  }
</style>