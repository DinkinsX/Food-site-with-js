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
            window.addEventListener('scroll', showModalByScroll);
        }
};

modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal)
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
    constructor(src, altSrc, title, descr, price, parentSelector) {
        this.src = src;
        this.altSrc = altSrc;
        this.title = title;
        this.descr = descr;
        this.price = price;
        this.transfer = 73;
        this.parent = document.querySelector(parentSelector);
        //this.changeToRub();
    }

    changeToRub() {
        this.price = this.price * this.transfer;
    }

    render() {

        const element = document.createElement('div');
        element.innerHTML = `
            <div class="menu__item">
                <img src="${this.src}" alt="${this.altSrc}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> р/день</div>
            </div>
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
    '.menu .container'
).render(); //тут же удалится
new MenuCard(
    'img/tabs/elite.jpg',
    'elite',
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    550,
    '.menu .container'
).render(); //тут же удалится
new MenuCard(
    'img/tabs/post.jpg',
    'post',
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    430,
    '.menu .container'
).render(); //тут же удалится