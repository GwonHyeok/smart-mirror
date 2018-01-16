<template>
<div>
    <img src="https://media.giphy.com/media/5bWwzEt5TCvzG/giphy.gif"/>
    <p>Wait for finish launching SmartMirror</p>
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
      setTimeout(() => {
        this.$router.push("/home");
        console.log('move to home page')
      }, 1000);
    });
  },
  data() {
    return {};
  }
};
</script>