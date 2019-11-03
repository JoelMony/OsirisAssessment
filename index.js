/**
 * iniAjax
 *  - Calls the random user API and set the dom values.
 *  @returns void.
 */
let initAjax = function () {
  $.ajax({
    url: 'https://randomuser.me/api/',
    dataType: 'json',
    success: function (data) {
      var users = data.results[0];
  
      // Get Random User Name
      var user_title = $('.u-title');
      user_title.attr({
        "user-message": "My name is",
        "user-info": users.name.first + " " + users.name.last
      })
      //Get Random User Email address
      var user_email = $('.u-email');
      user_email.attr({
        "user-message": "My email address is",
        "user-info": users.email
      })
      //Get Random User address address
      var user_address = $('.u-address');
      user_address.attr({
        "user-message": "My address is",
        "user-info": users.location.street.number + " " + users.location.street.name
      })
      //Get Random User birthday
      var user_birthday = $('.u-birthday');
      user_birthday.attr({
        "user-message": "My birthday is",
        "user-info": formatDate(users.dob.date, {
          weekday: undefined,
          month: "numeric",
          hour: undefined,
          minute: undefined,
          timeZoneName: undefined,
        })
      })
      //Get Random User phone number
      var user_cell = $('.u-cell-n');
      user_cell.attr({
        "user-message": "My phone number is",
        "user-info": users.cell
      })
      //Get Random User password
      var user_pwd = $('.u-pwd');
      user_pwd.attr({
        "user-message": "My password is",
        "user-info": users.login.password
      })
      
      //Get Random user image
      var user_image = $('<img/>');
      user_image.attr('src', users.picture.large);
      $('.user-top-info-img').prepend(user_image);
      
      // Bind mouse over event.
      $(document).on('mouseover', '.user-details li', function () {
        $('.user-details li').removeClass('selected');
        $(this).addClass('selected');
        initTab($(this));
      });

      // Init first tab.
      initTab($('.user-details li.u-title'));
    }
  });
}

/**
 * initTab
 *  - Takes a dom element and init the info values.
 * @param DomElement elem 
 * @returns void.
 */
let initTab = function (elem) {
  var returned_text = elem.attr("user-info");
  var user_greeting = elem.attr("user-message");
  $('.user-top-info-intro').text(user_greeting);
  $('.user-top-info-details').text(returned_text);
}

/**
 * formatDate.
 * 
 * @param Date date 
 * @param Object params 
 * 
 * @returns Date
 */
let formatDate = function ( date, params ) {
  var options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
      timeZoneName: "short",
  };

  if( params ) {
      options = Object.assign( options, params );
  }

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
  return new Date( date ).toLocaleString( 'en-US', options );
}

$(document).ready(function(){
  initAjax();
});
