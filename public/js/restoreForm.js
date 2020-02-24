/* eslint-disable no-restricted-globals */

/* eslint-disable no-undef */
function addMessageResult(title, description, image) {
  $('#contact_form')
    .html('<div id=\'message\'></div>');
  $('#message')
    .html(`<h2>${title}!</h2>`)
    .append(`<p>${description}</p>`)
    .hide()
    .fadeIn(1500, () => {
      $('#message')
        .append(`<img id='checkmark' src='${image}' />`);
    });
}

$(document)
  .ready(() => {
    $(() => {
      $('.error')
        .hide();
      $('#submitRestore')
        .click(() => {
          const urlParams = new URLSearchParams(location.search);
          const id = urlParams.get('token');
          const params = `?token=${id}`;
          const formData = {
            password: $('input[name=password]')
              .val(),
            confirmPassword: $('input[name=confirmPassword]')
              .val(),
          };

          // Validation FORM//////////////////////////////////////////
          $('.error')
            .hide();
          const password = $('input#password')
            .val();
          if (password === '') {
            $('label#password_error')
              .show();
            $('input#password')
              .focus();
            return false;
          }
          const confirmPassword = $('input#confirmPassword')
            .val();
          if (confirmPassword === '') {
            $('label#passwordConf_error')
              .show();
            $('input#confirmPassword')
              .focus();
            return false;
          }
          // ///////////////////////////////////////////////////
          return false;
        });
    });
  });
