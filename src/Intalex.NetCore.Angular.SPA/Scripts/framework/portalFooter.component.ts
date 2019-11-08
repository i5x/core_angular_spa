
export class PortalFooterComponent implements ng.IComponentOptions {
    static NAME: string = 'ixFooter';
    template: any;
    constructor() {
        this.template = `
    <footer>
        <p class="copy">&copy; 2019 - Intalex Technologies</p>
    </footer>
`;
    }
}
