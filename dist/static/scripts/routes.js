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