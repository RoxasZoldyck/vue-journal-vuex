// export const myGetter = (state) =>{
//  return state.algo
//  return state
// }


//Primer ejercicio, enviar esto al componente EntryList para que lo imprima:

//Se agrego (term = '') porque se pedirá como paramétro en otra función declarada como computada en el EntryList
export const getEntriesByTerm = (state) => (term = '') => {
    if (term.length === 0) return state.entries //En caso de que no se haya enviado en term, te van a devolver las entradas por defecto, sino:
    return state.entries.filter(entry => entry.text.toLowerCase().includes(term.toLocaleLowerCase())) //Aquí se está creando un buscador, en donde se compara al entry.text en minuscula con el term en minuscula también
}


//id
export const getEntryById = (state) => (id = '') => {
    //Mi respuesta:
    const entry = state.entries.find(entry => entry.id === id) //Utilizamos find para encontrar dentro del objeto, el objeto donde el entry.id = id
    if (!entry) return //Si no se encontró el id no se retorna nada

    return { ...entry } //Si sí, se retorna {...entry} que es el que contiene la información del entry encontrado con el id

    // //Curso:
    // const entry = state.entries.find(entry => entry.id === id)
    // if (!entry) return

    // return { ...entry }

}