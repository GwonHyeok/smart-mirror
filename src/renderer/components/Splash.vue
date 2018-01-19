<template>
<div id="universe-mirror-splash">
  <div id="splash-lottie-wrapper">
    <lottie :options="splashAnimationOptions"></lottie>
  </div>
  <div id="splash-text-wrapper">
    <h2 id="splash-text" :class="{active: isShowText}">Waiting for finish launching UniverseMirror</h2>
  </div>
</div>
</template>

<script>
import Vue from "vue";
import Lottie from "vue-lottie";
import * as splashLoading from "../../../static/splash/loading.json";

export default {
  name: "splash",
  mounted() {
    // Initialize User Application
    this.$electron.ipcRenderer.send("initialize-user-applications");

    // Register Component
    this.$electron.ipcRenderer.on("register-component", this.registerComponent);

    // If Finish Main Process Processing go HomePage
    this.$electron.ipcRenderer.on("launchApp", () =>
      setTimeout(this.launchApp, 1000)
    );

    // Dot Animation
    setInterval(this.splashTextAnimation, 1000);
  },
  components: {
    lottie: Lottie
  },
  data: () => {
    return {
      isShowText: false,
      splashAnimationOptions: {
        animationData: splashLoading
      }
    };
  },
  methods: {
    registerComponent: function(event, appName, componentName) {
      const appProvider = this.$electron.remote.getGlobal(
        "applicationProvider"
      );

      appProvider.findApplication(appName).then(app => {
        const components = eval(app.code.components);

        const { component } = components.filter(component => {
          return component.name === componentName;
        })[0];

        Vue.component(componentName, component.default);
      });
    },
    splashTextAnimation() {
      this.isShowText = !this.isShowText;
    },
    clearSplashTextAnimation() {
      clearInterval(this.splashTextAnimation);
      this.isShowText = true;
    },
    launchApp: function(event) {
      this.clearSplashTextAnimation();
      this.$router.push("/home");
    }
  }
};
</script>

<style scoped>
#universe-mirror-splash {
  height: 90vh;
  width: 100%;
}

#splash-lottie-wrapper {
  height: 80%;
  width: 100%;
}

#splash-text-wrapper {
  height: 20%;
  width: 100%;
  text-align: center;
}

#splash-text {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  -moz-transition: all 0.5s linear;
  -o-transition: all 0.5s linear;
  -webkit-transition: all 0.5s linear;
  transition: all 0.5s linear;
}

#splash-text.active {
  color: transparent;
}
</style>
