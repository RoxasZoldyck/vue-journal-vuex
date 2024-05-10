//Tarea hacer las siguientes pruebas:


//Mi respuesta:
import { shallowMount } from "@vue/test-utils"
import Fab from "@/modules/daybook/components/Fab.vue"

describe('Pruebas en el Fab component', () => {

    // let wrapper

    // beforeEach(() => {
    //     wrapper = shallowMount(Fab)
    // })

    test('debe de mostrar el ícono por defecto', () => {
        //fa-plus
        const wrapper = shallowMount(Fab)
        const icon = wrapper.find('i') //Encontramos la etiqueta i que es la del icono
        expect(icon.classes('fa-plus')).toBe(true)  //Validamos que tenga la clase fa-plus
    })

    test('debe de mostrar el ícono por argumento: fa-circle', () => {
        //fa-circle
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'fa-circle' //Pasamos como argumento el fa-circle, si aquí en su lugar envíamos fa-circle2, la prueba fallará
            }
        })
        const icon = wrapper.find('i') //Encontramos la etiqueta i que es la del icono
        expect(icon.classes('fa-circle')).toBe(true)  //Validamos que tenga la clase fa-circle
    })

    test('debe de emitir el evento on:click cuando se hace click', () => {
        //wrapper.emitted('on:click')

        const wrapper = shallowMount(Fab)

        //Respuesta:
        // const button = wrapper.find('button') //Encontramos el botón al cuál se le hará click
        // button.trigger('click') //Enviamos un click virtual

        //Curso:
        wrapper.find('button').trigger('click')

        // console.log(wrapper.emitted())

        expect(wrapper.emitted('on:click')).toHaveLength(1)
    })
})