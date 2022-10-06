let activeUser = JSON.parse(window.sessionStorage.getItem('activeUser')) || { name: 'unknown' };

document.querySelector('.greet').innerHTML = `Welcome <span>${activeUser.name}</span>`

btnLogOut.onclick = _ => {
    window.sessionStorage.removeItem('activeUser')
}