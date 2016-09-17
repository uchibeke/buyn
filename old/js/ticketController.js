var ticketControllers = angular.module('ticketControllers', ['ngStorage', 'ngSanitize']);

ticketControllers.controller('TicketController', ['$rootScope', '$scope', '$http', '$localStorage', '$sce', '$timeout', 'analytics', '$firebaseObject', '$firebaseArray', '$firebaseAuth',
function($rootScope, $scope, $http, $localStorage, $sce,  $timeout, analytics, $firebaseObject, $firebaseArray, $firebaseAuth) {
	$http.get('js/crayola.json').success(function(st) {
		$scope.$storage = $localStorage.$default({
			ticket : $scope.ticketdata,
		});

		$scope.$storage.style = st;

		$scope.ticketOrder = 'ticketTitle';
		$scope.ticketSearch = '';

		$scope.bc = 10;

		// File upload
		$scope.upload = function(dataUrl) {
			Upload.upload({
				url : 'https://angular-file-upload-cors-srv.appspot.com/upload',
				data : {
					file : Upload.dataUrltoBlob(dataUrl)
				},
			}).then(function(response) {
				$timeout(function() {
					$scope.result = response.data;
				});
			}, function(response) {
				if (response.status > 0)
					$scope.errorMsg = response.status + ': ' + response.data;
			}, function(evt) {
				$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
			});
		};

		$scope.showTicket = function(ind) {
			for (var i; i < $scope.$storage.length; i++) {
				if (i == ind) {
					$scope.show = true;
				} else {
					$scope.show = false;
				}
			}
		};

		$scope.ticketBackground = function(ind) {
			$scope.$storage.ticketText = $scope.$storage.ticketText;
			$scope.$storage.ticketBgColor = ind;
			$scope.userFillColor = $scope.$storage.ticketBgColor;
		};

		$scope.ticketTxtColor = function(ind) {
			$scope.$storage.ticketBgColor = $scope.$storage.ticketBgColor;
			$scope.$storage.ticketText = ind;
			$scope.userTextColor = $scope.$storage.ticketText;
		}

		$scope.previewStyle = function() {
			return {
				'background-color' : $scope.$storage.ticketBgColor,
				'color' : $scope.$storage.ticketText
			}
		}
		var ticketColorFilter = function(givenCol) {
			var col = givenCol;
			if (col != undefined) {
				col = col.replace('#', '');
			}
			return col;
		};
	});
}]);

