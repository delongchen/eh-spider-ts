import { readFile } from 'fs/promises'
import { EhDownloadParser } from "../src/parser/EhDownloadParser";

readFile('./test/testpage.html', 'utf-8')
  .then(html => {
    console.log(new EhDownloadParser(html).parse())
  })
  .catch((err) => {
    console.log(err)
  })
