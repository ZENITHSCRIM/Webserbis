<script>
    function sendVerificationEmail() {
        const email = document.getElementById('emailAddress').value;

        fetch('/sendVerificationEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
    }

    function verifyEmailCode() {
        const email = document.getElementById('emailAddress').value;
        const code = document.getElementById('verificationCode').value;

        fetch('/verifyEmailCode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, code })
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
    }
</script>
