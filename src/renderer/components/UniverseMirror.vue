<template>
  <div id="universe-mirror">
    <user-app-component
      v-for="component in installedComponents"
      :app-component="component"
      :on-moving="onMovingComponent">
    </user-app-component>

    <div id="unregister-component-zone" :class="{active: isActivateDeleteMode}">
      <div id="unregister-wrapper">
        <img id="unregister-icon" :src="require('@/assets/ic_delete_white_48px.svg')"></img>
        <p>unregister component</p>
      </div>
    </div>
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
  methods: {
    onMovingComponent(componentName, x, y, height, width) {
      this.isActivateDeleteMode = document.body.offsetHeight - 50 <= y;
    }
  },
  data() {
    return {
      registeredComponents: [],
      installedComponents: [],
      isActivateDeleteMode: false,
      deleteModeComponentName: null
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

#unregister-component-zone {
  width: 100vw;
  height: 100px;
  bottom: 0;
  position: absolute;
  left: 0;

  border-top: 0.2px solid white;
  text-align: center;

  -webkit-transform: translate(0, 100px);
  -moz-transform: translate(0, 100px);
  -o-transform: translate(0, 100px);
  -ms-transform: translate(0, 100px);
  transform: translate(0, 100px);

  -webkit-transition: 0.5s ease-out;
  -moz-transition: 0.5s ease-out;
  -o-transition: 0.5s ease-out;
  transition: 0.5s ease-out;
}

#unregister-component-zone.active {
  -webkit-transform: translate(0, 0);
  -moz-transform: translate(0, 0);
  -o-transform: translate(0, 0);
  -ms-transform: translate(0, 0);
  transform: translate(0, 0);
}

#unregister-wrapper {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

#unregister-icon {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
