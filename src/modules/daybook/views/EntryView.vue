<!-- Los views siempre son componentes, pero la diferencia entre los demás view es que estos componentes se usan para navegar entre diferentes rutas, algo así como un contenedor de otro componentes -->

<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">02</span>
            <span class="mx-1 fs-3">05</span>
            <span class="mx-2 fs-4 fw-light">2024, jueves</span>
        </div>
        <div>
            <button class="btn btn-danger mx-2">
                Borrar
                <i class="fa fa-trash-alt"></i>
            </button>
            <button class="btn btn-primary">
                Subir foto
                <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>

    <!-- Esto es exclusivo de vue 3, llamar otro root element -->
    <hr>
    
    <div class="d-flex flex-column px-3 h-75">
        <textarea placeholder="¿Qué sucedió hoy?"></textarea>
    </div>

    <Fab icon="fa-save"/> <!--El icon se está enviando como prop al Fab, indicando así que cambie el icono del botón Fab-->

    <img src="https://www.billboard.com/wp-content/uploads/media/LIL-PEEP-x-MONTREALITY-screenshot-billboard-1548.jpg"
    alt="entry-picture"
    class="img-thumbnail">
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components:{
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue'))
    }
}
</script>

<style lang="scss" scoped>
//Estilos para que el textarea no tenga bordes
    textarea{
        font-size: 20px;
        border: none;
        height: 100%;

        &:focus{
            outline: none;
        }
    }
    img{
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    }
</style>