// Login form validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.querySelector('input[type="password"]');

    form.addEventListener('submit', (e) => {
        if (!usernameInput.value || !passwordInput.value) {
            e.preventDefault();
            alert("Please enter both username and password.");
        }
    });

    // Display focus effect on mobile devices
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.style.outline = "2px solid #FFD700";
        });
        input.addEventListener('blur', () => {
            input.style.outline = "none";
        });
    });
});
