'use strict';

var myeventApp = angular.module('myApp.myevent', ['ngRoute', 'ngStorage',  ]);

myeventApp.controller('myeventCtrl', ['$rootScope', '$scope', '$http', '$localStorage', '$timeout', '$interval', '$sce', '$firebaseObject', '$firebaseArray', '$firebaseAuth', '$location',
function($rootScope, $scope, $http, $localStorage, $timeout, $interval, $sce, $firebaseObject, $firebaseArray, $firebaseAuth, $location) {
	$scope.$storage = $localStorage;
	var ref = firebase.database().ref();
	$scope.$storage.ref = $firebaseArray(ref);;

	var events = firebase.database().ref().child("/admin/" + $rootScope.$storage.admin.signInUser.uid + "/events");
	$scope.$storage.events = $firebaseArray(events);
	
	var beacons = firebase.database().ref().child("/beacons/");
	$scope.$storage.beacons = $firebaseArray(beacons);
	
	$scope.tempEvent = {};
	$scope.tempEvent.start = new Date(2011, 11, 11, 11, 11);
	$scope.tempEvent.end = new Date(2011, 11, 11, 11, 11);
	
	var addEvent = function(itemToAdd) {
		var name = itemToAdd.name;
		console.log (name);
		if (events.push( itemToAdd )) {
			itemToAdd = '';
		}
	};
	
	var addBeacon = function(id, owner, uid) {
		var itemToPush = {
			"owner" : owner,
			'beaconId' : id,
			'uid' : uid 
		};
		if (beacons.push( itemToPush )) {
			console.log('Pushed Beacon');
		}
	};

	$scope.addNewEvent = function() {
		$scope.eventObject = {
			id : $scope.event.beaconId,
			name : $scope.event.name,
			description : $scope.event.description,
			start : $scope.event.start,
			end : $scope.event.end,
			people : [{
				'name' : "Kimmy Jimmy Timmy",
				'email' : 'u.i@usask.ca',
				'linkedInUrl' : "https://www.linkedin.com/in/uchibeke",
				'profession' : 'Student',
				'education' : "Undergrade/Third Year",
				'github' : 'Student'
			},
			{
				'name' : "Thomas Muclair",
				'email' : 'test@myemail.com',
				'linkedInUrl' : "https://www.linkedin.com/in/thomas.me",
				'profession' : 'Student',
				'education' : "PhD in French",
				'github' : 'Student'
			}]
		};
		addEvent($scope.eventObject);
		addBeacon($scope.eventObject.id, $rootScope.$storage.admin.signInUser.displayName, $rootScope.$storage.admin.signInUser.uid);
		if ($scope.options.saveEdit) {
			$scope.removeBeacon($scope.options.objectToRemove);
		}
	};
	
	$scope.setSelectedEvent = function (item) {
		$scope.$storage.selectedEvent = item;
	};

	// $scope.removeEvent = function(item) {
		// console.log(item);
		// var ref = firebase.database().ref().child(events + item.name);
		// var list = $firebaseArray(ref);
		// var item = list[item.name];
		// var obj = $firebaseObject(ref);
// 
		// obj.$remove().then(function(ref) {
		// }, function(error) {
			// console.log("Error:", error);
		// });
	// };
	$scope.options = {};
	$scope.startEdit = function(item) {
		$scope.options.saveEdit = true;
		$scope.event.beaconId = item.id;
		$scope.event.name = item.name;
		$scope.event.description = item.description;
		$scope.event.start = item.start;
		$scope.event.description = item.end;
		$scope.options.objectToRemove = item;
	};
}]);
