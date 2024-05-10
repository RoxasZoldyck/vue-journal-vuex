import axios from "axios"


const uploadImage = async (file) => {
    if (!file) return //SI no se encuentra el archivo, que se salga de la función

    try {
        //Creamos el body, con un FormData en donde envíamos lo necesario para recibirlo como si fuera postman
        const formData = new FormData()
        formData.append('upload_preset', 'curso-vue')
        formData.append('file', file)

        //Declaramos la url
        const url = 'https://api.cloudinary.com/v1_1/dqkcsldfl/image/upload'
        const { data } = await axios.post(url, formData) //Enviamos el url, y el formData, y desestructuramos el data

        console.log(data)

        //Del data sólo nos interesa el secure_url que es el url final de la imagen
        return data.secure_url


    } catch (error) {
        console.log('Erorr al cargar la imagen, revisar logs')
        console.log(error)
        return null
    }

}

export default uploadImage