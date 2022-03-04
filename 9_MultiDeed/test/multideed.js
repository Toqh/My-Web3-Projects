
const Multideed = artifacts.require('Multideed');

contract('Multideed', (accounts) => {
    let multideed = null
    before(async () => {
        multideed = await Multideed.deployed();
    })

    it('should NOT withdraw if too early', async () => {
        const multideed = await Multideed.new(
          accounts[0], 
          accounts[1], 
          5, 
          {value: 100}
        );
        try {
          await multideed.withdraw({from: accounts[0]});
        } catch(e) {
          assert(e.message.includes('too early'));
          return;
        }
        assert(false);
      });
})