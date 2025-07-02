// script.js
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// --------------------------------fortopolio -------------------------------------

const track = document.querySelector(".slider-track");
const slides = Array.from(document.querySelectorAll(".slide"));
const visibleSlides = 4;
const slideWidth = slides[0].offsetWidth + 32; // 32px jika ada gap antar slide
let currentIndex = 0;
let isTransitioning = false;

// Clone slide untuk seamless loop
slides.slice(0, visibleSlides).forEach((slide) => {
  const clone = slide.cloneNode(true);
  clone.classList.add("clone");
  track.appendChild(clone);
});

// Total semua slide setelah clone
const totalSlides = document.querySelectorAll(".slide").length;

// Fungsi geser ke kanan
function slideNext() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex++;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  // Reset setelah sampai clone
  if (currentIndex === totalSlides - visibleSlides) {
    setTimeout(() => {
      track.style.transition = "none";
      currentIndex = 0;
      track.style.transform = `translateX(0)`;
      isTransitioning = false;
    }, 500);
  } else {
    setTimeout(() => {
      isTransitioning = false;
    }, 500);
  }
}

// Geser ke kiri
function slidePrev() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex--;
  if (currentIndex < 0) {
    track.style.transition = "none";
    currentIndex = totalSlides - visibleSlides - 1;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    setTimeout(() => {
      track.style.transition = "transform 0.5s ease";
      currentIndex--;
      track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }, 20);
  } else {
    track.style.transition = "transform 0.5s ease";
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  setTimeout(() => {
    isTransitioning = false;
  }, 500);
}

// Tombol kontrol
document.querySelector(".next").addEventListener("click", slideNext);
document.querySelector(".prev").addEventListener("click", slidePrev);

// --------------------------------------------------------
let isDragging = false;
let startX;
let scrollLeft;

const slider = document.querySelector(".slider-track");

// Desktop drag
slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  slider.style.cursor = "grabbing";
});
slider.addEventListener("mouseleave", () => {
  isDragging = false;
  slider.style.cursor = "grab";
});
slider.addEventListener("mouseup", () => {
  isDragging = false;
  slider.style.cursor = "grab";
});
slider.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

// Mobile touch
slider.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener("touchend", () => {
  isDragging = false;
});
slider.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

// ------------------------daftar harga ----------------------------

const tabButtons = document.querySelectorAll(".tab-btn");
const paketContents = document.querySelectorAll(".paket-content");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabButtons.forEach((b) => b.classList.remove("active"));
    paketContents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    const target = btn.getAttribute("data-target");
    document.getElementById(target).classList.add("active");
  });
});

// -----------------------------------
