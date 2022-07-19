
let DONE_ANGLE = 15;
let START_ANGLE = -9;
let secTimePassed = 0;
let minTimePassed = 0;
var audio
var timer

const songsList = shuffle(["song1", "song2", "song3", "song4", "song5"]);
var currentSongId = 0
$(".play-2")[0].src = `./songs/${songsList[currentSongId]}.mp3`;
document.getElementById('trackName').innerText = songsList[currentSongId];
document.getElementById('trackTime').innerText = timeBeautify(minTimePassed, secTimePassed);

const moveToRecord = (percentage) => {
    const recAng = recordCompletionAngle(percentage, START_ANGLE, DONE_ANGLE);
    
    document.querySelector(".armBody").style.transform = `rotate(${recAng}deg)`;
    
    $(".record").addClass("rotating");
};

const recordCompletionAngle = (percentage, min, max) => {
    return 1 * ((percentage / 100) * (max - min) + min);
};

setInterval(() => {
    if ($(".play-2").prop("paused")) return
    let seconds = (new Date()).getSeconds();
    moveToRecord((seconds/60) * 100);

}, 200);

function makeTimer(){
    timer = setInterval(() => {
        secTimePassed++;
        if (secTimePassed == 60) {
            secTimePassed = 0;
            minTimePassed++;
        }
        document.getElementById('trackTime').innerText = timeBeautify(minTimePassed, secTimePassed);
    } , 1000);
}




$("#play").click(() => {
    if ($(".play-2").prop("paused")) {
        $(".play-2").trigger("play");
        makeTimer();
    }
    else {
        $(".play-2").trigger("pause")
        clearInterval(timer);
    }
})

$("#prev").click(() => changeCurrentSong(-1))

$("#next").click(() => changeCurrentSong(1))

function changeCurrentSong(id){
    if(currentSongId + id < 0) currentSongId = songsList.length - 1;
    else if(currentSongId + id > songsList.length - 1) currentSongId = 0;
    else currentSongId += id;
    $(".play-2")[0].src = `./songs/${songsList[currentSongId]}.mp3`;
    document.getElementById('trackName').innerText = songsList[currentSongId];
    $(".play-2").trigger("pause");
    $(".play-2").trigger("play");
    clearInterval(timer);
    secTimePassed = 0;
    minTimePassed = 0;
    document.getElementById('trackTime').innerText = timeBeautify(minTimePassed, secTimePassed);
    makeTimer()
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function timeBeautify(min, sec){
    if(min < 10) min = "0" + min;
    if(sec < 10) sec = "0" + sec;
    return `${min}:${sec}`;
}