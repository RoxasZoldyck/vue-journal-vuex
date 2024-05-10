//Pruebas de uploadImage

import cloudinary from 'cloudinary'
import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";

//Es la configuración de cloudinary (La plataforma que usamos para almacenar imágenes)
cloudinary.config({
    cloud_name: 'dqkcsldfl',
    api_key: '315263611149727',
    api_secret: '6jx9pQpIySValV0-0u4bQ9Vn-aA'
})

describe('Pruebas en el uploadImage', () => {
    test('debe de cargar un archivo y retornar el url', async () => {
        const { data } = await axios.get('https://res.cloudinary.com/dqkcsldfl/image/upload/fl_preserve_transparency/v1715081276/samples/upscale-face-1.jpg?_s=public-apps', {
            responseType: 'arraybuffer'
        })

        const file = new File([data], 'foto.jpg') //Es la imagen obtenida del url, ahora con nombre de foto.jpg

        // console.log(file)

        const url = await uploadImage(file) //Subimos esa imagen

        expect(typeof url).toBe('string') //Validamos que el typeof de url sea string

        //Tomar el ID
        // console.log(url)
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')

        //UPDATE: NO SE PUEDE USAR YA
        // cloudinary.v2.api.delete_resources(imageId, {}, () => {
        //     done() //Esta función finaliza la prueba
        // })

        await cloudinary.v2.api.delete_resources(imageId) //Borra la imagen al final de realizarse la prueba
    })
})