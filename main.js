import { ajaxGet } from "./modules/models/Ajax.js"
import * as imageView from "./modules/views/imageView.js"
import { ImageModel } from "./modules/models/imageModel.js"
import { elements } from "./modules/views/baseView.js"

const uri = "modules/data/galerie_images.xml"
let clickCount = 0
export const state = {}

/** 
 * IMAGE CONTROLLER
 */

function controlImages() {
    state.currentIndex = 0
    ajaxGet(uri)
        .then(data => imageView.getImagesList(data))
        .then(imagesList => imageView.getImages(imagesList))
        .then(images => imageView.renderImages(images, state.currentIndex))
}

function getPrevImage() {
    if (state.currentIndex <= 0) {
        state.currentIndex = state.images.length
    }

    state.currentIndex--
    imageView.renderImages(state.images, state.currentIndex)
}

function getNextImage() {
    if (state.currentIndex >= state.images.length - 1) {
        state.currentIndex = 0
    }

    state.currentIndex++
    imageView.renderImages(state.images, state.currentIndex)
}

function playDiaporama() {
    clickCount++

    const diaporama = () => {
        if (clickCount % 2 === 0) {
            clearInterval(interval)
        } else {
            imageView.renderImages(state.images, state.currentIndex++)
        }
        
        if (state.currentIndex > state.images.length - 1) {
            console.log(state.currentIndex)
            state.currentIndex = 0
        }
    }

    const interval = setInterval(diaporama, 1000)
}

window.addEventListener('load', () => controlImages())
elements.buttonFirst.addEventListener('click', () => imageView.renderImages(state.images, 0))
elements.buttonPrev.addEventListener('click', getPrevImage)
elements.buttonNext.addEventListener('click', getNextImage)
elements.buttonLast.addEventListener('click', () => imageView.renderImages(state.images, state.images.length - 1))
elements.buttonPlay.addEventListener('click', playDiaporama)

