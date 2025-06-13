function openboxvip(button) {
const designItem = button.closest('.design-item');
const designImage = designItem.getAttribute('data-image');
const designName = designItem.getAttribute('data-name');
const boxWindow = document.getElementById("box-window");
const selectedImage = document.getElementById("selected-design-image");
const selectedName = document.getElementById("selected-design-name");
const designInput = document.getElementById('design-name');
const form = document.querySelector('#modalForm');
setInitialMinDate();
selectedImage.src = designImage;
selectedName.textContent = designName;
designInput.textContent = designName;
designInput.value = designName;

selectedImage.style.display = 'block';
selectedName.style.display = 'inline-block';

boxWindow.style.display = "block";
 document.getElementById("box-window-in").style.display = "block";
 document.getElementById("box-window-in2").style.display = "none";
  const boxWindowVip = document.getElementById("box-window-vip");

    // Проверяем, существует ли элемент
    if (boxWindowVip) {
        // Если элемент существует, то скрываем его
        boxWindowVip.style.display = "none";
    }

}

$( document ).ready(function() {
$("#mail-submit").click(function(event){ // Добавляем event
event.preventDefault(); // Предотвращаем отправку формы по умолчанию
const form = document.querySelector('#modalForm');
if( checkData(form)){
		sendAjaxForm('result_form', 'modalForm', '/templates/shaper_helixultimate/action_ajax_form.php');
	        document.getElementById("box-window-in").style.display = "none";

document.getElementById("box-window-in2").style.display = "inline-block";


setTimeout(closeWindow, 5000);
form.reset();

}

}
);

});




function openboxindiv(button) {
const designItem = button.closest('.design-item');
const form = document.querySelector('#modalForm-indiv');
const designInput = document.getElementById('design-name-indiv');
designInput.value ='Индивидуальный';
const boxWindow = document.getElementById("box-window");

setInitialMinDate();




boxWindow.style.display = "block";
 document.getElementById("box-window-in").style.display = "none";
 document.getElementById("box-window-in2").style.display = "none";
  document.getElementById("box-window-vip").style.display = "block";
    
}

$( document ).ready(function() {
$("#mail-submit-indiv").click(function(event){ // Добавляем event
event.preventDefault(); // Предотвращаем отправку формы по умолчанию
const form = document.querySelector('#modalForm-indiv');
if( checkData(form)){
		sendAjaxForm('result_form', 'modalForm-indiv', '/templates/shaper_helixultimate/action_ajax_form.php');
	        document.getElementById("box-window-vip").style.display = "none";

document.getElementById("box-window-in2").style.display = "inline-block";


setTimeout(closeWindow, 5000);
form.reset();
}

}
);

});
function setInitialMinDate() {
 const dateInputs = document.querySelectorAll('input[name="date"]');
  const currentDate = new Date();
  const minDate = new Date(currentDate);
  minDate.setDate(minDate.getDate() + 7);

  const minDateString = minDate.toISOString().split('T')[0];

  dateInputs.forEach(input => {
    input.setAttribute('min', minDateString);
  });

}
function sendAjaxForm(result_form, ajax_form, url) {
$.ajax({
url:     url, //url страницы (action_ajax_form.php)
type:     "POST", //метод отправки
dataType: "html", //формат данных
data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
success: function(response) { //Данные отправлены успешно
//result = $.parseJSON(response);
// alert('все: '+response);
},
error: function(response) { // Данные не отправлены
alert('Ошибка. Данные не отправлены.');
}
});
}
var close_button = document.getElementById("box-close");
if (close_button != null) {
close_button.onclick = function () {
closeWindow();
}}

function closeWindow() {
document.getElementById("box-window").style.display = "none";
}

function checkData(form){
let flag=true;

const dateInput = form.querySelector('input[name="date"]');
const phoneInput = form.querySelector('input[name="phone-number"]');
const privacyCheck = form.querySelector('#privacy-check');
//const selectedName = document.getElementById("selected-design-name");

const currentDate = new Date();
const selectedDate = new Date(dateInput.value);
const minDate = new Date(currentDate);
minDate.setDate(minDate.getDate() + 7)

if (selectedDate < minDate) {
alert("Введите верную дату вашей свадьбы.");
flag=false;
return;
}

const phoneValue = phoneInput.value;
if (!/^[+]?[0-9]{11,12}$/.test(phoneValue)) {
alert("Введите верный номер телефона");
flag=false;
return;
}
if (!privacyCheck.checked) {
alert("Пожалуйста, подтвердите согласие с политикой конфиденциальности.");
flag=false;
return;
}
return flag;
}
/*function changeurl(event) {
event.preventDefault();
const form = document.querySelector('#modal-form');
const dateInput = form.querySelector('input[name="date"]');
const phoneInput = form.querySelector('input[name="phone-number"]');
const privacyCheck = form.querySelector('#privacy-check');
const selectedName = document.getElementById("selected-design-name");

const currentDate = new Date();
const selectedDate = new Date(dateInput.value);
const minDate = new Date(currentDate);
minDate.setDate(minDate.getDate() + 7)

if (selectedDate < minDate) {
alert("Введите верную дату вашей свадьбы.");
return;
}

const phoneValue = phoneInput.value;
if (!/^[+]?[0-9]{11,12}$/.test(phoneValue)) {
alert("Введите верный номер телефона");
return;
}
if (!privacyCheck.checked) {
alert("Пожалуйста, подтвердите согласие с политикой конфиденциальности.");
return;
}

document.getElementById("box-window-in").style.display = "none";
document.getElementById("box-window-in2").style.display = "inline-block";

setTimeout(close_window, 3000);
//form.reset();
form.submit();
}

function close_window() {
document.getElementById("box-window").style.display = "none";
}

window.addEventListener('load', (event) => {
var bg = document.getElementById("box-window-bg2");
if (bg != null) {
bg.onclick = function () {
close_window();
}
}
var close_button = document.getElementById("box-close");
if (close_button != null) {
close_button.onclick = function () {
close_window();
}
}

const dateInput = document.querySelector('input[name="date"]');
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const minDate = tomorrow.toISOString().split('T')[0];
dateInput.setAttribute('min', minDate);

});*/