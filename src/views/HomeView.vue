<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Hola mundo</h1>
    <button @click="goToDaybook" class="btn btn-primary">Primary</button>
    <button @click="goToDaybook" class="btn btn-secondary">Secondary</button>
    <button @click="goToDaybook" class="btn btn-success">Success</button>
  </div>
  
</template>

<script>
export default {
  methods:{
    goToDaybook(){
      this.$router.push({name:'no-entry'}) //En vez de redireccionar a daybook, se redirecciona a no-entry, que se carga en el mismo url, pero se carga también el componente NoEntrySelected
    }
  }
}
</script>