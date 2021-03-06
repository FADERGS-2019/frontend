const vuexLocal = new window.VuexPersistence.VuexPersistence({
    storage: window.localStorage
});

const store = new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        title: '',
        subtitle: '',
        availableSizes: [],      
        availableFlavours: [],
        lastPizzaId: 0,
        delivery: {
            zipcode: "",
            address: "",
            number: "",
            complement: "",
            name: "",
            email: "",
            cpf: ""        
        },
        pizzas: [],
        current: {},
        payment: {
            method: '',
            cardType: '',
            changeFor: 0
        },
        orders: []    
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
        },
        setLastPizzaId: function(state, id) {
            state.lastPizzaId = id;
        },
        setPizzas: function(state, pizzas) {
            state.pizzas = pizzas;
        },
        setPaymentMethod: function(state, method) {
            state.payment.method = method;
        },
        setChangeFor: function(state, value) {
            state.payment.changeFor = value;
        },
        setHeaderTitle: function(state, value) {
            state.title = value;
        },
        setHeaderSubtitle: function(state, value) {
            state.subtitle = value;
        },
        setDelivery: function(state, data) {
            state.delivery.name = data.name;
            state.delivery.email = data.email;
            state.delivery.phone = data.phone;
            state.delivery.address = data.address;
            state.delivery.zipcode = data.zipcode;
            state.delivery.complement = data.complement;
            state.delivery.number = data.number;                   
            state.delivery.cpf = data.cpf;                   
        },
        setOrders: function(state, orders) {
            state.orders = orders;
        }
    },
    actions: {
        setHeader: function(context, data) {        
            const { title, subtitle } = data   
            context.commit('setHeaderTitle', title)
            context.commit('setHeaderSubtitle', subtitle);
        },
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
                    name: "Calabresa",
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
        clear: function(context) {
            context.commit('setPizzas', []);
            context.commit('setPaymentMethod', '');
            context.commit('setChangeFor', 0);
            context.commit('setLastPizzaId', 0);
            this.dispatch('clearPizza');
        },
        clearPizza: function(context) {
            const pizzaId = this.state.lastPizzaId + 1;
            const emptyPizza = {
                id: pizzaId,
                flavours: {},
                size: null,
                maxFlavours: 1,
                price: 0
            };
            context.commit('setLastPizzaId', pizzaId);
            context.commit('setPizza', emptyPizza);
        },
        savePizza: function(context) {
            const pizza = _.clone(this.getters.currentPizza, isDeep=true);
            pizza.price = pizza.size.price;
            const pizzas = this.state.pizzas.filter((p) => p.id != pizza.id);
            pizzas.push(pizza);
            context.commit('setPizzas', pizzas);                        
        },
        removePizza: function(context, pizza) {                        
            const pizzas = this.state.pizzas.filter((p) => p.id != pizza.id);            
            context.commit('setPizzas', pizzas);
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

            if (pizza.flavours[payload.name] != amount) {
                context.commit('setPizza', pizza);
            }
            
        },
        decrementFlavour: function(context, payload)  {
            const pizza = _.clone(this.getters.currentPizza, isDeep=true);            
            if (payload.name in pizza.flavours === false) {
                pizza.flavours[payload.name] = 0;
            }
            
            let amount = pizza.flavours[payload.name];             
            pizza.flavours[payload.name] = _.clamp(amount - payload.amount, 0, pizza.maxFlavours);

            if (pizza.flavours[payload.name] != amount) {
                context.commit('setPizza', pizza);
            }
        },
        setPaymentMethod: function(context, method) {
            if (_.includes(['card', 'money'], method)) {
                context.commit('setPaymentMethod', method);
            }
        },
        setChangeFor: function(context, value) {
            if (value > 0) {
                context.commit('setChangeFor', value);
            }
        },
        setDelivery: function(context, deliveryDetails) {
            context.commit('setDelivery', deliveryDetails);
        },
        setOrders: function(context, orders) {
            context.commit('setOrders', orders);
        }       
    },
    getters: {
        availableFlavours: (state) => state.availableFlavours,
        availableSizes: (state) => state.availableSizes,                    
        currentPizza: (state) => state.current,
        flavoursCount: (state) => {
            if (state.current.flavours == null) {
                return 0;
            }
            return Object.values(state.current.flavours).reduce((previous, obj) => previous + obj , 0)
        },
        payment: (state) => state.payment,
        pizzas: (state) => state.pizzas,
        backendRequest: (state) => {

            const deliveryDetails = {
                cep: state.delivery.zipcode,
                rua: state.delivery.address,
                numero: state.delivery.number,
                nome: state.delivery.name,
                email: state.delivery.email,
                telefone: state.delivery.phone,
                complemento: state.delivery.complement,
                cpf: state.delivery.cpf
            }

            const itemsDetails = _.map(state.pizzas, (pizza) => {
                return {
                    tipo: "pizza",
                    tamanho: pizza.size.name,
                    borda: "",
                    valor: pizza.price,
                    sabores: _.map(pizza.flavours, (value, key) => {
                        return {
                            nome: key,
                            quantidade: value
                        }
                    })
                }
            });

            const paymentDetails = {
                total: _.reduce(state.pizzas, (prev, curr) => prev + curr.price, 0),
                tipo: state.payment.method == "card" ? "cartao" : "dinheiro",
                bandeira: "TANTO_FAZ",
                metodo: "TANTO_FAZ",
                troco: state.changeFor != null ? state.changeFor : 0
            };

            const request = {
                entrega: deliveryDetails,
                itens: itemsDetails,
                pagamento: paymentDetails
            }
            
            // console.log(request);
            return request;
        },
        orders: (state) => state.orders
    }
})