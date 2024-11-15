/**
 * @import {Options as RawOptions} from 'hast-util-raw'
 * @import {Root} from 'hast'
 * @import {VFile} from 'vfile'
 */

/**
 * @typedef {Omit<RawOptions, 'file'>} Options
 *   Configuration.
 */

import {raw} from 'hast-util-raw'

/**
 * Parse the tree (and raw nodes) again, keeping positional info okay.
 *
 * @param {Options | null | undefined}  [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export default function rehypeRaw(options) {
  /**
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {Root}
   *   New tree.
   */
  return function (tree, file) {
    // Assume root in -> root out.
    const result = /** @type {Root} */ (raw(tree, {...options, file}))
    return result
  }
}
