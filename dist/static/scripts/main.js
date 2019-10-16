

Vue.component('app-card', {
    template: '#app-card-template',
    props: ['featured']
});

Vue.component('app-flavour-card', {
    template: '#app-flavour-card-template',
    props: ['name', 'description', 'amount'],
    data: function() {
        return {

        }
    },
    methods: {
        onAdd: function(event) {
            this.$store.dispatch('incrementFlavour', {
                name: this.name,
                amount: event.amount
            });            
        },
        onRemove: function(event) {
            this.$store.dispatch('decrementFlavour', {
                name: this.name,
                amount: event.amount
            });            
        }
    },
    // computed: {
    //     amount: function() {
    //         return this.amount
    //     }
    // }
});

Vue.component('app-size-card', {
    template: '#app-size-card-template',
    props: ['name', 'description', 'radius', 'price', 'selected'],
    data: function() {
        return {

        }
    },
    computed: {
        formattedPrice: function() {
            return `R$ ${this.price.toFixed(2)}`;
        }
    }
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

Vue.component('app-payment-card', {
    template: '#app-payment-card-template',
    props: ['name', 'description', 'selected'],
    data: function() {
        return {

        }
    }
});

const app = new Vue({
    el: '#app',
    store,
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
    },
    mounted: function() {
        this.$store.dispatch('fetchSizes');
        this.$store.dispatch('fetchFlavours');
        this.$store.dispatch('clearPizza');
        console.log('Ready');
    }
});

