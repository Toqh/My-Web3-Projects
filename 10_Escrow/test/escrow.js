const Escrow = artifacts.require('Escrow');
const assertError = async(promise, error) => {
    try{
        await promise;
    } catch(e){
        assertError(e.message.includes(error))
        return
    }   
    assert(false);
}

contract('Escrow', accounts => {
    let escrow = null;
    const[lawyer, payer, recipient] = accounts; 
    before(async () => {
        escrow = await Escrow.deployed();

    });

    it("should deposit", async() => {
        await escrow.deposit({from: payer, value: 900})
        const escrowBalance = parseInt(await web3.eth.getBalance(escrow.address)
     )});

    it("should not deposit if sender doesnt pay", async() => {
        assertError(
            escrow.deposit({from: accounts[5], value:100}),
            "Sender must be the payer "
    )
    })

    it("should not deposit if transfer exceed amount", 
    async() =>{
        assertError(
            escrow.deposit({from: payer, value: 2000}),
            "Cant send more than escrow amount"
        )
    })
    it("Should not release funds if full amount has not been received",
    async () => {
        assertError(
            escrow.release({from:lawyer}),
            "cannot release funds before full amount is sent"
        )
    })
    it('Should not release funds if the sender is not lawyer', 
    async () =>{ await escrow.deposit ({from: payer, value: 100})
    assertError(
        escrow.release({from: payer}),
        "Sender must be the lawyer"
    
        )}
    )
    ;



  it('Should release funds', async() => {
      const balanceRecipientBefore = web3.utils.toBN(await web3.eth.getBalance(recipient))
      await escrow.release({from: lawyer})
      const balanceRecipientAfter = web3.utils.toBN(await web3.eth.getBalance(recipient))
    assert(balanceRecipientAfter.sub(balanceRecipientBefore ).toNumber()===1000)
  
    })
})