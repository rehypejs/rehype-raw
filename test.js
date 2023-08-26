/**
 * @typedef {import('hast').Root} Root
 */

import test from 'node:test'
import assert from 'node:assert/strict'
import {unified} from 'unified'
import {visit} from 'unist-util-visit'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from './index.js'

const markdown = `<div class="note">

A mix of *markdown* and <em>HTML</em>.

</div>`

const html = `<div class="note">
<p>A mix of <em>markdown</em> and <em>HTML</em>.</p>
</div>`

test('rehypeRaw', async () => {
  const file = await unified()
    // @ts-expect-error: to do: remove when remark is released.
    .use(remarkParse)
    // @ts-expect-error: to do: remove when remark-rehype is released.
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(
      /** @type {import('unified').Plugin<Array<void>, Root>} */
      () => (root) => {
        visit(root, 'raw', () => {
          assert.fail('should not include `raw` in tree after `rehype-raw`')
        })
      }
    )
    .use(rehypeStringify)
    .process(markdown)

  assert.equal(String(file), html, 'should equal the fixture')
})
