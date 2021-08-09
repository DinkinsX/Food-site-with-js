const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //дефолт
};

const openModal = (modalSelector, modalTimerId) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';

    if(modalTimerId) { 
        clearInterval(modalTimerId);
    }
};

function modal(triggerSelector, modalSelector, modalTimerId) {

    //Модальное окно
    const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
    //modalCloseBtn = document.querySelector('[data-close]'); //Нужно использовать делегирование, 
    //так как мы создаем новую кнопку-крестик и обработчик не работает

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    };

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // () чтобы передать аргумент и не вызвать функцию, можно применить оберточную функцию

    });

    // modalCloseBtn.addEventListener('click', () => { //комментарий на 42-43ст
    //     // modal.classList.add('hide');
    //     // modal.classList.remove('show');
    //     closeModal();
    // });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == "") { // теперь либо на подложку либо на крестик и окно закрывается
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal(modalSelector);
        }
    });

    window.addEventListener('scroll', showModalByScroll);

}



export default modal;
export {closeModal, openModal};