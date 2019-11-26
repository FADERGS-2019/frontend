var express = require('express');
var faker = require('faker');
var uuidv4 = require('uuid/v4');
var app = express();

app.use(express.static('dist', {
  etag: false
}));

const getRandomFlavour = function(maximum=4) {
  return {
    id: faker.random.number({min: 1, max: 100}),
    nome: faker.random.arrayElement(['Calabresa', 'Marguerita', 'Coração', 'Strognoff', '4 Queijos']),
    quantidade: faker.random.number({min: 1, max: maximum})
  }
}

const getRandomPizza = function() {
  const size = faker.random.arrayElement(['Grande', 'Media', 'Pequena']);
  const flavours = [];
  let flavoursLeft = faker.random.number({min: 1, max: 4});  
  while (flavoursLeft > 0) {
    const flavour = getRandomFlavour(flavoursLeft);
    const existingFlavour = flavours.find(item => item.nome == flavour.nome);
    if (existingFlavour) {
      existingFlavour.quantidade += flavour.quantidade;
    } else {
      flavours.push(flavour);
    }
    flavoursLeft = flavoursLeft - flavour.quantidade;
  }

  const pizza = {
    id: uuidv4(),
    tamanho: size,
    valor: faker.random.number({max: 120, precision: 2}),
    sabores: flavours,
    bordas: ''
  }

  return pizza;
}

app.post('/api/order', (req, res) => {
  res.json({
    "status": "ok"
  })
});

app.get('/api/orders', (req, res) => {
  const payload = [];
  for (let index = 0; index < 5; index++) {

    const itemsCount = faker.random.number({min: 1, max: 3});    
    const items = [];
    for (let k = 0; k < itemsCount; k++) {  
      items.push(getRandomPizza());
    }

    payload.push({
      cliente: {
        clienteId: faker.random.number({min: 1, max: 200}),
        nome: faker.name.findName(),
        endereco: faker.address.streetAddress(),
        telefone: faker.phone.phoneNumber(),
        id: faker.random.number({min: 1, max: 100})
      },
      entrega: {
        entregaId: 49,
        cep: "1",
        rua: faker.address.streetAddress(),
        numero: faker.random.number(),
        nome: faker.name.findName(),
        email: faker.internet.email(),
        telefone: faker.phone.phoneNumber(),
        complemento: faker.random.number({min: 1, max: 500})
      },
      pagamento: {
        pagamentoId: 48,
        total: 85.8,
        tipo: faker.random.arrayElement(['dinheiro','cartao']),
        bandeira: "TANTO_FAZ",
        metodo: "TANTO_FAZ",
        troco: faker.random.arrayElement([50, 100, 150, 200])
      },
      itens: items,
      pedidoId: faker.random.number({min: 1, max: 500}),
      id: faker.random.number({min: 1, max: 500})
    })
  }
  res.json(payload);
});

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
})

app.listen(3000, function () {
  console.log('Application listening on port 3000!');
});