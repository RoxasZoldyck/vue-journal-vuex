import { shallowMount } from "@vue/test-utils"
import { createStore } from "vuex"
import journalModule from "@/modules/daybook/store/journal"
import { journalState } from "../../../mock-data/test-journal-state"
import EntryView from "@/modules/daybook/views/EntryView.vue"

import Swal from 'sweetalert2'


const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journalModule: {
                ...journalModule, //Desestructuramos todo lo que journalModule contenga
                state: { ...initialState } //Sobreescribimos el state con lo que haya en initialState
            }
        }
    })

//Creamos un mock de sweetaler2
jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en el EntryView', () => {

    const store = createVuexStore(journalState) //Creamos nuestro store virtual
    store.dispatch = jest.fn() //Aquí estamos reemplazando la función del dispatch, y asignándole una jest.fn(), así nos aseguramos de que no se borre de Firebase y todo se quede en un entorno virtual

    const mockRouter = {
        push: jest.fn()
    } //Creamos el router virtual, este básicamente se encarga de que se cumplan $router

    let wrapper

    //Hacemos esto para que el wrapper se reinicie cada que se ejecute una prueba
    beforeEach(() => {
        jest.clearAllMocks() //Limpiamos todos los mocks
        wrapper = shallowMount(EntryView, {
            props: {
                id: '-NxHcYiqqeYjJDIJT7G8'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test('debe de sacar al usuario porque el id no existe', () => {
        const wrapper = shallowMount(EntryView, {
            props: {
                id: 'Este ID no existe en el store'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })

        expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' }) //Aquí estamos enviando un id que no existe y validamos que nos mande a no-entry

    })

    test('debe de mostrar la entrada correctamente', () => {
        expect(wrapper.html()).toMatchSnapshot() //Validamos la snapshot haya sido cargada (Que se haya cargado el wrapper)
        expect(mockRouter.push).not.toHaveBeenCalled() //Sí es así, entonces también validamos que el mockRouter no haya sido llamado
    })

    test('debe de borrar la entrada y salir', (done) => {
        Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true })) //Aquí estamos simulando que se ejecute Swal y regrese una vez con isConfirmed:true

        wrapper.find('.btn-danger').trigger('click') //Buscamos el botón de borrar entrada y mandamos un click virtual

        expect(Swal.fire).toHaveBeenCalledWith({
            title: '¿Está seguro?',
            text: 'Una vez borrado, no se puede recuperar',
            showDenyButton: true,
            confirmButtonText: 'Sí, estoy seguro'
        }) //Nos aseguramos que el Swal.fire virtual haya sido llamado con el objeto deseado

        setTimeout(() => { //Se usa el Timeout por un error que hay
            expect(store.dispatch).toHaveBeenCalledWith("journalModule/deleteEntry", "-NxHcYiqqeYjJDIJT7G8") //Validamos que se haya llamado con la función deleteEntry y se pase como argumento el id
            expect(mockRouter.push).toHaveBeenCalled()//Validamos de que el push al router se haya llamado (Una vez que se elimina una entrada, te envía a no-entry)
            done()
        }, 1)
    })
})