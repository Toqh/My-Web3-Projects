const Crud = artifacts.require('Crud.sol');

contract('Crud', () =>{
    let crud = null;
    before(async() => {
        crud = await Crud.deployed();
    });

    it('should create a new user', async() => {
        await crud.create('Frank'); //if you dont await it, the 
        //next line will be executed before we 
        //finish creating Frank as a user from truffle
        // await makes sure the user has been created.
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Frank' )

    })

    it('should update a user', async () => {
        await crud.update(1, 'Frankk');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Frankk' );
    })

    it('should not update a non existing user', async () =>{
        try{
            await crud.update(2, 'Frankk');
        } catch(e) {
            assert(e.message.includes('User does not exist'));
        return;
        }
        assert(false);
    });

    it('Should destroy a user', async() => {
        await crud.destroy(1);
        try{
            await crud.read(1);
        } catch(e){
         assert(e.message.includes('User does not exist'));
        return;
        }
        assert(false);
    });

    it('should not destroy a non existing user', async () =>{
        try{
            await crud.destroy(10)

        } catch (e){
            assert(e.message.includes('User does not exist'));
            return;
        }
        assert(false);
    }); 
});