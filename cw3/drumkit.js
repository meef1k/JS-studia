document.addEventListener('keypress', onKeyPress)
const channel1 = [];
const channel2 = [];
const channel3 = [];
const channel4 = [];
let rec;
let recordStart1;
let recordStart2;
let recordStart3;
let recordStart4;
let array;

const KeyToSound = {
  'a': document.querySelector('#s1'),
  's': document.querySelector('#s2'),
  'd': document.querySelector('#s3'),
  'f': document.querySelector('#s4'),
  'g': document.querySelector('#s5'),
  'h': document.querySelector('#s6'),
  'j': document.querySelector('#s7'),
  'k': document.querySelector('#s8'),
  'l': document.querySelector('#s9'),
}

document.querySelector('#playbtn1').addEventListener('click', () => {
  playChannel(channel1)
});
document.querySelector('#playbtn2').addEventListener('click', () => {
  playChannel(channel2)
});
document.querySelector('#playbtn3').addEventListener('click', () => {
  playChannel(channel3)
});
document.querySelector('#playbtn4').addEventListener('click', () => {
  playChannel(channel4)
});
document.querySelector('#playallbtn').addEventListener('click', () => {
  array = channel1.concat(channel2, channel3, channel4)
  array.sort(function(a,b) {
    return a[1]-b[1]
  });
  playChannel(array);
});
document.querySelector('#recordbtn1').addEventListener('click', () => {
  recordStart1 = Date.now();
  rec = 1;
});
document.querySelector('#recordbtn2').addEventListener('click', () => {
  recordStart2 = Date.now();
  rec = 2;
});
document.querySelector('#recordbtn3').addEventListener('click', () => {
  recordStart3 = Date.now();
  rec = 3;
});
document.querySelector('#recordbtn4').addEventListener('click', () => {
  recordStart4 = Date.now();
  rec = 4;
});

function onKeyPress(event){
  const sound = KeyToSound[event.key]
  if (sound && rec == 1) {
    const keyPressTime = Date.now() - recordStart1;
    const recordedSound = {
      sound: sound,
      time: keyPressTime,
    }
    channel1.push(recordedSound);
    playSound(sound);
  }
  if (sound && rec == 2) {
    const keyPressTime = Date.now() - recordStart2;
    const recordedSound = {
      sound: sound,
      time: keyPressTime,
    }
    channel2.push(recordedSound);
    playSound(sound);
  }
  if (sound && rec == 3) {
    const keyPressTime = Date.now() - recordStart3;
    const recordedSound = {
      sound: sound,
      time: keyPressTime,
    }
    channel3.push(recordedSound);
    playSound(sound);
  }
  if (sound && rec == 4) {
    const keyPressTime = Date.now() - recordStart4;
    const recordedSound = {
      sound: sound,
      time: keyPressTime,
    }
    channel4.push(recordedSound);
    playSound(sound);
  }
  else if (sound) {
    playSound(sound);
  }
}
function playSound(sound){
  sound.currentTime = 0
  sound.play()
}

function playChannel(channel) {
  for (let index = 0; index < channel.length; index++) {
    const soundObject = channel[index];


    setTimeout(() => {
      playSound(soundObject.sound)
    }, soundObject.time)
  }
}
