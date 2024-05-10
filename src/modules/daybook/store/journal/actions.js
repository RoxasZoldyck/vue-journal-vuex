//Normalmente un action dentro va a tener el contexto, y utilizando la desestructuración podemos obtener lo que nos interesa que es el commit

import journalApi from "@/api/journalApi"

// export const myAction = async ( { commit }) => {

// }


//Acción que obtiene la infomración de las entrada, //Jala las entradas de firebase y las muestra en el componente EntryList
export const loadEntries = async ({ commit }) => {
    const { data } = await journalApi.get('/entries.json') //Accedemos con axios al api, aquí sólo se completa el URL

    //Si no se encontró data en firebase, enviamos un arreglo vacío a la mutation
    if (!data) {
        commit('setEntries', [])
        return
    }

    //Convertirmos el objeto que nos devuelve el API en un arreglo:
    const entries = []
    for (let id of Object.keys(data)) {
        entries.push({
            id,
            ...data[id]
        })
    }

    // console.log(entries)

    //Hacemos el commit para llamar a la mutation y enviarle los entries
    commit('setEntries', entries)
}

//Acción que edita una entrada
export const updateEntry = async ({ commit }, entry) => { //entry debe de ser un parámetro
    // console.log(entry.id)
    // const path = `/entries/${entry.id}.json`
    // const { date, text } = await journalApi.put(path)
    // console.log(date, text)

    //Extraer sólo lo que necesitamos //Quitar el id
    const { date, picture, text } = entry //Desestructuramos de la entrada, la fecha, imagen y texto
    const dataToSave = { date, picture, text } //Lo guardamos en otra variable

    // await journalApi.put(PATH, .json, dataToSave)
    const resp = await journalApi.put(`/entries/${entry.id}.json`, dataToSave) //En esta respuesta mandamos la información a guardar con un put, en este punto ya se actualizaría en la BD, pero se requiere de la mutación para actualizarlo en la APP sin tener que recargar
    // console.log(resp)

    dataToSave.id = entry.id

    //Commit de una mutation => updateEntry
    commit('updateEntry', { ...dataToSave }) //Hacemos el commit de updateEntry y enviamos el entry con el operador split para evitar que javascript lo pase como referencia

}

//Acción que crea una entrada
export const createEntry = async ({ commit }, entry) => {
    // dataToSave
    //Mi respuesta
    const { date, picture, text } = entry
    const dataToSave = { date, picture, text }

    const { data } = await journalApi.post(`/entries.json`, dataToSave) //Aquí ya se está generando la nueva entrada en firebase

    dataToSave.id = data.name //Agregamos el id al dataToSave

    // const {data} = await journalApi.post(`PATH.json`, dataToSave)
    // data = {"name": "-NxFPMcw3hIqbMUQHjct"}

    commit('addEntry', dataToSave) //Enviamos todo a la mutación, para que la mutación actualice el state (Front)

    return data.name;
}

export const deleteEntry = async ({ commit }, id) => {
    await journalApi.delete(`/entries/${id}.json`) //Aquí borrarmos de firebase la entrada utilizando el id

    commit('deleteEntry', id) //Enviamos el id para eliminar la entrada en el state con ayuda del mutation

    return id
}