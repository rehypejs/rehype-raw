'use strict'

var test = require('tape')
var unified = require('unified')
var parse = require('remark-parse')
var remark2rehype = require('remark-rehype')
var stringify = require('rehype-stringify')
var raw = require('.')

test('integration', function (t) {
  unified()
    .use(parse)
    .use(remark2rehype, {allowDangerousHtml: true})
    .use(raw)
    .use(stringify)
    .process(
      [
        '<div class="note">',
        '',
        'A mix of *markdown* and <em>HTML</em>.',
        '',
        '</div>'
      ].join('\n'),
      function (error, file) {
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
