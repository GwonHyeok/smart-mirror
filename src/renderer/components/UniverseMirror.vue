<template>
  <div id="universe-mirror">
    <user-app-component
      v-for="component in installedComponents"
      :app-component="component">
    </user-app-component>
  </div>
</template>

<script>
import UserAppComponent from "./UniverseMirror/UserAppComponent";

export default {
  name: "universe-mirror-page",
  components: {
    UserAppComponent
  },
  watch: {
    registeredComponents() {
      this.installedComponents = this.registeredComponents;
    }
  },
  mounted() {
    // Get registered Component names
    this.$electron.ipcRenderer.send("get-registered-component-names");

    // Response Registered Component names
    this.$electron.ipcRenderer.on(
      "response-get-registered-component-names",
      (event, componentNames) => {
        this.registeredComponents = componentNames;
      }
    );
  },
  methods: {},
  data() {
    return {
      registeredComponents: [],
      installedComponents: []
    };
  }
};
</script>

<style>

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#universe-mirror {
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}
</style>
