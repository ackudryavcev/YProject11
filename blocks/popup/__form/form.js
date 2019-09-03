// Валидация полей формы
function validate(input, span) {
    if (!input.validity.valid) {
      if (input.validity.valueMissing) { span.textContent = "Это обязательное поле" }
      else if (input.validity.typeMismatch) { span.textContent = "Здесь должна быть ссылка" }
      else { span.textContent = "Должно быть от 2 до 30 символов" }
      span.classList.add('popup__error_visible')
    }
    else { span.classList.remove('popup__error_visible') }
  }
  // Делаем кнопку активной/неактивной
  function validateButton(input1, input2, button) {
    if (!input1.validity.valid || !input2.validity.valid) {
      button.classList.remove('popup__button-active');
    }
    else { button.classList.add('popup__button-active'); }
  }
  // Функция процесса загрузки
  function loading(button, text) {
    if (button.textContent == text) {
      button.textContent = "Загрузка..."
    }
    else { button.textContent = text }
  }
  function listenerForm(ButtonEdit, Name, About, NameSpan, AboutSpan){
    validate(Name, NameSpan);
    if (About === 'no') {validateButton(Name, Name, ButtonEdit);
    console.log('hfhhdhdhhdhhdh');
    }
    else{
    validate(About, AboutSpan);
    validateButton(Name, About, ButtonEdit);
  }
  }
  export {validate, validateButton, loading, listenerForm}