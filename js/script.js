$(document).ready(function() {

  var twins_price_bid;
  var old_twins_price_bid;

  var twins_price_ask;
  var old_twins_price_ask;

  var btc_price;

  var active_wallets_count;
  var old_active_wallets_count;

  var dev_wallet_balance;
  var old_dev_wallet_balance;

  var money_supply;
  var old_money_supply;

  var twins_locked;
  var old_twins_locked;

  function getExplorerData() {
    $.ajax({
      url: 'https://explorer.win.win/ext/getstats',
      success: function(data) {
        active_wallets_count = data.active_wallets_count;
        $('#active_wallets .data_coin').html(active_wallets_count);

        dev_wallet_balance = (data.dev_wallet_balance / 1000000).toFixed(3);
        $('#dev_fund .data_coin').html(dev_wallet_balance + "M");

        money_supply = (data.money_supply / 1000000).toFixed(3);
        $('#coin_supply .data_coin').html(money_supply + "M");

        twins_locked = data.twins_locked;
        $('#coin_locked .data_coin').html(twins_locked + "M");

        $('#node_worth .data_coin').html("$" + 1000000 * btc_price * twins_price_bid);
        $('#market_cap .data_coin').html("$" + (money_supply * btc_price * twins_price_bid).toFixed(3) + "M");

      },
      complete: function() {
        setTimeout(getExplorerData, 10000);
      }
    });
  }
  function getExchangeData() {
    $.ajax({
      url: 'https://bitsane.com/api/public/ticker',
      success: function(data) {
        console.log(data.BTC_USD);
        btc_price = data.BTC_USD.highestBid;

        twins_price_bid = data.TWINS_BTC.highestBid;
        $('#twins_bid .price_btc').html(twins_price_bid + " BTC");
        $('#twins_bid .price_usd').html("$" + twins_price_bid * btc_price);

        twins_price_ask = data.TWINS_BTC.lowestAsk
        $('#twins_ask .price_btc').html(twins_price_ask + " BTC");
        $('#twins_ask .price_usd').html("$" + twins_price_ask * btc_price);

      },
      complete: function() {
        setTimeout(getExchangeData, 10000);
      }
    });
  }
  getExplorerData();
  getExchangeData();

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
