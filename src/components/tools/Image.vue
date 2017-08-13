<template>
  <tool type="image" title="Import Image..." :opts="$data">
    <label for="image-file">
      <icon name="file-image" />
      <input id="image-file" type="file" @change="fileSelect">
    </label>
  </tool>
</template>

<script>
import '../../icons/file-image';
import Tool from '../Tool.vue';
  
export default {
  name: 'tool-image',
  components: {
    Tool
  },
  data() {
    return {
      fileName: '',
      fill: null,
      height: 0,
      originX: 'center',
      originY: 'center',
      src: '',
      width: 0
    }
  },
  methods: {
    fileSelect(e) {
      const reader = new FileReader();
      const file = e.target.files[0];
      const dataURL = reader.readAsDataURL(file);

      this.fileName = file.name;
      
      reader.onload = (e) => {
        let img = new Image();
        img.src = e.target.result;
        
        img.onload = () => {
          this.src = img.src;
          this.width = img.width;
          this.height = img.height;
        }
      }
    }
  },
  
  drawObject(obj, e) {
    return null;
  },
  initializeObject(e, opts) {
    return Object.assign(
      Tool.initializeObject(e, opts),
      { type: 'image' }
    );
  }
}
</script>

<style scoped>
  input[type="file"] {
    display: none;
  }
  
  label {
    width: auto;
  }
</style>