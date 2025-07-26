// script.js

// Handle Razorpay donation
document.getElementById('razorpay-button').onclick = function(e) {
    e.preventDefault();
    const amount = document.getElementById('donationAmount').value;

    // Create a Razorpay order
    fetch('/create-razorpay-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount * 100 }) // Amount in paise
    })
    .then(response => response.json())
    .then(data => {
        const options = {
            key: 'your-razorpay-key-id', // Enter the Key ID generated from the Razorpay Dashboard
            amount: data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 100 = INR 1
            currency: data.currency,
            name: 'Alumni Fund',
            description: 'Donation for Alumni Fund',
            order_id: data.id, // Pass the order ID returned from the server
            handler: function (response) {
                alert(`Thank you for your donation of ₹${amount}!`);
                // Optionally, you can send the response to your server for verification
            },
            prefill: {
                name: document.getElementById('donorName').value,
                email: document.getElementById('donorEmail').value
            },
            theme: {
                color: '#F37254'
            }
        };
        const rzp = new Razorpay(options);
        rzp.open();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while creating the payment. Please try again.');
    });
};

// Handle donation form submission for PayPal
document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amount = document.getElementById('donationAmount').value;
    document.getElementById('paypalAmount').value = amount; // Set PayPal amount
    alert(`Thank you for your donation of $${amount}!`);
    this.reset(); // Reset the form
});
