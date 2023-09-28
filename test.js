/**
 * @typedef {import('hast').Root} Root
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import {visit} from 'unist-util-visit'
import rehypeRaw from 'rehype-raw'

test('rehypeRaw', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('rehype-raw')).sort(), [
      'default'
    ])
  })

  await t.test('should work', async function () {
    const file = await unified()
      .use(remarkParse)
      .use(remarkRehype, {allowDangerousHtml: true})
      .use(rehypeRaw)
      .use(function () {
        /**
         * @param {Root} root
         */
        return function (root) {
          visit(root, 'raw', function () {
            assert.fail()
          })
        }
      })
      .use(rehypeStringify).process(`<div class="note">

A mix of *markdown* and <em>HTML</em>.

</div>`)

    assert.equal(
      String(file),
      `<div class="note">
<p>A mix of <em>markdown</em> and <em>HTML</em>.</p>
</div>`
    )
  })
})
