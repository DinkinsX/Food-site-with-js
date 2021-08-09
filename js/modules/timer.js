function timer(id, deadline) {

    //Таймер;
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
    setClock(id, deadline);

}

export default timer;