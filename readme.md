# rehype-raw

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]

Reparse a [HAST][] tree, with support for embedded `raw`
nodes.  Keeping positional info OK.  🙌

## Installation

[npm][]:

```bash
npm install rehype-raw
```

## Usage

Say we have the following markdown file, `example.md`:

```markdown
<div class="note">

A mix of *markdown* and <em>HTML</em>.

</div>
```

And our script, `example.js`, looks as follows:

```javascript
var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var doc = require('rehype-document')
var format = require('rehype-format')
var stringify = require('rehype-stringify')
var raw = require('rehype-raw')

unified()
  .use(markdown)
  .use(remark2rehype, {allowDangerousHTML: true})
  .use(raw)
  .use(doc, {title: '🙌'})
  .use(format)
  .use(stringify)
  .process(vfile.readSync('example.md'), function(err, file) {
    console.error(report(err || file))
    console.log(String(file))
  })
```

Now, running `node example` yields:

```html
example.md: no issues found
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>🙌</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    <div class="note">
      <p>A mix of <em>markdown</em> and <em>HTML</em>.</p>
    </div>
  </body>
</html>
```

## API

### `rehype().use(raw)`

Parse the tree again, also parsing “raw” nodes (as exposed by remark).

## Contribute

See [`contributing.md` in `rehypejs/rehype`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/rehypejs/rehype-raw.svg

[build]: https://travis-ci.org/rehypejs/rehype-raw

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-v.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-raw

[downloads-badge]: https://img.shields.io/npm/dm/rehype-raw.svg

[downloads]: https://www.npmjs.com/package/rehype-raw

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[contributing]: https://github.com/rehypejs/rehype/blob/master/contributing.md

[coc]: https://github.com/rehypejs/rehype/blob/master/code-of-conduct.md
