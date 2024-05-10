//Hacer las pruebas del router
import daybookRouter from '@/modules/daybook/router'

describe('Pruebas en el router module del DayBook', () => {
    test('el router debe de tener esta configuración', async () => {
        // console.log(daybookRouter)
        expect(daybookRouter).toMatchObject({
            name: 'daybook',
            component: expect.any(Function), //Aquí no podemos poner funciones, debemos de hacerlo de forma general, comprobar que se esperé una función
            children: [
                {
                    path: '',
                    name: 'no-entry',
                    component: expect.any(Function),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any(Function),
                    props: expect.any(Function)
                }
            ]
        }) //Esta prueba validará que no se haga ninguna modificación en nuestras rutas, pero todavía falta validar las funciones

        //Válidamos las funciones (Son las que te redirigen a los componentes)
        //A cada componente al que se va a redirigir, en la parte en la que se exportan tenemos que darles un nombre, ese es el nombre al que llegaremos y validaremos con un toBe
        // console.log((await daybookRouter.children[0].component()).default.name)

        //El problema de está forma es que los estamos recorriendo por el indice, pero si llega a cambiar este, daría problemas este test
        // expect((await daybookRouter.children[0].component()).default.name).toBe('NoEntrySelected')
        // expect((await daybookRouter.children[1].component()).default.name).toBe('EntryView')

        const promiseRoutes = []
        daybookRouter.children.forEach(child => promiseRoutes.push(child.component())) //Estamos llenando el arreglo antes creado, con todos los componentes

        const routes = (await Promise.all(promiseRoutes)).map(r => r.default.name) // Promise.all(promisesRoutes) Ejecuta todas las promesas que hay en este arreglo (En este caso todos los componentes) y te devuelve toda su información, usamos el map para crear el nuevo array sólo con los nombres

        // console.log(routes)
        expect(routes).toContain('EntryView') //Validamos que routes contenga EntryView
        expect(routes).toContain('NoEntrySelected') //Validamos que routes contenga NoEntrySelected
    })

    test('debe de retornar el id de la ruta', () => {

        //Enviamos en nuestra ruta como parametro el id:'ABC-123'
        const route = {
            params: {
                id: 'ABC-123'
            }
        }

        // console.log(daybookRouter.children[1].props(route)) //Aquí podemos ver que sí tiene el id:'ABC-123'

        //El problema de esta prueba, es que lo tenemos que ubicar con el índice
        // expect(daybookRouter.children[1].props(route)).toEqual({ id: 'ABC-123' }) //Verificamos que la ruta tenga el parámetro que envíamos

        const entryRoute = daybookRouter.children.find(route => route.name === 'entry') //Con esto obtenemos la ruta que tenga como nombre 'entry' el cuál es el que tenemos que validar que se esté enviando el id como parametro
        // console.log(entryRoute)
        expect(entryRoute.props(route)).toEqual({ id: 'ABC-123' })//Verificamos que la ruta tenga el parámetro id que envíamos

    })
})