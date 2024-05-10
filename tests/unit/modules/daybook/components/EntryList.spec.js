import { createStore } from "vuex"
import journalModule from "@/modules/daybook/store/journal"
import { journalState } from "../../../mock-data/test-journal-state"
import { shallowMount } from "@vue/test-utils"
import EntryList from "@/modules/daybook/components/EntryList.vue"


const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journalModule: {
                ...journalModule, //Desestructuramos todo lo que journalModule contenga
                state: { ...initialState } //Sobreescribimos el state con lo que haya en initialState
            }
        }
    })

describe('Pruebas en el EntryList', () => {
    const store = createVuexStore(journalState) //Creamos nuestro store virtual
    const mockRouter = {
        push: jest.fn()
    } //Creamos el router virtual, este básicamente se encarga de que se cumplan $router

    let wrapper

    //Hacemos esto para que el wrapper se reinicie cada que se ejecute una prueba
    beforeEach(() => {
        jest.clearAllMocks() //Limpiamos todos los mocks
        wrapper = shallowMount(EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            }
        })
    })

    test('debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {

        expect(wrapper.findAll('entry-stub').length).toBe(2) //Validamos que haya sólo 2 objetos de entry-stub
        expect(wrapper.html()).toMatchSnapshot() //Validamos la snapshot

    })

    test('debe de llamar el getEntriesByTerm y filtrar las entradas', async () => {

        const input = wrapper.find('input') //Buscamos el input
        await input.setValue('Mariana') //Colocamos en el input lo que queremos buscar

        expect(wrapper.findAll('entry-stub').length).toBe(1) //Sólo debe de regresar una entrada

    })

    test('el boton de nuevo debe de redireccionar a /new', () => {

        wrapper.find('button').trigger('click') //Presionamos el butón y mandamos un click virtual

        expect(mockRouter.push)
            .toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } }) //Validamos que el router se llame con el objeto { name: 'entry', params: { id: 'new' } }, el cuál es el que te envía a la ruta entry

    })
})