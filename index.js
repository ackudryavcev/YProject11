import {url, rootDoc, FormEdit, FormAvatar, FormNew, key} from "./blocks/configuration/configuration"
import {newCard} from './blocks/place-card/place-card'
import {Api} from './blocks/api/api'
import {editProfile,editAvatar} from './blocks/popup/popup'
import {listenerForm} from './blocks/popup/__form/form'
import {listenerPage} from './blocks/listener/listener'
// запрос на карточки
const api = new Api({
  baseUrl: `${url}/cohort1/cards`,
  headers: {
    authorization: key
  }
});
// отрисовываем карточки
api.getInitialCards();
// загрузка профиля
const apiProfile = new Api({
  baseUrl: `${url}/cohort1/users/me`,
  headers: {
    authorization: key
  }
});
apiProfile.getLoadProfile();
// Слушатель страницы
rootDoc.addEventListener('click', listenerPage);
// Добавляем карточку
document.forms.new.addEventListener('submit', newCard);
// Редактируем профиль
document.forms.edit.addEventListener('submit', editProfile);
// Меняем аватар
document.forms.avatar.addEventListener('submit', editAvatar);
// Валидация форм
// Форма редактировать профиль
FormEdit.addEventListener('input', function(){listenerForm (FormEdit.elements.button, FormEdit.elements.name, FormEdit.elements.about, document.querySelector(".popup__edit_error"), document.querySelector(".popup__about_error") )
});
// Форма добавления карточки
FormNew.addEventListener('input', function(){listenerForm(FormNew.elements.button, FormNew.elements.name, FormNew.elements.link, document.querySelector(".popup__add_error"), document.querySelector(".popup__link_error"))
});
// Форма добавления карточки
FormAvatar.addEventListener('input', function(){listenerForm(FormAvatar.elements.button, FormAvatar.elements.link, 'no', document.querySelector(".popup__link_error_avatar"))
});
import "./style.css";
