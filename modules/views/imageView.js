import {ImageModel} from "../models/imageModel.js"
import {state} from "../../main.js"

const path = "modules/data/galeries/"

export function getImagesList(data) {
    return new Promise((resolve, reject) => {
    console.log(data)
    const imagesList = []
    const imagesListNodes = data.getElementsByTagName('image')

    for (let node of imagesListNodes) {
        const fichier = node.getElementsByTagName("fichier")[0].firstChild.nodeValue
        const legende = node.getElementsByTagName("legende")[0].firstChild.nodeValue
        const categorie = node.getAttribute("categorie")

        const imageObj = {
            fichier,
            legende,
            categorie
        }
        imagesList.push(imageObj)
    }
    resolve(imagesList)
})
}

export function getImages(imagesList) {
    return new Promise((resolve, reject) => {

    const images = imagesList.map(image => new ImageModel(image.categorie, image.fichier, image.legende, 800, 600))
    state.images = images

    resolve(images)
})
}

export function renderImages(images, currentIndex) {
    if (document.querySelector('img')) {
        document.getElementById('container').removeChild(document.querySelector('img'))
    }

    const image = images[currentIndex]

    const imageElement = document.createElement('img')
    imageElement.src = `${path}${image.categorie}/big/${image.fichier}`
    document.getElementById('container').appendChild(imageElement)

    return images
}
