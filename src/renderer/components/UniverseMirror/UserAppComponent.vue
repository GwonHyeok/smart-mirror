<template>
    <div class="um-user-application">
        <vue-draggable-resizable  :x="x" :resizable="false">
            <div :is="appComponent"></div>
        </vue-draggable-resizable>
    </div>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";

export default {
  name: "user-app-component",
  props: ["appComponent"],
  mounted() {},
  components: {
    "vue-draggable-resizable": VueDraggableResizable
  },
  data() {
    return {
      x: 0
    };
  }
};
</script>