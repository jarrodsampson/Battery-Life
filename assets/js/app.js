var app = angular.module("BatteryApp", ['ngAnimate']); // module init
app.controller("BatteryController", function($scope) { // controller init

    $scope.phoneChoice = {};
    $scope.phoneCalcDisplay = {};
    $scope.currentSelection = {};
    $scope.phoneNo = true;
    $scope.noPower = true;
    $scope.cartItems = 0;
    $scope.cart = [];

    $scope.phones = [
        {id: 1, title: "iPhone 6", capacity: 1810, image: "iphone6.png", price: 634.99},
        {id: 2, title: "iPhone 6 Plus", capacity: 2915, image: "iphone-6-plus.png", price: 799.99}
    ];

    $scope.powerBanks = [
        {
            id: 1,
            image: "chargerAnker1.png",
            ma: 2400,
            title: "Anker 40W 4-Port USB Wall Charger",
            description: "Anker\'s MultiProtect safety system ensures complete protection for you and your devices",
            price: 42.99
        },
        {
            id: 2,
            image: "iclever.png",
            ma: 4800,
            title: "iClever BoostCube 4.8A 24W",
            description: "It can recognize any device, and maximize the charging efficiency. It charges your phone twice as fast and saves you time!",
            price: 50.99
        },
        {
            id: 3,
            image: "generic.png",
            ma: 1000,
            title: "Generic USB Wall Charger",
            description: "Chip inside is designed to identify fully charging with safety usage,Protection against over charging,over currents, and over heating,Charging stops when battery is full.",
            price: 4.99
        }
    ];


    $scope.choosePhone = function (phone) {
        console.log(phone);
        $scope.phoneChoice.chosenPhone = phone.title;
        $scope.phoneChoice.chosenCapacity = phone.capacity;
        $scope.phoneChoice.chosenImage = phone.image;

        $scope.phoneNo = false;

        $scope.chargeTime = $scope.calculateCharge($scope.phoneChoice.chosenCapacity, $scope.currentSelection.ma);
    };

    $scope.choosePower = function (power) {
        $scope.noPower = false;
        $scope.currentSelection = power;
        $scope.phoneCalcDisplay.title = power.title;
        $scope.phoneCalcDisplay.ma = power.ma;
        $scope.phoneCalcDisplay.description = power.description;
        $scope.chargeTime = $scope.calculateCharge($scope.phoneChoice.chosenCapacity, power.ma);
    };

    $scope.calculateCharge = function (battery, charger) {
        var fast = ((battery/100)*85) / charger;
        var decres = ((battery/100)*10) / ((charger/100)*50);
        var trickle = ((battery/100)*5) / ((charger/100)*20);

        var sum = fast + decres + trickle;

        return parseFloat(sum.toFixed(2));
    };

    $scope.clearData = function () {
        $scope.phoneChoice = {};
        $scope.phoneCalcDisplay = {};
        $scope.currentSelection = {};
        $scope.phoneNo = true;
        $scope.noPower = true;
    };

    $scope.addCart = function (phone, charger) {
        $scope.cartItems += 1;
        $scope.temp = {
          phone: phone.chosenPhone,
          capacity: phone.chosenCapacity,
          image: phone.chosenImage,
          charger: charger.title,
          chargerDescription: charger.description,
          chargerMa: charger.ma
        };

        $scope.cart.push($scope.temp);
        console.log($scope.cart);
    };

    $scope.showCart = function() {

    };

    $scope.removeFromCart = function (id, item) {
        $scope.cart.splice(id, 1);
        console.log($scope.cart);
    };

});