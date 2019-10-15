const store = new Vuex.Store({
    state: {
        sizes: [],
        selectedSize: {},
        flavours: [],
        selectedFlavours: {

        },
        pizzas: []
    },
    mutations: {
        setSizes: function(state, sizes) {
            state.sizes = sizes;
        },
        setSelectedSize: function(state, size) {
            state.selectedSize = size;
        },
        setFlavours: function(state, flavours) {
            state.flavours = flavours;
        },
    },
    actions: {
        getSizes: function(context) {
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
            context.commit('setSizes', sizes);
            // setTimeout(() => context.commit('setSizes', sizes), 500);
            
        },
        setSelectedSize: function(context, size) {
            context.commit('setSelectedSize', size);
        },
        getFlavours: function(context) {
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
            context.commit('setFlavours', flavours);
        }
    },
    getters: {
        sizes: (state) => state.sizes,
        selectedSize: (state) => state.selectedSize,
        flavours: (state) => state.flavours,
        selectedFlavours: (state) => state.selectedFlavours        
    }
})