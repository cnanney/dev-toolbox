import AdmZip from 'adm-zip'
import { load } from 'cheerio'
import * as child from 'child_process'
import { readFileSync, unlinkSync, writeFileSync } from 'fs'
import glob from 'tiny-glob'

// Build functions `hash`, `removeInlineScripts`, and `removeManifestFiles`
// sourced from https://github.com/michmich112/sveltekit-adapter-chrome-extension

function hash(value) {
  let hash = 5381
  let i = value.length

  if (typeof value === 'string') {
    while (i) hash = (hash * 33) ^ value.charCodeAt(--i)
  } else {
    while (i) hash = (hash * 33) ^ value[--i]
  }

  return (hash >>> 0).toString(36)
}

async function removeInlineScripts(directory) {
  console.log('Removing Inline Scripts')
  const files = await glob('**/*.{html}', {
    cwd: directory,
    dot: true,
    absolute: true,
    filesOnly: true,
  })

  files.forEach((file) => {
    console.log(`  File: ${file}`)
    const f = readFileSync(file)
    const $ = load(f.toString())
    const node = $('script').get()[0]

    if (!node) return
    if (Object.keys(node.attribs).includes('src')) return // if there is a src, it's not an inline script

    const attribs = Object.keys(node.attribs).reduce(
      (a, c) => a + `${c}="${node.attribs[c]}" `,
      ''
    )
    const innerScript = node.children[0].data
    const fullTag = $('script').toString()
    //get new filename
    const fn = `/script-${hash(innerScript)}.js`
    //remove from orig html file and replace with new script tag
    const newHtml = f
      .toString()
      .replace(fullTag, `<script ${attribs} src="${fn}"></script>`)
    writeFileSync(file, newHtml)
    console.log(`  Rewrote ${file}`)

    const p = `${directory}${fn}`
    writeFileSync(p, innerScript)
    console.log(`Inline script extracted and saved at: ${p}`)
  })
}

async function removeManifestFiles(directory) {
  const files = await glob(`*manifest*.json`, {
    cwd: directory,
    dot: true,
    absolute: true,
    filesOnly: true,
  })

  files.forEach((path) => {
    try {
      unlinkSync(path)
      console.log(`Removed app manifest file at path: ${path}`)
    } catch (err) {
      console.warn(`Error removing app manifest file at path: ${path}.`)
    }
  })
}

async function createZipArchive(browserName) {
  const outputFile = `./out/zip/${browserName}.zip`
  console.log(`Creating ${outputFile}.`)

  // noinspection JSCheckFunctionSignatures
  const zip = new AdmZip()
  // noinspection JSCheckFunctionSignatures
  zip.addLocalFolder(`./out/${browserName}`)
  // noinspection JSCheckFunctionSignatures
  zip.writeZip(outputFile)
}

function command(cmd) {
  console.log('RUNNING: ', cmd)
  child.execSync(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`)
      return
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return
    }
    stdout && console.log(`stdout: ${stdout}`)
  })
}

async function build(browserName) {
  command(`mkdir -p ./out`)
  command(`rm -rf ./out/${browserName}`)
  command(`cp -R ./build ./out/${browserName}`)

  await removeManifestFiles(`./out/${browserName}`)

  command(
    `cp ./ext/manifest_${browserName}.json ./out/${browserName}/manifest.json`
  )
  command(`cp -R ./ext/img ./out/${browserName}`)

  console.log(`Building ZIP for "${browserName}".`)

  await createZipArchive(browserName)
}

await removeInlineScripts('./build')
await build('chrome')
await build('firefox')

console.log('--------------\nBUILD COMPLETE\n--------------')
