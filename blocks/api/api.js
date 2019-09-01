import {CardList} from '../places-list/places-list'
import {loading} from '../popup/__form/form'
let cardlist;
// класс запросов
class Api {
    constructor(request) {
      this.headers = request.headers;
      this.baseUrl = request.baseUrl;
      this.method = request.method;
      this.body = request.body;
    }
    // подгрузка и прорисовка карточек
    getInitialCards() {
      fetch(this.baseUrl, {
        headers: this.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          cardlist = new CardList(document.querySelector('.places-list'), result);
        })
        .catch((err) => {
          console.log(`ошибка - ${err}`);
        });
      /* Отлично, здесь все выполняется корректно.
      *
      * */
    }
    // загрузка Профиля
    getLoadProfile() {
      const name = document.querySelector('.user-info__name');
      const about = document.querySelector('.user-info__job');
      const image = document.querySelector('.user-info__photo');
      fetch(this.baseUrl, {
        headers: this.headers
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          name.textContent = result.name;
          about.textContent = result.about;
          image.style.backgroundImage = `url(${result.avatar})`;
        })
        .catch((err) => {
          console.log(`ошибка - ${err}`);
        });
    }
    // отправка данных - карточка и профиль
    sendDataCard(form, button) {
      fetch(this.baseUrl, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body)
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(result => {
          cardlist.addCard(result.link, result.name, result.likes.length, result._id);
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          form.reset();
          button.classList.remove('popup__button-active');
          const popup = new Popup(document.querySelector('.popup-add'));
          popup.close();
          loading(button, "+");
        });
    }
    sendDataProfile(form, button, popupEdit) {
      const name = document.querySelector('.user-info__name');
      const about = document.querySelector('.user-info__job');
      fetch(this.baseUrl, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body)
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          name.textContent = result.name;
          about.textContent = result.about;
  
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          form.reset();
          popupEdit.close();
          loading(button, "Сохранить");
        });
    }
    sendDataAvatar(form, button, popupAvatar) {
      const image = document.querySelector('.user-info__photo');
      fetch(this.baseUrl, {
        method: this.method,
        headers: this.headers,
        body: JSON.stringify(this.body)
      })
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          image.style.backgroundImage = `url(${result.avatar})`;
        })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          form.reset();
          popupAvatar.close();
          loading(button, "Сохранить");
        });
    }
    deleteDataCard(card) {
      fetch(this.baseUrl, {
        method: this.method,
        headers: this.headers
      })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
          cardlist.container.removeChild(card);
        });
    }
    // лайки
    likeData(span) {
      fetch(this.baseUrl, {
        method: this.method,
        headers: this.headers
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
      }).then((result) => {
        span.textContent = result.likes.length;
      })
        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
  
    }
  }
  export {Api};  