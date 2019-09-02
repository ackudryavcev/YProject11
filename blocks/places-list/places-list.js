import {Card} from '../place-card/place-card'
class CardList {
    constructor(container, cards) {
      this.container = container;
      this.cards = cards;
      this.render();
    }
    // Добавление карточек
    addCard(imgSrc, cardName, numberLikes, idCard, isLike) {
      const { cardElement } = new Card(imgSrc, cardName, numberLikes, idCard, isLike);
      this.container.appendChild(cardElement);
    }
    // Прорисовка карточек на странице
    render() {
      for (let i = 0; i < this.cards.length; i++) {
        let isLike = this.cards[i].likes.find(like => like._id === "fab22160e266040d464bab57");
        if (isLike) { isLike = true } else { isLike = false }
        this.addCard(this.cards[i].link, this.cards[i].name, this.cards[i].likes.length, this.cards[i]._id, isLike);
      }
    }
  }
  export {CardList};  