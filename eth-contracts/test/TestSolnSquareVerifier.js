let SolnSquareVerifier = artifacts.require('SolnSquareVerifier');
let Verifier = artifacts.require('verifier');
let proof = require('./proof')

contract('TestSolnSquareVerifier', accounts => {
    const account_one = accounts[0]
    const account_two = accounts[1]

    beforeEach(async function () {
        const SolutionVerifier = await Verifier.new({ from: account_one })
        this.contract = await SolnSquareVerifier.new(SolutionVerifier.address, {
            from: account_one
        })
    })

    it('Test if a new solution can be added for contract', async function () {
        let result = await this.contract.mintToken(account_two, 1,
            proof.proof.a,
            proof.proof.b,
            proof.proof.c,
            proof.inputs,
            { from: account_one }
        )

        assert.equal(result.logs[0].event, 'SolutionAdded')
    })

    it('Test if an token can be minted for contract', async function () {
        let mint = true
        try {
            await this.contract.mintToken(account_two, 1,
                proof.proof.a,
                proof.proof.b,
                proof.proof.c,
                proof.inputs,
                { from: account_one }
            )
        } catch (e) {
            mint = false
        }

        assert.equal(mint, true);
    })
})