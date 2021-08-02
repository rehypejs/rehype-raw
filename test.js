import test from 'tape'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeRaw from './index.js'

test('rehypeRaw', (t) => {
  unified()
    .use(remarkParse)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
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

  t.end()
})
