const postData = async (url, data) => {
    //асинхронный код
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    if (!res.ok) {
        showThanksModal(message.error);
    }

    //console.log(res.json());
    return await res.json();
};


// const getReource = async (url) => {
//     //асинхронный код
//     const res = await fetch(url);
//     if (!res.ok) {
//         throw new Error(`Ошибка запроса к ${url}, статус: ${res.status}`)
//     }

//     return await res.json();
// };

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

export {postData};