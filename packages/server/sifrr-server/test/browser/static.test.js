const fs = require('fs');

const { okTest, SPORT } = require('./utils');
let sapp = require('../public/benchmarks/sifrr');

describe('speed test', function() {
  before(async () => {
    sapp.listen(SPORT, () => global.console.log('listening sifrr on ', SPORT));
    await page.goto(`${PATH}/static.html`);
  });

  after(() => {
    sapp.close();
  });

  it('serves all folders recursively', async () => {
    assert.equal(await okTest(`http://localhost:${SPORT}/example.json`), true);
  });

  it('serves all folders recursively', async () => {
    assert.equal(await okTest(`http://localhost:${SPORT}/compress/compressed.html`), true);
  });

  it("doesn't serve non-existent files", async () => {
    assert.equal(await okTest(`http://localhost:${SPORT}/skjshfdk.html`), false);
  });

  it('serves newly created files and 404 for deleted files', async () => {
    const filePath = path.join(__dirname, '../public/benchmarks/public/abcd');

    fs.writeFileSync(filePath, '');
    await timeout(100);
    assert.equal(await okTest(`http://localhost:${SPORT}/abcd`), true);

    fs.unlinkSync(filePath);
    await timeout(100);
    assert.equal(await okTest(`http://localhost:${SPORT}/abcd`), false);
  });
});

function timeout(ms) {
  return new Promise(res => setTimeout(res, ms));
}