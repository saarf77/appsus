export default {
    name: 'appAbout',

    template: `
        <section class="about-page">
            <!-- <h1 class="about-title">About us</h1> -->
            <nav>
                <router-link to="/about/team">Team</router-link> |
                <router-link to="/about/goals">Goals</router-link> |
                <router-view></router-view>
            </nav>
            <hr />

            <p> <strong> AppSus </strong> is a unique tech institution.
            Our mission to organize the world’s information and make it universally 
            accessible and useful has always been core to everything we do at AppSus.
            It’s why we make so many of our products, like Keeps, Books, and Gmail, 
            accessible and free of charge to everyone.
            </p>
        </section>
    `,
    data() {
        return {
            interval: null,
        }
    },
    unmounted() {
        console.log('AboutPage Going Down!')
    },
    methods: {

    },
    components: {

    },
}