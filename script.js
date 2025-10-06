

document.querySelector('form').addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Basic validation
    const name = document.querySelector('[name="name"]').value;
    const email = document.querySelector('[name="email"]').value;
    const message = document.querySelector('[name="message"]').value;
    
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    const formData = {
        name: name,
        email: email,
        message: message
    }
    
    try {
        // Show loading state
        const submitBtn = document.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        const response = await fetch('/api/form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Email sent successfully!');
            document.querySelector('form').reset(); // Clear the form
        } else {
            alert('Error sending email: ' + (data.message || 'Unknown error'));
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Error sending email. Please try again.');
    } finally {
        // Reset button state
        const submitBtn = document.querySelector('.btn-primary');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
})
