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
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

const closeModal = () => {
    modal.classList.toggle('show'); //если укажем класс явно в DOM
    document.body.style.overflow = ''; //дефолт
};

const openModal = () => {
    modal.classList.toggle('show'); 
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

modalCloseBtn.addEventListener('click', () => {
    // modal.classList.add('hide');
    // modal.classList.remove('show');
    closeModal();
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
       closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
        closeModal();
    }
});

window.addEventListener('scroll', showModalByScroll);

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

//const div = new MenuCard(...);
//div.render(); или 
new MenuCard(
    'img/tabs/vegy.jpg',
    'vegy',
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    229,
    '.menu .container',
    'menu__item'
    
).render(); //тут же удалится
new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container',
    'menu__item'
).render();
new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container',
    'menu__item'
).render();

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