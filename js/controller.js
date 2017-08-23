'use strict';
var myApp = angular.module("myApp");
//声明自定义服务
myApp.service('myService', ['$http', '$q', function($http, $q) {
    this.getData = function() {
        var defer = $q.defer(); //声明延后执行
        $http.get('js/data.json').then(function(response) {
            defer.resolve(response); //声明执行成功

        }, function(response) {
            defer.reject(response); //声明执行失败
        });
        return defer.promise; //返回承诺，返回获取数据的API
    };
}]);
myApp.service('myService2', ['$http', function($http) {
    this.text = '';
    this.setText = function(obj) {
        this.text = obj;
        console.log(this.text);
    };
    this.getText = function() {
        return this.text;
    };
    this.getData = function() {
        $http.get('js/data.json').then(function(res) {
            this.text = res.data.entity;
        }, function() {

        }); //返回承诺，返回获取数据的API
    };
    this.changeData = function() {
        this.text = {
            "entity": [{
                    "id": "11",
                    "name": "myName2"
                },
                {
                    "id": "22",
                    "name": "爽哥2"
                }
            ]
        };
        console.log(this.text);
    };
}]);
//wrong
myApp.service('myService3', ['$http', function($http) {
    this.getData = function() {
        var result = { 'entity': [] };
        $http.get('js/data.json').then(function(response) {
            result = response.data.entity;
        }, function() {
            result = '2333';
        });
        return result;
    };
}]);
//调用自定义服务，数组注释法
//parent controller
myApp.controller('myCtrl', ['$scope', 'myService2', function($scope, myService) {
    $scope.text = {
        "entity": [{
                "id": "1",
                "name": "myName"
            },
            {
                "id": "2",
                "name": "爽哥"
            }
        ]
    };
    
    $scope.change = function() {
        console.log("change");
    };
    // var promise = myService.getData();
    // promise.then(function(response) {
    //     $scope.text = response.data.entity;

    // }, function() {
    //     $scope.text = 'unexisted';
    // });

    // $scope.text=myService.getData();

    myService.setText($scope.text);
    
    $scope.myService = myService;
    console.log($scope.myService.text);
    // myService.getData();
    // $scope.text = myService.getText();
}]);
//child controller
myApp.controller('myCtrl2', ['$scope', '$controller', function($scope, $controller) {
    var parentCtrl = $controller('myCtrl', { $scope: $scope }); //This works
    angular.extend(this, parentCtrl);
    $scope.text = '666';

    $scope.click = function() {
        parentCtrl.change();

        console.log($scope.text);
    };
}]);

myApp.controller('myCtrl3', ['$scope', 'myService2', function($scope, myService) {

    $scope.text = '666';
   
    $scope.myService = myService;
    $scope.click = function() {
        myService.changeData();
        $scope.text = $scope.myService.getText();

       console.log($scope.myService.text);
    };
}]);