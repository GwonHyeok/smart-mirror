<template>
    <div class="um-user-application">
        <div :is="appComponent"></div>
    </div>
</template>

<script>
export default {
  name: "user-app-component",
  props: ['appComponent']
};
</script>