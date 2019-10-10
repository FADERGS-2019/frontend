const StartPage = { 
    template: '#start-page-template',
    methods: {
        goFlavours: function() {
            // console.log('Hello from start page!');
            this.$router.push('/sabores');
        },
        goCombos: function() {
            this.$router.push('/combos');
        }
    }
};
const FlavoursPage = { template: '#flavours-page-template' };
const CombosPage = { template: '#combos-page-template' };

const routes = [
    { path: '/', component: StartPage },
    { path: '/sabores', component: FlavoursPage },
    { path: '/combos', component: CombosPage },
];

const router = new VueRouter({
    routes
});

Vue.component('app-card', {
    template: '#app-card-template',
    props: ['featured']
});

Vue.component('app-flavour-card', {
    template: '#app-flavour-card-template',
    props: ['name', 'description', 'amount'],
    data: function() {
        return {
            // _amount: this.amount
        }
    },
    methods: {
        add: function(event) {
            this.amount = parseInt(this.amount) + event.amount;
        },
        remove: function(event) {
            this.amount = parseInt(this.amount) - event.amount;
        }
    },
    // computed: {
    //     amount: function() {
    //         return this.amount
    //     }
    // }
});

Vue.component('app-counter', {
    template: '#app-counter-template',
    props: ['value', 'step'],
    methods: {
        add: function() {
            this.$emit('add', {
                amount: parseInt(this.step)
            });
        },
        remove: function() {
            this.$emit('remove', {
                amount: parseInt(this.step)
            });
        }
    }
});

const app = new Vue({
    el: '#app',
    data: {       
    },
    router: router,
    computed: {
        canGoBack: function() { 
            return window.history.length > 1
        }
    },
    methods: {
        goBack: function() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
        }
    }
});

