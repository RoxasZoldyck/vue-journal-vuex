//Hacer de ejercicio que haga match con el snapshot

//Mi respuesta:
import { shallowMount } from "@vue/test-utils";
import AboutView from "@/views/AboutView.vue"; //Sujeto de pruebas

describe('Pruebas al AboutView component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(AboutView)
    })

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot() //Aquí se hace la prueba, wrapper contiene el código html, y lo relaciona con el Snapshot para válidar que sea el mismo
    })
})