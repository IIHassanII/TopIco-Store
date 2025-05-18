//   ---------- Swiper 1 ----------
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop: true,
  autoplay: true,
});

//   ---------- Swiper 2 ----------

var swiper = new Swiper(".mySwiper2", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: "#swiper2-next",
    prevEl: "#swiper2-prev",
  },
  breakpoints: {
    1200:  { slidesPerView: 5, spaceBetween: 30 },
    992: { slidesPerView: 4, spaceBetween: 30 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    0: { slidesPerView: 2, spaceBetween: 30 },
  },
});

//   ---------- Swiper 3 ----------

var swiper = new Swiper(".mySwiper3", {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: "#swiper3-next",
    prevEl: "#swiper3-prev",
  },  breakpoints: {
    1200:  { slidesPerView: 4, spaceBetween: 30 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    0: { slidesPerView: 2, spaceBetween: 30 },
    
   
  }
});
//   ---------- Swiper 4 ----------

var swiper = new Swiper(".mySwiper4", {
  slidesPerView: 4,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: "#swiper4-next",
    prevEl: "#swiper4-prev",
  },breakpoints: {
    1200:  { slidesPerView: 4, spaceBetween: 30 },
    768: { slidesPerView: 3, spaceBetween: 30 },
    0: { slidesPerView: 2, spaceBetween: 30 },
    
   
  }
});
