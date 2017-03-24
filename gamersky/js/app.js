var myapp=angular.module("myapp",["ionic"]);
myapp.config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    // 去掉后退按钮的文字
    $ionicConfigProvider.backButton.text("");
    $ionicConfigProvider.backButton.previousTitleText("");
    $stateProvider
        .state("tabs",{
            url:"/tabs",
            abstract:true,  // 抽象地，意思是不直接显示
            templateUrl:"templates/tabs/tabs.html"
        })
        .state("tabs.news",{
            url:"/news",
            views: {
                'tabs-news': {
                    templateUrl: "templates/news/news.html",
                    controller:"newsCtrl"
                }
            }
        })
        .state("tabs.gameLibrary",{
            url:"/gameLibrary",
            views: {
                'tabs-gameLibrary': {
                    templateUrl: "templates/gameLibrary/gameLibrary.html",
                    controller:"gameLibraryCtrl"
                }
            }
        })
        .state("tabs.mobileGames",{

            url:"/mobileGames",
            views: {
                'tabs-mobileGames': {
                    templateUrl: "templates/mobileGames/mobileGames.html",
                    controller:"mobileGamesCtrl"
                }
            }
        })
        .state("tabs.subscription",{

            url:"/subscription",
            views: {
                'tabs-subscription': {
                    templateUrl: "templates/subscription/subscription.html",
                    controller:"subscriptionCtrl"
                }
            }
        })
        .state("tabs.search",{

            url:"/search",
            views: {
                'tabs-gameLibrary': {
                    templateUrl: "templates/search/search.html",
                    controller:"searchCtrl"
                }
            }
        })
        .state("tabs.search2",{

            url:"/search2",
            views: {
                'tabs-mobileGames': {
                    templateUrl: "templates/search/search.html",
                    controller:"searchCtrl"
                }
            }
        })
    .state("tabs.dingyue",{

        url:"/dingyue",
        views: {
            'tabs-subscription': {
                templateUrl: "templates/dingyue/dingyue.html",
                controller:"dingyueCtrl"
            }
        }
    });
    $urlRouterProvider.otherwise("/tabs/news")
});
myapp.controller('myCtrl', function($scope, $ionicModal,$state,$ionicSlideBoxDelegate) {


    // 构造模式对话框 - 创建仅服务于当前页面的子页面
    $ionicModal.fromTemplateUrl('views/modal.html', {
        scope: $scope,       // 作用域使用父作用域
//                        animation: 'slide-in-up'  // 内置了一种动画，其余是自己写的
        animation: 'slide-in-left'
//                        animation: 'slide-in-right'
//                        animation: 'scale-in'
    }).then(function(modal) {
        // 将这个模态对话框保存到一个变量中，方便以后再使用
        $scope.modal = modal;   // 传入的参数model就是构造好的对话框
    });

    $scope.openModal = function() {
        $scope.modal.show();        // 打开对话框
    };

    $scope.closeModal = function() {
        $scope.modal.hide();        // 隐藏对话框(隐藏不是销毁)
    };


    // 离开时清除model
    $scope.$on('$destroy', function() {
        $scope.modal.remove();
    });

    // 在隐藏modal时执行一些动作
    $scope.$on('modal.hidden', function() {
        // 在这里执行一些操作
    });

    // 在移除modal时执行一些动作
    $scope.$on('modal.removed', function() {
        // 在这里执行一些操作
    });

//滑动页面
    $scope.tabNames=['新闻','游戏库','手游','订阅'];
    $scope.slectIndex=0;
    $scope.activeSlide=function(index){//点击时候触发
        $scope.slectIndex=index;
        $ionicSlideBoxDelegate.slide(index);
    };
    $scope.slideChanged=function(index){//滑动时候触发
        $scope.slectIndex=index;
    };
    $scope.pages=["templates/search/tab01.html","templates/search/tab02.html","templates/search/tab03.html","templates/search/tab04.html"];


});
//子页面隐藏tab栏
myapp.directive('hideTabs', function($rootScope) {
    return {
        restrict: 'A',
        link: function(scope, element, attributes) {
            scope.$on('$ionicView.beforeEnter', function() {
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });

            scope.$on('$ionicView.beforeLeave', function() {
                $rootScope.hideTabs = false;
            });
        }
    };
});

