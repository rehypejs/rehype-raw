import unified = require('unified')
import raw = require('rehype-raw')

unified().use(raw)
unified().use(raw, {passThrough: []})
