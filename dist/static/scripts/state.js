const store = new Vuex.Store({
    state: {
        availableSizes: [],      
        availableFlavours: [],
        pizzas: [],
        current: {}        
    },
    mutations: {
        setAvailableSizes: function(state, sizes) {
            state.availableSizes = sizes;
        },
        setAvailableFlavours: function(state, flavours) {
            state.availableFlavours = flavours;
        },
        setPizza: function(state, pizza) {
            state.current = pizza;
        }
    },
    actions: {
        fetchSizes: function(context) {
            const sizes = 
            [
                {
                    name: "Família",
                    radius: 45,
                    price: 49.90
                },
                {
                    name: "Grande",
                    radius: 40,
                    price: 44.90
                },
                {
                    name: "Média",
                    radius: 35,
                    price: 40.90
                }
            ];
            
            // Request sizes in API
            context.commit('setAvailableSizes', sizes);            
            
        },
        fetchFlavours: function(context) {
            const flavours = [
                {
                    name: "Alho e Óleo",
                    description: "Lorem ipsum dollor sit amet."
                },
                {
                    name: "Calabre",
                    description: "Lorem ipsum dollor sit amet."
                },
                {
                    name: "Portuguesa",
                    description: "Lorem ipsum dollor sit amet."
                },
                {
                    name: "Coração",
                    description: "Lorem ipsum dollor sit amet."
                },
                {
                    name: "Toscana",
                    description: "Lorem ipsum dollor sit amet."
                },
                {
                    name: "Margarita",
                    description: "Lorem ipsum dollor sit amet."
                }
            ];
            // Request flavours in API
            context.commit('setAvailableFlavours', flavours);
        },
        clearPizza: function(context) {
            const emptyPizza = {
                flavours: {},
                size: null,
                maxFlavours: 1
            };
            context.commit('setPizza', emptyPizza);
        },
        setSize: function(context, size) {
            const pizza = _.clone(this.getters.currentPizza, isDeep=true);
            pizza.size = size;            
            context.commit('setPizza', pizza);
        },
        setFlavourMaxAmount: function(context, maxAmount) {
            const pizza = _.clone(this.getters.currentPizza, isDeep=true);
            pizza.maxFlavours = _.clamp(maxAmount, 1, 4);
            context.commit('setPizza', pizza);                      
        },
        incrementFlavour: function(context, payload)  {
            const pizza = _.clone(this.getters.currentPizza, isDeep=true);            
            if (payload.name in pizza.flavours === false) {
                pizza.flavours[payload.name] = 0
            }

            const maxStep = pizza.maxFlavours - this.getters.flavoursCount;
            let step = _.clamp(payload.amount, maxStep * -1, maxStep);
            let amount = pizza.flavours[payload.name];
            pizza.flavours[payload.name] = _.clamp(amount + step, 0, pizza.maxFlavours);
            context.commit('setPizza', pizza);            
        },
        decrementFlavour: function(context, payload)  {
            const pizza = _.clone(this.getters.currentPizza, isDeep=true);            
            if (payload.name in pizza.flavours === false) {
                pizza.flavours[payload.name] = 0;
            }
            
            let amount = pizza.flavours[payload.name];             
            pizza.flavours[payload.name] = _.clamp(amount - payload.amount, 0, pizza.maxFlavours);

            context.commit('setPizza', pizza);
        }
    },
    getters: {
        availableFlavours: (state) => state.availableFlavours,
        availableSizes: (state) => state.availableSizes,                    
        currentPizza: (state) => state.current,
        flavoursCount: (state) => Object.values(state.current.flavours).reduce(
            (previous, obj) => previous + obj
        , 0)
    }
})