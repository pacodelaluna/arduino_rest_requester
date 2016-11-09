$(document).ready(function() {
  var arduinoEndpoint = 'http://192.168.0.11/arduino_wifi/endpoint';

  // 7 LEDS : checkboxes - DIGITAL
  // 1 motor : 2 sliders, speed & acc - DIGITAL
  // +

  // /led/1/0_1
  // /stepper/acc/VAL
  // /stepper/speed/VAL
  // /stepper/goto/VAL

  console.log('=== Loaded!');

  // Initialize Slider
  $('.slider').slider({
    min: -2000,
    max: +2000,

    create: function(event, ui) {
      $(this).parent().parent().find('.slider-value').html(0);
    },

    slide: function(event, ui) {
      $(this).parent().parent().find('.slider-value').html(ui.value);
    },

    change: function(event, ui) {
      $(this).parent().parent().find('.slider-value').html(ui.value);
      // Sending request
      sendRequest($(this).attr('id').replace(/\-/g, '/'), $(this).slider("value"));
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
    sendRequest($(this).attr('id').replace(/\-/g, '/'), $(this).find('.active').html());
  });


  // Send the request to the endpoint
  $('#reload').click(function(e) {
    e.preventDefault();
    // Sending request
    sendRequest('reload', 'true');
  });
});

function sendRequest(key, value) {
  $.ajax({
    type: "GET",
    dataType: "json",
    url: $('#arduino-server-url').val() + '/' + key + '/' + value,
    timeout: 1000,
    beforeSend: function(xhr, settings) {
      console.log(xhr);
    },
    success: function(response) {
      console.log(response);
    },
    error: function(jqXHR, textStatus, ex) {
      console.log(textStatus + "," + ex + "," + jqXHR.responseText);
    }
  });
}
