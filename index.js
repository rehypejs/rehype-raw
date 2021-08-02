import hastUtilRaw from 'hast-util-raw'

export default function rehypeRaw(options) {
  return transform
  function transform(tree, file) {
    return hastUtilRaw(tree, file, options)
  }
}
