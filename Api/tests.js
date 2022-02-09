const fs = require('fs');
const { NFTStorage, File } =  require('nft.storage');

const endpoint = 'https://api.nft.storage' // the default
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDliOTUxNGJFRTUzMTQ1ZWQ2NjYxODBBZEIwMTc5NmFiN0FFNEE2Q2UiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNjQyMDAwMTk4OSwibmFtZSI6IkF1dGhlbnRpY2F0ZSJ9.uSq6NTINi5hB9BvgOCQ0YzMm1E5IjpVGBKeupcdHUDw' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ endpoint, token })
  const metadata = await storage.store({
    name: 'nft.storage store test',
    description:
      'Using the nft.storage metadata API to create ERC-1155 compatible metadata.',
    image: new File([await fs.promises.readFile('./uploads/fileToUpload-1644095469558.png')], 'fileToUpload-1644095469558.png', {
      type: 'image/png',
    })
  })
  console.log('IPFS URL for the metadata:', metadata.url)
  console.log('metadata.json contents:\n', metadata.data)
  console.log(
    'metadata.json contents with IPFS gateway URLs:\n',
    metadata.embed()
  )
}
main()