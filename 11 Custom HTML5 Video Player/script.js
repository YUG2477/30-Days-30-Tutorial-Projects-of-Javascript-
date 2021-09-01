//  get our elements -------------------------------------------->
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//build our functions--------------------------------------------->

//  its help to play the video or paused , here paused , play property of video (predefined)
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  }

//   update the play and paused button , here paused , play property of video (predefined)
  function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    toggle.textContent = icon;
  }

  // skip button --> dataset is no. to skip 
  function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
   }

   // range change for volume and play-back-rate= speed 2x , 3x of video play etc
   function handleRangeUpdate() {
    video[this.name] = this.value;
  }

  // progressbar update in percentage 
  function handleProgress() {
      // formula to calculate pecentage of video duration completed
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  } 


  // scrub on progressbar 
  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  }
  

  // hook up the event listeners --------------------------------------------->

//  event when click start play , paused
video.addEventListener('click' , togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
// timeupdate event for handleProgress
video.addEventListener('timeupdate', handleProgress);


toggle.addEventListener('click' , togglePlay);

//  skip event
skipButtons.forEach(button => button.addEventListener('click', skip));

// ranges event for volume and playbackrate--> speed 2x , 3x of video play etc
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// sccrub event for progress bar
let mousedown = false;
progress.addEventListener('click', scrub);
// when mousedown is true then scrub event run if false then not run 
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);