<!-- Los views siempre son componentes, pero la diferencia entre los demás view es que estos componentes se usan para navegar entre diferentes rutas, algo así como un contenedor de otro componentes -->

<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{dayMonthYear.day}}</span>
                <span class="mx-1 fs-3">{{dayMonthYear.month}}</span>
                <span class="mx-2 fs-4 fw-light">{{dayMonthYear.yearDay}}</span>
            </div>

            <!--El botón de borrar sólo se mostrará si hay una entrada, validamos con entry.id-->
            <div>
                <input type="file"
                @change="onSelectedImage"
                ref="imageSelector"
                v-show="false"
                accept="image/png, image/jpeg"> <!--Este input no aparecerá, pero con la ref lo utilizaremos cuando se presiona el botón de subir foto-->

                <button 
                v-if="entry.id"
                class="btn btn-danger mx-2"
                @click="onDeleteEntry">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary"
                @click="onSelectImage"> <!--Con esta función buscaremos la referencia del input-->
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>

        <!-- Esto es exclusivo de vue 3, llamar otro root element -->
        <hr>
        
        <div class="d-flex flex-column px-3 h-75">
            <textarea 
            v-model="entry.text"
            placeholder="¿Qué sucedió hoy?"></textarea>
        </div>

        <Fab 
        icon="fa-save"
        @on:click="saveEntry"
        /> <!--El icon se está enviando como prop al Fab, indicando así que cambie el icono del botón Fab-->

        <img 
        v-if="entry.picture && !localImage"
        :src="entry.picture"
        alt="entry-picture"
        class="img-thumbnail">
        
        <img 
        v-if="localImage"
        :src="localImage"
        alt="entry-picture"
        class="img-thumbnail">

    </template>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapActions,mapGetters } from 'vuex'; //computed
import Swal from 'sweetalert2'

import getDayMonthYear from '../helpers/getDayMonthYear'
import uploadImage from '../helpers/uploadImage'

export default {
    name:'EntryView',
    props:{
        id:{
            type:String,
            required:true
        }
    },
    components:{
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue'))
    },
    data(){
        return{
            entry:null,
            localImage:null,
            file:null
            // entry:{
            //     text:''
            // }
        }
    },
    //Mi respuesta:
    computed:{
        ...mapGetters('journalModule',['getEntryById']), //Llamamos al getter
        dayMonthYear(){ //Esta función da el formato correcto a las fechas obtenidas por this.entry.date
            const {day, month, yearDay} = getDayMonthYear(this.entry.date)
            return {day,month,yearDay}
        }
        // day(){
        //     console.log(this.entry.date)
        //     const {day} = getDayMonthYear(this.entry.date)
        //     return day
        // },
        // month(){
        //     const {month} = getDayMonthYear(this.entry.date)
        //     return month
        // },
        // yearDay(){
        //     const {yearDay} = getDayMonthYear(this.entry.date)
        //     return yearDay
        // },

    },
    methods:{
        loadEntry(){
            //Esto corrige el bug de que cada que se cambie de imagen se mantenga la imagen
            this.localImage = null
            this.file = null

            let entry //Declaramos entry

            if(this.id === 'new'){ //Validamos si el id 'new' que es cuando se presiona el botón de '+'
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            }else{ //Sino obtenemos la entrada seleccionada
                entry = this.getEntryById(this.id)
                if(!entry) return this.$router.push({name:'no-entry'}) //Si no hay información de la entrada seleccionada, redirigimos a fuera de la entrada

                // return this.getEntryById(this.id)
            }
            this.entry = entry //Al data.entry le damos la información del entry


            
        },
        ...mapActions('journalModule', ['updateEntry','createEntry','deleteEntry']),
        async saveEntry(){
            //Creamos una alerta de espera en lo que se guarda una entrada
            Swal.fire({
                title:'Espere por favor',
                allowOutsideClick: false
            })

            Swal.showLoading()

            //Llamamos a la función que sube la imagen en el servidor
            const picture = await uploadImage(this.file)

            //Una vez subida la imagen al servidor, retorna el url en el que se está guardando, es tan simple como asignarlo al this.entry.picture
            this.entry.picture = picture

            if (this.entry.id){ //Si this.entry.id tiene un valor, significa que quiere actualizarse    
                // console.log(this.entry)
                //Action del Journal Module
                await this.updateEntry(this.entry)
            }else{
                //Mi respuesta
                //Sino lo tiene, significa que quiere crear una nueva entrada
                // console.log('Post de una nueva entrada')

                //await action
                const id = await this.createEntry(this.entry) //Aquí se está guardando lo del return del actions

                //redirectTo => entry, param:id
                this.$router.push({name:'entry', params:{id}})
                
            }

            this.file = null //Para vaciar de nuevo la data y que no se sobreponga la imagen cuando se cambie de entrada
            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')
        },
        async onDeleteEntry(){ //Creamos la función para borrar entrada
            const {isConfirmed} = await Swal.fire({
                title:'¿Está seguro?',
                text:'Una vez borrado, no se puede recuperar',
                showDenyButton:true,
                confirmButtonText:'Sí, estoy seguro'
            })

            if (isConfirmed){ //isConfirmed es un bool que devuelve await Swal.fire cuando se presiona que sí se desea borrar
                //Mostramos alerta de espera
                Swal.fire({
                    title:'Espere por favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()

                //Borramos la entrada enviando el entry.id a las acción deleteEntry
                await this.deleteEntry(this.entry.id)

                //redirectTo => no-entry
                this.$router.push({name:'no-entry'})
                
                //Mostramos que se completó la eliminación
                Swal.fire('Eliminado','','success')
            }


        },
        onSelectedImage(event){
            const file = event.target.files[0] //Por defecto event.target.files devuelve un arreglo, en este caso sólo accederemos al primero
            
            //Si no tenemos un archivo, entonces simplemente convertimos en null nuestras variables de data relacionadas con la imagen
            if(!file){
                this.localImage = null
                this.file = null
                return
            }

            //Usamos esto para guardar el file que se sube en una variable local de la data
            this.file = file

            //Lo siguiente carga el archivo en la variable localImage
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)
        },
        onSelectImage(){
            // console.log(this.$refs)
            this.$refs.imageSelector.click() //Esto es de js, es como si hiciéramos un: document.querySelector('input').click(), entonces hace que el subir foto funcione como el input
            
        }
    },
    created(){
        // console.log(this.$route.params.id)
        // console.log(this.id)
        this.loadEntry() //Llamamos al método que a su vez llama al getEntryById
    },

    watch:{
        id(){ //Observará el id, y lo que esté dentro sólo se ejecutará cuando este id haya cambiado
            this.loadEntry()
        }
    }

    //Curso:
    // computed:{
    //     ...mapGetters('journalModule',['getEntryById']),
    // },
    // methods:{
    //     loadEntry(){
    //         const entry = this.getEntryById(this.id)
    //         console.log(entry)
    //     }
    // },    
    // created(){
    //     this.loadEntry()
    // }
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