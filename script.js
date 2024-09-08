function validateDate() {
    const inputDate = new Date(document.getElementById('dob').value);
    if (inputDate > new Date()) {
        handleError('Please enter a valid birth date.');
        return false;
    }
    hideError();
    return true;
}

function handleError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideError() {
    document.getElementById('error').style.display = 'none';
}

function calculateAge() {
    if (!validateDate()) return;

    const dob = new Date(document.getElementById('dob').value);
    const today = new Date();

    let ageYears = today.getFullYear() - dob.getFullYear();
    let ageMonths = today.getMonth() - dob.getMonth();
    let ageDays = today.getDate() - dob.getDate();

    if (ageMonths < 0 || (ageMonths === 0 && ageDays < 0)) {
        ageYears--;
        ageMonths += 12;
    }

    if (ageDays < 0) {
        const daysInLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDays += daysInLastMonth;
        ageMonths--;
    }

    const result = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;
    const resultElement = document.getElementById('age-result');
    resultElement.textContent = result;
    resultElement.style.display = 'block';
}

function switchTheme(theme) {
    const body = document.body;
    body.className = theme;
    localStorage.setItem('theme', theme);
}

window.onload = function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
};

function printResult() {
    const result = document.getElementById('age-result').textContent;
    if (result) {
        const printWindow = window.open('', '', 'width=600,height=400');
        printWindow.document.write('<html><head><title>Age Result</title></head><body>');
        printWindow.document.write(`<p>${result}</p>`);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
}
