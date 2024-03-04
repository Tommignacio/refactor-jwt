const form = document.getElementById('loginForm')
form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => (obj[key] = value))
    fetch('/api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(result => {
            if (result.status === 200) {
                return result.json() // Convertir la respuesta a JSON
            } else {
                throw new Error('Failed to log in')
            }
        })
        .then(data => {
            // Aquí puedes acceder al nombre de usuario desde la respuesta del servidor
            console.log({ data })
            const {
                payload: { user },
            } = data
            console.log('user:', user)

            // Redirigir a la página de productos o realizar otra acción según necesites
            window.location.replace('/views/products')
        })
        .catch(error => {
            console.error('Error:', error)
        })
})
