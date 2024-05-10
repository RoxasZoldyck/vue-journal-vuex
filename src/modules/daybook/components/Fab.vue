<template>
  <button class="btn btn-primary"
  @click="$emit('on:click');">
    <i class="fa fa-2x"
    :class="icon"
    ></i> <!--El :class hará un append para que se agreguen más clases, pero no se pueden usar dos :class, sí un class y :class. Nota 2: El $emit('on:click') emite un click en la función llamada on:click del componente Fab-->
  </button>
</template>

<script>

//fa plus ejercicio, hacer que el icono por defecto sea fa-plus, y sino que se ponga el que se mande

export default {
  emits:[],
  props:{
    icon:{
      type: String,
      default:'fa-plus' //Hacemos que cuando se llame al componente Fab, si se tiene como atributo el icon se sobreponga sobre el por defecto, que el por defecto es fa-plus
    }
  }
}
</script>

<style lang="scss" scoped>
//Hacemos que el botón para agregar entradas quede fijo
button{
    border-radius: 100%;
    bottom: 20px;
    height: 80px;
    position: fixed;
    right: 20px;
    width: 80px;
}
</style>