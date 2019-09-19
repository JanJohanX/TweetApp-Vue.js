'use strict';
const app = new Vue({
  el: '#app',
  data: {
    newText: '',
    characters: [],
  },
  methods: {
    add() {
      if ( !this.newText) return

      this.characters.push({
        text: this.newText,
      })

      this.newText = ''
    },

    remove(table) {
      this.characters = this.characters.filter( item => item !== table )
    }
  },
});

var progress = document.querySelector('.progress');
var textarea = document.querySelector('textarea');
var counter = document.querySelector('.counter');
var form = document.querySelector('form');

var pathLength = progress.getAttribute('r') * 2 * Math.PI;
var tweetLength = 60;
var warningZone = Math.floor(tweetLength * (2/3));
var dangerZone = Math.floor(tweetLength * (4/5));

progress.style.strokeDasharray = pathLength + 'px';
progress.style.strokeDashoffset = pathLength + 'px';

var _listener = function(event){
  var len = textarea.value.length;
  var per = len / tweetLength;
  var newOffset = pathLength - pathLength * per;

  if (len <= tweetLength){
    let newOffset = pathLength - (pathLength * per) + 'px';
    progress.style.strokeDashoffset = newOffset;

    progress.classList.toggle('warn', len > warningZone && len < dangerZone );
    progress.classList.toggle('danger', len >= dangerZone );
    progress.classList.toggle('tragedy', len == tweetLength );
  }

  counter.textContent = tweetLength - len;
  counter.classList.toggle('danger', len >= dangerZone );

};

var reSet_ = function(event) {
    if(event.key === 'Enter') {
        counter.textContent = 60;
        counter.classList.remove('danger');
        progress.style.strokeDashoffset = pathLength + 'px';
    }
};

textarea.addEventListener('input', _listener, true );
textarea.addEventListener('keydown', reSet_, true );
