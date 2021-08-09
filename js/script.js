import tabs from './modules/tabs';
import modal from './modules/modal';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import timer from './modules/timer';
import {openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 10000); 

    tabs();
    modal('[data-modalButton]', '.modal', modalTimerId);
    cards();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        prevArrow: '.offer__slider-prev',
        nextArrow: '.offer__slider-next',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        slide: '.offer__slide',
        field: '.offer__slider-inner'
    });
    timer('.timer', '2022-01-01');
            
});