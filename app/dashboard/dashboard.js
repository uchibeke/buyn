'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'ngStorage']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/dashboard', {
		templateUrl : 'dashboard/dashboard.html',
		controller : 'dashboardCtrl'
	});
}]).controller('dashboardCtrl', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', '$firebaseObject', '$firebaseArray', '$firebaseAuth',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, $firebaseObject, $firebaseArray, $firebaseAuth) {

	$scope.$storage = $localStorage;

	var allRef = firebase.database().ref();
	$scope.$storage.allRef = $firebaseArray(allRef);

	var deals = firebase.database().ref().child("/deals/");
	$scope.$storage.deals = $firebaseArray(deals);

	var beacons = firebase.database().ref().child("/beacons/");
	$scope.$storage.beacons = $firebaseArray(beacons);

	var nutrition = firebase.database().ref().child("/nutrition/");
	$scope.$storage.nutrition = $firebaseArray(nutrition);

	$scope.addNutritionItem = function(itemToAdd) {
		$scope.$storage.deals = itemToAdd;
		addItem('nutrition', $scope.$storage.deals);
	};

	$scope.setDeal = function(deal) {
		$scope.$storage.selectedDeal = deal;
	};

	$scope.$storage.selectedBeacon = "Test Beacon";

	$scope.$storage.BaseUrlProduct = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/";

	// Search for a product
	$scope.searchProducts = function(str) {
		console.log(str);
		str = str.split(' ').join('+').match(/\S+/g);
		$http({
			url : $scope.$storage.BaseUrlProduct + "search?number=50&offset=0&query=" + str,
			headers : {
				'X-Mashape-Authorization' : '4ZN4cDI4J9mshHSMwb0APK9NGjJEp1rbTaAjsnEPWabILxb9nl'
			},
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			console.log(data);
			$scope.$storage.api.responses.productNameAnswer = data;
			$scope.$storage.api.questions.productName = "";
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};

	// Click to add it to deals
	$scope.getProductWithId = function(id) {
		console.log(id);
		$http({
			url : $scope.$storage.BaseUrlProduct + id,
			headers : {
				'X-Mashape-Authorization' : '4ZN4cDI4J9mshHSMwb0APK9NGjJEp1rbTaAjsnEPWabILxb9nl'
			},
			method : 'GET',
			dataType : 'application/json',
		}).success(function(data) {
			console.log('got....');
			console.log(data);
			setProductToMakeDeal(data.id, data.title, data.price, data.images[0]);
			$scope.$storage.api.responses.productIdAnswer = data;
			$scope.$storage.api.questions.productId = "";
		}).error(function(data, status) {
			// Handle HTTP error
		}).finally(function() {
			// Execute logic independent of success/error
		}).catch(function(error) {
			// Catch and handle exceptions from success/error/finally functions
		});
	};

	function setProductToMakeDeal(id, title, price, image) {
		var item = {};
		item.id = id;
		item.name = title;
		item.price = price;
		item.beaconAssignedTo = $scope.$storage.selectedBeacon;
		item.image = image;
		item.saved = '';
		item.nutrition = {};

		$scope.$storage.productToMakeDeal = item;
	}

	var addItem = function(childToAdd, itemToAdd) {
		if (allRef.child(childToAdd).push(itemToAdd)) {
			console.log(itemToAdd.beaconAssignedTo);
			console.log(itemToAdd);
			allRef.child('beacons/' + itemToAdd.beaconAssignedTo + "/deals/" + itemToAdd.name).push(itemToAdd);
		}

	};
	$scope.addDealItem = function(itemToAdd) {
		addItem('deals', itemToAdd);
	};

}])