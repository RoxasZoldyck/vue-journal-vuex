//Hacer de ejercicio que haga match con el snapshot

//Mi respuesta:
import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue"; //Sujeto de pruebas

describe('Pruebas al AboutView component', () => {
    let wrapper

    beforeEach(() => {
        wrapper = shallowMount(HomeView)
    })

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot() //Aquí se hace la prueba, wrapper contiene el código html, y lo relaciona con el Snapshot para válidar que sea el mismo
    })

    test('hacer click en un boton debe de redireccionar a no-entry', () => {

        //Creamos nuestro mock que es el que va a simular el push
        const mockRouter = {
            push: jest.fn()
        }

        const wrapper = shallowMount(HomeView, {
            global: {
                mocks: {
                    $router: mockRouter //También se puede sólo dejando $router y ya
                }
            }
        })

        wrapper.find('button').trigger('click')

        expect(mockRouter.push).toHaveBeenCalled() //Aquí validamos que se haya hecho el push al menos una vez
        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' }) //Aquí validamos que se haya hecho el push y te haya redireccionado a 'no-entry', si se llega a cambiar el nombre por ejemplo a 'no-entry2', fallará

    })
})