let slideIndex, slides, dots, captionText;

function initGallery() {
  slideIndex = 0;

  slides = document.getElementsByClassName("imageHolder");
  slides[slideIndex].style.opacity = 1;

  captionText = document.querySelector(".captionHolder .captionText");
  captionText.innerHTML = slides[slideIndex].querySelector(
    ".captionText"
  ).textContent;

  dots = [];
  let dotContainer = document.getElementById("dotsContainer");

  // create dots with respect to images
  for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement("span");
    dot.classList.add("dots");
    dotContainer.append(dot);

    dots.push(dot);
  }

  dots[slideIndex].classList.add("active");
}

function moveSlide(n) {
  let i, current, next;
  let moveSlideAnimClass = {
    forCurrent: "",
    forNext: ""
  };

  let slideTextAnimClass;

  if (n > slideIndex) {
    if (n >= slides.length) {
      n = 0;
    }

    moveSlideAnimClass.forCurrent = "moveLeftCurrentSlide";
    moveSlideAnimClass.forNext = "moveLeftNextSlide";
    slideTextAnimClass = "slideTextFromTop";
  } else if (n < slideIndex) {
    if (n < 0) {
      n = slides.length - 1;
    }

    moveSlideAnimClass.forCurrent = "moveRightCurrentSlide";
    moveSlideAnimClass.forNext = "moveRightNextSlide";
    slideTextAnimClass = "slideTextFromBottom";
  }

  if (n != slideIndex) {
    next = slides[n];
    current = slides[slideIndex];

    // reset variables
    for (i = 0; i < slides.length; i++) {
      slides[i].className = "imageHolder";
      slides[i].style.opacity = 0;
      dots[i].classList.remove("active");
    }

    // reassign new variables
    current.classList.add(moveSlideAnimClass.forCurrent);
    next.classList.add(moveSlideAnimClass.forNext);
    dots[n].classList.add("active");
    slideIndex = n;
  }
  captionText.style.display = "none";
  captionText.className = "captionText " + slideTextAnimClass;
  captionText.innerText = slides[n].querySelector(".captionText").innerText;
  captionText.style.display = "block";
}

function plusSlides(n) {
  moveSlide(slideIndex + n);
}

window.onload = () => {
  initGallery();

  // slide forward
  document.querySelector(".rightArrow").addEventListener("click", () => {
    plusSlides(1);
  });

  // slide backward
  document.querySelector(".leftArrow").addEventListener("click", () => {
    plusSlides(-1);
  });

  // slide index position
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      moveSlide(index);
    });
  });

  document.getElementById("playPauseBtn").addEventListener("click", () => {
    playPauseSlides();
  });
};

let timer = null;
function setTimer() {
  timer = setInterval(() => {
    plusSlides(1);
  }, 5000);
}
setTimer();

function playPauseSlides() {
  let playPauseBtn = document.getElementById("playPauseBtn");

  if (timer == null) {
    setTimer();
    playPauseBtn.style.backgroundPositionX = "0px";
  } else {
    clearInterval(timer);
    timer = null;
    playPauseBtn.style.backgroundPositionX = "-33px";
  }
}
