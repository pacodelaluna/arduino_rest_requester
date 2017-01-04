$(document).ready(function() {
  // 7 LEDS : checkboxes - DIGITAL
  // 1 motor : 2 sliders, speed & acc - DIGITAL
  // +

  // /led/1/0_1
  // /stepper/acc/VAL
  // /stepper/speed/VAL
  // /stepper/goto/VAL

  var textFieldSource   = $("#text-field-template").html();
  var textFieldTemplate = Handlebars.compile(textFieldSource);

  $('input[type=text-field]').each(function(index, field) {
    $(field).replaceWith(textFieldTemplate({
      field_rid: $(this).attr('rid'),
      field_class: $(this).attr('class'),
      field_value: $(this).attr('value'),
      field_name: $(this).attr('name')
    }));
  });

  var switchFieldSource   = $("#switch-field-template").html();
  var switchFieldTemplate = Handlebars.compile(switchFieldSource);

  $('input[type=switch-field]').each(function(index, field) {
    $(field).replaceWith(switchFieldTemplate({
      field_rid: $(this).attr('rid'),
      field_name: $(this).attr('name')
    }));
  });

  var sliderFieldSource   = $("#slider-field-template").html();
  var sliderFieldTemplate = Handlebars.compile(sliderFieldSource);

  $('input[type=slider-field]').each(function(index, field) {
    $(field).replaceWith(sliderFieldTemplate({
      field_rid: $(this).attr('rid'),
      field_name: $(this).attr('name'),
      field_action: $(this).attr('action'),
      field_value: $(this).attr('value'),
      slider_min: $(this).attr('slider_min'),
      slider_max: $(this).attr('slider_max')
    }));
  });

  var actionFieldSource   = $("#action-field-template").html();
  var actionFieldTemplate = Handlebars.compile(actionFieldSource);

  $('input[type=action-field]').each(function(index, field) {
    $(field).replaceWith(actionFieldTemplate({
      field_rid: $(this).attr('rid'),
      field_name: $(this).attr('name')
    }));
  });

  console.log('=== Loaded!');

  // Initialize Slider
  $('.slider').slider({
    min: $(this).data('slider-min'),
    max: $(this).data('slider-max'),

    create: function(event, ui) {
      $(this).parent().parent().find('.slider-value').html(0);
    },

    slide: function(event, ui) {
      $(this).parent().parent().find('.slider-value').html(ui.value);
    },

    change: function(event, ui) {
      $(this).parent().parent().find('.slider-value').html(ui.value);
      // Sending request
      sendRequest(this, $(this).attr('rid').replace(/\-/g, '/'), $(this).slider("value"));
    }
  });

  $('.slider-reset').click(function(e) {
    e.preventDefault();

    $(this).parent().parent().find('.slider').slider("value", 0);
  });

  $('.btn-toggle').click(function(e) {
    e.preventDefault();

    $(this).find('.btn').toggleClass('active');

    if ($(this).find('.btn-primary').length > 0) {
      $(this).find('.btn').toggleClass('btn-primary');
    }
    if ($(this).find('.btn-danger').length > 0) {
      $(this).find('.btn').toggleClass('btn-danger');
    }
    if ($(this).find('.btn-success').length > 0) {
      $(this).find('.btn').toggleClass('btn-success');
    }
    if ($(this).find('.btn-info').length > 0) {
      $(this).find('.btn').toggleClass('btn-info');
    }

    $(this).find('.btn').toggleClass('btn-default');

    // Sending request
    sendRequest(this, $(this).attr('rid').replace(/\-/g, '/'), $(this).find('.active').html());
  });


  // Send the request to the endpoint
  $('.action').click(function(e) {
    e.preventDefault();
    // Sending request
    sendRequest(this, $(this).attr('rid'), 'Nan/Nan/Nan');
  });
});

function sendRequest(context, key, value) {
  jQuery.support.cors = true;

  var endpointUrl = $(context).parents('.request-builder').find('.arduino-url').val();

  $('#logger-area').val('\n' + $('#logger-area').val());

  $.ajax({
    type: "GET",
    url: endpointUrl + '/' + key + '/' + value,
    timeout: 5000,
    beforeSend: function(xhr, settings) {
      msg = '== XHR Request Sent: ' + new Date().toLocaleString() + '\n' + settings.type + ' ' + settings.url + '\n';
      console.log(settings);
      $('#logger-area').val(msg + $('#logger-area').val());
    },
    success: function(response) {
      msg = '== Response Success: ' + new Date().toLocaleString() + '\n' + response + '\n';
      console.log(msg);
      $('#logger-area').val(msg + $('#logger-area').val());
    },
    error: function(jqXHR, textStatus, ex) {
      msg = '== Response Error: ' + new Date().toLocaleString() + '\n' + textStatus + " - " + ex + " - " + jqXHR.statusText + '\n';
      console.log(jqXHR);
      console.log(ex);
      $('#logger-area').val(msg + $('#logger-area').val());
    }
  });
}
