//Табы
const tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabParant = document.querySelector('.tabheader__items');

function hideTabContent() {
    tabsContent.forEach(item => {
        //item.style.display = 'none';
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
        item.classList.remove('tabheader__item_active');
    });
}

function showTabContent(i = 0) {
    //tabsContent[i].style.display = 'block';
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
}

hideTabContent();
showTabContent();

tabParant.addEventListener('click', e => {
    const target = e.target;
    if (target && target.classList.contains('tabheader__item')) {
        tabs.forEach((item, i) => {
            if (target == item) {
                hideTabContent();
                showTabContent(i);
            }
        });
    }
});

//Модальное окно
const modalTrigger = document.querySelectorAll('[data-modalButton]'),
    modal = document.querySelector('.modal');
    //modalCloseBtn = document.querySelector('[data-close]'); //Нужно использовать делегирование, 
                                                            //так как мы создаем новую кнопку-крестик и обработчик не работает

const closeModal = () => {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //дефолт
};

const openModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
};
const modalTimerId = setTimeout(openModal, 10000);

const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= 
        document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
};

modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
});    

// modalCloseBtn.addEventListener('click', () => { //комментарий на 42-43ст
//     // modal.classList.add('hide');
//     // modal.classList.remove('show');
//     closeModal();
// });

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') == "") { // теперь либо на подложку либо на крестик и окно закрывается
       closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});

window.addEventListener('scroll', showModalByScroll);

//Формы
const forms = document.querySelectorAll('form');
const message = {
    loading: 'img/spinner.svg',
    success: 'Спасибо! С вами скоро свяжутся',
    error: 'Ошибка.'
};

forms.forEach(form => {
    bindPostData(form);
});

const postData = async (url, data) => {
    //асинхронный код
    const res = await fetch(url, {
        method: "POST",
        headers: {'Content-type': 'application/json'},
        body: data
    });

    if (!res.ok) {
        showThanksModal(message.error);
    }

    //console.log(res.json());
    return await res.json();
};



function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); //Во всех ajax запросов чтоб не перезагружалась стр
        //Динамически создаваемый блок к форме
        form.querySelector('button').style.cssText = `display:none`;
        const statusMessage = document.createElement('img');
        statusMessage.src = message.loading;
        statusMessage.style.cssText = `display: block; margin: 0 auto`;
        statusMessage.textContent = message.loading;
        //form.append(statusMessage);
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);

        const json = JSON.stringify(Object.fromEntries(formData.entries())); //новые методы


        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
            showThanksModal(message.success);
            form.querySelector('button').style.cssText = `display:block`;
            statusMessage.remove();
        }).catch((err) => {
            console.log(err);
            showThanksModal(message.error);
        }).finally(() => form.reset());

    });
}

function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal();
    
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('.modal__dialog');
    thanksModal.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">
                ${message}
            </div>
        </div>
    `;
    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal();
    }, 4000);
}

//Карточки
class MenuCard { 
    constructor(src, altSrc, title, descr, price, parentSelector, ...someClasses) {
        this.src = src;
        this.altSrc = altSrc;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.transfer = 73;
        this.parent = document.querySelector(parentSelector);
        this.someClasses = someClasses;
        //this.changeToRub();
    }

    changeToRub() {
        this.price = this.price * this.transfer;
    }

    render() {

        const element = document.createElement('div');
        if (this.someClasses.length === 0) {
            element.classList.add('menu__item'); // Дефолтный класс
        } else {
            this.someClasses.forEach(className => element.classList.add(className));
        }
        
        element.innerHTML = `
            <img src="${this.src}" alt="${this.altSrc}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> р/день</div>
        `;
        this.parent.append(element);

    }

}

const getReource = async (url) => {
    //асинхронный код
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Ошибка запроса к ${url}, статус: ${res.status}`)
    }

    return await res.json();
};

// getReource('http://localhost:3000/menu').then(data => {
//     data.forEach(({img, altimg, title, descr, price}) => { //деструктуризация объекта
//         new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
//     });
// });


//getReource('http://localhost:3000/menu').then(data => createCard(data));
// function createCard(data) {
//     data.forEach(({img, altimg, title, descr, price}) => {
//         const element = document.createElement('div');
//         element.classList.add('menu__item');
//         element.innerHTML = `
//         <img src="${img}" alt="${altimg}">
//         <h3 class="menu__item-subtitle">${title}</h3>
//         <div class="menu__item-descr">${descr}</div>
//         <div class="menu__item-divider"></div>
//         <div class="menu__item-price">
//             <div class="menu__item-cost">Цена:</div>
//             <div class="menu__item-total"><span>${price*73}</span> р/день</div> 
//     `;// цена в долларах, можно подгружать

//     document.querySelector('.menu .container').append(element);
//     });
// }

axios.get('http://localhost:3000/menu').then(data => {

    data.data.forEach(({img, altimg, title, descr, price}) => { //деструктуризация объекта
        new MenuCard(img, altimg, title, descr, price * 74, '.menu .container').render();});

}).catch((error) => {
    throw new Error(`Ошибка запроса - ${error}`);
});

//Таймер
const deadline = '2022-01-01';
function getTimeRemaining(endtime) {
    const time = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(time / (1000 * 60 * 60 * 24)),
        hours = Math.floor((time / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((time / 1000 / 60) % 60),
        seconds = Math.floor((time / 1000) % 60);
    
    return {
        'total': time,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return `${num}`;
    }
}

function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
        days = timer.querySelector('#days'),
        hours = timer.querySelector('#hours'),
        minutes = timer.querySelector('#minutes'),
        seconds = timer.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);

    updateClock();
    function updateClock() {
        const times = getTimeRemaining(endtime);
        days.innerHTML = getZero(times.days);
        hours.innerHTML = getZero(times.hours);
        minutes.innerHTML = getZero(times.minutes);
        seconds.innerHTML = getZero(times.seconds);

        if (times.total <= 0) {
            clearInterval(timeInterval);
        }
    }

}
setClock('.timer', deadline);

//slider

const slides = document.querySelectorAll('.offer__slide'),
    prev = document.querySelector('.offer__slider-prev'),
    next = document.querySelector('.offer__slider-next'),
    total = document.querySelector('#total'),
    current = document.querySelector('#current'),
    slidesWrapper = document.querySelector('.offer__slider-wrapper'),
    slidesField = document.querySelector('.offer__slider-inner'),
    width = window.getComputedStyle(slidesWrapper).width,//ширина через компьютед стайл
    slider = document.querySelector('.offer__slider');


let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
} else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + '%';
slidesField.style.display = 'flex';
slidesField.style.transition = '0.5s all';

slidesWrapper.style.overflow = 'hidden'; //скрываем всё что не попадает в область видимости
slides.forEach(slide => {
    slide.style.width = width;
});

slider.style.position = 'relative';
const indicators = document.createElement('ol'),
    dots = [];
indicators.classList.add('carousel-indicators');
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i +1);
    dot.classList.add('dot');
    if (i == 0) {
        dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

next.addEventListener('click', () => {
    if(offset == +width.replace(/\D/g, '') * (slides.length - 1)) { //'500px'
        offset = 0;
    } else {
        offset += +width.replace(/\D/g, '');
    }

    slidesField.style.transform = `translateX(-${offset}px)`;


    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }


    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
});

prev.addEventListener('click', () => {
    if(offset == 0) {
        offset = +width.replace(/\D/g, '') * (slides.length - 1);
    } else {
        offset -= +width.replace(/\D/g, '');
    }
    
    slidesField.style.transform = `translateX(-${offset}px)`;


    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }


    dots.forEach(dot => dot.style.opacity = '.5');
    dots[slideIndex - 1].style.opacity = 1;
});


dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = +width.replace(/\D/g, '') * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        dots.forEach(dot => dot.style.opacity = '.5');
        dots[slideIndex - 1].style.opacity = 1;

        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = slideIndex;
        }
        
    });

});

