function calc() {

    //Калькулятор
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {

        sex = localStorage.getItem('sex');

    }

    if (localStorage.getItem('ratio')) {

        ratio = localStorage.getItem('ratio');

    }
    
    function calcTotal() {

        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex == 'female') {
            result.textContent = (( 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) ) * ratio).toFixed();
        } else {
            result.textContent = (( 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) ) * ratio).toFixed();
        }

        if (+result.textContent < 0 || +result.textContent > 6000) {
            result.textContent = '____';
            return;
        }

        console.log(result);

    }


    function initLocalSettings(selector, activeClass) {

        const elements = document.querySelectorAll(selector);
        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            } 
            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }
        });

    }

    function getStaticInfo(selector, activeClass) {

        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio' , ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex' , sex);
                }
    
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
        
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });

    }
    
    function getDinamicInfo(selector) {

        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });


    }

    calcTotal();

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    getStaticInfo('#gender div', 'calculating__choose-item_active');
    getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    getDinamicInfo('#height');
    getDinamicInfo('#weight');
    getDinamicInfo('#age');

}

export default calc;