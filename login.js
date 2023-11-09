document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Send the email and password to the server for verification
    fetch('check_login.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = 'in.html'; // Redirect to to-do list
        } else {
            alert('Invalid credentials. Please try again.');
        }
    })
    .catch(error => console.error('Error:', error));
});
