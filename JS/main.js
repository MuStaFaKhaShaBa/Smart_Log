let form_controls = document.querySelectorAll('.form-control');
let h1 = document.getElementsByTagName('h1')[0];
let alerts = document.querySelectorAll("form .alert");
// - - - Get Users Data From Local 
let Users = JSON.parse(window.localStorage.getItem("Users")) || [];

for (let i = 0; i < form_controls.length; i++) {
    let input = form_controls[i].firstElementChild;
    input.addEventListener('input', e => {
        layoutStyle(input, input.value == '');
    })
}

function layoutStyle(input, empty) {
    empty ?
        input.parentElement.classList.remove('not-empty')
        :
        input.parentElement.classList.add('not-empty')

}

window['log-up'].firstElementChild.addEventListener('click', e => {
    window['log-up'].style.display = 'none';
    window['log-in'].style.display = 'block';
    form_controls[0].style.display = 'block';
    h1.textContent = "Register Now";
    logSubmit.value = 'Log Up';
    document.title = 'Log Up'

    restStylesToDefualt();
    // log up function Re-Assign
    logSubmit.onclick = e => {
        e.preventDefault();

        let newUser = {
            name: input_name.value,
            email: input_email.value,
            password: input_password.value
        }
        // Hide All Alerts
        for (let i = 0; i < alerts.length; i++) {
            alerts[i].style.display = "none"
        }

        // Check Name Validation
        //  if it's Not valid Show Alert and stop function
        let regName = /[^0-9^&$_@!#?"'/()*+/-]/;
        if (!regName.test(newUser.name)) {
            // console.log('name Is Invalid');
            invalidSetting(0, 'Name Must not have a Digits or Special character');
            return;

        } else
            // remove is invalid class from input field
            form_controls[0].firstElementChild.classList.remove('is-invalid');

        // ----- ||| ------

        // Check Email Validation
        //  if it's Not valid Show Alert and stop function

        if (!emailValidation(newUser.email)) {
            // console.log('Email is Invalid');
            invalidSetting(1, `Email Isn't Valid`);
            return;

        } else if (emailExist(newUser.email)) {
            // Check Email Existance
            invalidSetting(1, 'Email Exist, try another Email')
            return;

        } else
            // remove is invalid class from input field
            form_controls[1].firstElementChild.classList.remove('is-invalid');

        // ------- ||| ------
        // Check Password 
        //  if it's Not valid Show Alert and stop function
        if (newUser.password.length < 8) {
            // console.log('password is invalid');
            invalidSetting(2, 'Password Be at least 8 character');

            return;
        } else
            // remove is invalid class from input field
            form_controls[2].firstElementChild.classList.remove('is-invalid');

        // Else 

        // - - - Add New User  
        Users.push(newUser);

        // - - - Update Data On Local 
        window.localStorage.setItem("Users", JSON.stringify(Users));

        // Remove Not-empty Class From Form Control
        restStylesToDefualt();
    }
});

window['log-in'].firstElementChild.addEventListener('click', loginFunc);

// Separate Re-Assign Log In Function 
//  Because It Will Call When Emmediatly after page loaded
function loginFunc() {
    window['log-in'].style.display = 'none';
    window['log-up'].style.display = 'block';
    form_controls[0].style.display = 'none';
    h1.textContent = "Log In Now";
    logSubmit.value = 'Log in';

    showSuccessMsg(false);

    restStylesToDefualt();
    logSubmit.onclick = e => {
        e.preventDefault();

        // Check Email Validation
        if (!emailValidation(input_email.value)) {
            // console.log('Email is Invalid');
            invalidSetting(1, `Email Isn't Valid`);
            return;
        } else {
            // Check Email Existance
            let user = emailExist(input_email.value);
            if (!user) {
                invalidSetting(1, `Email Dosn't Exist, Type Your Email`)
                return;
            }
            alerts[1].style.display = 'none';
            // Check Password 
            if (input_password.value == '') {
                invalidSetting(2, "Enter Your Password");
                return
            } else if (input_password.value != user.password) {
                invalidSetting(2, "Wrong Password, Try Again");
                return;
            }

            // Done Email And Password Is Correct
            // Re-direction To Home Page after 2sec
            showSuccessMsg(true);

            window.sessionStorage.setItem("activeUser", JSON.stringify(user));

            window['re-direct'].click();
        }

    };
}
loginFunc();

// setInvalid Alert Text & Other Settings
function invalidSetting(item, msg) {
    // If User Submit Without Enter Any Data expand input field
    form_controls[item].classList.add('not-empty');
    form_controls[item].firstElementChild.classList.add('is-invalid');

    alerts[item].style.display = "block";
    alerts[item].firstElementChild.textContent = msg;
}

// Check Email Validation
function emailValidation(email) {
    let regEmail = /(\w+([\.]\w+)?@\w+\.\w+)[^/!\\#$%^&*+-]/gi;
    return regEmail.test(email);
}

// Check Email Existance
function emailExist(email) {

    for (let i = 0; i < Users.length; i++) {
        if (Users[i].email == email) {
            return Users[i];
        }
    }
    return null;
}

// Reset All Style Input To Default
function restStylesToDefualt() {
    for (let i = 0; i < form_controls.length; i++) {
        form_controls[i].classList.remove('not-empty');
        form_controls[i].firstElementChild.classList.remove('is-invalid');
        form_controls[i].firstElementChild.value = '';
        alerts[i].style.display = 'none';
    }
}

function showSuccessMsg(showOrHide) {
    showOrHide ?
        (succMsg.style.display = "Block") :
        (succMsg.style.display = "none")
}