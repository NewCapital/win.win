$(document).ready(function() {
  // section resize ------------------------------------------------------------
  var viewPortWidth;
  var viewPortHeight;
  var viewPort = $(window);
  var topSection = $('.top_header');
  var allSection = $('.section_block');

  // change section size fun
  function blockResize() {
    viewPortWidth = viewPort.width();
    viewPortHeight = viewPort.height();

    allSection.css('min-width', viewPortWidth).css('min-height', viewPortHeight);
    topSection.css('min-width', viewPortWidth).css('min-height', viewPortHeight - 56);
  }

  // run runction after load page
  blockResize();

  // run function after window resize
  $(window).resize(function() {
    blockResize();
  });
  //  --------------------------------------------------------------------------

  // dropdown and menu logic ---------------------------------------------------
  function checkDropdown() {
    var menuList = $('.dropdown_desktop ul');
    var scrollPosition = $(document).scrollTop();
    var menuHeight = menuList.height();
    var viewPort = $(window);
    var viewPortHeight;
    var menu = $('.main_menu_global');
    var topBlock = $('.top_header');

    viewPortHeight = viewPort.height();

    // dropdown
    if (scrollPosition > menuHeight) {
      menuList.css('margin-top', '0');
    } else {
      menuList.css('margin-top', -(menuHeight + 74));
    }

    // fix menu on top after scroll
    if (scrollPosition >= (viewPortHeight - 56)) {
      menu.addClass('fixed');
      topBlock.addClass('padding');
    } else {
      menu.removeClass('fixed')
      topBlock.removeClass('padding');
    }
  }

  //check dropdown item position after lad page
  checkDropdown();

  // change dropdown item position after scroll
  $(window).scroll(function() {
    checkDropdown();
  });

  var dropdown_desktop = $('.dropdown_desktop');
  // open/close dropdown desktop
  dropdown_desktop.mouseenter(function() {
    $(this).find('ul').fadeIn('fast');
  });
  dropdown_desktop.mouseleave(function() {
    $(this).find('ul').fadeOut('fast');
  });

  // dropdown-mobile open/ close
  $('.dropdown_mobile').on('click',function() {
    event.preventDefault;
    $(this).find('ul').slideDown();
  });

  $('.mobile_menu_btn').on('click', function() {
    $('.mobile_menu').slideDown();
  });
  $('.close_btn').on('click', function() {
    $('.mobile_menu').slideUp();
  });
  //  --------------------------------------------------------------------------

  // header siwther ------------------------------------------------------------
  // siwther code
  var idCounter = 1;

  function headSlider() {
    if (idCounter < 10) {
      $('.stats_' + idCounter).show().addClass('animated fadeInDown');
      setTimeout(function() {
        $('.stats_' + idCounter).show().addClass('fadeOutDown');
        $('.stats_' + idCounter).fadeOut().removeClass('fadeInDown');
        idCounter++;
        headSlider();
      }, 3000);
    } else {
      $('.stats').fadeOut().removeClass('fadeInDown fadeOutDown animated');
      idCounter = 1;
      headSlider();
    }
  }
  // start after page loaded
  headSlider();

  // get data to the swither from API function
  function getSliderData() {
    $.ajax({
      url: 'https://explorer.win.win/ext/getstats',
      success: function(data) {
        $('.stats_2 span').html(data.total_wallets_count);
        $('.stats_3 span').html(data.active_wallets_count);
        $('.stats_4 span').html(numberWithSpaces(data.money_supply.toFixed()) + ' $TWINS');
        $('.stats_5 span').html(data.masternode_count);
        $('.stats_6 span').html(data.block_count);
        $('.stats_7 span').html(numberWithSpaces(data.dev_wallet_balance.toFixed()) + ' $TWINS');
        $('.stats_8 span').html(data.twins_locked);
        $('.stats_9 span').html(data.average_sec_per_block.toFixed(2) + ' sec');
      },
      complete: function() {
        // Schedule the next request when the current one's complete
        setTimeout(getSliderData(), 60000);
      }
    });
  }
  // get data after load page
  getSliderData();

  // text remake
  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  //  --------------------------------------------------------------------------

  // footer dropdown with wallets ----------------------------------------------
  var wallet = $('.wallet_container');
  var dropdown = $('.dropdown');
  // open dropdown
  wallet.on('click', function() {
    dropdown.fadeOut('fast');
    $(this).children('.dropdown').fadeIn('fast');
    wallet.addClass('wallet_container_selected');
    $(this).removeClass('wallet_container_selected');
  });
  // close dropdown
  $(document).click(function(event) {
    if (!$(event.target).closest(".wallet_logo_block").length) {
      dropdown.fadeOut('fast');
      wallet.removeClass('wallet_container_selected');
    }
  });

  var dropdownItem = $('.dropdown a');
  var blockWalletWidth;

  // change dopdown width
  function putWidth() {
    blockWalletWidth = wallet.width();
    dropdownItem.width(blockWalletWidth)
  }
  // run function "change dopdown width" after load page
  putWidth();
  // run function "change dopdown width" after resize
  $(window).resize(function() {
    putWidth();
  });
  //  --------------------------------------------------------------------------

  // stats page ----------------------------------------------------------------
  // stats swither tabs
  var coin_stat = $('.coin_stat');
  var coin_box_block = $('.coin_box_block');
  var network_map_block = $('.network_map_block');
  var coin_map = $('.coin_map');

  coin_stat.on('click', function() {
  coin_box_block.show();
  network_map_block.hide();
  coin_map.removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });

  coin_map.on('click', function() {
    coin_box_block.hide();
    network_map_block.show();
    coin_stat.removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });
  //  --------------------------------------------------------------------------

  // getExchangeData block -----------------------------------------------------
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

  var blockTimeCoin;

  function twinsIndication(old_var, var_new, var_id) {
    if (!old_var) {
      old_var = var_new;
    } else {
      if (var_new > old_var) {
        old_var = var_new;
        var_id.addClass('block_plus');
        setTimeout(function() {
          var_id.removeClass('block_plus');
        }, 2000);
      } else if (var_new < old_var) {
        old_var = var_new;
        var_id.addClass('block_minus');
        setTimeout(function() {
          var_id.removeClass('block_minus');
        }, 2000);
      }
    }
  }

  function getExplorerData() {
    $.ajax({
      url: 'https://explorer.win.win/ext/getstats',
      success: function(data) {
        active_wallets_count = data.active_wallets_count;
        var total_wallets = data.total_wallets_count;
        $('#active_wallets .data_coin').html(active_wallets_count + " / " + total_wallets);

        dev_wallet_balance = (data.dev_wallet_balance / 1000000).toFixed(3);
        $('#dev_fund .data_coin').html(dev_wallet_balance + "M");

        money_supply = (data.money_supply / 1000000).toFixed(3);
        $('#coin_supply .data_coin').html(money_supply + "M");

        twins_locked = data.masternode_count;
        $('#coin_locked .data_coin').html(twins_locked + "M" + " (" + (twins_locked / money_supply * 100).toFixed(2) + "%)");


        node_worth = 1000000 * btc_price;
        $('#node_worth .data_coin').html("$" + node_worth.toFixed(2));

        market_cap = (money_supply * btc_price).toFixed(3);
        $('#market_cap .data_coin').html("$" + market_cap + "M");

        blockTimeCoin = data.average_sec_per_block;
        $('#block_time .data_coin').html(blockTimeCoin.toFixed(2) + " Sec");


        // market_cap indication
        var marcer_cap_id = $('#market_cap');
        twinsIndication(old_market_cap, market_cap, marcer_cap_id);

        // node_worth indication
        var node_worth_id = $('#node_worth');
        twinsIndication(old_node_worth, node_worth, node_worth_id);

        // twins_locked indication
        var coin_locked_id = $('#coin_locked');
        twinsIndication(old_twins_locked, twins_locked, coin_locked_id);

        // dev_wallet_balance indication
        var dev_fund_id = $('#dev_fund');
        twinsIndication(old_dev_wallet_balance, dev_wallet_balance, dev_fund_id);

        // active_wallets_count indication
        var active_wallets_id = $('#active_wallets');
        twinsIndication(old_active_wallets_count, active_wallets_count, active_wallets_id);

        // money_supply indication
        var coin_supply_id = $('#coin_supply');
        twinsIndication(old_money_supply, money_supply, coin_supply_id);

      },
      complete: function() {
        setTimeout(getExplorerData, 10000);
      }
    });
  }

  function getExchangeData() {
    $.ajax({
      url: 'https://explorer.win.win/ext/getMarketLatestData/bitsane',
      success: function(data) {

        btc_price = Number(data.price_usd);

        twins_price_bid = Number(data.lowestAsk);

        $('#twins_ask .btc_price').html(twins_price_bid.toFixed(8) + " BTC");
        $('#twins_bid .usd_price').html("$" + btc_price.toFixed(6));

        twins_price_ask = Number(data.highestBid);
        $('#twins_bid .btc_price').html(twins_price_ask.toFixed(8) + " BTC");
        $('#twins_ask .usd_price').html("$" + (btc_price * twins_price_bid / twins_price_ask).toFixed(6));


        // twins_price_ask indication
        var twins_bid_id = $('#twins_bid');
        var twins_ask_id = $('#twins_ask');

        twinsIndication(old_twins_price_ask, twins_price_ask, twins_bid_id);
        twinsIndication(old_twins_price_bid, twins_price_bid, twins_ask_id);

      },
      complete: function() {
        setTimeout(getExchangeData, 10000);
      }
    });
  }
  getExchangeData();
  getExplorerData();
  //  --------------------------------------------------------------------------

  // chart code ----------------------------------------------------------------

  // chart ---------------------------------------------------------------------
  // variables
  var viewPortWidthChart;
  var chartBlockHeight;
  var viewPortChart = $(window);

  // resize func after start
  function windowChartResize() {
    viewPortWidthChart = viewPortChart.width();
    if (viewPortWidthChart > 1024) {
      chartBlockHeight = $('.coin_graph_block').height();
    } else {
      chartBlockHeight = 320
    }
  }

  // run runction after load page
  windowChartResize();


  // chart data
  var options = {
    tooltip: {
      enabled: true,
      x: {
        show: true
      }
    },
    colors:['#4BAB3E'],
    chart: {
      id: 'chart',
      height: chartBlockHeight,
      // type: 'line',
      zoom: {
          enabled: false
      },
      animations: {
        dynamicAnimation: {
            enabled: true,
            speed: 1000
        }
    }
    },
    dataLabels: {
        enabled: false,
    },
    stroke: {
        curve: 'straight'
    },
    series: [{
        name: "Price Satoshi",
        data: [0]
        // data: [0]
    }],
    title: {
        text: 'Average TWINS Price (baced on Bitsane.com)',
        align: 'left'
    },
    grid: {
      borderColor: '#28292A',
        row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.5,
        }
    },
    xaxis: {
        categories: ['---', '---'],
        labels: {
          show: false,
        }
    }
  }
  // chart initilization
  var chart = new ApexCharts(
    document.querySelector("#chart"),
    options
  );
  // chart render
  chart.render();

  // adaptive resize behavior
  $(window).resize(function() {
    var vieportWidthChart = $(window).width();
    var vieportHeightChart = $(window).height();

    if (vieportWidthChart > 1024) {
      if (vieportHeightChart < 800) {
        chart.updateOptions({
          chart: {
            height: 300,
          }
        });
      } else if (vieportHeightChart > 800) {
        chart.updateOptions({
          chart: {
            height: 420,
          }
        });
      }
    }
  });

  // update data within graph
  function pushDataChart(price, time) {
    ApexCharts.exec('chart', "updateOptions", {
      xaxis: {
        categories: time
      }
    });
    ApexCharts.exec('chart', "updateSeries", [
      {
        data: price
      }
    ]);
  }

  var reUpdateMonth;
  var reUpdateDay;
  var updateWeek;
  var reUpdateAll;

  // update graph day
  var updateDay = function() {
    $.ajax({
      url: 'https://api.wallet.app/api/get-market-chart/btc/1',
      success: function(data) {

        var prices = data.prices.reverse();

        var btc = prices.map(function(data) {
          return (data.btc * 100000000).toFixed(2);
        });

        var timeDate = prices.map(function(data) {
          var compile = new Date(data.timestamp)
          return compile;
        });

        pushDataChart(btc, timeDate);
      }
    });
    reUpdateDay = setTimeout(updateDay, 600000);
  }

  // update graph 7 days
  var updateWeek = function() {
    $.ajax({
      url: 'https://api.wallet.app/api/get-market-chart/btc/7',
      success: function(data) {

        var prices = data.prices.reverse();

        var btc = prices.map(function(data) {
          return (data.btc * 100000000).toFixed(2);
        });

        var timeDate = prices.map(function(data) {
          var compile = new Date(data.timestamp)
          return compile;
        });

        pushDataChart(btc, timeDate);
      }
    });
    reUpdateWeek = setTimeout(updateWeek, 600000);
  }

  // update graph 30 days
  var updateMonth = function() {
    $.ajax({
      url: 'https://api.wallet.app/api/get-market-chart/btc/30',
      success: function(data) {

        var prices = data.prices.reverse();

        var btc = prices.map(function(data) {
          return (data.btc * 100000000).toFixed(2);
        });

        var timeDate = prices.map(function(data) {
          var compile = new Date(data.timestamp)
          return compile;
        });

        pushDataChart(btc, timeDate);
      }
    });
    reUpdateMonth = setTimeout(updateMonth, 600000);
  }

  // update graph All days
  var updateAll = function() {
    $.ajax({
      url: 'https://api.wallet.app/api/get-market-chart/btc/90',
      success: function(data) {

        var prices = data.prices.reverse();

        var btc = prices.map(function(data) {
          return (data.btc * 100000000).toFixed(2);
        });

        var timeDate = prices.map(function(data) {
          var compile = new Date(data.timestamp)
          return compile;
        });

        pushDataChart(btc, timeDate);
      }
    });
    reUpdateAll = setTimeout(updateAll, 600000);
  }

  // updateAll();
  // updateMonth();
  updateWeek();
  // updateDay();

  $('.btn_24').on('click', function() {
    updateDay();
    clearInterval(reUpdateWeek);
    clearInterval(reUpdateMonth);
    clearInterval(reUpdateAll);
    $('.tg_btn').removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });

  $('.btn_7').on('click', function() {
    updateWeek();
    clearInterval(reUpdateDay);
    clearInterval(reUpdateMonth);
    clearInterval(reUpdateAll);
    $('.tg_btn').removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });

  $('.btn_30').on('click', function() {
    updateMonth();
    clearInterval(reUpdateDay);
    clearInterval(reUpdateWeek);
    clearInterval(reUpdateAll);
    $('.tg_btn').removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });

  $('.btn_all').on('click', function() {
    updateAll();
    clearInterval(reUpdateDay);
    clearInterval(reUpdateWeek);
    clearInterval(reUpdateMonth);
    $('.tg_btn').removeClass('tg_btn_active');
    $(this).addClass('tg_btn_active');
  });

});
