'use strict';

var couponApp = angular.module('myApp.view2', ['ngRoute']);

couponApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/coupon.html', {
    templateUrl: 'coupon/coupon.html',
    controller: 'View3Ctrl'
  });
}]);

couponApp.controller('View3Ctrl', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', '$firebaseObject', '$firebaseArray', '$firebaseAuth',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, $firebaseObject, $firebaseArray, $firebaseAuth) {
	$scope.ibeacons = [];
	$scope.coupon = [
	{}
		];
	$scope. = 14231984723;
	$scope.addBeacon = function(){
		$scope.beacon.push($scope.newbeacon);
	};
	$scope.removeBeacon = function(x){
		$scope.beacon.splice(x,1);
	};
}]);
