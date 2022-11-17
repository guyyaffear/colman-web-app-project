var menuHolder = document.getElementById('menuHolder')
var siteBrand = document.getElementById('siteBrand')
var loginButton = document.getElementById('loginNavButton')
var registerButton = document.getElementById('registerNavButton')

const onClickLoginButton = () => {
    location.href = '/user/login'
}
const onClickRegisterButton = () => {
    location.href = '/user/register'
}

function menuToggle(){
  if(menuHolder.className === "drawMenu") menuHolder.className = ""
  else menuHolder.className = "drawMenu"
}
if(window.innerWidth < 426) siteBrand.innerHTML = "MAS"
window.onresize = function(){
  if(window.innerWidth < 420) siteBrand.innerHTML = "MAS"
  else siteBrand.innerHTML = "MY AWESOME WEBSITE"
}
