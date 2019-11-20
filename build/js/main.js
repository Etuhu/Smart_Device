"use strict";

var body = document.querySelector("body");
var footer = document.querySelector(".page-footer");
var pageFooterEnd = document.querySelector(".page-footer__end");

var modal = document.querySelector(".modal");
var modalOverlay = document.querySelector(".modal__overlay");
var modalActivator = document.querySelector(".contacts-menu__button");
var closeModal = document.querySelector(".modal__close-button");
var form = modal.querySelector(".modal__form");
var username = form.querySelector("#modal-username");
var phone = form.querySelector("#modal-phonenumber");
var letter = form.querySelector("#modal-question");

var isStorageSupport = true;
var storageUsername = "";
var storagePhone = "";
var storageLetter = "";

var navigationList = document.querySelector(".navigation__list");
var navigationToggle = document.querySelector(".navigation__toggle");
var officeContacts = document.querySelector(".office-contacts__text");
var officeContactsToggle = document.querySelector(".office-contacts__toggle");

var feedbackPhonenumber = document.getElementById("feedback-phonenumber");
var modalPhonenumber = document.getElementById("modal-phonenumber");

var phoneMask = 0;
var promoBlockNote = document.querySelector(".promo-block__note");
var pageContent = document.querySelector(".page-content");
var feedbackBlock = document.querySelector(".feedback");
var promoBlockButton = document.querySelector(".promo-block__button");

// Добавляет плавную прокрутку до нужного блока
promoBlockNote.addEventListener("click", function(evt) {
  evt.preventDefault();
  pageContent.scrollIntoView(top);
});

promoBlockButton.addEventListener("click", function(evt) {
  evt.preventDefault();
  feedbackBlock.scrollIntoView(top);
});

// Добавляет маску для поля ввода телефонного номера
phoneMask = IMask(feedbackPhonenumber, {
  mask: "+{7}(000)000-00-00"
});

phoneMask = IMask(modalPhonenumber, {
  mask: "+{7}(000)000-00-00"
});

// Проверяет поддержку localStorage
try {
  storageUsername = localStorage.getItem("username");
  storagePhone = localStorage.getItem("phone");
  storageLetter = localStorage.getItem("letter");
} catch (err) {
  isStorageSupport = false;
}

// Открывает модальное окно
modalActivator.addEventListener("click", function(evt) {
  evt.preventDefault();
  modal.classList.add("modal--active");
  body.classList.add("scroll-hidden");
  username.focus();
  if (storageUsername) {
    username.value = storageUsername;
  }
  if (storagePhone) {
    phone.value = storagePhone;
  }
  if (storageLetter) {
    letter.value = storageLetter;
  }
});

// Закрывает модальное окно
closeModal.addEventListener("click", function(evt) {
  evt.preventDefault();
  modal.classList.remove("modal--active");
  body.classList.remove("scroll-hidden");
});

modalOverlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  if (modal.classList.contains("modal--active")) {
    modal.classList.remove("modal--active");
    body.classList.remove("scroll-hidden");
  }
});

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains("modal--active")) {
      modal.classList.remove("modal--active");
      body.classList.remove("scroll-hidden");
    }
  }
});

form.addEventListener("submit", function() {
  if (isStorageSupport) {
    localStorage.setItem("username", username.value);
    localStorage.setItem("phone", phone.value);
    localStorage.setItem("letter", letter.value);
  }
});

// Запускает рабту аккордеона в футере
navigationToggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  navigationList.classList.toggle("navigation__list--unvisible");
  navigationToggle.classList.toggle("display-toggle--minimized");
  footer.classList.toggle("page-footer--shift");
  navigationToggle.blur();
  if (!officeContacts.classList.contains("office-contacts__text--unvisible")) {
    officeContacts.classList.add("office-contacts__text--unvisible");
    pageFooterEnd.classList.add("page-footer__end--shrink");
  }
  if (!officeContactsToggle.classList.contains("display-toggle--minimized")) {
    officeContactsToggle.classList.add("display-toggle--minimized");
  }
});

officeContactsToggle.addEventListener("click", function(evt) {
  evt.preventDefault();
  officeContacts.classList.toggle("office-contacts__text--unvisible");
  officeContactsToggle.classList.toggle("display-toggle--minimized");
  pageFooterEnd.classList.toggle("page-footer__end--shrink");
  officeContactsToggle.blur();
  if (footer.classList.contains("page-footer--shift")) {
    footer.classList.remove("page-footer--shift");
  }
  if (!navigationList.classList.contains("navigation__list--unvisible")) {
    navigationList.classList.add("navigation__list--unvisible");
  }
  if (!navigationToggle.classList.contains("display-toggle--minimized")) {
    navigationToggle.classList.add("display-toggle--minimized");
  }
});
