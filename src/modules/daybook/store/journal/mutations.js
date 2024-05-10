// export const myMutation = (state) =>{

// }

//Esta mutación asigna las entradas/entries enviadas desde las actions al state, y también le asigna el valor de false a isLoading
export const setEntries = (state, entries) => {
    state.entries = [...state.entries, ...entries] //Se le asigna el conjunto de state.entries utilizando la desestructuración el ...state.entries del State, y los ...entries encontrados en Actions
    state.isLoading = false
}

export const updateEntry = (state, entry) => { //entry actualizada
    // state.entries => un arreglo...
    const idx = state.entries.map(e => e.id).indexOf(entry.id) //Creamos un arreglo en donde sólo se tendrán los ids, con el objetivo de que podemos hacer un indexOf
    // console.log({ idx })
    state.entries[idx] = entry //Actualizamos el state.entries[indice] con la nueva información de la entrada

}

export const addEntry = (state, entry) => {
    state.entries = [entry, ...state.entries] //Aquí se pone primero entry, para que quede hasta arriba, y después agregamos el resto de state.entries
    // state -> entries -> la nueva entrada debe de ser la primera
}

export const deleteEntry = (state, id) => {
    state.entries = state.entries.filter(entry => entry.id !== id) //Con un filtro excluimos donde el id sea igual al id enviado desde la acción, así es como quitamos la entrada del state
}