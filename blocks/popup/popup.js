import {validate, validateButton, loading} from './__form/form'
import {Api} from '../api/api'
class Popup {
    constructor(container, name, about, image, avatar) {
      this.container = container;
      this.name = name;
      this.about = about;
      this.image = image;
      this.avatar = avatar;
    }
    // Открыть Попап окно
    open() {
      this.container.classList.toggle('popup_is-opened');
      if (this.name && this.about) {
        this.name.value = document.querySelector('.user-info__name').textContent;
        this.about.value = document.querySelector('.user-info__job').textContent;
        validate(this.name, document.querySelector(".popup__edit_error"));
        validate(this.about, document.querySelector(".popup__about_error"));
      }
      else if (this.image) {
        document.querySelector('.popup__image').style.backgroundImage = this.image;
      }
      else if (this.avatar) {
        validate(FormAvatar.elements.link, document.querySelector(".popup__link_error_avatar"));
        validateButton(FormAvatar.elements.link, FormAvatar.elements.link, FormAvatar.elements.button);
      }
      else {
        validate(FormNew.elements.name, document.querySelector(".popup__add_error"));
        validate(FormNew.elements.link, document.querySelector(".popup__link_error"));
        validateButton(FormNew.elements.name, FormNew.elements.link, FormNew.elements.button);
      }
    }
    // Закрыть попап окно
    close() {
      this.container.classList.remove('popup_is-opened');
    }
  }
  // Редактирование профиля
function editProfile(event) {
    const popupEdit = new Popup(document.querySelector('.popup-edit'), FormEdit.elements.name, FormEdit.elements.about);
    const form = document.forms.edit;
    const button = form.elements.button;
    event.preventDefault();
    loading(button, "Сохранить");
    const apiProfile = new Api({
      baseUrl: `${url}/cohort1/users/me`,
      headers: {
        authorization: '4cd1af71-d8c1-4879-9c1f-536369240472',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: {
        name: form.elements.name.value,
        about: form.elements.about.value
      }
    });
    apiProfile.sendDataProfile(form, button, popupEdit);
  }
  // Редактирование аватара
function editAvatar(event) {
    const popupAvatar = new Popup(document.querySelector('.popup-avatar'), '', '', '', FormAvatar.elements.link);
    const form = document.forms.avatar;
    const button = form.elements.button;
    console.log(form.elements.link.value);
    event.preventDefault();
    loading(button, "Сохранить");
    const apiAvatar = new Api({
      baseUrl: `${url}/cohort1/users/me/avatar`,
      headers: {
        authorization: '4cd1af71-d8c1-4879-9c1f-536369240472',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: {
        avatar: form.elements.link.value
      }
    });
    apiAvatar.sendDataAvatar(form, button, popupAvatar);
  
  }
  export {Popup, editProfile, editAvatar};  