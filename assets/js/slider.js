const sliderItems = [
  {
    img: "../img/slider/slider-1",
  },
  {
    img: "../img/slider/slider-2",
  },
  {
    img: "../img/slider/slider-3",
  },
  {
    img: "../img/slider/slider-4",
  },
  {
    img: "../img/slider/slider-5",
  },
];

class Slide {
  constructor(img) {
    this.img = img;
  }
}

const slides = sliderItems.map((sliderItem) => {
  return new Slide(sliderItem.img);
});

console.log(slides);

class slider {
  constructor(sliders) {
    this.slider = sliders;
  }

  init() {}
}

const sliders = new slider(slides);
