$(document).ready(function() {

  // ---------------------------------------------------------------------------
  // Set the date we're counting down to
  var countDownDate = new Date("Jan 1, 2019 00:00:00").getTime();

  function data() {

    // Get todays date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    // document.getElementById("demo").innerHTML = days + "d " + hours + "h "
    // + minutes + "m " + seconds + "s ";
    $('#day .data').html(days);

    var test = $('#sec .data').html();

    if (test == "--") {
      $('#sec .data').html(seconds);
    }

    $('#sec').addClass('counter_block_active');
    setTimeout(function() {
      $('#sec').removeClass('counter_block_active');
      $('#sec .data').html(seconds);
    }, 300);

    if (seconds == 59) {
      $('#min').addClass('counter_block_active');
      setTimeout(function() {
        $('#min').removeClass('counter_block_active');
        $('#min .data').html(minutes);
      }, 300);
    } else {
      $('#min .data').html(minutes);
    }

    if (minutes == 59) {
      $('#hour').addClass('counter_block_active');
      setTimeout(function() {
        $('#hour').removeClass('counter_block_active');
        $('#hour .data').html(hours);
      }, 300);
    } else {
      $('#hour .data').html(hours);
    }

  }
  data();
  // Update the count down every 1 second
  setInterval(data, 1000);
  // ---------------------------------------------------------------------------


  // ---------------------------------------------------------------------------
  // set variables
  var viewPortWidth;
  var viewPortHeight;
  var viewPort = $(window);
  var mainBlock = $('.main_header');
  var menu = $('.main_menu');

  // change block size function
  function blockResize() {
    viewPortWidth = viewPort.width();
    viewPortHeight = viewPort.height();
    mainBlock.width(viewPortWidth).height(viewPortHeight - 56);
  }

  // run runction after load page
  blockResize();

  // run function after window resize
  $(window).resize(function() {
    blockResize();
  });

  // fix menu on top after scroll
  $(window).scroll(function() {
    var scrollPosition = $(document).scrollTop();
    if (scrollPosition >= (viewPortHeight - 56)) {
      menu.addClass('fixed')
    } else {
      menu.removeClass('fixed')
    }
  });
  // ---------------------------------------------------------------------------

  $('.close_buttom').on('click', function() {
    $('.mobile_menu_items').slideUp();
  });

  $('.mobile_button').on('click', function() {
    $('.mobile_menu_items').slideDown();
  });

  $('.mobile_menu_items').on('click', function() {
    $(this).slideUp();
  });

  // get periodic statistics
  (function worker() {
    $.ajax({
      url: 'https://explorer.win.win/ext/getstats',
      success: function(data) {
        $('#total_wallets_count').html(data.total_wallets_count);
        $('#active_wallets_count').html(data.active_wallets_count);
        $('#money_supply').html(numberWithSpaces(data.money_supply.toFixed()));
        $('#masternode_count').html(data.masternode_count);
        $('#block_count').html(data.block_count);
        $('#dev_wallet_balance').html(numberWithSpaces(data.dev_wallet_balance.toFixed()));
        $('#twins_locked').html(data.twins_locked);
        $('#current_block_time').html(data.average_sec_per_block);
      },
      complete: function() {
        // Schedule the next request when the current one's complete
        setTimeout(worker, 60000);
      }
    });
  })();

  (function($) {
    $.fn.extend({
      rotaterator: function(options) {

        var defaults = {
          fadeSpeed: 2000,
          pauseSpeed: 5000,
          child: null
        };

        var options = $.extend(defaults, options);

        return this.each(function() {
          var o = options;
          var obj = $(this);
          var items = $(obj.children(), obj);
          items.each(function() {
            $(this).hide();
          })
          if (!o.child) {
            var next = $(obj).children(':first');
          } else {
            var next = o.child;
          }
          $(next).fadeIn(o.fadeSpeed, function() {
            $(next).delay(o.pauseSpeed).fadeOut(o.fadeSpeed, function() {
              var next = $(this).next();
              if (next.length == 0) {
                next = $(obj).children(':first');
              }
              $(obj).rotaterator({
                child: next,
                fadeSpeed: o.fadeSpeed,
                pauseSpeed: o.pauseSpeed
              });
            })
          });
        });
      }
    });
  })(jQuery);

  $(document).ready(function() {
    $('#rotate').rotaterator({
      fadeSpeed: 500,
      pauseSpeed: 2000
    });
  });

});

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
