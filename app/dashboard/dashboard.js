var dashboardApp = angular.module('myApp.dashboard', ['ngRoute', 'ngStorage', "firebase"])

dashboardApp.controller('dashboardCtrl', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', '$firebaseObject', '$firebaseArray', '$firebaseAuth',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, $firebaseObject, $firebaseArray, $firebaseAuth) {
	$scope.dashSearch = "";

	$scope.exportData = function() {
		var blob = new Blob([document.getElementById('exportable').innerHTML], {
			type : "application.vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
		});
		saveAs(blob, "CandidateList.xls");
	};

}])