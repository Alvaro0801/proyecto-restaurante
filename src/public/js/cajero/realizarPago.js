const btn_Pago = document.getElementById('btnPago');

btn_Pago.addEventListener('click', async(e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    try {
        const response = await fetch('/api/pay/pay-order',{
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const res = await response.json();

        // Si el res. status es 200 o 201
        if (response.ok) {
            Swal.fire({
                title: 'Pago Completado Exitosamente',
                icon: 'success',
                showConfirmButton: false,
                timer: 800,
              }).then(() => {
                window.location = '/home'
              })
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Error! Inténtelo de nuevo',
                icon: 'error',
                showConfirmButton: false,
                timer: 1000,
            })
            throw new Error(`HTTP error! status: ${response.status} message: ${res.error}`);
        }
    } catch (error) {
        console.log(error)
    }
})