'use strict';
var myApp = angular.module("myApp");
//声明自定义服务
// myApp.service('myService', ['$http', '$q', function($http, $q) {
//     this.getData = function() {
//         var defer = $q.defer(); //声明延后执行
//         $http.get('js/data.json').then(function(response) {
//             defer.resolve(response); //声明执行成功

//         }, function(response) {
//             defer.reject(response); //声明执行失败
//         });
//          return defer.promise; //返回承诺，返回获取数据的API
//     };    
// }]);