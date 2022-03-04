const { assert } = require("console");

 const Deed = artifacts.require('Deed');

 contract('Deed', (accounts) =>{
     let deed = null;
     before(async () => {
         deed = await Deed.deployed();
     });
     it('Should withdraw', async () => {
         const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
         await new Promise(resolve => setTimeout(resolve, 5000))
         await deed.withdraw({from: accounts[0]});
         const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]))
         assert(finalBalance.sub(initialBalance).toNumber()===100)

     })

     it('should not withdraw if too early', async() => {
        const deed = await Deed.new(
            accounts[0], 
            accounts[1], 
            5,
            {value: 100}
            );
        
        try {
            await deed.withdraw({from: accounts[0]});   
        } catch (error) {
          assert(error.message.includes('too early'))
          return  
        }
        assert(false);
     })

     it('should not withdraw if not lawyer', async() => {
         const deed = await Deed.new(
            accounts[0], 
            accounts[1], 
            5,
            {value: 100});
        
         
         try {
             await new Promise(resolve => setTimeout(resolve, 5000));
             await deed.withdraw({from: account[5]});
             
         } catch (error) {
             assert(error.message.includes('Lawyer only'))
             return
         }
         assert(false)
     })
 });