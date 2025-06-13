const jsonFilePath = '/templates/shaper_helixultimate/json/loveis/loveis_data.json';
const scriptURL = 'https://script.google.com/macros/s/AKfycbzWyEAmqpTCNlpF8fUr9XKyUjiHrt-Aabvxz3tgc5ccOsy4J9_R-7yry2YWDQ97S_va/exec';

const form = document.forms['rsvp'];
const form2 = document.forms['question'];
const null_value = '0';


function submityes() {
    let quantity = document.getElementById('quantity');
    document.getElementById('rsvp_errors').style.display = 'none';
    document.getElementById('rsvp_null').style.display = 'none';
    const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-yes');
    const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('rsvp_null').style.display = 'block';
            return false;
            null_value = '1';
        }
    }
    if (null_value == 0) {
        if ((Number.isInteger(Number(quantity.value))) && (Number(quantity.value) <= 10) && (Number(quantity.value) >= 1)) {
            fetch(scriptURL, {
                    method: 'POST',
                    body: FormNew
                })
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message))

            var textboxesall = document.querySelectorAll('input[type="text"]');
            textboxesall.forEach(function(text) {
                text.value = '';
            });
            document.getElementById('rsvp_container').style.display = 'none';
            document.getElementById('rsvp-answ-yes').style.display = 'block';
        } else {
            quantity.style.background = '#e75e7442';
            quantity.style.border = '1px solid #ff0026';
            document.getElementById('rsvp_errors').style.display = 'block';
        }
    }
}

function submitno() {
    let quantity = document.getElementById('quantity');
    document.getElementById('rsvp_errors').style.display = 'none';
    document.getElementById('rsvp_null').style.display = 'none';

    const FormNew = new FormData(form);
    FormNew.append('Form', 'rsvp-no');
    const null_value = '0';
    const textbox_all = form.querySelectorAll('input[type="text"]');
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('rsvp_null').style.display = 'block';
            return false;
            null_value = '1';
        }
    }
    if (null_value == 0) {
        if ((Number.isInteger(Number(quantity.value))) && (Number(quantity.value) <= 10) && (Number(quantity.value) >= 1)) {
            fetch(scriptURL, {
                    method: 'POST',
                    body: FormNew
                })
                .then(response => console.log('Success!', response))
                .catch(error => console.error('Error!', error.message))
            var textboxesall = document.querySelectorAll('input[type="text"]');
            textboxesall.forEach(function(text) {
                text.value = '';
            });
            document.getElementById('rsvp_container').style.display = 'none';
            document.getElementById('rsvp-answ-no').style.display = 'block';

        } else {
            quantity.style.background = '#ff65001c';
            quantity.style.border = '1px solid #ff6500';
            document.getElementById('rsvp_errors').style.display = 'block';
        }
    }
}

function submitquestion() {
    document.getElementById('answ_good').style.display = 'none';
    document.getElementById('answ_null').style.display = 'none';
    const form2 = document.forms['question'];
    const FormNew = new FormData(form2);
    const checkboxes = form2.querySelectorAll('input[type="checkbox"]:checked');
    let checkboxValues = '';

    checkboxes.forEach((checkbox, index) => {
        checkboxValues += checkbox.value;
        if (index < checkboxes.length - 1) {
            checkboxValues += ', ';
        }
    });
    const null_value = '0';
    FormNew.append('Form', 'question');
    FormNew.append('Предпочтения в еде', checkboxValues);

    const textbox_all = form2.querySelectorAll('input[type="text"]');
    for (let box of textbox_all) {
        if (!box.value) {
            document.getElementById('answ_null').style.display = 'block';
            return false;
            null_value = '1';
        }
    }
    if (null_value == 0) {
        fetch(scriptURL, {
                method: 'POST',
                body: FormNew
            })
            .then(response => console.log('Success!', response))
            .catch(error => console.error('Error!', error.message))
        var textboxesall = document.querySelectorAll('input[type="text"]');
        textboxesall.forEach(function(text) {
            text.value = '';
        });
        var checkboxesall = document.querySelectorAll('input[type="checkbox"]');
        checkboxesall.forEach(function(check) {
            check.checked = false;
        });
        var allRadiobuttons = document.querySelectorAll('input[type="radio"]');
        allRadiobuttons.forEach(function(radioButton) {
            radioButton.checked = false;
        });

        document.getElementById('answ_good').style.display = 'block';
    }
}

const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

function generateCalendar(year, month, weddingDay) {
  const calendarContainer = document.querySelector(".date-calendar");
  calendarContainer.innerHTML = ""; // Очистить предыдущий календарь

  const monthNames = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const monthName = monthNames[month - 1];
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);
  const daysInMonth = lastDay.getDate();
  let firstDayOfWeek = firstDay.getDay(); // 0 (Вс) - 6 (Сб)

 // Корректный сдвиг первого дня недели на понедельник
firstDayOfWeek = (firstDayOfWeek === 0) ? 6 : firstDayOfWeek - 1;
  
  

  // Создаем заголовок календаря (месяц, год)
  const calendarHeader = document.createElement("h3");
  calendarHeader.textContent = `${monthName}, ${year}`;
  calendarContainer.appendChild(calendarHeader);

  // Создаем таблицу для календаря
  const calendarTable = document.createElement("table");
  calendarContainer.appendChild(calendarTable);

  // Создаем строку для дней недели
  const daysOfWeekRow = document.createElement("tr");
const daysOfWeek = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  for (let i = 0; i < 7; i++) {
    const dayOfWeekCell = document.createElement("th");
    dayOfWeekCell.textContent = daysOfWeek[i];
    daysOfWeekRow.appendChild(dayOfWeekCell);
  }
  calendarTable.appendChild(daysOfWeekRow);

  // Создаем строки и ячейки для дней месяца
  let dayCounter = 1;
   let weekCounter = 0; //добавляем переменную для подсчета недель
  for (let i = 0;  ; i++) { 
    const weekRow = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const dayCell = document.createElement("td");
      if (i === 0 && j < firstDayOfWeek) {
        // Пустые ячейки до первого дня месяца
        dayCell.textContent = "";
      } else if (dayCounter <= daysInMonth) {
        dayCell.textContent = dayCounter;
        if (dayCounter === weddingDay) {
          // Отмечаем день свадьбы
          dayCell.classList.add("wedding-day");
        }
        dayCounter++;
      } else {
        // Пустые ячейки после последнего дня месяца
        dayCell.textContent = "";
      }
      weekRow.appendChild(dayCell);
    }
    calendarTable.appendChild(weekRow);
    weekCounter++; // Увеличиваем счетчик недель
    if (dayCounter > daysInMonth) {
      break; // Завершаем цикл, если все дни месяца отрисованы
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {




fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {
        const {
            showDresscodeColors,
            separateDresscode,
            showPinterestLink,
            showDresscodeColorsMen,
            menShowPinterestLink,
            showDresscodeColorsWomen,
            womenShowPinterestLink,
            showDetails,
            showRsvp,
            showTimeline,
            showQuestions,
            showDresscode,
            showMusic
        } = data.checkboxes;

        const dateParts = data.date.split('-');
        const dayWithZero = dateParts[2];
        const day = parseInt(dateParts[2], 10);
        const monthNumberWithZero = dateParts[1];
        const monthNumber = parseInt(dateParts[1], 10);
        const year = dateParts[0].slice(-2);
        const fullYear = dateParts[0];
        const dayOfWeek = data.dayOfWeek.toLowerCase();
        const timeArParts = data.time.guestsArrival.split(':');
        const timeArPartsOne = timeArParts[0];
        const monthName = months[monthNumber - 1];
        
         document.querySelector('.date-welcome').textContent = `${day} ${monthName}, ${fullYear}`;
          document.getElementById('welcome-text').innerHTML = `${data.texts.welcome}`;
          document.getElementById('wedding_day').textContent = data.date;
           document.getElementById('groom-bride').textContent = `${data.names.groom} + ${data.names.bride}`;
           
           
                  
    if (showMusic) {
    var audio = document.getElementById("backgroundAudio");
    var playButton = document.getElementById("playButton");
    var isPlaying = false;

    playButton.addEventListener('click', function() {
        if (!isPlaying) {
            audio.muted = false;
            audio.play().catch(function(error) {
                console.error("Ошибка воспроизведения:", error);
            });
            playButton.src = "/images/sites/music-off2.png"; // Изображение выключенного динамика
            playButton.alt = "Выключить музыку";
            isPlaying = true;
            document.getElementById("music-text").textContent="Выключить музыку";
            
        } else {
            audio.pause();
            playButton.src = "/images/sites/music-on2.png"; // Изображение включенного динамика
            playButton.alt = "Включить музыку";
            isPlaying = false;
             document.getElementById("music-text").textContent="Включить музыку";
        }
    });
   } 
   
    else {
                document.getElementById("music-block").style.display = "none"; 
            }

      /*  document.getElementById('date-main').innerHTML = `<p class="date-main__number">${dayWithZero}</p><p class="date-main__month">${monthNumberWithZero}</p><p class="date-main__year">${year}</p>`;
       
       

       
       
         document.getElementById('bride').textContent = data.names.bride;
          document.getElementById('groom').textContent = data.names.groom;
       document.getElementById('bride-letter').textContent = data.names.bride.charAt(0).toUpperCase();
document.getElementById('groom-letter').textContent = data.names.groom.charAt(0).toUpperCase();
        
         document.querySelector('.date-main-small').textContent = `${day} ${monthName} ${fullYear} года`;
         
          // Получаем дату из JSON
  const weddingDateString = data.date; // Предполагаем, что data.date имеет формат "YYYY-MM-DD"
  const datePartsCalendar = weddingDateString.split("-");
  const yearCalendar = parseInt(datePartsCalendar[0]);
  const monthCalendar = parseInt(datePartsCalendar[1]); // Месяцы в JavaScript начинаются с 0
  const weddingDayCalendar = parseInt(datePartsCalendar[2]);

  generateCalendar(yearCalendar, monthCalendar, weddingDayCalendar);
         
        
      */

        const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = '';
        data.texts.details.forEach((detailText, index) => {
            const detailBlock = document.createElement('div');
            detailBlock.innerHTML = `<p class="details__text">${detailText}</p>`;
            detailsContainer.appendChild(detailBlock);
            
    // Проверяем, является ли текущий элемент НЕ последним
    if (index < data.texts.details.length - 1) {
        // Создаем div для картинки
        const imageDiv = document.createElement('div');
        imageDiv.classList.add('separator-image');

        // Создаем элемент img
        const img = document.createElement('img');
        img.src = '/images/sites/loveis/heart-red-separatopr-01.svg'; 
        img.alt = 'Разделитель'; //  Желательно добавить alt-текст
        imageDiv.appendChild(img);      

        // Добавляем div с картинкой в контейнер
        detailsContainer.appendChild(imageDiv);
    }
        });

        const registrationPlace = document.getElementById('place-one');
        const banquetPlace = document.getElementById('place-two');
        const registrationTitle = document.getElementById('registration-title');

        if (data.placesMode === 1) {
            banquetPlace.style.display = 'none';
            registrationPlace.style.display = 'block';
            registrationTitle.textContent = data.texts.WhereTitle;
            document.getElementById('registration-name').textContent = data.places.banquet.name;
            document.getElementById('registration-address').textContent = data.places.banquet.address;
            document.getElementById('registration-time').textContent = `${data.time.registrationStart}`;

        } else if (data.placesMode === 2) {
            banquetPlace.style.display = 'block';
            registrationPlace.style.display = 'block';
            document.getElementById('registration-name').textContent = data.places.registration.name;
            document.getElementById('registration-address').textContent = data.places.registration.address;
            document.getElementById('registration-time').textContent = `Начало в ${data.time.registrationStart}`;
            document.getElementById('banquet-time').textContent = `Начало в ${data.time.banquetStart}`;
            document.getElementById('banquet-title').textContent = data.texts.banquetTitle;
            registrationTitle.textContent = data.texts.registrationTitle;
            document.getElementById('banquet-name').textContent = data.places.banquet.name;
            document.getElementById('banquet-address').textContent = data.places.banquet.address;
        }
        
        document.querySelector('.rsvp__text').textContent = `Пожалуйста, подтвердите ваше присутствие на нашем празднике до ${data.rsvpDate} любым удобным для вас способом или заполните форму ниже:`;

        

        const questionForm = document.getElementById('question');
        data.questions.forEach((question, index) => {
            const questionString = document.createElement('p');
            questionString.classList.add('question__string');
            if (question.type != 'text'){
            const label = document.createElement('label');
            label.classList.add('question__label-input');
            label.classList.add('opros-grup-title');
            label.textContent = question.label;
            questionString.appendChild(label);}

            if (question.type === 'radio' || question.type === 'checkbox') {
                const fieldset = document.createElement('fieldset');
                fieldset.classList.add('question__string');
                fieldset.classList.add('options');
                question.options.forEach((option, optionIndex) => {
                    const optionLabel = document.createElement('label');
                    optionLabel.classList.add('question__label');
                    optionLabel.setAttribute('for', `${option.value}-${index}`);

                    const input = document.createElement('input');
                    input.classList.add('question__unvisible');
                    input.type = question.type;
                    input.name = question.label;
                    input.id = `${option.value}-${index}`;
                    input.value = option.value;
                    if (question.type === 'radio' && optionIndex === 0) {
                        input.checked = true;
                    }
                    optionLabel.appendChild(input);

                    const visibleInput = document.createElement('span');
                    visibleInput.classList.add('question__visible-' + question.type);
                    optionLabel.appendChild(visibleInput);

                    const textSpan = document.createElement('span');
                    textSpan.classList.add('question__text-span');
                    textSpan.textContent = option.text;
                    optionLabel.appendChild(textSpan);
                    fieldset.appendChild(optionLabel);
                });
                questionString.appendChild(fieldset);

            } else if (question.type === 'text') {
                const input = document.createElement('input');
                input.type = 'text';
                input.name = question.label;
                input.placeholder = question.label;
                input.classList.add('question__input')
                input.required = true;
                questionString.appendChild(input);
            }
            questionForm.appendChild(questionString);
        });

        const submitButtonContainer = document.createElement('div');
         submitButtonContainer.classList.add('button-container');
        submitButtonContainer.style.textAlign = 'left';
        const answGood = document.createElement('div');
        answGood.id = "answ_good";
        answGood.classList.add('rsvp-message');
        answGood.style = "display:none;";
        answGood.textContent = "Спасибо, ваш ответ учтен. Не забудьте заполнить форму на каждого гостя";
        submitButtonContainer.appendChild(answGood);

        const answNull = document.createElement('div');
        answNull.id = "answ_null";
        answNull.classList.add('error-rsvp');
        answNull.style = "display:none; text-align: left;";
        answNull.textContent = "Заполните, пожалуйста, все поля.";
        submitButtonContainer.appendChild(answNull);

        const submitButton = document.createElement('button');
        submitButton.name = 'Принято';
        submitButton.classList.add('button');
        submitButton.classList.add('rsvp__button');
         const submitButtonspan = document.createElement('span');
        submitButtonspan.textContent = 'Отправить';
        submitButton.appendChild(submitButtonspan);
        
        submitButton.onclick = function() {
            submitquestion();
            return false;
        };
        submitButtonContainer.appendChild(submitButton);
        questionForm.appendChild(submitButtonContainer);
  

        const timelineBlock = document.querySelector('.timetable__block');
        timelineBlock.innerHTML = '';


        data.timeline.forEach((item, index) => {
              const planBlock = document.createElement('div');
              planBlock.classList.add('timetable__block-stroke');
              timelineBlock.appendChild(planBlock);
              
              
               if (index != 0){
               
               const arrowImg = document.createElement('img');
    arrowImg.src = '/images/sites/loveis/arrow-01.svg'; //  Путь к изображению стрелочки
    arrowImg.alt = 'Arrow'; //  Альтернативный текст (важно для доступности)
    arrowImg.classList.add('pulse'); // Добавляем класс "pulse"
    arrowImg.classList.add('timetable__block-arrow'); //  Добавляем класс для стилизации
    planBlock.appendChild(arrowImg);
               
}

                const imgFrameBlock = document.createElement('div');
                imgFrameBlock.classList.add('timetable__block-imgFrame');
                planBlock.appendChild(imgFrameBlock);   


                const imgFrame = document.createElement('img');
                
                 imgFrame.src = '/images/sites/loveis/frame-01-01.png'; //  Путь к изображению стрелочки
                 imgFrame.alt = 'Arrow'; //  Альтернативный текст (важно для доступности)
    
                imgFrame.classList.add('timetable-imgFrame');
                imgFrameBlock.appendChild(imgFrame);
                

               const textBlock = document.createElement('div');
                textBlock.classList.add('timetable__block-texts');
               imgFrameBlock.appendChild(textBlock);
                
            
              
            
                const nameDiv = document.createElement('div');
                nameDiv.classList.add('timetable__block-name');
                nameDiv.textContent = item.title;
                textBlock.appendChild(nameDiv);
                
                const descrDiv = document.createElement('div');
                descrDiv.classList.add('timetable__block-descr');
                 descrDiv.innerHTML = item.descr;
               textBlock.appendChild(descrDiv);
                  
               const timeDiv = document.createElement('div');
               timeDiv.classList.add('timetable__block-time')
               timeDiv.textContent = item.time;
                 textBlock.appendChild(timeDiv);

              
           
        });

      const baseSvgCode = `<svg viewBox="0 0 233.34 235.97"><path class="cls-1" d="M116.89,66.18c7.7-20.32,22.23-33.57,40.71-42.76,8.57-4.26,17.76-6.39,27.31-5,10.26,1.49,18.62,7,25.54,14.59,11.28,12.45,17.72,27.08,18.63,44.09a102.13,102.13,0,0,1-1.75,26.7c-3.4,16.14-12.63,28-26.23,36.72a100.86,100.86,0,0,1-19.65,9.5,199,199,0,0,0-21.15,9.06,85.77,85.77,0,0,0-19.61,14.12,22.49,22.49,0,0,0-5.53,7.39,88,88,0,0,0-7.85,30.84c0,.39.14.78.12,1.16-.22,2.94-3,5.67-5.71,5.36-3.06-.34-3.34-2.93-3.25-5.26.29-7.31-1.44-14.28-3.18-21.25-2.82-11.32-9.38-19.81-19.1-25.92C84.6,158.24,72.06,152.81,60,146.41c-19-10.1-35.4-23.19-47.86-41a43.66,43.66,0,0,1-8.1-26.27,62.13,62.13,0,0,1,6.8-27.47C19,36,32.77,28.84,49.17,26.09c23.43-3.93,42.06,4.61,56.31,23.49,2.9,3.85,5.19,8.16,7.82,12.22C114.21,63.21,114.56,65.09,116.89,66.18ZM62.3,65.47,61.14,65,55.23,74.9C48.5,86.18,42.38,97.84,34.37,108.29c-4.5,5.88-4.5,5.89,1.23,10.7a1.71,1.71,0,0,0,2.14.45C44.08,100.7,54.17,83.53,62.3,65.47Zm102.13,81.41c4.86-1.46,10.17-2,10.24-9.13,0-2.68,2-5,3.1-7.46,5.48-12,12.73-23.06,18.35-35A83,83,0,0,0,202,79.8C189.12,102,178.43,125.33,164.43,146.88Zm33.74-35.34a124.17,124.17,0,0,0,12.88-19.82c2.15-4.11,4.21-8.27,8-11.13a3.22,3.22,0,0,0,1.59-2.9c-.36-4.47-.58-9-3-14C211.85,80.56,205.78,96.33,198.17,111.54ZM76.67,76c-.92.74-1.32.91-1.49,1.22C66.05,93.58,57.9,110.56,47.7,126.35c-.91,1.41-.79,2.55.63,3.43,1.07.67,1.91,2,3.76,1.48C58.14,112.23,69.42,95.4,76.67,76ZM194.22,38.71a481.7,481.7,0,0,1-23,65.41C182.67,83.64,191.65,62.31,194.22,38.71ZM132.49,60.33c-7.05,9.88-21.81,44.82-22.47,52.57A461.25,461.25,0,0,0,132.49,60.33Zm-49,89c1.47-9.63,4.62-18.76,8-29.09-2.68,2.12-3.3,4-4.26,5.65-3,5.17-6,10.4-9.1,15.54-2.89,4.79-3,4.76,2.16,7.33C81.15,149.13,81.92,149.86,83.53,149.29ZM69.91,35.21c-2.89-.27-6-3-7.56,1.41-3,8.35-7,16.27-10.59,24.37-.36.81-1.5,1.72-.1,3.12C57.33,54.15,63.48,44.72,69.91,35.21Zm133.28,3.25c-.79,9.47-3.29,18.33-5.21,27.35,2.2-1.67,3-4.11,4.05-6.33,1.71-3.47,3.11-7.12,5-10.48,2.36-4.2,2.53-4.13-.35-7.8A6.14,6.14,0,0,0,203.19,38.46Zm-43,.11C152.64,54.46,148,71.49,141.75,87.88,149.82,72.18,155.48,55.56,160.2,38.57Zm-121,27.84C32,77.06,27.24,89.1,21,100.34c-.74,1.32-.48,2.63,1.58,3.43C28,91.29,33.54,78.91,39.18,66.41ZM105.9,141l.93.71a290.55,290.55,0,0,0,18.86-41.12Q115.81,120.8,105.9,141Zm-44.45-3.5c4.09,3.37,4,3.35,5.49-.88,1.2-3.47,2.56-6.89,3.88-10.32,1.21-3.14,2.93-6.09,3-9.68ZM34.81,53.6l.66.32L47.41,36.1l-.74-.92c-1.86,1.12-4.57.5-5.67,3C38.81,43.28,36.86,48.46,34.81,53.6ZM96,52.1c-3.3,6.11-5.72,13.24-5.66,17.47,2.46-3.68,4.61-6.84,6.72-10C99.64,55.67,99.63,55.66,96,52.1Zm97,82.42a16.48,16.48,0,0,0,6.59-3.47c3.24-2.45,3.21-2.49,1.17-7.12C198.41,127.23,196.11,130.36,193.06,134.52ZM78.29,52.21l.68.36c2.12-2.86,4.22-5.74,6.37-8.58,1-1.38.23-2.12-.83-2.73s-2.12-1-2.69.71C80.68,45.4,79.47,48.8,78.29,52.21ZM19,72.32c-4.84,6-6.17,9.81-4.8,14C15.92,81.24,17.45,76.78,19,72.32Zm91.76,80.42c-2.16,2.68-4.3,5.37-6.48,8-.67.82-1,1.54,0,2.42s1.84.42,2.26-.49C108,159.45,110.34,156.61,110.75,152.74ZM148.93,41.4c1.06-2.2,2.17-4,2.46-6.39C147.64,36.74,147.64,36.74,148.93,41.4ZM117,168.86c-1.42,1.16-4,1.62-3.45,4.29,0,.15.28.39.39.37C116.42,173.11,116.14,170.63,117,168.86ZM20.22,53.68a9,9,0,0,0-2.87,5.53C19.23,57.22,20.14,55.7,20.22,53.68ZM129.84,93.25c-.92.65-2.51,1.43-1.53,3.13ZM107,69.61a4.79,4.79,0,0,0-.45-.85c-.83.27-.75,1.18-1.12,1.79-.27.45-.13.82.34.71A1.69,1.69,0,0,0,107,69.61ZM168.4,29a15.44,15.44,0,0,0-.23,1.85c0,.24.26.49.4.73a13.07,13.07,0,0,0,.28-1.64C168.86,29.68,168.62,29.43,168.4,29ZM121.27,192.13a12.58,12.58,0,0,0,1.11-1.42c.27-.51.38-1.14-.39-1.3a.91.91,0,0,0-1.12.92A8.29,8.29,0,0,0,121.27,192.13Z"/></svg>`;

function generateUniqueClassName() {
    return 'svg-color-' + Math.random().toString(36).substring(2, 15);
}

function addStyleToDocument(className, color) {
    const styleSheet = document.styleSheets[0]; // Получаем первую таблицу стилей
    const rule = `.${className} { fill: ${color}; }`; // Добавлено фигурныю скобку
    styleSheet.insertRule(rule, styleSheet.cssRules.length); // Добавляем правило в конец
}



const dresscodeColorsContainer = document.querySelector('.dresscode__colors');
if (dresscodeColorsContainer) {
    dresscodeColorsContainer.innerHTML = '';
    const colors = data.texts.dresscodeColors;  // Убедитесь, что 'data' и 'data.texts.dresscodeColors' определены
      const dresscodeManContainer = document.querySelector('.dresscode_man');
    const dresscodeWomanContainer = document.querySelector('.dresscode_woman');
    document.getElementById('dresscode__description').innerHTML = `${data.texts.dresscode}`;

    if (colors) {
        const colorCount = Object.keys(colors).length;
        const screenWidth = window.innerWidth;

 const blockWidthPercentage = 100 / colorCount;
        for (const colorKey in colors) {
            if (colors.hasOwnProperty(colorKey)) {
                const colorValue = colors[colorKey];
                const uniqueClassName = generateUniqueClassName();
                addStyleToDocument(uniqueClassName, colorValue);
                //const coloredSvgCode = baseSvgCode.replace(/st0/g, uniqueClassName);  // Заменено на cls-1
                const coloredSvgCode = baseSvgCode.replace(/cls-1/g, uniqueClassName);
                const colorCircle = document.createElement('div');
                colorCircle.classList.add('dresscode__color');
                colorCircle.innerHTML = coloredSvgCode;
colorCircle.style.width = `${blockWidthPercentage}%`;
                dresscodeColorsContainer.appendChild(colorCircle);
            }
        }
    }
     if (separateDresscode){
      //разделение по гендеру
      dresscodeManContainer.style.display = 'block';
      dresscodeWomanContainer.style.display = 'block';
       document.getElementById('dresscode__description_woman').innerHTML = `${data.texts.dresscodeGendered.women.text}`;
        document.getElementById('dresscode__description_man').innerHTML = `${data.texts.dresscodeGendered.men.text}`;

      // Отрисовка цветов для мужчин
     

        // Отрисовка цветов для женщин
        if (showDresscodeColorsWomen) {

           const womenColorsContainer = document.createElement('div');
            womenColorsContainer.classList.add('dresscode__colors');
             dresscodeWomanContainer.appendChild(womenColorsContainer);
            renderColorCircles(womenColorsContainer, data.texts.dresscodeGendered.women.dresscodeColors);

        }
           if (showDresscodeColorsMen) {
            const menColorsContainer = document.createElement('div'); // Создаем отдельный div
            menColorsContainer.classList.add('dresscode__colors'); // Добавляем тот же класс
             dresscodeManContainer.appendChild(menColorsContainer);
            renderColorCircles(menColorsContainer, data.texts.dresscodeGendered.men.dresscodeColors);

        }
    } else{
      dresscodeManContainer.style.display = 'none';
      dresscodeWomanContainer.style.display = 'none';
    }
}
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));
});