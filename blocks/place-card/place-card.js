import {key, url} from "../configuration/configuration"
import {Api} from '../api/api'
import {loading} from '../popup/__form/form'
class Card {
    constructor(imgSrc, cardName, numberLikes, idCard, isLike) {
      this.cardElement = this.createCard(imgSrc, cardName, numberLikes, idCard, isLike);
      this.idCard = idCard;
    }
    createCard(imgSrc, cardName, numberLikes, idCard, isLike) {
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('place-card');
      const imgElement = document.createElement('div');
      imgElement.classList.add('place-card__image');
      imgElement.style = `background-image: url(${imgSrc})`;
      const btnElement = document.createElement('button');
      btnElement.classList.add('place-card__delete-icon');
      imgElement.appendChild(btnElement);
      btnElement.addEventListener('click', () => this.remove.call(cardContainer, idCard));
      const titleElement = document.createElement('div');
      titleElement.classList.add('place-card__description');
      const titleH3Element = document.createElement('h3');
      titleH3Element.classList.add('place-card__name');
      titleH3Element.textContent = cardName;
      titleElement.appendChild(titleH3Element);
      const titleNbrElement = document.createElement('span');
      titleNbrElement.classList.add('place-card__number-likes');
      titleNbrElement.textContent = numberLikes;
      titleElement.appendChild(titleNbrElement);
      const titleBtnElement = document.createElement('button');
      titleBtnElement.classList.add('place-card__like-icon');
      if (isLike) { titleBtnElement.classList.add('place-card__like-icon_liked'); }
      titleElement.appendChild(titleBtnElement);
      titleBtnElement.addEventListener('click', () => this.like.call(titleBtnElement, idCard, titleNbrElement));
      cardContainer.appendChild(imgElement);
      cardContainer.appendChild(titleElement);
      return cardContainer;
    }
    // Лайк карточки
    like(id, span) {
      const apiCard = new Api({
        baseUrl: `${url}/cohort1/cards/like/${id}`,
        headers: {
          authorization: key,
          'Content-Type': 'application/json'
        }
      });
  
      if (!this.classList.contains("place-card__like-icon_liked")) {
        apiCard.method = 'PUT';
        apiCard.likeData(span);
      }
      else {
        apiCard.method = 'DELETE';
        apiCard.likeData(span);
      }
      this.classList.toggle('place-card__like-icon_liked');
    }
    // Удаление карточки
    remove(id) {
      const apiCard = new Api({
        baseUrl: `${url}/cohort1/cards/${id}`,
        headers: {
          authorization: key,
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      });
      if (confirm('Вы действительно хотите удалить эту карточку?')) {
        apiCard.deleteDataCard(this);
      }
    }
  }
  // Создание новой карточки
function newCard(event) {
  console.log('newcard');
    const form = document.forms.new;
    const name = form.elements.name.value;
    const link = form.elements.link.value;
    const button = form.elements.button;
    event.preventDefault();
    if (name && link) {
      loading(button, "+");
      const apiCard = new Api({
        baseUrl: `${url}/cohort1/cards`,
        headers: {
          authorization: key,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: {
          name: form.elements.name.value,
          link: form.elements.link.value
        }
      });
      apiCard.sendDataCard(form, button);
    }
  }
  export {Card,newCard};  