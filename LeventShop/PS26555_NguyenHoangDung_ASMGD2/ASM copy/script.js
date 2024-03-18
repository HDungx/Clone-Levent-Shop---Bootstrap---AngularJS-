var app = angular.module("myapp", ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: 'TrangChu.html',
                controller: 'myCtrl',
                controllerAs: 'home'
            })
            .when("/cuahang", {
                templateUrl: 'CuaHang.html',
                controller:'storeCtrl'
            }).when("/login", {
                templateUrl: 'Login.html'
            }).when("/signup", {
                templateUrl: 'SignUp.html'
            })
            .when("/thanhtoan", {
                templateUrl: 'ThanhToan.html',
                controller: 'ThanhToanCtrl'
            }).when("/chitietSP/:id", {
                templateUrl: 'ChiTietSanPham.html',
                controller: 'chitietSPCtrl'
            }).otherwise({
                redirectTo: "/home"
            })
    }).controller("myCtrl", function myfunc($scope, $rootScope,$http) {
        $rootScope.giohang = [];
        $rootScope.listSP = [];
        $http.get("data.json").then(function(res){
            $rootScope.listSP=res.data;
        })
        $scope.listDecor = [{
            id: 1,
            name: "LEVENTS® BASIC BOXY HOODIE/ BROWN",
            img: "image/Male1.png"
        }, {
            id: 2,
            name: "LEVENTS® HEART PUZZLE TEE/ BLACK",
            img: "image/Famale1.png"
        }, {
            id: 3,
            name: "LEVENTS® HOT AIR BALLOON TEE/ CREAM",
            img: "image/Male2.png"
        }, {
            id: 4,
            name: "LEVENTS® FLOWER CART RAGLAN REGULAR TEE/ BLUE",
            img: "image/Famale2.png"
        }]

        //Event thu nhỏ trang sẽ ẩn thanh menu
        $scope.isSmallScreen = function () {
            return window.innerWidth < 992;
        };

        angular.element(window).on("resize", function () {
            $scope.$apply(function () {
                $scope.isSmallScreen();
            });
        });
    }).controller("addcart", function ($scope, $rootScope) {
        $scope.mua = function (sp) {
            var chuaCo = true;
            //TH1: chưa có sp trong giỏ hàng
            for (const item of $rootScope.giohang) {
                //TH2: Có sản phẩm tăng lên
                if (item.id == sp.id) {
                    item.soluong++;
                    chuaCo = false;
                    break;
                }
            }
            if (chuaCo) {
                sp.soluong = 1;
                $rootScope.giohang.push(sp);
            }
        }
    }).controller('chitietSPCtrl', function ($scope, $routeParams, $rootScope) {
        var id = $routeParams.id;
        $scope.sanpham = $rootScope.listSP.filter(sp => sp.id == id)[0];

    }).controller('ThanhToanCtrl', function ($scope, $routeParams, $rootScope) {
        $scope.tinhTongTien = function () {
            var tong = 0;
            for (const item of $rootScope.giohang) {
                tong = tong + item.price * item.soluong;
            }
            return tong
        }
        $scope.tongSP = function () {
            var tongSPs = 0;
            for (const item of $rootScope.giohang) {
                tongSPs = tongSPs + item.soluong;
            }
            return tongSPs;
        }
        $scope.xoaHet = function () {
            $rootScope.giohang = []
        }
        $scope.xoa = function (id) {
            $rootScope.giohang = $rootScope.giohang.filter(sp => sp.id != id);
        }

        $scope.showError=false;
        $scope.submidForm=function(){
            if($scope.ckValid.$invalid){
                $scope.showError=true;
            }
            $scope.showError=false;
            alert("Thanh Toán thành công!")
            return;
        }

    }).controller('storeCtrl', function ($scope, $rootScope) {
        $scope.kieu='';
        $scope.loai='';
        $scope.order=function(loai,kieu){
            $scope.kieu=kieu;
            $scope.loai=loai;
        }
        $scope.limit=8;
        $scope.showMore=function(){
            $scope.limit+=8;
        }

     });