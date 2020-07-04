$('.nav-link')[0].classList.add('active');

$('.nav-link').on('click', function() {
  $('.nav-link').removeClass('active');
  $(this).addClass('active');
});

function setModule(name) {
  $('.nav-item').removeClass('active');
  $('section').hide();

  $(`#${name}`).show();
  $(`#${name}Tab`).addClass('active');
}

setModule('overview');