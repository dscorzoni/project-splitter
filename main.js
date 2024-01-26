// -----------------
// Interface
// -----------------

// Getting form inputs and validation
const billValueInput = document.getElementById("bill-value");
const errorMessageBillInput = document.getElementById("bill-input-error");
const numPeopleInput = document.getElementById("num-people-value");
const errorMessagePeopleInput = document.getElementById("people-input-error");
const tipPercentageBtn = document.getElementsByName('tip-value');
const customTipBtn = document.getElementById('input-custom');

// Getting results elements
const tipPerPersonField = document.getElementById('tip-per-person');
const totalPerPersonField = document.getElementById('total-per-person');

// Default Values
let billValue = 142.55;
let numPeople = 5;
let tipPercentage = 15;
let tipPerPerson = 4.28;
let totalPerPerson = 32.79;

// Implementing clean-up for Reset button
const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener('click', () => {
    errorMessageBillInput.classList.remove('display-error');
    errorMessagePeopleInput.classList.remove('display-error');
    billValueInput.style.borderColor = '';
    numPeopleInput.style.borderColor = '';
    tipPerPersonField.innerHTML = '4.28';
    totalPerPersonField.innerHTML = '32.79';
    billValue = 142.55;
    numPeople = 5;
});

// -----------------------------
// Business Logic
// -----------------------------

function calculateTip(billValue, tipPercentage, numPeople) {
    tipPerPersonField.innerHTML = ((billValue * tipPercentage/100) / numPeople).toFixed(2);
    totalPerPersonField.innerHTML = ((billValue * (1+tipPercentage/100)) / numPeople).toFixed(2);
}

// --------------------------
// Form Validation
// --------------------------

function implementFormValidation(inputField, errorMessageField) {
    // This function implements form validation and use an errorMessageField (p)
    // to display error messages if necessary.

    if (inputField.value <= 0) {
        errorMessageField.innerHTML = 'Must be greater than 0';
        if (!errorMessageField.classList.contains('display-error')) {
            errorMessageField.classList.toggle('display-error');
            inputField.style.borderColor = '#c95454';
        }
    } else {
        errorMessageField.classList.remove('display-error');
        inputField.style.borderColor = '';
    }

    // Handling empty
    if (inputField.value == "") {
        errorMessageField.classList.remove('display-error');
        inputField.style.borderColor = '';
    }
}

// Bill Value Validation
billValueInput.addEventListener('input', () => {
    implementFormValidation(billValueInput, errorMessageBillInput);
});

// Number of People Validation
numPeopleInput.addEventListener('input', () => {
    implementFormValidation(numPeopleInput, errorMessagePeopleInput);
});


// ---------------------
// Form Action
// ---------------------

tipPercentageBtn.forEach((tipButton) => {
    tipButton.addEventListener('click', () => {

        // Handling non-filled fields
        if (billValueInput.value == "") {
            billValue = 142.55;
        } else {
            billValue = billValueInput.value;
        }
        if (numPeopleInput.value == "") {
            numPeople = 5;
        } else {
            numPeople = numPeopleInput.value;
        }

        calculateTip(billValue, tipButton.value, numPeople);
    })
});

billValueInput.addEventListener('input', () => {
    if (billValueInput.value > 0) {
        billValue = billValueInput.value;
        calculateTip(billValue, tipPercentage, numPeople);
    } else {
        billValue = 142.55;
    }
});

numPeopleInput.addEventListener('input', () => {
    if (numPeopleInput.value > 0) {
        numPeople = numPeopleInput.value;
        calculateTip(billValue, tipPercentage, numPeople);
    } else {
        numPeople = 5;
    }
});

// Customizing input for custom tip

customTipBtn.addEventListener('input', () => {
    tipPercentageBtn.forEach((button) => {
        button.checked = false;
        if (customTipBtn.value >= 0) {
            tipPercentage = customTipBtn.value;
            calculateTip(billValue, tipPercentage, numPeople);
        } else {
            tipPercentage = 15;
            calculateTip(billValue, tipPercentage, numPeople);
        }
    });
});