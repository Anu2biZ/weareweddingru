const jsonFilePath = '/templates/shaper_helixultimate/json/index.json';
const scriptURL = 'https://script.google.com/macros/s/AKfycbzWyEAmqpTCNlpF8fUr9XKyUjiHrt-Aabvxz3tgc5ccOsy4J9_R-7yry2YWDQ97S_va/exec';

const form = document.forms['rsvp'];
const form2 = document.forms['question'];
const null_value = '0';

const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];
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

function generateCalendar(year, month, weddingDay) {
    const calendarContainer = document.querySelector(".date-calendar");

    const daysOfWeekContainer = calendarContainer.querySelector(".calendar-days-of-week");
    const daysContainer = calendarContainer.querySelector(".calendar-days");

    // Clear previous content

    daysOfWeekContainer.innerHTML = "";
    daysContainer.innerHTML = "";



   const monthName = monthNames[month - 1];

    //  Определение дня недели для заданной даты
    const weddingDate = new Date(year, month - 1, weddingDay);
    let weddingDayOfWeek = weddingDate.getDay();
    weddingDayOfWeek = (weddingDayOfWeek === 0) ? 6 : weddingDayOfWeek - 1; // Сдвиг на понедельник

    //  Вычисление начала недели (понедельник)
    const startDate = new Date(year, month - 1, weddingDay - weddingDayOfWeek);



    // Дни недели
    const daysOfWeek = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
    for (let i = 0; i < 7; i++) {
        const dayOfWeekSpan = document.createElement("span");
        dayOfWeekSpan.textContent = daysOfWeek[i];
        daysOfWeekContainer.appendChild(dayOfWeekSpan);
    }

    //  Отрисовка дней недели
    for (let i = 0; i < 7; i++) {
        const daySpan = document.createElement("span");
        const currentDate = new Date(startDate);
        currentDate.setDate(startDate.getDate() + i);

        daySpan.textContent = currentDate.getDate();


        if (currentDate.getDate() === weddingDay && currentDate.getMonth() === month -1) {
            daySpan.classList.add("wedding-day");

        }
        //добавляем проверку на принадлежность к нужному месяцу
         if (currentDate.getMonth() !== month - 1) {
              daySpan.style.color = "lightgray"; // Или другой стиль для дней из других месяцев
          }
        daysContainer.appendChild(daySpan);

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
            showDresscode
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
        const monthName = monthNames[monthNumber - 1];


          // document.getElementById('welcome-text').innerHTML = `${data.texts.welcome}`;
           document.getElementById('wedding_day').textContent = data.date;
           document.getElementById('groom-footer').innerHTML = `${data.names.groom}`;
           document.getElementById('bride-footer').innerHTML = `${data.names.bride}`;

      /*
         document.getElementById('bride-footer').innerHTML = `${data.names.bride}`;
                document.getElementById('groom-footer').innerHTML = `${data.names.groom}`;
        document.getElementById('groom').textContent = data.names.groom;
           document.getElementById('bride').textContent = data.names.bride;


           document.getElementById('date-main').innerHTML = `${day} ${monthName} ${fullYear} года`;

        */



 const headerContainer = document.querySelector(".calendar-header");
   headerContainer.innerHTML = "";
    // Заголовок (Месяц, Год)
    headerContainer.textContent = `${monthName}, ${fullYear}`;
 // Получаем дату из JSON
  const weddingDateString = data.date; // Предполагаем, что data.date имеет формат "YYYY-MM-DD"
  const datePartsCalendar = weddingDateString.split("-");
  const yearCalendar = parseInt(datePartsCalendar[0]);
  const monthCalendar = parseInt(datePartsCalendar[1]); // Месяцы в JavaScript начинаются с 0
  const weddingDayCalendar = parseInt(datePartsCalendar[2]);

  generateCalendar(yearCalendar, monthCalendar, weddingDayCalendar);







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


        const detailsContainer = document.getElementById('details-container');
        detailsContainer.innerHTML = '';
       data.texts.details.forEach((detailText, index) => {
    const detailBlock = document.createElement('div');
    detailBlock.classList.add('detail-block');

     if (index !== 0) {
        const imgBlock = document.createElement('img'); // Создаем элемент <img>, а не <div>
        imgBlock.classList.add('img-separate-detail');
        imgBlock.src = '/images/sites/malenkie-my/heart-white-01.svg'; //  Укажите путь к вашей картинке!
        imgBlock.alt = 'Separator Image'; // Добавьте alt-текст для доступности и SEO
        detailsContainer.appendChild(imgBlock);  // Добавляем картинку *перед* текстом
    }

    detailBlock.innerHTML = `<p class="details__text">${detailText}</p>`;
    detailsContainer.appendChild(detailBlock);



});

        const registrationPlace = document.getElementById('place-one');
        const banquetPlace = document.getElementById('place-two');
        const registrationTitle = document.getElementById('registration-title');

        if (data.placesMode === 1) {
            banquetPlace.style.display = 'none';
            registrationTitle.style.display = 'none';
            registrationPlace.style.display = 'block';
            registrationTitle.textContent = data.texts.WhereTitle;
            document.getElementById('registration-name').textContent = data.places.banquet.name;
            document.getElementById('registration-address').textContent = data.places.banquet.address;
            document.getElementById('registration-time').textContent = `Начало в ${data.time.registrationStart}`;

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

       document.querySelector('.rsvp__text').textContent = `Пожалуйста, подтвердите ваше присутствие на нашем празднике до ${data.rsvpDate} и ответьте на несколько вопросов:`;

        const questionForm = document.getElementById('question');
        data.questions.forEach((question, index) => {
            const questionString = document.createElement('p');
            questionString.classList.add('question__string');
            const label = document.createElement('label');
            label.classList.add('question__label-input');
            label.classList.add('opros-grup-title');
            label.textContent = question.label;


            if (question.type === 'radio' || question.type === 'checkbox') {
                questionString.appendChild(label);
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
                input.classList.add('question__input')
                input.required = true;
                input.placeholder=question.label;
                questionString.appendChild(input);
            }
            questionForm.appendChild(questionString);
        });

        const submitButtonContainer = document.createElement('div');
        const answGood = document.createElement('div');
        answGood.id = "answ_good";
        answGood.classList.add('rsvp-message');
        answGood.style = "display:none;";
        answGood.textContent = "Спасибо, ваш ответ учтен. Не забудьте заполнить форму на каждого гостя";
        submitButtonContainer.appendChild(answGood);

        const answNull = document.createElement('div');
        answNull.id = "answ_null";
        answNull.classList.add('error-rsvp');
        answNull.style = "display:none;";
        answNull.textContent = "Заполните, пожалуйста, все поля.";
        submitButtonContainer.appendChild(answNull);

        const submitButton = document.createElement('button');
        submitButton.name = 'Принято';
        submitButton.classList.add('button');
        submitButton.classList.add('rsvp__button');
        submitButton.textContent = 'Подтвердить';
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

               const lineBlock = document.createElement('div');
              lineBlock.classList.add('timetable__block-line');
               planBlock.appendChild(lineBlock);

}

                const nameDiv = document.createElement('div');
                nameDiv.classList.add('timetable__block-name');
                nameDiv.textContent = item.title;
                planBlock.appendChild(nameDiv);

                 const descrDiv = document.createElement('div');
                descrDiv.classList.add('timetable__block-descr');
                descrDiv.textContent = item.descr;
                planBlock.appendChild(descrDiv);

                 const timeDiv = document.createElement('div');
               timeDiv.classList.add('timetable__block-time')
               timeDiv.textContent = item.time;
                 planBlock.appendChild(timeDiv);






        });
const baseSvgCode = `<svg version="1.1" viewBox="0 0 250 230.54" xml:space="preserve" width="50">
    <path class="cls-1" style="fill: var(--svg-fill-color, black); stroke: #4c5649; stroke-width:1px;" d="M249,67.18c0,102.89-123.86,163.36-123.86,163.36S1.28,170.07,1.28,67.18a63.89,63.89,0,0,1,123.86-22A63.89,63.89,0,0,1,249,67.18Z"/>
  </svg>`;
  function generateUniqueClassName() {
    return 'svg-color-' + Math.random().toString(36).substring(2, 15);
  }

    function addStyleToDocument(className, color) {
    const styleSheet = document.styleSheets[0]; // Получаем первую таблицу стилей
    const rule = `.${className}{ fill: ${color}; stroke: #8d8d8d; stroke-width:0.5; }`;
    styleSheet.insertRule(rule, styleSheet.cssRules.length); // Добавляем правило в конец
  }

     const dresscodeColorsContainer = document.querySelector('.dresscode__colors');

if (dresscodeColorsContainer) {
    dresscodeColorsContainer.innerHTML = '';
    const colors = data.texts.dresscodeColors;
    document.getElementById('dresscode__description').innerHTML = `${data.texts.dresscode}`;
    document.getElementById('dresscode__description_man').textContent = data.texts.dresscodeGendered.men.text;
    document.getElementById('dresscode__description_woman').textContent = data.texts.dresscodeGendered.women.text;

    if (colors) {
        const colorCount = Object.keys(colors).length;
        const containerWidth = dresscodeColorsContainer.offsetWidth * 0.9*0.9; // 90% of the container width
       const maxPerRow = colorCount > 5 ? Math.ceil(colorCount / 2) : colorCount; // Вычисляем maxPerRow в зависимости от colorCount
       const rowCount = Math.ceil(colorCount / maxPerRow); // Количество строк
    let firstRowCircleSize = 0; // Храним размер кружков первой строки

        for (let i = 0; i < rowCount; i++) {
            const rowContainer = document.createElement('div');
            rowContainer.classList.add('dresscode__row');
            dresscodeColorsContainer.appendChild(rowContainer);

            const circlesInThisRow = (i === rowCount - 1 && colorCount % maxPerRow !== 0) ? colorCount % maxPerRow : maxPerRow;// Проверяем сколько кружков в последней строке
        // Вычисляем circleSize только для первой строки, используем повторно для последующих строк
        const circleSize = i === 0 ? Math.max((containerWidth / circlesInThisRow) - 10, 20) : firstRowCircleSize;
         if (i === 0) {
            firstRowCircleSize = circleSize; // Сохраняем вычисленный размер
        }


            for (let j = 0; j < circlesInThisRow; j++) {
                const colorIndex = i * maxPerRow + j;
                const colorKey = Object.keys(colors)[colorIndex]; // Get the color key by index

                if (colorKey && colors.hasOwnProperty(colorKey)) {
                    const colorValue = colors[colorKey];
                     const colorCircle = document.createElement('div');
                    colorCircle.classList.add('dresscode__color');
                    colorCircle.classList.add(`dresscode-color-${colorIndex + 1}`);
                    colorCircle.style.setProperty('--svg-fill-color', colorValue); // Устанавливаем CSS переменную
                    colorCircle.innerHTML = baseSvgCode;
                    rowContainer.appendChild(colorCircle);
                }
            }
        }
    }
}
    })
    .catch(error => console.error('Ошибка загрузки данных:', error));


});
