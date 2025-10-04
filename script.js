

document.querySelector('form').addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
        name: document.querySelector('[name="name"]').value,
        email: document.querySelector('[name="email"]').value,
        message: document.querySelector('[name="message"]').value
    }
    const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    const data = await response.json()
    console.log(data)
})
