export class ImageModel extends Image {
    constructor(categorie, fichier, legende, width, height) {
        super(width, height)
        this.categorie = categorie
        this.fichier = fichier
        this.legende = legende
    }
}