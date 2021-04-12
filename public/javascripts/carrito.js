
//const urlBase = 'http://localhost:3000'

const urlBase = window.location.origin


const agregarItem = async (e,id) => {

    e.preventDefault()

    try {
        let response = await fetch(urlBase + '/agregar/' + id)
        let result = await response.json()
        console.log(result)
    } catch (error) {
        console.log(error)
    }

}