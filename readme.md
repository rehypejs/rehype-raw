# rehype-raw

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]

Reparse a [hast][] tree, with support for embedded `raw`
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

###### Note

This project parses a [hast][] tree with embedded raw HTML.
This typically occurs because we’re coming from Markdown, often parsed by
[remark-parse][].
Inside markdown, HTML is a black box: Markdown doesn’t know what’s inside that
HTML.
So, when `rehype-raw` maps Markdown to HTML, it cannot understand raw embedded
HTML.

That’s where this project comes in.

But, Markdown is much terser than HTML, so it’s often preferred to use Markdown,
in HTML, inside Markdown.
As can be seen in the above example.

However, Markdown can only be mixed with HTML in some cases.
Take the following examples:

*   **Warning**: does not work:

    ```markdown
    <div class="note">
    A mix of *markdown* and <em>HTML</em>.
    </div>
    ```

    …this is seen as one big block of HTML:

    ```html
    <div class="note">
    A mix of *markdown* and <em>HTML</em>.
    <div>
    ```

*   This does work:

    ```markdown
    <div class="note">

    A mix of *markdown* and <em>HTML</em>.

    </div>
    ```

    …it’s one block with the opening HTML tag, then
    a paragraph of Markdown, and another block with closing HTML tag.
    That’s because of the blank lines:

    ```html
    <div class="note">
    A mix of <em>markdown</em> and <em>HTML</em>.
    <div>
    ```

*   This also works:

    ```markdown
    <span class="note">A mix of *markdown* and <em>HTML</em>.</span>
    ```

    …Inline tags are parsed as separate tags, with markdown in between:

    ```html
    <p><span class="note">A mix of <em>markdown</em> and <em>HTML</em>.</span></p>
    ```

    This occurs if the tag name is not included in the list of [block][] tag
    names.

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

[coverage-badge]: https://img.shields.io/codecov/c/github/rehypejs/rehype-raw.svg

[coverage]: https://codecov.io/github/rehypejs/rehype-raw

[downloads-badge]: https://img.shields.io/npm/dm/rehype-raw.svg

[downloads]: https://www.npmjs.com/package/rehype-raw

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/rehype

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[hast]: https://github.com/syntax-tree/hast

[remark-parse]: https://github.com/remarkjs/remark/blob/master/packages/remark-parse

[block]: https://github.com/remarkjs/remark/blob/master/packages/remark-parse/lib/block-elements.js

[contributing]: https://github.com/rehypejs/rehype/blob/master/contributing.md

[coc]: https://github.com/rehypejs/rehype/blob/master/code-of-conduct.md
