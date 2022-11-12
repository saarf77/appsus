export default {
    name: 'appHeader',

    template: `
        <header class="app-header flex space-between">
            <router-link class="sprite title" to="/"></router-link>
            <nav class="main-nav flex align-center">
                <router-link to="/mail/list"><div class="sprite mail" title="Mail"></div></router-link>
                <router-link to="/keep"><div class="sprite keep" title="Notes"></div></router-link>
                <router-link to="/books"><div class="sprite books" title="Books"></div></router-link>
                <router-link to="/about"><div class="sprite about" title="About"></div></router-link>
            </nav>
            <!-- <button type="button" class="btn-menu" @toggleMenu= "toggleMenu">☰</button> -->
        </header>
    `,
    // methods: {
    //     toggleMenu() {
    //         document.body.classList.toggle('menu-open');
    //     }
    // },
}
