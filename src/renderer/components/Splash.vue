<template>
    <img src="https://media.giphy.com/media/5bWwzEt5TCvzG/giphy.gif"/>
</template>

<script>
  export default {
    name: 'splash',
    mounted () {
      console.log(this)
      console.log(this.num)
      console.log(this.$router)
    },
    data () {
      return {
        num: 1
      }
    }
  }
</script>