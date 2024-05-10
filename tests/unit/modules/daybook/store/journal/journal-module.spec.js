import { createStore } from "vuex"
import journalModule from "@/modules/daybook/store/journal"
import { journalState } from "../../../../../../tests/unit/mock-data/test-journal-state"

const createVuexStore = (initialState) =>
    createStore({
        modules: {
            journal: {
                ...journalModule, //Desestructuramos todo lo que journalModule contenga
                state: { ...initialState } //Sobreescribimos el state con lo que haya en initialState
            }
        }
    })

describe('vuex - pruebas en el journal module', () => {
    //Básicas
    test('este es el estado inicial, debe de tener este state', () => {
        const store = createVuexStore(journalState) //Esto literalmente crea un vuex store

        // console.log(store.state)

        const { isLoading, entries } = store.state.journal

        //En nuestro mock hicimos el state
        expect(isLoading).toBeFalsy() //Se espera que esté en false, aquí válidamos si realmente lo está
        expect(entries).toEqual(journalState.entries) //Esperamos que las entradas del store creado sean iguales a las entradas de journalState (el mock)
    })

    //Mutations (Nota: Dispatch es para Actions y Commit es para Mutations)
    test('mutation: setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: [] }) //Seteamos es el estado inicial que tiene el objeto state para esta mutación

        store.commit('journal/setEntries', journalState.entries) //Hacemos el commit a la mutation, el cual nos pide como argumento el state que no se pone, porque en automático toma el que montamos, y el 2do argumento que son las entradsa que ese sí se coloca
        // store.commit('journal/setEntries', []) //Si en su lugar mandamos un arreglo vacía como las entradas, esto no funcionaría, porque se esperan que sean 2 entradas cargadas

        expect(store.state.journal.entries.length).toBe(2) //Esperamos que las entradas encontradas en el state sean sólo 2
        expect(store.state.journal.isLoading).toBeFalsy() //Esperamos que isLoading sea igual a falso


        //En las pruebas no se validará si vuex funciona correctamente, eso es trabajo de la gente que escribió vuex, nosotros vamos a probar que nuestro código funcione como nosotros esperamos
        //Un ejemplo es este, si mandamos a llamar setEntries con un arreglo vacío (Ninguna entrada), entonces estaríamos esperando a que salga tal cosa

    })

    //Ejercicio, realizar la siguiente prueba:
    test('mutation: updateEntry', () => {
        //Mi respuesta
        // create store con entries
        const store = createVuexStore(journalState) //Este es el estado inicial que tiene el objeto state originalmente

        // updatedEntry
        const updatedEntry =
        {
            id: "-NxRlYdhq26F8NHKuqfJ",
            date: 1715248447679,
            text: "hola mundo desde pruebas"
        }

        // commit de la mutation

        store.commit('journal/updateEntry', updatedEntry)

        // Expects
        // entries.lenght = 2
        // console.log(store.state)
        const storeEntries = store.state.journal.entries

        expect(storeEntries.length).toBe(2)
        // entries tiene que existir updatedEntry toEqual
        expect(storeEntries.find(e => e.id === updatedEntry.id)).toEqual(updatedEntry) //Primero usamos store.state.journal.entries.find para encontrar la entrada por el id, y luego lo coomparamos con la entrada actualizada

    })

    //Ejercicio
    test('mutation: addEntry deleteEntry', () => {
        // Mi respuesta:

        // store
        const store = createVuexStore(journalState)

        // commit addEntry {id:'ABC-123', text:'Hola mundo'}
        const entry = {
            id: 'ABC-123',
            text: 'Hola mundo'
        }
        store.commit('journal/addEntry', entry)

        const storeEntries = store.state.journal.entries

        // Expects
        // Entradas sean 3
        expect(storeEntries.length).toBe(3) //Validamos que se haya agregado pidiendo que sean 3 de length
        // Entrada con el id ABC-123 exista
        expect(storeEntries.find(e => e.id === entry.id)).toEqual(entry) //Validamos que sea la misma entrada
        expect(storeEntries.find(e => e.id === entry.id)).toBeTruthy() //Validamos que se haya encontrado el id (Qué exista)

        // commit deleteEntry, 'ABC-123'
        store.commit('journal/deleteEntry', entry.id)

        // Expects
        // Entradas sean 2
        expect(store.state.journal.entries.length).toBe(2) //Validamos que se haya eliminado ahora pidiendo 2 de length
        // Entrada con el id ABC-123 no debe existir
        expect(store.state.journal.entries.find(e => e.id === entry.id)).toBeFalsy() //Validamos que no se haya encontrado el id (Qué no exista)
    })

    //Getters
    test('getters: getEntriesByTerm, getEntryById', () => {

        // creamos store
        const store = createVuexStore(journalState)

        const [entry1, entry2] = journalState.entries //Estamos desestructurando las entradas

        //Ejercicio, hacer que el siguiente console.log pase el toBe(2)
        // console.log(store.getters['journal/getEntriesByTerm'](''))

        //Respuesta:
        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2) //Nota: ('') es el term que se está enviando, revisar getters si lo olvidas
        // console.log(store.getters['journal/getEntriesByTerm']('Mariana'))
        expect(store.getters['journal/getEntriesByTerm']('Mariana').length).toBe(1) //Sólo tiene que devolver 1 ya que sólo una entrada contiene Mariana en el texto

        expect(store.getters['journal/getEntriesByTerm']('Mariana')).toEqual([entry2]) //Validamos que sea igual a la entrada 2, que es la que contiene Mariana, convertimos a entry2 en arreglo porque store.getters['journal/getEntriesByTerm']('Mariana') devuelve un arreglo

        // Ejercicio hacer getEntryById

        //Mi respuesta:
        // console.log(store.getters['journal/getEntryById']('-NxRlYdhq26F8NHKuqfJ'))
        //-NxRlYdhq26F8NHKuqfJ
        expect(store.getters['journal/getEntryById']('-NxRlYdhq26F8NHKuqfJ')).toEqual(entry1) //Validamos que el id enviado sea igual al entry1

    })

    //Actions
    test('actions: loadEntries', async () => {

        const store = createVuexStore({ isLoading: true, entries: [] })

        await store.dispatch('journal/loadEntries') //Este tiene que ser asíncrono porque debemos de esperar a que termine el proceso

        expect(store.state.journal.entries.length).toBe(6)

    })

    test('actions: updateEntry', async () => {

        const store = createVuexStore(journalState)

        const updatedEntry = {
            id: "-NxRlYdhq26F8NHKuqfJ",
            date: 1715248447679,
            text: "hola mundo desde mock dataaaa",
            otroCampo: true, //Esto no importa ya que en la acción se está indicando que sólo se tomará date, text y picture
            otroMás: { a: 1 } //Esto no importa ya que en la acción se está indicando que sólo se tomará date, text y picture
        }

        await store.dispatch('journal/updateEntry', updatedEntry) //Este tiene que ser asíncrono porque debemos de esperar a que termine el proceso

        // console.log(resp)

        expect(store.state.journal.entries.length).toBe(2) //Validamos que sólo hayan 2 entradas (El state está cargando el mock)
        expect(store.state.journal.entries.find(e => e.id === updatedEntry.id)).toEqual({ //Validamos que se haya actualizado la entrada con los datos correspondientes
            id: "-NxRlYdhq26F8NHKuqfJ",
            date: 1715248447679,
            text: "hola mundo desde mock dataaaa",
        })

    })

    //Ejercicio:
    //Mi respuesta:
    test('actions: createEntry, deleteEntry', async () => {
        // createStore con journalState
        const store = createVuexStore(journalState)

        // newEntry ={date:1715078769094, text:'Nueva entrada desde las pruebas'}
        const newEntry = {
            date: 1715078769094,
            text: 'Nueva entrada desde las pruebas'
        }

        //dispatch de la acción createEntry enviando newEntry
        const resp = await store.dispatch('journal/createEntry', newEntry)

        // obtener el id de la nueva entrada
        // el id debe de ser un string
        const id = String(resp)

        expect(typeof id).toBe('string') //Válidamos que el id sea string

        // la nueva entrada debe de existir en el store.state.journal.entries...
        expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy() //Válidamos de que exista

        // # Segunda parte

        // dispatch deleteEntry
        await store.dispatch('journal/deleteEntry', id)

        // la nueva entrada NO debe de existir en el store.state.journal.entries...
        expect(store.state.journal.entries.find(e => e.id === id)).toBeFalsy()//Válidamos que ya no exista
    })


})
