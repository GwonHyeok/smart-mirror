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
    
    // Initialize User Application
    this.$electron.ipcRenderer.send('initialize-user-applications')

    // Register Component
    this.$electron.ipcRenderer.on("register-component", this.registerComponent);

    // If Finish Main Process Processing go HomePage
    this.$electron.ipcRenderer.on("launchApp", this.launchApp);
  },
  data: () => {
    return {}
  },
  methods: {
    registerComponent: function (event, appName, componentName) {
        const appProvider = this.$electron.remote.getGlobal('applicationProvider')

        appProvider.findApplication(appName)
          .then(app => {
              const userApp = eval(app.code)
              const { component } = userApp.application.components
                .filter(component => component.name === componentName)[0]
              Vue.component(componentName, component.default);
          })
    },

    launchApp: function (event) {
      setTimeout(() => this.$router.push("/home"), 1000);
    }
  }
};
</script>