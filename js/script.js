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

  var node_worth;
  var old_node_worth;

  var market_cap;
  var old_market_cap;

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


        node_worth = 1000000 * btc_price * twins_price_bid;
        $('#node_worth .data_coin').html("$" + node_worth);

        market_cap = (money_supply * btc_price * twins_price_bid).toFixed(3);
        $('#market_cap .data_coin').html("$" + market_cap + "M");

        // market_cap indication
        if (!old_market_cap) {
          old_market_cap = market_cap;
        } else {
          if (market_cap > old_market_cap) {
            old_market_cap = market_cap;
            $('#market_cap').addClass('block_plus');
            setTimeout(function() {
              $('#market_cap').removeClass('block_plus');
            }, 1000);
          } else if (market_cap < old_market_cap) {
            old_market_cap = market_cap;
            $('#market_cap').addClass('block_minus');
            setTimeout(function() {
              $('#market_cap').removeClass('block_minus');
            }, 1000);
          }
        }

        // node_worth indication
        if (!old_node_worth) {
          old_node_worth = node_worth;
        } else {
          if (node_worth > old_node_worth) {
            old_node_worth = node_worth;
            $('#node_worth').addClass('block_plus');
            setTimeout(function() {
              $('#node_worth').removeClass('block_plus');
            }, 1000);
          } else if (node_worth < old_node_worth) {
            old_node_worth = node_worth;
            $('#node_worth').addClass('block_minus');
            setTimeout(function() {
              $('#node_worth').removeClass('block_minus');
            }, 1000);
          }
        }

        // twins_locked indication
        if (!old_twins_locked) {
          old_twins_locked = twins_locked;
        } else {
          if (twins_locked > old_twins_locked) {
            old_twins_locked = twins_locked;
            $('#coin_locked').addClass('block_plus');
            setTimeout(function() {
              $('#coin_locked').removeClass('block_plus');
            }, 1000);
          } else if (twins_locked < old_twins_locked) {
            old_twins_locked = twins_locked;
            $('#coin_locked').addClass('block_minus');
            setTimeout(function() {
              $('#coin_locked').removeClass('block_minus');
            }, 1000);
          }
        }

        // dev_wallet_balance indication
        if (!old_dev_wallet_balance) {
          old_dev_wallet_balance = dev_wallet_balance;
        } else {
          if (dev_wallet_balance > old_dev_wallet_balance) {
            old_dev_wallet_balance = dev_wallet_balance;
            $('#dev_fund').addClass('block_plus');
            setTimeout(function() {
              $('#dev_fund').removeClass('block_plus');
            }, 1000);
          } else if (dev_wallet_balance < old_dev_wallet_balance) {
            old_dev_wallet_balance = dev_wallet_balance;
            $('#dev_fund').addClass('block_minus');
            setTimeout(function() {
              $('#dev_fund').removeClass('block_minus');
            }, 1000);
          }
        }

        // active_wallets_count indication
        if (!old_active_wallets_count) {
          old_active_wallets_count = active_wallets_count;
        } else {
          if (active_wallets_count > old_active_wallets_count) {
            old_active_wallets_count = active_wallets_count;
            $('#active_wallets').addClass('block_plus');
            setTimeout(function() {
              $('#active_wallets').removeClass('block_plus');
            }, 1000);
          } else if (active_wallets_count < old_active_wallets_count) {
            old_active_wallets_count = active_wallets_count;
            $('#active_wallets').addClass('block_minus');
            setTimeout(function() {
              $('#active_wallets').removeClass('block_minus');
            }, 1000);
          }
        }

        // money_supply indication
        if (!old_money_supply) {
          old_money_supply = money_supply;
        } else {
          if (money_supply > old_money_supply) {
            old_money_supply = money_supply;
            $('#coin_supply').addClass('block_plus');
            setTimeout(function() {
              $('#coin_supply').removeClass('block_plus');
            }, 1000);
          } else if (money_supply < old_money_supply) {
            old_money_supply = money_supply;
            $('#coin_supply').addClass('block_minus');
            setTimeout(function() {
              $('#coin_supply').removeClass('block_minus');
            }, 1000);
          }
        }

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
        btc_price = data.BTC_USD.highestBid;

        twins_price_bid = data.TWINS_BTC.highestBid;
        $('#twins_bid .price_btc').html(twins_price_bid + " BTC");
        $('#twins_bid .price_usd').html("$" + twins_price_bid * btc_price);

        twins_price_ask = data.TWINS_BTC.lowestAsk
        $('#twins_ask .price_btc').html(twins_price_ask + " BTC");
        $('#twins_ask .price_usd').html("$" + twins_price_ask * btc_price);


        // twins_price_ask indication
        if (!old_twins_price_ask) {
          old_twins_price_ask = twins_price_ask;
        } else {
          if (twins_price_ask > old_twins_price_ask) {
            old_twins_price_ask = twins_price_ask;
            $('#twins_ask').addClass('block_plus');
            setTimeout(function() {
              $('#twins_ask').removeClass('block_plus');
            }, 1000);
          } else if (twins_price_ask < old_twins_price_ask) {
            old_twins_price_ask = twins_price_ask;
            $('#twins_ask').addClass('block_minus');
            setTimeout(function() {
              $('#twins_ask').removeClass('block_minus');
            }, 1000);
          }
        }


        // twins_price_bid indication
        if (!old_twins_price_bid) {
          old_twins_price_bid = twins_price_bid;
        } else {
          if (twins_price_bid > old_twins_price_bid) {
            old_twins_price_bid = twins_price_bid;
            $('#twins_bid').addClass('block_plus');
            setTimeout(function() {
              $('#twins_bid').removeClass('block_plus');
            }, 1000);
          } else if (twins_price_bid < old_twins_price_bid) {
            old_twins_price_bid = twins_price_bid;
            $('#twins_bid').addClass('block_minus');
            setTimeout(function() {
              $('#twins_bid').removeClass('block_minus');
            }, 1000);
          }
        }

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
