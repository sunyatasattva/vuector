<template>
  <div id="app">
    <fabric-canvas 
      ref="canvas"
      v-model="state"
      :height=200
      @mouseDown="addObject">
    </fabric-canvas>
    <ol>
      <li v-for="object in state.canvas.objects">
        <b><input type="text" v-model="object.fill"></b>
        <input type="number" v-model="object.scaleX">
      </li>
    </ol>
    
    <object-inspector :object='activeObject' />
    <layers-panel :objects='state.canvas.objects' @selectObject='selectObject' />
  </div>
</template>

<script>
import ObjectInspector from './components/ObjectInspector.vue';
import LayersPanel from './components/LayersPanel.vue';

let fixture = { canvas: {"objects":[{"type":"rect","originX":"left","originY":"top","left":114,"top":87,"width":20,"height":20,"fill":"red","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":45,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"rect","originX":"left","originY":"top","left":200,"top":100,"width":20,"height":20,"fill":"green","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":45,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0}],"background":""}, meta: {}};

export default {
  name: 'app',
  components: {
    LayersPanel,
    ObjectInspector
  },
  data() {
    return {
      state: fixture
    }
  },
  computed: {
    activeObject() {
      return this.state.canvas.objects.find((object) => {
        return object._uid === this.state.meta.activeObject;
      });
    }
  },
  methods: {
    addObject(opts) {
      console.log(opts);
      if(opts.target)
        return;
      this.state.canvas.objects.push({
        type: 'circle',
        radius: 20,
        left: opts.e.offsetX,
        top: opts.e.offsetY
      });
    },
    selectObject(obj) {
      this.state.meta.activeObject = obj._uid;
    }
  }
}
</script>
