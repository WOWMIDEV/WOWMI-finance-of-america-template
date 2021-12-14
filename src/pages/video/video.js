import './video.scss';
import '../../assets/scripts/main';

const videoWrp = document.querySelectorAll('.video-player');
const video = document.querySelectorAll('video');
const videoPlay = document.querySelectorAll('[data-video="video"]');
const videoClose = document.querySelectorAll('.video-player__close');


function toggle(i) {
  videoWrp[i].classList.toggle('js-active');
  video[i].pause();
  video[i].currentTime = 0;
}

videoPlay.forEach((play, i) => {
  play.addEventListener('click', () => {
    toggle(i);
  });
});

videoClose.forEach((close, i) => {
  close.addEventListener('click', () => {
    toggle(i);
  });
});

