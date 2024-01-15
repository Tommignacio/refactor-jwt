document.addEventListener('DOMContentLoaded', function () {
    const btnLogout = document.getElementById('btnLogout')

    btnLogout.addEventListener('click', function () {
        fetch('/api/sessions/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.ok) {
                    // Redirigir al inicio después del logout
                    window.location.replace('/views/sessions/login')
                } else {
                    console.error('Error al realizar el logout')
                }
            })
            .catch(error => {
                console.error('Error:', error)
            })
    })
})
