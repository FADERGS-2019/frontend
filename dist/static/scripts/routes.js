const StartPage = { 
    template: '#start-page-template',
    methods: {
        goSizes: function() {            
            this.$router.push('/tamanhos');
        },
        goFlavours: function() {            
            this.$router.push('/sabores');
        },
        goCombos: function() {
            this.$router.push('/combos');
        }
    },
    mounted: function()
    {
        this.$store.dispatch('setHeader', {
            title: 'Iniciando',
            subtitle: ''
        });   
    }
};

const SizesPage = { 
    template: '#sizes-page-template',
    data: function() {
        return {
         
        }
    },
    methods: {
        selectSize: function(size) {
            this.$store.dispatch('setSize', size);
        },
        isSelected: function(size) {    
            const currentSize = this.$store.getters.currentPizza.size;
            return currentSize == null ? false : currentSize.name === size.name;            
        }
    },
    mounted: function()
    {
        this.$store.dispatch('setHeader', {
            title: 'Tamanhos',
            subtitle: ''
        });   
    }
};

const SizePageFooter = { 
    template: '#sizes-page-footer-template',
    methods: {
        nextPage: function() {            
            this.$store.dispatch('setFlavourMaxAmount', 4);
            this.$router.push('/sabores');
        }
    },
    computed: {
        canContinue: function() {
            const currentPizza = this.$store.getters.currentPizza;
            return currentPizza.size != null;            
        }
    }
};

const FlavoursPage = {
    template: '#flavours-page-template',
    methods: {
        currentFlavourAmount: function(flavourName) {
            const currentPizza = this.$store.getters.currentPizza;            
            return (flavourName in currentPizza.flavours) ? currentPizza.flavours[flavourName] : 0;
        }
    },
    mounted: function()
    {        
        const flavoursAmount = this.$store.getters.currentPizza.maxFlavours;
        const flavourSuffix = flavoursAmount > 1 ? 'sabores' : 'sabor';
        this.$store.dispatch('setHeader', {
            title: 'Sabores',
            subtitle: 'Escolha até ' + flavoursAmount + ' ' + flavourSuffix + '!'
        });   
    }
};

const FlavoursFooter = {
    template: '#flavours-footer-template',
    methods: {
        continueProcess: function() {
            this.$store.dispatch('savePizza');
            this.$store.dispatch('clearPizza');
            this.$router.push('/pizza-adicionada');
        }        
    },
    computed: {
        canContinue: function() {
            return this.$store.getters.flavoursCount > 0;
        }
    }
};

const FlavoursAmountPage = { 
    template: '#flavours-amount-page-template',
    data: function() {
        return {
            amountOfFlavours: 1
        }
    },
    methods: {
        add: function(event) {    
            this.changeAmountOfFlavours(event.amount);
        },
        remove: function(event) {
            this.changeAmountOfFlavours(event.amount * -1);
        },
        changeAmountOfFlavours: function(amount) {
            const maxFlavours = this.$store.getters.currentPizza.maxFlavours;
            this.$store.dispatch('setFlavourMaxAmount', maxFlavours + amount);             
        }     
    },
    mounted: function() {
        this.$store.dispatch('setHeader', {
            title: 'Quantidade de sabores',
            subtitle: ''
        });   
    }
};

const FlavoursAmountFooter = {
    template: '#flavours-amount-footer-template',
    methods: {
        continueProcess: function() {
            this.$router.push('/sabores');
        }
    }
};

const PostBuildPage = { 
    template: '#post-build-page-template',
    mounted: function()
    {
        this.$store.dispatch('setHeader', {
            title: 'Concluído',
            subtitle: ''
        });   
    }
};

const PostBuildFooter = {
    template: '#post-build-footer-template',
    methods: {
        goCart: function() {
            this.$router.push('/carrinho');
        },
        goNewPizza: function() {
            this.$router.push('/tamanhos');
        }
    }
};

const DeliveryPage = { 
    template: '#delivery-page-template',
    data: function() {
        return {
            zipcode: '',
            address: '',
            number: '',
            complement: '',
            phone: '',
            email: '',
            name: '',
            cpf: 'TANTO_FAZ'
        }
    },
    methods: {
        onlyNumbers: function(value) {
            // Verify numbers here...!
        },
        validateForm: function(event) {
            event.preventDefault();

            const fields = [
                this.zipcode,
                this.address,
                this.number,
                this.complement,
                this.phone,
                this.email,
                this.name,
                this.cpf
            ];
            
            let isValid = _.every(fields, (value) => !_.isEmpty(value));

            // Verifica se CEP é válido(lodash)
            // isValid = (this.zipcode.length == 8) && (this.onlyNumbers(this.zipcode));
            
            if (isValid) {
                const payload = {
                    cep: this.zipcode,
                    rua: this.address,
                    numero: this.number,
                    nome: this.name,
                    email: this.email,
                    telefone: this.phone,
                    complemento: this.complement,
                    cpf: this.cpf
                };

                axios.post('http://localhost:51627/api/Clientes/post', payload)
                    .then((response) => {
                        this.$store.dispatch('setDelivery', {
                            zipcode: this.zipcode,
                            address: this.address,
                            number: this.number,
                            complement: this.complement,
                            phone: this.phone,
                            email: this.email,
                            name: this.name,
                            cpf: this.cpf
                        });
                        
                        return true;
                    })
                    .catch((error) => console.log(error))
                    .finally(() => {
                        this.$router.push('/tamanhos');
                    });
            }                        
        }
    },
    mounted: function()
    {
        this.$store.dispatch('setHeader', {
            title: 'Entrega',
            subtitle: 'Dados de entrega'
        });   
    }
};

const DeliveryFooter = {
    template: '#delivery-footer-template',
    methods: {
        goStart: function() {
            this.$router.push('/iniciar');
        }
    }
};

const PaymentPage = { 
    template: '#payment-page-template',
    data: function() {
        return {
        }
    },
    methods: {
        selectMethod: function(method) {
            this.$store.dispatch('setPaymentMethod', method);
        }
    },
    computed: {
        selectedMethod: function() {
            const payment = this.$store.getters.payment;
            return payment.method;
        },
        changeFor: {
            get: function() {
                this.$store.getters.changeFor;
            },
            set: function(value) {
                this.$store.dispatch('setChangeFor', value);
            }
        }
    },    
    mounted: function()
    {
        this.$store.dispatch('setHeader', {
            title: 'Pagamento',
            subtitle: 'Escolha o método de pagamento'
        });   
    }
};

const PaymentFooter = { 
    template: '#payment-footer-template',    
    data: function() {
        return {
            isProcessing: false
        }
    },
    methods: {
        nextPage: function() {
            this.isProcessing = true;            
            const request = this.$store.getters.backendRequest;   
            console.log(request) ;        
            axios.post('http://localhost:51627/api/Pedidos/post', request)
                .then((response) => {
                    this.$store.dispatch('clear')                    
                    this.$router.push('/finalizado');                   
                })
                .catch((error) => {
                    console.error(error);
                })
        }
    }
};


const PostPaymentPage = {
    template: '#post-payment-page-template',
    mounted: function()
    {
        this.$store.dispatch('setHeader', {
            title: 'Finalizado',
            subtitle: 'Obrigado por nos escolher!'
        });   
    }
};

const PostPaymentFooter = {
    template: '#post-payment-footer-template',
    methods: {
        restart: function() {            
            this.$router.push('/');            
        }
    }
};

const CartPage = {
    template: '#cart-page-template',
    methods: {
        formatFlavours: function(pizza) {
            let index = 0;
            return _.reduce(pizza.flavours, (prev, value, key) => {                    
                console.log(index);
                index ++;            
                const formated = value + 'x ' + key;                         
                
                if (index == 1) {
                    return formated;
                } else {
                    if (index == _.size(pizza.flavours)) {
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
        removePizza: function(pizza) {
            this.$store.dispatch('removePizza', pizza);
        }
    },
    computed: {
        pizzas: function() {
            return this.$store.getters.pizzas;
        },
        orderTotal: function() {
            return _.reduce(this.pizzas, (prev, curr) => prev + curr.price, 10);
        }
    },
    mounted: function()
    {
        this.$store.dispatch('setHeader', {
            title: 'Carrinho',
            subtitle: 'Pedidos até agora'
        });   
    }
};

const CartFooter = {
    template: '#cart-footer-template',
    methods: {
        goPayment: function() {
            this.$router.push('/pagamento');
        }
    },
    computed: {
        canContinue: function() {
            return this.$store.getters.pizzas.length > 0;
        }
    }
};

const OrdersPage = {
    template: '#orders-page-template',
    data: function() {
        return {
            fetchInterval: undefined,
            orders: []
        }
    },
    methods: {
        formatPrice: function(value) {
            return "R$ " + value.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                currency: 'BRL'
            });
        },
        removeOrder: function(order) {
            console.log('Removendo...')
            const payload = {
                entrega: {
                    email: "asdsad"//order.cliente.email
                },
                pedidoId: order.pedidoId,
                id: order.id
            }
            axios.post('http://localhost:51627/api/Pedidos/postdone', payload)
            this.orders = _.filter(orders, (item) => item.id != order.id)
        },        
        fetchOrders: function() {
            console.log('Fetching new orders...');            
            axios.get('http://localhost:51627/api/Pedidos/GetNotDone')
                .then((response) => {
                    this.orders = response.data;
                    // this.$store.dispatch('setOrders', response.data);
                });
        }
    },
    mounted: function()
    {
        this.$store.dispatch('setHeader', {
            title: 'Pedidos',
            subtitle: 'Pedidos pendentes'
        });
        
        this.fetchOrders();
        // this.fetchInterval = setInterval(this.fetchOrders, 5000);
    }
};


const CombosPage = { template: '#combos-page-template' };


const routes = [
    { 
        path: '/', 
        components: {
            default: DeliveryPage,
            footer: DeliveryFooter        
        }
    },
    { 
        path: '/iniciar',
        components: {
            default: StartPage          
        }
    },
    {
        path: '/tamanhos', 
        components: {
            default: SizesPage,
            footer: SizePageFooter
        }  
    },
    {
        path: '/quantidade-de-sabores', 
        components: {
            default: FlavoursAmountPage,
            footer: FlavoursAmountFooter
        }  
    },
    {
        path: '/sabores', 
        components: {
            default: FlavoursPage,
            footer: FlavoursFooter
        }  
    },
    {
        path: '/pizza-adicionada',
        components: {
            default: PostBuildPage,
            footer: PostBuildFooter
        }
    },
    {
        path: '/entrega',
        components: {
            default: DeliveryPage,
            footer: DeliveryFooter
        }
    },
    {
        path: '/pagamento',
        components: {
            default: PaymentPage,
            footer: PaymentFooter
        }
    },
    {
        path: '/finalizado',
        components: {
            default: PostPaymentPage,
            footer: PostPaymentFooter
        }
    },
    {
        path: '/carrinho',
        components: {
            default: CartPage ,
            footer: CartFooter           
        }
    },
    {
        path: '/pedidos',
        components: {
            default: OrdersPage
        }
    },
    {
        path: '/combos', 
        components: {
            default: CombosPage
        }  
    },
];

const router = new VueRouter({
    mode: 'history',
    routes
});