

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
    }
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

Vue.component('app-order-card', {
    template: '#app-order-card-template',
    props: ['order'],
    data: function() {
        return {
            showDetails: false
        }
    },
    methods: {
        toggleDetails: function() { this.showDetails = !this.showDetails },
        removeOrder: function() {
            axios.post('http://localhost:51627/api/Pedidos/postdone', {
                entrega: {
                    email: this.order.entrega.email
                },
                pedidoId: this.order.pedidoId,
                id: this.order.id
            }).then((response) => {
                this.$emit('removed', this.order);                   
            });
        },
        formatFlavours: function(flavours) {
            let index = 0;
            return _.reduce(flavours, (prev, value, key) => {                
                index ++;            
                const formated = value.quantidade + 'x ' + value.nome;                         
                
                if (index == 1) {
                    return formated;
                } else {
                    if (index == _.size(flavours)) {
                        return prev + " e " + formated;
                    }
                }
                return prev + ', ' + formated;
            }, '')
        },
        formatPrice: function(value) {
            return "R$ " + value.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                currency: 'BRL'
            });
        },
        totalPrice: function(order) {
            return _.reduce(order.itens, (prev, curr) => prev + curr.valor, 0);
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
        },
        hasPizzas: function() {
            return this.$store.getters.pizzas.length > 0;
        }
    },
    methods: {
        goBack: function() {
            window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
        },
        goCart: function() {
            this.$router.push('/carrinho');
        }
    },
    mounted: function() {
        this.$store.dispatch('fetchSizes');
        this.$store.dispatch('fetchFlavours');
        if (_.isEmpty(this.$store.getters.currentPizza)) {
            console.log("Pizza is empty, clearing...");
            this.$store.dispatch('clearPizza');
        }        
        console.log('Ready');
    }
});

