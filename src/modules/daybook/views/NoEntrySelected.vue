<template>
  <div class="d-flex justify-content-center">
    <h1 class="align-self-center">No hay nada seleccionado</h1>
  </div>
  <Fab
  @on:click="createNewEntry"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    name:'NoEntrySelected',
    components:{
        Fab: defineAsyncComponent(()=> import('../components/Fab.vue'))
    },
    methods:{
      createNewEntry(){
          this.$router.push({name:'entry', params:{id:'new'}}) //Cuando no haya ninguna entrada seleccionada y se presioné el botón de '+', lo redireccionaremos a entry con el id:'new' como parametro
      }
    }
}
</script>

<style lang="scss" scoped>
div{
    height: 100%;
}
</style>