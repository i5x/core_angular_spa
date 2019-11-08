
export class HomeComponent implements ng.IComponentOptions {
    static NAME: string = 'homeView';
    templateUrl: any;
    constructor() {
        this.templateUrl = "/partials/home/index";
    }
}
