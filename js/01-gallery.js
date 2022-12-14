import { galleryItems } from './gallery-items.js';

const galleryContainer = document.querySelector('.gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);

//Делегування на div.gallery
galleryContainer.addEventListener('click', onClickImage);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

//Створення розмітки
function createGalleryMarkup(galleryItems) {
	return galleryItems
		.map(({ preview, original, description }) => {
			return `<div class="gallery__item">
				<a class="gallery__link" href="${original}">
					<img
						class="gallery__image"
						src="${preview}"
						data-source="${original}"
						alt="${description}"
					/>
				</a>
			</div>`;
		})
		.join('');
}


function onClickImage(event) {
	event.preventDefault();
	const imgItem = event.target.classList.value.includes('gallery__image');
	if (!imgItem) return;

	const currentImgLink = event.target.dataset.source;
	const modal = basicLightbox.create(`<img class="modal__image" src="${currentImgLink}">`);

	modal.show();
	
    //Закриття модального вікна після натискання клавіші Escape
	window.addEventListener('keydown', onEscKeyPress);

	function onEscKeyPress(event) {
		const ESC_KEY_CODE = 'Escape';
		if (event.code === ESC_KEY_CODE) {
			modal.close();
			window.removeEventListener('keydown', onEscKeyPress);
		}
	}
}

console.log(galleryItems);
