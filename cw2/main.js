let slideIndex = 0;
showSlides();
var slides,dots, timer;
let i;
let mixButton = document.getElementById("mixButton");
mixButton.addEventListener("click", Stop);

function Start(){
  showSlides()
  mixButton.removeEventListener("click", Start);
  mixButton.addEventListener("click", Stop);
  mixButton.value = "Stop";
}

function Stop(){
  clearTimeout(timer)
  mixButton.removeEventListener("click", Stop);
  mixButton.addEventListener("click", Start);
  mixButton.value = "Start";
}

function showSlides() {
  let i;
  slides = document.getElementsByClassName("mySlides");
  dots = document.getElementsByClassName("dot");
  for(i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex> slides.length) {slideIndex = 1}
  for(i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  timer = setTimeout(showSlides, 5000);
}

function plusSlides(position) {
  clearTimeout(timer);
  slideIndex +=position;
  if (slideIndex> slides.length) {slideIndex = 1}
  else if(slideIndex<1){slideIndex = slides.length}
  for(i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for(i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  timer = setTimeout(showSlides, 4000);
}

function currentSlide(index) {
  clearTimeout(timer);
  if (index> slides.length) {index = 1}
  else if(index<1) {index = slides.length}
  for(i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for(i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[index-1].style.display = "block";
  dots[index-1].className += " active";
  timer = setTimeout(showSlides, 4000);
}