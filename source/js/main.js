'use strict';

var modal = document.querySelector('.modal');
var modalOverlay = document.querySelector('.modal__overlay');
var modalActivator = document.querySelector('.contacts-menu__button');
var closeModal = document.querySelector('.modal__close-button');
var form = modal.querySelector('.modal__form');
var username = form.querySelector('#modal-username');
var phone = form.querySelector('#modal-phonenumber');
var letter = form.querySelector('#modal-question');
var isStorageSupport = true;
var storageUsername = '';
var storagePhone = '';
var storageLetter = '';

try {
  storageUsername = localStorage.getItem('username');
  storagePhone = localStorage.getItem('phone');
  storageLetter = localStorage.getItem('letter');
} catch (err) {
  isStorageSupport = false;
}

modalActivator.addEventListener('click', function (evt) {
  evt.preventDefault();
  modal.classList.add('modal--active');
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

closeModal.addEventListener('click', function (evt) {
  evt.preventDefault();
  modal.classList.remove('modal--active');
});

modalOverlay.addEventListener('click', function (evt) {
  evt.preventDefault();
  if (modal.classList.contains('modal--active')) {
    modal.classList.remove('modal--active');
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modal.classList.contains('modal--active')) {
      modal.classList.remove('modal--active');
    }
  }
});

form.addEventListener('submit', function () {
  if (isStorageSupport) {
    localStorage.setItem('username', username.value);
    localStorage.setItem('phone', phone.value);
    localStorage.setItem('letter', letter.value);
  }
});
