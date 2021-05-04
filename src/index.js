import gallery from "./gallery-items.js";

const refs = {
  buttonCloseLightbox: document.querySelector(".lightbox__button"),
  lightBox: document.querySelector(".js-lightbox"),
  lightBoxImg: document.querySelector(".lightbox__image"),
  galleryContainer: document.querySelector(".js-gallery"),
};

const createGalleryMarkup = (gallery) => {
  return gallery
    .map(({ preview, original, description }, idx) => {
      return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      data-index="${idx}"
      alt="${description}"
    />
  </a>
</li>`;
    })
    .join("");
};

const galleryMarkup = createGalleryMarkup(gallery);
refs.galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

let dataIndex = 0;

const onImgClick = (evt) => {
  evt.preventDefault();

  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }

  dataIndex = Number(evt.target.dataset.index);

  refs.lightBox.addEventListener("click", onButtonCloseOrOverlayClick);
  window.addEventListener("keydown", onEscButtonPress);
  window.addEventListener("keydown", onArrowPress);

  refs.lightBox.classList.add("is-open");
  refs.lightBoxImg.src = evt.target.dataset.source;
  refs.lightBoxImg.alt = evt.target.alt;
};

const onClosingLightbox = () => {
  refs.lightBox.classList.remove("is-open");
  refs.lightBoxImg.src = "";
  refs.lightBox.removeEventListener("click", onButtonCloseOrOverlayClick);
  window.removeEventListener("keydown", onEscButtonPress);
  window.removeEventListener("keydown", onArrowPress);
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

const onArrowPress = (evt) => {
  if (evt.code === "ArrowRight") {
    dataIndex += 1;
  }
  if (evt.code === "ArrowLeft") {
    dataIndex -= 1;
  }
  if (dataIndex > gallery.length - 1) {
    dataIndex = 0;
  }
  if (dataIndex < 0) {
    dataIndex = gallery.length - 1;
  }

  refs.lightBoxImg.dataset.index = dataIndex;
  refs.lightBoxImg.src = gallery[dataIndex].original;
  refs.lightBoxImg.alt = gallery[dataIndex].description;
};

refs.galleryContainer.addEventListener("click", onImgClick);
