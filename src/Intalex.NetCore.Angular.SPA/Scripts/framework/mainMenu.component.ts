

export class MainMenuComponent implements ng.IComponentOptions {
    static NAME: string = 'mainMenu';
    template: any;
    constructor() {
        this.template = `
                <ul class="nav">
                    <li><a ui-sref="home"><i class="icon-home"></i></a></li>
                </ul>
`;
    }
}
