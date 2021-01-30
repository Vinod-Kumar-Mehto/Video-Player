const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player--slider");
const fullScreen = player.querySelector(".fullscreen");

function togglePlay(){
    
    const method = video.paused ? "play" : "pause";
  video[method]();
};
function updateBtn(){
    const icon = this.paused ? "&#10074&#10074" :"&#9658";
    toggle.innerHTML =icon;
};
function skip(){
    console.log(this.dataset.skip)
    video.currentTime += parseFloat(this.dataset.skip)
};
function handleRange(){
 video[this.name] = this.value;
    
};

function handleProgress(){
    
    const percent = (video.currentTime / video.duration) * 100;
    
        progressBar.style.width =`${percent}%`;
    
};

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
   
}
function screnManage(){
        video.requestFullscreen()
}

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);
toggle.addEventListener("click", togglePlay);
skipButtons.forEach( button => button.addEventListener("click", skip))
ranges.forEach( range => range.addEventListener("change", handleRange))
ranges.forEach( range => range.addEventListener("mousemove", handleRange))
fullScreen.addEventListener("click", screnManage);
 
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => mousedown = true);
progress.addEventListener("mouseup", () => mousedown = false);