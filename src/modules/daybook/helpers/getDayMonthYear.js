//Este script es una replica de lo que ya se hizo en Entry.vue para ser reutilizado y adaptado en EntryView.vue

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

const getDayMonthYear = (dateString) => {
    const date = new Date(dateString)

    return {
        day: date.getDate(),
        month: months[date.getMonth()],
        yearDay: `${date.getFullYear()}, ${days[date.getDay()]}`
    }
}

export default getDayMonthYear