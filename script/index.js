import { initialCards, errorMessages } from './const.js';
import CardList from './cardList.js'


// Переменные
const placesList = document.querySelector('.places-list');

const popup = document.querySelector('.popup');
const popupEdit = document.querySelector('#popup-edit');
const userInfoButton = document.querySelector('.user-info__button');
const popupClosed = document.querySelector('.popup__close');
const user = document.querySelector('.popup__input_type_user-name');
const info = document.querySelector('.popup__input_type_about');
const userInfoEdit = document.querySelector('.user-info__edit');
const popupClosedEdit = document.querySelector('.popup__close_edit');
const form = document.querySelector('#new');
const formData = document.querySelector('#data');
const popupImage = document.querySelector('#popup-image');
const popupImageOpen = document.querySelector('.popup__image-open');
const popupCloseImage = document.querySelector('.popup__close_image');
const button = document.querySelector('.popup__button');
const buttonCloseEdit = document.querySelector('.popup__close_edit');
const buttonCloseForm = document.querySelector('.popup__close');
const job = document.querySelector('.user-info__job');
const profileName = document.querySelector('.user-info__name');


const cardList = new CardList(placesList, initialCards)
cardList.render()


// открытие попапа
function togglePopup(elem) {
  elem.classList.toggle('popup_is-opened');
}
// Открытие-закртытие формы
/* REVIEW. Можно лучше. Подумайте, нужна ли функция openCloseForm. На первый взгляд кажется, что во всех случаях достаточно одной функции
togglePopup(popup). */
function openCloseForm(event) {
  if (event.target.classList.contains('user-info__button')) {
    togglePopup(popup);
  } else if (event.target.classList.contains('popup__close')) {

    togglePopup(popup);
  }
}

// Создание новой карточки
function newCard(event) {
  event.preventDefault();
  const name = form.elements.name;
  const link = form.elements.link;

  const card = addCards(name.value, link.value);

  placesList.appendChild(card);

  form.reset();
  button.setAttribute('disabled', true);
  button.classList.add(`popup__button_invalid`);
  button.classList.remove(`popup__button_valid`);
  togglePopup(popup);

}

// Слушатели

userInfoButton.addEventListener('click', openCloseForm);
popupClosed.addEventListener('click', openCloseForm);
form.addEventListener('submit', newCard);






//7спринт
//удаление ошибок
function deleteError(form) {
  const [...errors] = form.querySelectorAll(".error");
  console.log(errors);
  errors.forEach(function(item){
    item.textContent = '';
  });
}
//popup Edit
function openCloseFormEdit(event) {
  if (event.target.classList.contains('user-info__edit')) {
    togglePopup(popupEdit);
  } else if (event.target.classList.contains('popup__close_edit')) {

    togglePopup(popupEdit);
  }
}
document.getElementById('user-name').value = profileName.textContent;
document.getElementById('about').value = job.textContent;
//изменение имени и О себе
function userEditName(event) {
  event.preventDefault();
  document.querySelector('.user-info__name').textContent = user.value;
  document.querySelector('.user-info__job').textContent = info.value;

  togglePopup(popupEdit);
}

//открытие картинки на весь экран - 3 задание
function openImage(event) {
  if (event.target.classList.contains('place-card__image')) {
    // togglePopup(popupImage);
    popupImageOpen.src = event.target.style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/)[1];
    togglePopup(popupImage);
  }
}
function closePopupImage() {
  popupImage.classList.remove('popup_is-opened');
}

// 4, 5, 6 задание

function isValidate(inputElement){  /**Функция проверки поля на ошибки, возвращает истину если поле валидно или ложь в противном случае, устанавливает кастомное сообщение об ошибке*/
  inputElement.setCustomValidity(""); //устанавливаем свойсво validity.customError в false

  // если на инпуте есть атрибут required, поле validity.valueMissing будет true / false (заполнено)
  if (inputElement.validity.valueMissing) {
    // текст ошибки записываем в inputElem.validationMessage с помощью input.setCustomValidity()
    inputElement.setCustomValidity(errorMessages.empty);
    return false
  }
  // если на инпуте есть атрибут minlength, поле validity.tooShort будет true / false (достигнута мин. длина)
  if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
    inputElement.setCustomValidity('Должно быть от 2 до 30 символов');
    return false
  }
   // если на инпуте есть атрибут type, поле validity.typeMismatch будет true / false (сопадение типа)
   if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
    inputElement.setCustomValidity('Здесь должна быть ссылка');
    return false
  }

  return inputElement.checkValidity();
}

/**Функция добавления/удаления ошибки с инпута, возвращает true если поле валидно, false в противном случае*/
function isFieldValid(inputElement) {
  console.log(inputElement.validity);
  const errorElem = inputElement.parentNode.querySelector(`#${inputElement.id}-error`);
  const valid = isValidate(inputElement); // устанавливаем инпуту кастомные ошибки, если они есть.
  errorElem.textContent = inputElement.validationMessage;
  return valid;
}
/**Функция проверки формы на валидность, возвращает true если форма валидна   */
function isFormValid(form) { //validateForm
  const inputs = [...form.elements];

  let valid = true;

  inputs.forEach((input) => {
    if (input.type !== 'submit' && input.type !== 'button') {
      if (!isFieldValid(input)) valid = false;
    }
  });

  return valid;
}
function setSubmitButtonState(button, state) {
  if (state) {
      button.removeAttribute('disabled');
      button.classList.add(`popup__button_valid`);
      button.classList.remove(`popup__button_invalid`);
  } else {
      button.setAttribute('disabled', true);
      button.classList.add(`popup__button_invalid`);
      button.classList.remove(`popup__button_valid`);
  }
}

/**Фунция слушатесь события на input */
function handlerInputForm(evt){
  const submit = evt.currentTarget.querySelector('.button');
  const [...inputs] = evt.currentTarget.elements; // превращаем итератор(итерируемый объект) в массив

  isFieldValid(evt.target); // проверяем поле на валидность и выводим ошибку если не валидно.

  if (inputs.every(isValidate)) { // если каждый инпут формы вернул true, то включаем кнопку в противном случае выключаем
      setSubmitButtonState(submit, true);
  } else {
    setSubmitButtonState(submit, false);
  }
}

// Слушатели
buttonCloseEdit.addEventListener('click', () => deleteError(popupEdit));
buttonCloseForm.addEventListener('click', () => deleteError(popup));
form.addEventListener('input', handlerInputForm, true);
formData.addEventListener('input', handlerInputForm, true);

userInfoEdit.addEventListener('click', openCloseFormEdit);
popupClosedEdit.addEventListener('click', openCloseFormEdit);
formData.addEventListener('submit', userEditName);

placesList.addEventListener('click', openImage);
popupCloseImage.addEventListener('click', closePopupImage)



/*REVIEW по заданию 7. Резюме.

Неплохая работа, но не выполнены  некоторые обязательные  требования задания 7.

Что нужно сделать прежде всего.

1. + Не сделан перенос информации о профиле из элементов страницы, хранящих эту информацию, в поля формы профиля при первом открытии формы
после загрузки страницы.
Информация со страницы обязательно должна присутствовать на форме всегда при её открытии, независимо который раз в форму входят и как из
формы вышли - по сабмиту, или по ESC.
Поэтому нужно делать перенос информации в поля формы в слушателе открытия этой формы.
Так же надо обязательно учесть и сделать: поскольку на форме при открытии всегда должна находиться валидная информация, в слушателе открытия этой формы
также надо обязательно производить удаление сообщений об ошибках, которые могут остаться от предыдущего неправильного ввода и выхода из формы по крестику,
делать кнопку сабмита активной и черного цвета.
Это можно будет сделать с помощью вызовов функции валидации формыы. Всё это будет проверяться при следующей проверке.
Протестируйте сами работу формы профиля во всех случаях.

2. + При повторном входе в форму карточки после сабмита, кнопка сабмита активна и чёрного цвета, тогда как при входе в форму карточки она должна
быть неактивна, так как форма очищена (смотрите "Снимок экрана в 2020-05-18 22-42-52.png" в корне Вашего проекта). Исправьте это.

Обе формы дожны валидироваться при событиях input, и, при невалидности форм при этих событиях, сабмит вообще не должен иметь возможности происходить
(кнопка сабмита должна оставаться неактивной). Лучше задать формам атрибуты novalidate, чтобы не происходила встроенная валидация форм и поля не
обводились красной рамкой.

Протестируйте сами работу обеих формы и сделайте их валидацию, как описано в задании, и там же показано на видео.

3. + Надо добавление карточки к контейнеру всех карточек делать при рендере карточек и при создании новой карточки из формы
(подробности в коде addCards).

Что можно лучше.

1. + В стилевых правилах написания js-кода требуется, чтобы поиск DOM-элементов во всём проекте
осуществлялся одним способом, например только с помощью querySelector.

2. + Лучше вместо цикла for  использовать forEach.

3. Нужно подумать, нужна ли функция openCloseForm.

4. + Не нужно задавать переменным, или параметрам, имена input, submit. Это может ввести в заблуждение сопровождающего проект.
Надо inputElement, submitElement.


___________________________________________________________________________________________________________________________________________

REVIEW2 по заданию 7. Резюме2.
Критические ошибки исправлены. Почти все рекомендации выполнены.

Вы делаете свою схему переноса информации на форму со страницы. Эта схема идёт вразрез с формулировкой задания. По заданию требуется, чтобы информация
со страницы всегда присутствовала на форме при открытии формы, независимо от того, что делали с информацией при вводе в предыдущем сеансе работы с формой
и как  из формы выходили (по крестику или сабмиту). Так показано и на видео в брифе.

Работа принимается.

Желаю успехов в дальнейшем обучении!

*/