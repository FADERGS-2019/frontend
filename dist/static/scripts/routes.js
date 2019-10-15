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
            this.$store.dispatch('setSelectedSize', size);
        },
        isSelected: function(size) {            
            return (this.$store.state.selectedSize.name == size.name);
        }
    },
    mounted: function()
    {
        this.$store.dispatch('getSizes');   
    }
};

const SizePageFooter = { 
    template: '#sizes-page-footer-template',
    methods: {
        continueProcess: function() {            
            this.$router.push('/quantidade-de-sabores');
        }
    },
    computed: {
        canContinue: function() {
            return _.isEmpty(this.$store.state.selectedSize);
        }
    }
};
const FlavoursPage = { template: '#flavours-page-template' };
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
            this.amountOfFlavours += amount;
            this.amountOfFlavours = Math.min(4, Math.max(this.amountOfFlavours, 1));
        }     
    },
    mounted: function() {
        this.$store.dispatch('getFlavours');   
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
            default: FlavoursPage
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