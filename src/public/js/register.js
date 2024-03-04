const form = document.getElementById('registerForm')

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key) => (obj[key] = value))
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(result => {
            console.log(result)
            if (result.status === 201) {
                window.location.replace('/views/sessions/login')
            }
        })
        // .then(result => result.json())
        // .then(json => console.log(json))
        .catch(error => {
            console.error('Error:', error)
        })
})
