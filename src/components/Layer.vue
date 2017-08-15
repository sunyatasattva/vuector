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
    
    <input 
      type="checkbox"
      class="layer-selectable"
      :id="`layer-${object._uid}-selectable`"
      v-model="object.selectable"
    />
    <label :for="`layer-${object._uid}-selectable`" title="Lock layer in place">
      <icon name="lock" />
    </label>
    
    <editable-span :value="object.name" @update="updateName">
      {{ object.name || object.type }}
    </editable-span>

    <button class="delete-object" title="Delete layer" @click="deleteObject(object)">
      <icon name="delete" />
    </button>
  </li>
</template>

<script>
import '../icons/delete';
import '../icons/eye';
import '../icons/eye-off';
import '../icons/lock';
import EditableSpan from './EditableSpan.vue';
import Vue from 'vue';

export default {
  name: 'layer',
  props: ['object'],
  components: {
    EditableSpan
  },
  computed: {
    isActive() {
      return this.$store.getters.activeObjectId === this.object._uid;
    }
  },
  data() {
    return {
      isEditing: false
    }
  },
  methods: {
    updateName(name) {
      Vue.set(this.object, 'name', name);
    },
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
  @import '../styles/_mixins';
  
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
    @extend %raised-button;
    
    float:            right;
    margin-top: -2px;
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
  
  .layer-selectable {
    
    + label {
      @extend %raised-button;
      
      border-color: transparent;
      background-color: transparent;
      box-shadow: none;
      display:      inline-block;
      margin-right: 10px;
    }
    
    &:not(:checked) + label {
      border-top: 1px solid #424242;
      box-shadow: 0px 0px 0px 1px #333,
        inset 0px 0px 4px #333;
      color:      #d6d6d6;
    }
  }
  
  .layer-visible {
    margin-right: 10px;
  }
</style>