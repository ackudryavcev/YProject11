let url;
const rootDoc = document.querySelector('.root');
const FormEdit = document.forms.edit;
const FormNew = document.forms.new;
const FormAvatar = document.forms.avatar;
if (NODE_ENV === 'production') {
  url = 'https://praktikum.tk';
} else {
  url = 'http://praktikum.tk';
}
import {newCard} from './blocks/place-card/place-card'
import {Api} from './blocks/api/api'
import {Popup, editProfile,editAvatar} from './blocks/popup/popup'
import {validate,validateButton} from './blocks/popup/__form/form'
// запрос на карточки
const api = new Api({
  baseUrl: `${url}/cohort1/cards`,
  headers: {
    authorization: '4cd1af71-d8c1-4879-9c1f-536369240472'
  }
});
// отрисовываем карточки
api.getInitialCards();
// загрузка профиля
const apiProfile = new Api({
  baseUrl: `${url}/cohort1/users/me`,
  headers: {
    authorization: '4cd1af71-d8c1-4879-9c1f-536369240472'
  }
});
apiProfile.getLoadProfile();
// Слушатель страницы
rootDoc.addEventListener('click', function (event) {
  const popup = new Popup(document.querySelector('.popup-add'));
  const popupEdit = new Popup(document.querySelector('.popup-edit'), FormEdit.elements.name, FormEdit.elements.about);
  const popupImage = new Popup(document.querySelector('.popup-img'), '', '', event.target.style.backgroundImage);
  const popupAvatar = new Popup(document.querySelector('.popup-avatar'));
  // Открыть окно добавления карточки
  if (event.target.classList.contains('user-info__button')) {
    popup.open();
  }
  // Закрыть окно добавления карточки
  if (event.target.classList.contains('popup__close')) {
    popup.close();
  }
  //  Открыть окно Редактировать профиль
  if (event.target.classList.contains('user-info__button-edit')) {
    popupEdit.open();
  }
  //  Закрыть окно редактировать профиль
  if (event.target.classList.contains('popup__close-edit')) {
    popupEdit.close();
  }
  // Открыть окно редактировать аватар
  if (event.target.classList.contains('user-info__photo')) {
    popupAvatar.open();
  }
  // Закрыть окно редактировать аватар
  if (event.target.classList.contains('popup__close-avatar')) {
    popupAvatar.close();
  }
  // Клик по картинке - увеличиваем картинку
  if (event.target.classList.contains('place-card__image')) {
    popupImage.open();
  }
  // Закрываем увеличенную картинку
  if (event.target.classList.contains('popup__close-image')) {
    popupImage.close();
  }
});
// Добавляем карточку
document.forms.new.addEventListener('submit', newCard);
// Редактируем профиль
document.forms.edit.addEventListener('submit', editProfile);
// Меняем аватар
document.forms.avatar.addEventListener('submit', editAvatar);
// Валидация форм
// Форма редактировать профиль
FormEdit.addEventListener('input', function () {
  const ButtonEdit = FormEdit.elements.button;
  const Name = FormEdit.elements.name;
  const About = FormEdit.elements.about;
  const NameSpan = document.querySelector(".popup__edit_error");
  const AboutSpan = document.querySelector(".popup__about_error");
  validate(Name, NameSpan);
  validate(About, AboutSpan);
  validateButton(Name, About, ButtonEdit);
});
// Форма добавления карточки
FormNew.addEventListener('input', function () {
  const ButtonEdit = FormNew.elements.button;
  const Name = FormNew.elements.name;
  const Link = FormNew.elements.link;
  const NameSpan = document.querySelector(".popup__add_error");
  const LinkSpan = document.querySelector(".popup__link_error");
  validate(Name, NameSpan);
  validate(Link, LinkSpan);
  validateButton(Name, Link, ButtonEdit);
});
// Форма добавления карточки
FormAvatar.addEventListener('input', function () {
  const ButtonEdit = FormAvatar.elements.button;
  const Link = FormAvatar.elements.link;
  const LinkSpan = document.querySelector(".popup__link_error_avatar");
  validate(Link, LinkSpan);
  validateButton(Link, Link, ButtonEdit);
});
import "./style.css";
