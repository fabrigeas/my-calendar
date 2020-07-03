const { ServiceBroker } = require("moleculer");
const config = require("./moleculer.config");
const broker = new ServiceBroker(config);

broker.loadServices("./services", "*");

broker.start().then( async () => {
  
  console.clear();
  console.warn( Date().toString() );

})
.catch( error => console.error({error}));
