$('.tabs a, #sidebarExtension h4').on('click', function() {
  $('.tabs a').removeClass('active');
  setModule($(this).attr('id'));
});

function setModule(name) {
  $('.module').hide();
  $(`#${name}Module`).show();
  $(`#${name}`).addClass('active');
}

setModule('overview');