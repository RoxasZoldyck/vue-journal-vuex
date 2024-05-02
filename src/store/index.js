import { createStore } from 'vuex'
import journalModule from '../modules/daybook/store/journal' //El nombre del módulo podría ser cualquiera, pero lo dejamos con el que ya arrastra desde el módulo


const store = createStore({
    modules: {
        journalModule,
    }
})

export default store