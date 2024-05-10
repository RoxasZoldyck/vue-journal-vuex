import { createStore } from "vuex"
import { journalModule } from "@/modules/daybook/store/journal"
import { journalState } from "../../../mock-data/test-journal-state"
import { shallowMount } from "@vue/test-utils"
import EntryList from "@/modules/daybook/components/EntryList.vue"


const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journalModule, //Desestructuramos todo lo que journalModule contenga
                state: { ...initialState } //Sobreescribimos el state con lo que haya en initialState
            }
        }
    })

describe('Pruebas en el EntryList', () => {
    const store = createVuexStore(journalState)
    const mockRouter = {
        push: jest.fn()
    }

    const wrapper = shallowMount(EntryList, {
        global: {
            mocks: {
                $router: mockRouter
            },
            plugins: [store]
        }
    })

    test('debe de llamar el getEntriesByTerm sin termino y mostrar 2 entradas', () => {
        console.log(wrapper.html())

    })
})