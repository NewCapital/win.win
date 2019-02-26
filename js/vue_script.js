// new Vue({
//   el: '#app',
//   data: {
//     marcetCap: '',
//     marcetCap_old:'',
//     marcetCap_green: false,
//     marcetCap_red: false,
//
//     cCoinSupply:'',
//     cCoinSupply_display:'',
//     cCoinSupply_old:'',
//     cCoinSupply_green: false,
//     cCoinSupply_red: false,
//
//     coinsLocked:'',
//     coinsLocked_old:'',
//     coinsLocked_green: false,
//     coinsLocked_red: false,
//
//     nodeWorth:'',
//     nodeWorth_old:'',
//     nodeWorth_green: false,
//     nodeWorth_red: false,
//
//     walletsQty:'',
//     walletsQty_old:'',
//     walletsQty_green: false,
//     walletsQty_red: false,
//
//     devFund:'',
//     devFund_old:'',
//     devFund_green: false,
//     devFund_red: false,
//   },
//   mounted: function() {
//     var vm = this;
//
//     function cCoinSupplyFunc() {
//       vm.$http.get('https://explorer.win.win/ext/getmoneysupply', {
//       }).then(function(data) {
//         vm.cCoinSupply = data.body
//         vm.cCoinSupply_display = (vm.cCoinSupply / 1000000).toFixed(1);
//         if (vm.cCoinSupply_old == '') {
//           vm.cCoinSupply_old = vm.cCoinSupply
//         } else {
//           if (vm.cCoinSupply > vm.cCoinSupply_old) {
//             function cCoinSupplyGreen() {
//               vm.cCoinSupply_green = true;
//               vm.cCoinSupply_old = vm.cCoinSupply
//               setTimeout(function() {
//                 vm.cCoinSupply_green = false;
//               }, 1000);
//             }
//             cCoinSupplyGreen();
//           } else if (vm.cCoinSupply < vm.cCoinSupply_old) {
//             function cCoinSupplyRed() {
//               vm.cCoinSupply_red = true;
//               vm.cCoinSupply_old = vm.cCoinSupply
//               setTimeout(function() {
//                 vm.cCoinSupply_red = false;
//               }, 1000);
//             }
//             cCoinSupplyRed();
//           }
//         }
//
//       });
//     }
//
//     function walletsQtyFunc() {
//       vm.$http.get('https://explorer.win.win/api/listmasternodes', {
//       }).then(function(data) {
//         console.log(data);
//       });
//     }
//
//     walletsQtyFunc();
//     cCoinSupplyFunc();
//     setInterval(cCoinSupplyFunc, 30000);
//   }
// });
