// Check for valid email syntax
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  function closeForm() {
    document.contactform.name.value = '';
    document.contactform.email.value = '';
    document.contactform.message.value = '';
  
    $('.email').removeClass('typing');
    $('.name').removeClass('typing');
    $('.message').removeClass('typing');
    $('.notification').addClass('is-visible');
    $('#notification-text').html("Дякуємо що зв'язались з нами!");
    setTimeout(function() {$('.cd-popup').removeClass('is-visible'); }, 7000);
  }
  
  $(document).ready(function($) {
  
    /* ------------------------- */
    /* Contact Form Interactions */
    /* ------------------------- */
    
    /*setTimeout(function(){
      document.getElementById('loginModal1').style.display = 'none';
    }, 3000);*/


    //close popup when clicking x or off popup
    $('.cd-popup').on('click', function(event) {
      if ($(event.target).is('.cd-popup-close') || $(event.target).is('.cd-popup')) {
        event.preventDefault();
        $(this).removeClass('is-visible');
      }
    });
  
    //close popup when clicking the esc keyboard button
    $(document).keyup(function(event) {
      if (event.which == '27') {
        $('.cd-popup').removeClass('is-visible');
      }
    });
  
    /* ------------------- */
    /* Contact Form Labels */
    /* ------------------- */
    $('#name').keyup(function() {
      $('.name').addClass('typing');
      if ($(this).val().length == 0) {
        $('.name').removeClass('typing');
      }
    });
    $('#email').keyup(function() {
      $('.email').addClass('typing');
      if ($(this).val().length == 0) {
        $('.email').removeClass('typing');
      }
    });
    $('#message').keyup(function() {
      $('.message').addClass('typing');
      if ($(this).val().length == 0) {
        $('.message').removeClass('typing');
      }
    });
  
    /* ----------------- */
    /* Handle submission */
    /* ----------------- */
    $('#contactform').submit(function() {
      var name = $('#name').val();
      var email = $('#email').val();
      var message = $('#message').val();
      var human = $('#human:checked').val();
  
      if (human) {
        if (validateEmail(email)) {
          if (name) {
            if (message) {
  
  // Handle submitting data somewhere
  // For a tutorial on submitting the form to a Google Spreadsheet, see:
  // https://notnaturaltutorials.wordpress.com/2016/03/20/submit-form-to-spreadsheet/
  
  /*
              var googleFormsURL = "https://docs.google.com/forms/d/1dHaFG67d7wwatDtiVNOL98R-FwW1rwdDwdFqqKJggBM3nFB4/formResponse";
              // replace these example entry numbers
              var spreadsheetFields = {
                "entry.212312005": name,
                "entry.1226278897": email,
                "entry.1835345325": message
              }
              $.ajax({
                url: googleFormsURL,
                data: spreadsheetFields,
                type: "POST",
                dataType: "xml",
                statusCode: {
                  0: function() {
  
                  },
                  200: function() {
  
                  }
                }
              });
  */
              
              closeForm();
  
            } else {
              $('#notification-text').html("Будь ласка, введіть повідомлення.");
              $('.notification').addClass('is-visible');
              setTimeout(function() {$('.cd-popup').removeClass('is-visible'); }, 6000);
            }
          } else {
            $('#notification-text').html("Будь ласка, введіть ім'я.");
            $('.notification').addClass('is-visible');
            setTimeout(function() {$('.cd-popup').removeClass('is-visible'); }, 6000);
          }
        } else {
          $('#notification-text').html('Будь ласка, використовуйте дійсну адресу електронної пошти.');
          $('.notification').addClass('is-visible');
          setTimeout(function() {$('.cd-popup').removeClass('is-visible'); }, 6000);
        }
      } else {
        $('#notification-text').html('Доведіть, що ви людина, а не робот.');
        $('.notification').addClass('is-visible');
        setTimeout(function() {$('.cd-popup').removeClass('is-visible'); }, 6000);
      }
  
      return false;
    });
  });