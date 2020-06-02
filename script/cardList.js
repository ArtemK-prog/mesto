import Card from './card.js'

export default class CardList {
    constructor(container, listCards) {
        this.container = container
        this.listCards = listCards
    }

    addCard = (name, link) => {
        const card = new Card(name, link)
        this.container.appendChild(card.createCard())
    }

    render = () => {
        this.listCards.forEach(item => {
            this.addCard(item.name, item.link)
        });
    }
}