$(document).ready(function() {

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
        $('#current_block_time').html(data.average_sec_per_block.toFixed(2));
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
      fadeSpeed: 0,
      pauseSpeed: 3000
    });
    setInterval(function() {
      $('.info_coin_text').css('opacity', '0');
      $('.coin_info').addClass('counter_block_active');
      setTimeout(function() {
        $('.info_coin_text').css('opacity', '1');
        $('.coin_info').removeClass('counter_block_active');
      }, 300);
    }, 3000)
  });

});

function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// dropdown
$(document).ready(function() {
  var wallet = $('.wallet_container');
  wallet.on('click', function() {
    // event.preventDefault();
    $('.dropdown').fadeOut('fast');
    $(this).children('.dropdown').fadeIn('fast');
    $('.wallet_container').addClass('wallet_container_selected');
    $(this).removeClass('wallet_container_selected');
  });

  $(document).click(function(event) {
    if (!$(event.target).closest(".wallet_logo_block").length) {
      $('.dropdown').fadeOut('fast');
      $('.wallet_container').removeClass('wallet_container_selected');
    }
  });
});
