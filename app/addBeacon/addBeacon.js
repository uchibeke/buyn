'use strict';

var beaconApp = angular.module('myApp.addBeacon', ['ngRoute']);

beaconApp.config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/addBeacon', {
		templateUrl : 'addBeacon/addBeacon.html',
		controller : 'addBeaconCtrl'
	});
}]);

beaconApp.controller('addBeaconCtrl', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', '$firebaseObject', '$firebaseArray', '$firebaseAuth',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, $firebaseObject, $firebaseArray, $firebaseAuth) {
	$scope.$storage = $localStorage;
	var ref = firebase.database().ref();
	$scope.$storage.ref = $firebaseArray(ref);
	var beacon = firebase.database().ref().child("/beacons");
	$scope.beacon = $firebaseArray(beacon);

	$scope.beacon.id = 12345;
	$scope.beacon.name = "Test Beacon";
	$scope.beacon.color = "Blue";
	$scope.beacon.location = "Meat";
	$scope.beacon.x = 0;
	$scope.beacon.y = 0;

	var addBeacon = function(childToAdd, itemToAdd) {
		if (ref.child(childToAdd).set(itemToAdd)) {
			itemToAdd = '';
		}
	};

	$scope.addBeaconItem = function() {
		$scope.beaconObject = {
			id : $scope.beacon.id,
			name : $scope.beacon.name,
			color : $scope.beacon.color,
			location : $scope.beacon.location,
			x : $scope.beacon.x,
			y : $scope.beacon.y
		};
		addBeacon('beacons/' + $scope.beaconObject.name, $scope.beaconObject);
	};

	$scope.removeBeacon = function(item) {
		console.log(item);
		var ref = firebase.database().ref().child("/beacons/" );
		var list = $firebaseArray(ref);
		var item = list[item.name];
		var obj = $firebaseObject(ref);

		obj.$remove().then(function(ref) {
		}, function(error) {
			console.log("Error:", error);
		});
		// $scope.beacon.splice($scope.beacon.indexOf(item), 1);
	}
}]);
