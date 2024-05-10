import { shallowMount } from "@vue/test-utils";
import Entry from "@/modules/daybook/components/Entry.vue";
import { journalState } from "../../../mock-data/test-journal-state"

//ejercicio resolver las siguientes pruebas
describe('Pruebas en el Entry Component', () => {
    // mockRouter
    const mockRouter = {
        push: jest.fn()
    }

    // const wrapper = shallowMount(entry, {.... props.... global....})
    const wrapper = shallowMount(Entry, {
        props: {
            entry: journalState.entries[0] //Tomamos la primera entrada del journalState
        },
        global: {
            mocks: {
                $router: mockRouter
            }
        }
    })

    test('debe de hacer match con el snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot() //Hacemos match con el snapshot
    })

    test('debe de redireccionar al hacer click en el entry-container', () => {
        const entryContainer = wrapper.find('.entry-container')
        entryContainer.trigger('click');

        expect(mockRouter.push).toHaveBeenCalled() //Validamos que mockRouter.push haya sido llamado
        expect(mockRouter.push).toHaveBeenCalledWith(
            {
                name: 'entry',
                params: {
                    id: journalState.entries[0].id
                }
            }
        ) //Validamos que mockRouter haya sido llamado y devuelto el objeto necesario para el router
    })

    test('pruebas en las propiedades computadas', () => {
        //wrapper.vm. <---- ver las propiedades computadas
        // console.log(wrapper.vm)
        //day:23
        expect(wrapper.vm.day).toBe(9)
        //month:Julio
        expect(wrapper.vm.month).toBe('Mayo')
        //yearDay:'2024, Viernes'
        expect(wrapper.vm.yearDay).toBe('2024, Jueves')
    })
})