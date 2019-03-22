#!/usr/bin/env node

const yaml = require('js-yaml')
const fs =  require('fs')
const md5 = require('md5')

// what_is_line test.yml 1 2 3

const FILE = process.argv[2]
const SEARCH_LINES = process.argv.slice(3) || [0]


try {
  const dump = fs.readFileSync(FILE, 'utf8');
  const lines = dump.split('\n')
  const newLines = lines.map((line, index )=> {
    const hash = md5(index)
    const lineTrim = line.trimRight()
    let lineHash = lineTrim

    if (lineTrim && lineTrim.slice(-1) !== ':') {
      lineHash = lineTrim.slice(0, (lineTrim.length - 1)).concat(hash).concat(lineTrim.slice(-1))
    }
    return lineHash
  })

  const doc = newLines.join('\n')
  const textObject = yaml.safeLoadAll(doc);

  let listStore = {}
  let addHashToDoc = (doc, prevkey = '') => {
    Object.keys(doc).map(key => {
      nextkKey = prevkey ? `${prevkey}.${key}` : key
      if (doc[key] && typeof doc[key] === 'object') {
        return addHashToDoc(doc[key], nextkKey)
      }
      
      listStore[`${doc[key]}`] = nextkKey
    })
  }
  addHashToDoc(textObject[0])
  // console.log('🐞-listStore', listStore)

  const getKeyFromLineNumber = (numbers) => {
    numbers.map(num => {
      const hash = md5(num - 1)
      Object.keys(listStore).some(key => {
        if (key.includes(hash)) {
          console.log(`🐞line-${num}`, listStore[key])
        }
      })
    })
  }

  getKeyFromLineNumber(SEARCH_LINES)
} catch (e) {
  console.log(e);
}
