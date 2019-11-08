import * as angular from 'angular';
import * as Constants from './constants';
import { HomeComponent } from './components/';

var mod = angular.module("ix.spa.portal", ['ui.router', 'ix.spa.framework']);

mod.component(HomeComponent.NAME, new HomeComponent());

mod.config(["$stateProvider", "$locationProvider",
    ($stateProvider, $locationProvider: ng.ILocationProvider) => {

        $stateProvider
            .state(Constants.ViewStates.Home,
                {
                    url: "/",
                    component: HomeComponent.NAME,
                    data: {
                        title: "Home",
                        roles: []
                    }
                })
            ;

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);


mod
    .run(['$rootScope', '$rootElement',
        ($rootScope: ng.IRootScopeService, $rootElement: ng.IRootElementService) => {
            $rootElement.off('click');
        }]);

angular.element(document).ready(() => {
    angular.bootstrap(document.getElementsByTagName("html")[0], ['ix.spa.portal'], {
        strictDi: true
    });
});

export default mod;