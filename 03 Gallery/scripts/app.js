class Gallery {
    constructor(galleryContainer, modal) {
        this.galleryContainer = galleryContainer;
        this.images = galleryContainer.querySelectorAll('.img');
        this.modal = modal;
        this.modalMainImage = modal.querySelector('.main-image');
        this.modalImageName = modal.querySelector('.image-name');
        this.modalImagesGridContainer = modal.querySelector('.modal-images');
        this.modalImagesGrid = modal.querySelector('.modal-images-grid');
        this.modalCloseButton = modal.querySelector('.close-modal');
        this.nextButton = modal.querySelector('.next');
        this.prevButton = modal.querySelector('.prev');

        this.addEventHandler();
    }

    addEventHandler() {
        this.galleryContainer.addEventListener('click', (event) => {
            const elementClicked = event.target;
            if (elementClicked.classList.contains('img')) {
                this.openModal();
                this.previewSelectedImage(elementClicked);
                this.previewModalImagesGrid(elementClicked);
            } 
        });

        this.modalCloseButton.addEventListener('click', () => {
            this.closeModal();
        });
    }

    openModal() {
        this.modal.classList.add('open-modal');
        this.addEventHandlerForModalOpen();
    }

    closeModal() {
        this.modal.classList.remove('open-modal');
    }

    previewSelectedImage(selectedImage) {
        this.modalMainImage.src = selectedImage.src;
        this.modalImageName.innerText = selectedImage.title;
    }

    previewModalImagesGrid(selectedImage) {
        let tempElement = '';
        this.images.forEach((img) => {
            tempElement += `
            <img 
                class="modal-img ${selectedImage.dataset.id === img.dataset.id ? 'active' : ''}" 
                src="${img.src}" 
                data-id="${img.dataset.id}" 
                alt="${img.alt}" 
                title="${img.title}"
            />`;
        });

        this.modalImagesGrid.innerHTML = '';
        this.modalImagesGrid.innerHTML = tempElement;
    }

    addEventHandlerForModalOpen() {
        this.nextButton.addEventListener('click', () => {
            this.next();
        });

        this.prevButton.addEventListener('click', () => {
            this.prev();
        });

        this.modalImagesGridContainer.addEventListener('click', (event) => {
            this.chooseImage(event);
        })
    }

    next() {
        const itemActive = this.modalImagesGrid.querySelector('.active');

        // if (itemActive === this.modalImagesGrid.lastElementChild) {
        //     const BEGINSCROLLPOSITION = 0;
        //     this._scrollTheImageGridContainer(BEGINSCROLLPOSITION);
        // } else {
        //     let itemWidth = itemActive.getBoundingClientRect().width;
        //     this._scrollTheImageGridContainer(itemWidth);
        // }

        const nextItemElement = itemActive.nextElementSibling || this.modalImagesGrid.firstElementChild;
        itemActive.classList.remove('active');
        nextItemElement.classList.add('active');


        this.previewSelectedImage(nextItemElement);
    }

    prev() {
        const itemActive = this.modalImagesGrid.querySelector('.active');
        const prevItemElement = itemActive.previousElementSibling || this.modalImagesGrid.lastElementChild;
        itemActive.classList.remove('active');
        prevItemElement.classList.add('active');

        this.previewSelectedImage(prevItemElement);
    }

    chooseImage(event) {
        const imageModalClicked = event.target.classList.contains('modal-img');

        if (imageModalClicked) {
            const itemActive = this.modalImagesGrid.querySelector('.active');
            itemActive.classList.remove('active');

            const imageSelected = event.target;
            imageSelected.classList.add('active');
            this.previewSelectedImage(imageSelected);
        }
    }

    /* ketika button next/prev ditekan, akan di lakukan scrolling agar item active tetap terlihat*/
    // belum clear
    _scrollTheImageGridContainer(scrollWidth) {
        let x = this.modalImagesGridContainer.scrollLeft += scrollWidth;
    }
}

const galleryContainerIndonesia = document.querySelector('.indonesia-img-container');
const galleryContainerJapan = document.querySelector('.japan-img-container');
const modal = document.querySelector('.modal');

const gallery1 = new Gallery(galleryContainerIndonesia, modal);

const gallery2 = new Gallery(galleryContainerJapan, modal);

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.preloader-container').classList.add('hide-preloader');
});