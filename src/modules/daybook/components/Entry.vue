<!-- Este componente contiene la información de entrada y se encuentra dentro del componente EntryList -->
<template>
    <div 
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({name:'entry', params:{id:entry.id}})"> <!--En este @click estamos usando el router para acceder a entry, y enviamos como parametro el id:10-->
    <!-- Title -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">{{day}}</span>
            <span class="mx-1 fs-5">{{month}}</span>
            <span class="mx-1 fw-light">{{yearDay}}</span>
        </div>
        <div class="entry-description">
            {{ shortText }} <!--En lugar de entry.text usamos la propiedad computada-->
        </div>
    </div>
</template>

<script>
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days   = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado']

    export default{
        props:{
            //Está propiedad se está mandando desde EntryList, aquí sólo se declara para saber cómo se recibirá
            entry:{
                type:Object,
                required:true
            }
        },
        computed:{
            //Esta función computada dice que si el entry.text.length es > 130 se mostrará sólo hasta los 130 y se agregará '...' al final, sino te devolverá completo el this.entry.text
            shortText(){
                return(this.entry.text.length > 130)
                ? this.entry.text.substring(0,130) + '...'
                : this.entry.text
            },
            //Le damos formato al día obtenido del state
            day(){
                const date = new Date(this.entry.date)
                return date.getDate()
            },
            //Le damos formato al mes obtenido del state
            month(){
                const date = new Date(this.entry.date)
                return months[date.getMonth()]
            },
            //Le damos formato al año y día obtenido del state
            yearDay(){
                const date = new Date(this.entry.date)
                return `${date.getFullYear()}, ${days[date.getDay()]}`
            }
        }
    }
</script>

<style lang="scss" scoped>
.entry-container{
    border-bottom:1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover{ //Es lo mismo que poner .entry-container:hover{}, esto es porque se está usando scss
        background-color:lighten($color: grey, $amount: 45); //Esta función es también de sass, te permite aclarar un color por porcentajes
        transition: 0.2s all ease-in;
    }

    .entry-description{
        font-size:12px;
    }
}
</style>