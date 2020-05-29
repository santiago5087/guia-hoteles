$(function () {
  $('[data-toggle="tooltip"]').tooltip()
});
$(function () {
  $('[data-toggle="popover"]').popover()
});
$('.carousel').carousel({
  interval: 2000
});

$('#exampleModal').on('show.bs.modal', function(e) {
  $('#contacto').prop('disabled', true);
  $('#contacto').removeClass('btn-primary');
  $('#contacto').addClass('btn-warning');
  console.log('Se muestra el modal');
  $('#contacto').prop('disabled', true);
});
$('#exampleModal').on('shown.bs.modal', function(e) {
  console.log('Se mostró el modal');
});
$('#exampleModal').on('hide.bs.modal', function(e) {
  $('#contacto').prop('disabled', false);
  $('#contacto').removeClass('btn-warning');
  $('#contacto').addClass('btn-primary');
  console.log('Se cierra el modal');
});
$('#exampleModal').on('hidden.bs.modal', function(e) {
  console.log('Se cerró el modal');
});