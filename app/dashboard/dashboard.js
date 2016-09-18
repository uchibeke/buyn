'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'ngStorage']).config(['$routeProvider',
function($routeProvider) {
	$routeProvider.when('/preview', {
		templateUrl : 'dashboard/dashboard.html',
		controller : 'dashboardCtrl'
	});
}]).controller('dashboardCtrl', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', '$firebaseObject', '$firebaseArray', '$firebaseAuth',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, $firebaseObject, $firebaseArray, $firebaseAuth) {
/*
	$scope.exportData() = function(){
		var exportee = new Blob([document.getElementById('exportable').innerHTML], {
			type: "application.vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		saveAs(exportee, "CandidateList.xls")
	}

/*
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
*/


}])