<template>
  <div class="import-button-container">
    <label for="import-input">
      <icon name="upload" />
    </label>
    <input type="file" id="import-input" @change="importFile" accept=".json">
  </div>
</template>

<script>
import '../icons/upload';
  
export default {
  name: 'button-with-options',
  methods: {
    importFile(e) {
      const reader = new FileReader();
      const file = e.target.files[0];
      
      reader.readAsText(file);
      
      reader.onload = (e) => {
        let json = JSON.parse(e.target.result);
        let canvas = {
          canvas: json,
          meta: {
            activeObjectId: null
          }
        };
        
        if( Array.isArray(json.objects) )
          this.$store.commit('SYNC_CANVAS', canvas);
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/_mixins';
  
  input,
  label {
    position: absolute;
  }
  
  input {
    display: none;
  }
  
  label {
    @extend %raised-button;
    
    line-height: 0;
    
    width: auto;
  }
  
  .import-button-container {
    display:  inline-block;
    position: relative;
    width:    25px;
  }
</style>