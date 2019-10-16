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
                size: null
            };
            context.commit('setPizza', emptyPizza);
        },
        setSize: function(context, size) {
            const pizza = _.clone(this.getters.currentPizza, isDeep=true);
            pizza.size = size;            
            context.commit('setPizza', pizza);
        },
        incrementFlavour: function(context, payload)  {
            const pizza = _.clone(this.getters.currentPizza, isDeep=true);
            
            if (payload.name in pizza.flavours === false) {
                pizza.flavours[payload.name] = parseInt(payload.amount);
            } else {
                pizza.flavours[payload.name] += parseInt(payload.amount);
            }
            context.commit('setPizza', pizza);
        },
        decrementFlavour: function(context, payload)  {
            console.log(payload);
        }
    },
    getters: {
        availableFlavours: (state) => state.availableFlavours,
        availableSizes: (state) => state.availableSizes,                    
        currentPizza: (state) => state.current        
    }
})