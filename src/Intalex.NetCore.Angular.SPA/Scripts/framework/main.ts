import * as angular from 'angular';
import { MainMenuComponent } from './mainMenu.component';
import { PortalNavComponent } from './portalNav.component';
import { PortalFooterComponent } from './portalFooter.component';


var mod = angular.module("ix.spa.framework", []);


mod.component(MainMenuComponent.NAME, new MainMenuComponent());
mod.component(PortalNavComponent.NAME, new PortalNavComponent());
mod.component(PortalFooterComponent.NAME, new PortalFooterComponent());


export default mod;