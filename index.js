import {raw} from 'hast-util-raw'

export default function rehypeRaw(options) {
  return transform
  function transform(tree, file) {
    return raw(tree, file, options)
  }
}
