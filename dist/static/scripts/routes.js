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
        // this.$store.dispatch('getSizes');   
    }
};

const SizePageFooter = { 
    template: '#sizes-page-footer-template',
    methods: {
        nextPage: function() {            
            this.$router.push('/quantidade-de-sabores');
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
};

const PostBuildFooter = {
    template: '#post-build-footer-template',
    methods: {
        goDelivery: function() {
            this.$router.push('/entrega');
        },
        goNewPizza: function() {
            this.$router.push('/');
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
            phone: ''
        }
    },
    methods: {
        validateForm: function(event) {
            event.preventDefault();
            const fields = [
                this.zipcode,
                this.address,
                this.number,
                this.complement,
                this.phone
            ];
            const isValid = _.every(fields, (value) => !_.isEmpty(value));
            
            if (isValid) {
                console.log("ok")
                return true;
            }
            
            console.log("nope")            
            
        }
    }
};

const DeliveryFooter = {
    template: '#delivery-footer-template',
    methods: {
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
    }
};
const PaymentFooter = { template: '#payment-footer-template' };

const CombosPage = { template: '#combos-page-template' };


const routes = [
    { 
        path: '/', 
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