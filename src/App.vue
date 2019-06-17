<template>
  <div id="app">
    <HelloWorld msg="Welcome to Forms App"/>
    <hr>
   <!-- <Form1></Form1> -->
    <Form2></Form2>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Form1 from './components/Form1.vue'
import Form2 from './components/Form2.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,Form1,Form2
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
