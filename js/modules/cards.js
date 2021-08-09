import { getReource } from "../services/services";

function cards() {

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

    
    axios.get('http://localhost:3000/menu').then(data => {

    data.data.forEach(({
        img,
        altimg,
        title,
        descr,
        price
    }) => { //деструктуризация объекта
        new MenuCard(img, altimg, title, descr, price * 74, '.menu .container').render();
    });

    }).catch((error) => {
        throw new Error(`Ошибка запроса - ${error}`);
    });

}

export default cards;