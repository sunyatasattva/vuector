<template>
  <li class='layer' :class='{ active: isActive }' @click.self='selectObject(object)'>
    <input 
      type="checkbox"
      class="layer-visible"
      v-model="object.visible"
    />
    {{object.type}}
    <button class="delete-object" @click="deleteObject(object)">
      Delete
    </button>
  </li>
</template>

<script>
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

<style scoped>
  .layer {
    cursor: pointer;  
    list-style-type: none;
    padding: 10px 20px;
  }
  
  .layer:hover {
    background-color: rgba(88, 102, 119, 0.5);
  }
  
  .layer.active {
    background-color: #586677;
  }
  
  .active {
    font-weight: bold;
  }
</style>