'use strict';

var beaconApp = angular.module('myApp.view2', ['ngRoute']);

beaconApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}]);

beaconApp.controller('View2Ctrl', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', '$firebaseObject', '$firebaseArray', '$firebaseAuth',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, $firebaseObject, $firebaseArray, $firebaseAuth) {
	$scope.$storage = $localStorage;
	var ref = firebase.database().ref();
	$scope.$storage.ref = $firebaseArray(ref);
	var beacon = firebase.database().ref().child("/beacon");
	$scope.beacon = $firebaseArray(beacon);
	
	$scope.idInput = 12345;
	$scope.nameInput = "Test Beacon";
	$scope.colorInput = "Blue";
	$scope.locationInput = "Meat";
	$scope.xpos= 0;
	$scope.ypos = 0;
	
	$scope.beaconObject = {
		id: $scope.idInput,
		name: $scope.nameInput,
		color: $scope.colorInput,
		location: $scope.locationInput,
		x: $scope.xpos,
		y: $scope.ypos
	};
	
	var addBeacon = function(childToAdd, itemToAdd) {
		if (ref.child(childToAdd).push(itemToAdd)) {
			itemToAdd = '';
		}
	};
	
	$scope.addBeaconItem = function() {
		addBeacon('beacon', $scope.beaconObject);
	};
	
}]);
