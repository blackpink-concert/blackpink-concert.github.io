var dd = document.getElementById('days')
var hh = document.getElementById('hours')
var mm = document.getElementById('minutes')
var ss = document.getElementById('seconds')
var targetDate = '2023-03-25T19:00:02'

function millisToMinutesAndSeconds(date_future, date_now) {
    var delta = Math.abs(date_future - date_now) / 1000;
    var days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    var hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    var minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    // what's left is seconds
    var seconds = delta % 60;
    seconds = seconds.toFixed(0)

    return days + ":"+ (hours < 10 ? '0' : '') + hours + ":" +  (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function changeDay(day) {
    var one = document.getElementById('day1')
    var two = document.getElementById('day2')

    if(day == 1){
        one.classList.add('active-day')
        two.classList.remove('active-day')
        targetDate = '2023-03-25T19:00:02'
    } else if (day == 2){
        two.classList.add('active-day')
        one.classList.remove('active-day')
        targetDate = '2023-03-26T19:00:02'
    }
}

var intervalId = window.setInterval(function(){
    var currentTime = new Date()
    currentTime.setHours(currentTime.getHours() + 8)
    currentTime = currentTime.toISOString()
    var concert = new Date(targetDate)

    const dateToday = new Date(currentTime.slice(0, -1));
    const remainingTime = concert - dateToday

    var countdown = millisToMinutesAndSeconds(concert, dateToday)

    var splitTime = countdown.split(':')

    if(splitTime[3] == 60)
        splitTime[3] = '00'

    dd.innerHTML = splitTime[0]
    hh.innerHTML = splitTime[1]
    mm.innerHTML = splitTime[2]
    ss.innerHTML = splitTime[3]
}, 1000);