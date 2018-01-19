<template>
    <div class="um-user-application" v-if="isInitialized" :ref="appComponent">
        <vue-draggable-resizable  :x="x" :y="y" :resizable="false" @dragging="onChangePosition" @dragstop="onStopChangePosition">
            <div :is="appComponent"></div>
        </vue-draggable-resizable>
    </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";

export default {
  name: "user-app-component",
  props: ["appComponent", "onMoving"],
  created() {
    // Set Element Position To Saved Position
    this.x = Math.random() * (document.body.offsetWidth * 0.8);
    this.y = Math.random() * (document.body.offsetHeight * 0.8);
    this.isInitialized = true;
  },
  mounted() {},
  components: {
    "vue-draggable-resizable": VueDraggableResizable
  },
  data() {
    return {
      isProcessChanging: false,
      isInitialized: false,
      x: 0,
      y: 0
    };
  },
  methods: {
    onStartChangePosition() {
      this.isProcessChanging = true;

      // start change position
    },
    onChangePosition(x, y) {
      // if isProcessChanging is false, call onStartChangePosition
      if (!this.isProcessChanging) {
        this.onStartChangePosition();
      }

      // save position
      this.x = x;
      this.y = y;

      // processing
      this.onMoving(this.appComponent, this.x, this.y);
    },
    onStopChangePosition(x, y) {
      this.isProcessChanging = false;

      // save position
      this.x = x;
      this.y = y;

      // stop change position
    }
  }
};
</script>
<style>
.um-user-application > .vdr {
  width: initial !important;
  height: initial !important;
}
</style>
