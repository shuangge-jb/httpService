'use strict';
var myApp = angular.module("myApp", ["ui.router"]);
myApp.config(function($stateProvider, $urlRouterProvider) {
    //用于设置默认的视图
    $urlRouterProvider.when("", "/all");
    //配置跳转的视图，包括一级视图和二级视图
    //一级视图对应的是菜单
    //二级视图对应的是子页面
    $stateProvider.state("all", { url: "/all", templateUrl: "page/pageTab.html" })
    .state("all.database", { url: "/database", templateUrl: "page/database.html" })
    .state("all.redis", { url: "/redis", templateUrl: "page/instance_redis.html" });
        
});