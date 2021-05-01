import gallery from "./gallery-items.js";

const refs = {
  buttonCloseLightbox: document.querySelector(".lightbox__button"),
  lightBox: document.querySelector(".js-lightbox"),
  lightBoxImg: document.querySelector(".lightbox__image"),
  galleryContainer: document.querySelector(".js-gallery"),
};

const createGalleryMarkup = (gallery) => {
  return gallery
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
};

const galleryMarkup = createGalleryMarkup(gallery);
refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

const onImgClick = (evt) => {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  refs.lightBox.addEventListener("click", onButtonCloseOrOverlayClick);
  window.addEventListener("keydown", onEscButtonPress);

  refs.lightBox.classList.add("is-open");
  refs.lightBoxImg.src = evt.target.dataset.source;
  refs.lightBoxImg.alt = evt.target.alt;
};

const onClosingLightbox = () => {
  refs.lightBox.classList.remove("is-open");
  refs.lightBoxImg.src = "";
  refs.lightBox.removeEventListener("click", onButtonCloseOrOverlayClick);
  window.removeEventListener("keydown", onEscButtonPress);
};

const onButtonCloseOrOverlayClick = (evt) => {
  if (evt.target.classList.contains("lightbox__image")) {
    return;
  }
  onClosingLightbox();
};

const onEscButtonPress = (evt) => {
  if (evt.key === "Escape") {
    onClosingLightbox();
  }
};

// const swipeGalleryByArrows = (evt) => {
//   let defaultImgIndex = 0;
//   const swipedImgs = gallery.forEach((element) => {
//     if (evt.key === "ArrowRight") {
//       refs.lightBoxImg.src = element.original;
//     }

//     // console.log(element);
//   });
//   //   console.log(swipedImgs);
// };

refs.galleryContainer.addEventListener("click", onImgClick);

// window.addEventListener("keydown", swipeGalleryByArrows);
