<template>
  <div id="universe-mirror">
    <div class="um-user-application" v-for="component in installedComponents">
      <div :is="component"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "landing-page",
  watch: {
    registeredComponents() {
      console.log("Watch Changed Register Components");
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
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#universe-mirror {
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}
</style>
