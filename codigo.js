// Song Data

const songList = [
    {
        tittle: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "1.jpeg"
    },
    {
        tittle: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "2.jpeg"
    },
    {
        tittle: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpeg"
    },
]
// Cancion actual
let actualSong = null;

// Capturar elementos del DOM para trabajar con JS
const songs = document.getElementById("songs");
const audio = document.getElementById("audio");
const cover = document.querySelector(".cover");
const tittle = document.querySelector(".tittle");
const play = document.getElementById("play");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const progress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");


// Escuchar el elemento audio
audio.addEventListener("timeupdate", updateProgress);

// Escuchar clicks en los botones
play.addEventListener("click", ()=>{
    if(audio.paused)
        playSong();
    else
        pauseSong();
})

prev.addEventListener("click", ()=>prevSong());

next.addEventListener("click", ()=>nextSong());

// Escuchar clicks en la barra de reproduccion
progressContainer.addEventListener("click",(e)=>{
    const posicion = e.offsetX / progressContainer.offsetWidth;
     audio.currentTime = audio.duration * posicion;
     audio.play;
})

// Cargar canciones y mostrar el listado
function loadSongs(){
    songList.forEach((song, index)=>{
        // Crear li
        const li = document.createElement("LI");
        // Crear a 
        const link = document.createElement("A");
        // Hidratar a 
        link.textContent = song.tittle;
        link.href = "#";
        // Escuchar clicks
        link.addEventListener("click", ()=> loadSong(index))
        //Añadir a li
        li.appendChild(link);
        // Añadir li a ul
        songs.appendChild(li);
    });
}

// Cargar cancion seleccionada
function loadSong(songIndex){
    if(songIndex != actualSong){
        changeActiveClass(actualSong, songIndex);
        actualSong = songIndex;
        audio.src =  "./audio/" + songList[songIndex].file;
        playSong();
        changeCover(songIndex);
        changeTittle(songIndex);
    }
}

// Actualizar barra de progreso de la cancion
function updateProgress(event){
    if(event && event.srcElement){
        const {duration, currentTime} = event.srcElement;
        const percent = (currentTime / duration) * 100;
        progress.style.width = `${percent}%`;
    }
}

// Actualizar controles
function updateControls(){
    play.classList.toggle("fa-pause", !audio.paused);
    play.classList.toggle("fa-play", audio.paused);

}

// Reproducir cancion
function playSong(){
    if(actualSong != null){
        audio.play();
        updateControls();
    }
}

// Pausar cancion
function pauseSong(){
    audio.pause();
    updateControls();
}

// Anterior cancion
function prevSong(){
    actualSong > 0 ? loadSong(actualSong - 1) : loadSong(2);
}

// Siguiente Cancion
function nextSong(){
    actualSong < songList.length -1 ? loadSong(actualSong + 1) : loadSong(0);
}

// Cambiar clase activa
function changeActiveClass(lastIndex, newIndex){
    const links = document.querySelectorAll("a");
    if(lastIndex != null)
    {
        links[actualSong].classList.remove("active");
    }
    links[newIndex].classList.add("active");
}

// Cambiar el cover de la cancion
function changeCover(songIndex){
    cover.src = "./img/" + songList[songIndex].cover;
}

// Cambiar el titulo de la cancion
function changeTittle(songIndex){
    tittle.innerHTML = songList[songIndex].tittle;
}

// Reproducir automaticamente la siguiente cancion
audio.addEventListener("ended", ()=> nextSong());

// GO!
loadSongs();