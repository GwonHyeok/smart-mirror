<template>
<div>
    <img src="https://media.giphy.com/media/5bWwzEt5TCvzG/giphy.gif"/>
    <p>Wait for finish launching SmartMirror</p>
    <v-component v-if="isLoading" :is="'clock'"></v-component>
</div>
</template>

<script>
import Vue from "vue";

export default {
  name: "splash",
  mounted() {
    // Register Component
    this.$electron.ipcRenderer.on(
      "register-component",
      (event, componentName, componentText) => {
        Vue.component(componentName, eval(componentText));
      }
    );

    // If Finish Main Process Processing go HomePage
    this.$electron.ipcRenderer.on("launchApp", () => {
      console.log("finish loading Main Process");
      this.isLoading = true;
    });
  },
  data() {
    return {
      isLoading: false
    };
  }
};
</script>