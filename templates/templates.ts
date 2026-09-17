declare const $: any;

let currentSlide = 0;
const totalSlides = $('.slide').length;

function displaySlide(index: number) {
  $('.slide').hide();
  $(`#slide-${index}`).show();
}

$(() => {
  displaySlide(currentSlide);
  $('#nextBtn').on('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    displaySlide(currentSlide);
  });
});
