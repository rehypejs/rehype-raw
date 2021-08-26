/**
 * @typedef {import('hast').Root} Root
 */

import test from 'tape'
import {unified} from 'unified'
import {visit} from 'unist-util-visit'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from './index.js'

test('rehypeRaw', (t) => {
  t.plan(2)

  unified()
    .use(remarkParse)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(
      /** @type {import('unified').Plugin<[], Root>} */
      () => (root) => {
        visit(root, 'raw', () => {
          t.fail('should not include `raw` in tree after `rehype-raw`')
        })
      }
    )
    .use(rehypeStringify)
    .process(
      [
        '<div class="note">',
        '',
        'A mix of *markdown* and <em>HTML</em>.',
        '',
        '</div>'
      ].join('\n'),
      (error, file) => {
        t.ifErr(error, 'should not fail')

        t.equal(
          String(file),
          [
            '<div class="note">',
            '<p>A mix of <em>markdown</em> and <em>HTML</em>.</p>',
            '</div>'
          ].join('\n'),
          'should equal the fixture'
        )
      }
    )
})
