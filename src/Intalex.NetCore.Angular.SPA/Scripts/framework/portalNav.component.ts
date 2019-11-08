
export class PortalNavComponent implements ng.IComponentOptions {
    static NAME: string = 'ixNav';
    template: any;
    constructor() {
        this.template = `
    <nav class="navbar">
        <div class="container">
            <div class="logo"><img src="/images/Intalex Logo.png" alt="Intalex Logo" /></div>
            <div class="navbar-header">
                <a ui-sref="home" class="navbar-brand">Intalex Web Portal</a>
            </div>
            <div class="navbar-content">
                <main-menu></main-menu>
            </div>
        </div>
    </nav>
`;
    }
}
