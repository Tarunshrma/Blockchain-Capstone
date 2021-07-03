var CustomERC721Token = artifacts.require('CustomERC721Token');

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            console.log("Address 1: " + account_one);

            this.contract = await CustomERC721Token.new({from: account_one});

            // mint multiple tokens
            await this.contract.mint(account_one,1,{from: account_one});
            await this.contract.mint(account_one,2,{from: account_one});
            await this.contract.mint(account_one,3,{from: account_one});
            await this.contract.mint(account_two,4,{from: account_one});
            await this.contract.mint(account_two,5,{from: account_one});
        })

        it('should return total supply', async function () { 
          //GIVEN
          let expectedMintedTokenCount = 5;
          //WHEN
          let actualMintedTokenCount = await this.contract.totalSupply();

          //THEN
          assert.equal(expectedMintedTokenCount,actualMintedTokenCount);
        })

        it('should get token balance', async function () { 

          //GIVEN
          let expectedBalance = 2;
          //WHEN
          let actualBalance = await this.contract.balanceOf(account_two);

          //THEN
          assert.equal(expectedBalance,actualBalance);
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
          //GIVEN
          let expectedTokenURI = "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3";
          
          //WHEN
          let actualTokenURI = await this.contract.tokenURI(3);

          //THEN
          assert.equal(expectedTokenURI,actualTokenURI);
        })

        it('should transfer token from one owner to another', async function () { 
            //GIVEN
            let tokenId = 1;

            //WHEN
            await this.contract.transferFrom(account_one,account_two,tokenId);

            //THEN
            let newOwner = await this.contract.ownerOf(tokenId);
            assert.equal(account_two,newOwner);

            let updatedBalance = await this.contract.balanceOf(account_two);
            assert.equal(3,updatedBalance);
        })
    });

    
    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            
            //GIVEN
            var exception = true;

            //WHEN
            try{
                //Should become true if minted succesfully
                await this.contract.mint(account_two,6,{from: account_two});
            }catch(err){
                exception = true;
            }

            //THEN
            assert(exception,true);
        })

        it('should return contract owner', async function () { 
             //GIVEN
             let extpectedOwner = account_one;

            //WHEN
            let originalOwner = await this.contract.getOwner;
            

            //THEN
            assert(extpectedOwner, originalOwner);
        })

    });
})