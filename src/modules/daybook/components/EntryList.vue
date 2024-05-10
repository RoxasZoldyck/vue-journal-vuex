<!-- Este componente contiene una lista de entradas y se encuentra dentro de DayBookLayout -->
<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input 
            type="text"
            class="form-control"
            placeholder="Buscar entradas"
            v-model="term"
            />
        </div>

        <!--Creamos el botón para agregar nuevas entradas-->
        <div class="mt-2 d-flex flex-column">
            <button class="btn btn-primary mx-3"
            @click="$router.push({name:'entry', params:{id:'new'}})">
                <i class="fa fa-plus-circle"></i>
                Nueva entrada
            </button>
        </div>


        <div class="entry-scrollarea">
            <!-- Primer ejercicio, llamar al getter getEntriesByTerm para que imprima las entradas configuradas en el state: -->
            <!-- Mi respuesta: -->
            <!-- También se puede hacer sin mapGetters con $store.getters['journalModule/getEntriesByTerm']-->
            <Entry
            v-for="entry in entriesByTerm"
            :key="entry.id"
            :entry="entry"> <!--Esto es importante, aquí con :entry se está mandando el objeto que contiene todas las entradas-->
            </Entry>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters } from 'vuex';

export default {
    components:{
        Entry: defineAsyncComponent(()=>import('../components/Entry.vue')),
    },
    //Mi respuesta
    computed:{
        ...mapGetters('journalModule',['getEntriesByTerm']),
        //Esta función computada lo que hace es regresar getEntriesByTerm pero con el argumento del term, el cuál está vinculado al input Buscar entradas por medio de un v-model
        entriesByTerm(){
            return this.getEntriesByTerm(this.term)
        }
    },
    data(){
        return {
            term:''
        }
    }
}
</script>

<style lang="scss" scoped>

.entry-list-container{
    border-right: 1px solid #2c3e50;
    height: calc(100vh - 56px); //100vh es la altura total, y se le resta 56 px
}

.entry-scrollarea{
    height: calc(100vh - 110px);//100vh es la altura total, y se le resta 110 px
    overflow: scroll; //Habilitamos el scroll
}
</style>