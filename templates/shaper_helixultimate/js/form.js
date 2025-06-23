const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzhQoSBlWCYhz7ZHEbSGyeI2tUs85WHdMq2MgjI8OafNWNoBDEI5_P6uU4zJ7E5aaN8Yg/exec';

function validateForm() {
    const nameInput = document.querySelector('input[name="Имя и фамилия"]');
    const guestsInput = document.getElementById('quantity');
    const rsvpErrors = document.getElementById('rsvp_errors');
    const rsvpNull = document.getElementById('rsvp_null');

    if (!nameInput.value || !guestsInput.value) {
        rsvpNull.style.display = 'block';
        rsvpErrors.style.display = 'none';
        return false;
    }

    const guests = parseInt(guestsInput.value);
    if (isNaN(guests) || guests < 0 || guests > 10) {
        rsvpErrors.style.display = 'block';
        rsvpNull.style.display = 'none';
        return false;
    }

    rsvpErrors.style.display = 'none';
    rsvpNull.style.display = 'none';
    return true;
}

async function submitRSVP(status) {
    if (!validateForm()) return;

    const nameInput = document.querySelector('input[name="Имя и фамилия"]');
    const guestsInput = document.getElementById('quantity');
    const rsvpContainer = document.getElementById('rsvp_container');
    const rsvpAnswYes = document.getElementById('rsvp-answ-yes');
    const rsvpAnswNo = document.getElementById('rsvp-answ-no');

    const data = {
        name: nameInput.value,
        guests: parseInt(guestsInput.value),
        status: status
    };

    try {
        await fetch(SCRIPT_URL, {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(data)
        });

        // Если дошли до этой строки, значит запрос был отправлен
        rsvpContainer.style.display = 'none';
        if (status === 'Принято') {
            rsvpAnswYes.style.display = 'block';
        } else {
            rsvpAnswNo.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        // Проверяем, была ли это CORS ошибка
        if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
            // Даже если получили CORS ошибку, данные могли быть сохранены
            rsvpContainer.style.display = 'none';
            if (status === 'Принято') {
                rsvpAnswYes.style.display = 'block';
            } else {
                rsvpAnswNo.style.display = 'block';
            }
        } else {
            alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.');
        }
    }
}

function submityes() {
    submitRSVP('Принято');
}

function submitno() {
    submitRSVP('Отклонено');
}
