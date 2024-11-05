document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const usernameInput = document.querySelector('input[type="text"]');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');

    const validationMessage = document.createElement('div');
    validationMessage.className = "validation-message";
    form.appendChild(validationMessage);

    // Input configuration
    usernameInput.setAttribute('maxlength', '15');
    usernameInput.setAttribute('minlength', '3');
    passwordInput.setAttribute('maxlength', '20');
    passwordInput.setAttribute('minlength', '6');
    usernameInput.setAttribute('aria-describedby', 'username-info');
    passwordInput.setAttribute('aria-describedby', 'password-info');

    // Character limit info
    const usernameInfo = document.createElement('small');
    const passwordInfo = document.createElement('small');
    usernameInfo.id = "username-info";
    passwordInfo.id = "password-info";
    usernameInfo.textContent = "Username (3-25 characters)";
    passwordInfo.textContent = "Password (6-20 characters)";
    usernameInput.parentNode.insertBefore(usernameInfo, usernameInput.nextSibling);
    passwordInput.parentNode.insertBefore(passwordInfo, passwordInput.nextSibling);

    // Validation regex patterns
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // Event listener for form submission
    form.addEventListener('submit', (e) => {
        let isValid = true;
        validationMessage.textContent = "";

        if (!usernamePattern.test(usernameInput.value)) {
            isValid = false;
            validationMessage.innerHTML += "<p>Username must be alphanumeric (underscores allowed).</p>";
        }
        if (!passwordPattern.test(passwordInput.value)) {
            isValid = false;
            validationMessage.innerHTML += "<p>Password must be 6-20 characters, include at least one uppercase letter, one lowercase letter, and one number.</p>";
        }
        if (!isValid) {
            e.preventDefault();
            validationMessage.style.color = "#FF6347";
        }
    });

    // Toggle password visibility
    togglePassword.addEventListener('click', () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.innerHTML = "&#128064;"; // Eye-slash icon for visibility off
        } else {
            passwordInput.type = "password";
            togglePassword.innerHTML = "&#128065;"; // Eye icon for visibility on
        }
    });

    // Password strength indicator
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = "strength-indicator";
    passwordInput.parentNode.insertBefore(strengthIndicator, passwordInput.nextSibling);

    passwordInput.addEventListener('input', () => {
        const value = passwordInput.value;
        const strength = getPasswordStrength(value);
        strengthIndicator.textContent = `Strength: ${strength}`;
        strengthIndicator.style.color = getStrengthColor(strength);
    });

    function getPasswordStrength(password) {
        if (password.length < 6) return "Too short";
        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{10,}$/.test(password)) return "Strong";
        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/.test(password)) return "Moderate";
        return "Weak";
    }

    function getStrengthColor(strength) {
        switch (strength) {
            case "Strong": return "#00FF00";
            case "Moderate": return "#FFA500";
            default: return "#FF6347";
        }
    }

    // Real-time validation feedback with color changes
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('input', () => {
            input.style.border = input.value ? "2px solid #00FF00" : "2px solid #FF6347";
        });
    });

    // Input focus animations for mobile
    [usernameInput, passwordInput].forEach(input => {
        input.addEventListener('focus', () => {
            input.style.transition = "all 0.2s ease";
            input.style.transform = "scale(1.05)";
        });
        input.addEventListener('blur', () => {
            input.style.transform = "scale(1)";
        });
    });

    // Prevent horizontal overflow on mobile
    document.body.style.overflowX = "hidden";
});
