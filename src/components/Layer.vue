<template>
  <li class='layer' :class='{ active: isActive }' @click.self='selectObject(object)'>
    <input 
      type="checkbox"
      class="layer-visible"
      :id="`layer-${object._uid}-visibility`"
      v-model="object.visible"
    />
    <label :for="`layer-${object._uid}-visibility`" title="Toggle layer visibility">
      <icon v-if="object.visible" name="eye" />
      <icon v-else name="eye-off" />
    </label>
    {{object.type}}
    <button class="delete-object" title="Delete layer" @click="deleteObject(object)">
      <icon name="delete" />
    </button>
  </li>
</template>

<script>
import '../icons/delete';
import '../icons/eye';
import '../icons/eye-off';

export default {
  name: 'layer',
  props: ['object'],
  computed: {
    isActive() {
      return this.$store.getters.activeObjectId === this.object._uid;
    }
  },
  methods: {
    deleteObject(object) {
      this.$store.commit('DELETE_OBJECT', object);
    },
    selectObject(object) {
      this.$store.commit('SELECT_OBJECT', object);
    }
  }
}
</script>

<style scoped lang="scss">
  input[type="checkbox"] {
    display: none;
  }
  
  label {
    width: auto;
    
    &:hover {
      color: #fff;
    }
  }
  
  .active {
    font-weight: bold;
  }
  
  .delete-object {
    background-color: #535353;
    border:           0;
    border-top: 1px solid #616161;
    box-shadow:       0px 0px 0px 1px #333,
                      0px 0px 4px #333;
    color:            #e6e6e6;
    cursor:           pointer;
    float:            right;
    margin-top: -2px;
    border-radius: 2px;
    padding: 2px 3px;
    outline: none;
    
    &:active {
      border-top: 1px solid #424242;
      color:      #d6d6d6;
      box-shadow: 0px 0px 0px 1px #333,
                  inset 0px 0px 4px #333;
      
      &:hover {
        color: #d6d6d6;
      }
    }
    
    &:hover {
      color:       #fff;
    }
    
    .svg-icon {
      margin: 0;
    }
  }
  
  .layer {
    cursor: pointer;  
    list-style-type: none;
    padding: 10px;
  }
  
  .layer:hover {
    background-color: rgba(88, 102, 119, 0.5);
  }
  
  .layer.active {
    background-color: #586677;
  }
  
  .layer-visible {
    margin-right: 10px;
  }
</style>