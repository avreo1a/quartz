import { QuartzFilterPlugin } from "../types"
import { FullSlug } from "../../util/path"

export interface FolderFilterOptions {
  folders: string[]
  /** If true, strip the folder prefix from URLs so content appears at root */
  rootToFolder?: boolean
}

export const PublishFolders: QuartzFilterPlugin<FolderFilterOptions> = (opts) => ({
  name: "PublishFolders",
  shouldPublish(_ctx, [_tree, vfile]) {
    const slug = vfile.data?.slug ?? ""
    // Always allow root index (homepage)
    if (slug === "index") return true
    const slugLower = slug.toLowerCase()
    // Convert folder names to slug format (spaces to hyphens) for comparison
    const matchingFolder = opts?.folders.find((folder) => {
      const folderSlug = folder.toLowerCase().replace(/ /g, "-")
      return slugLower.startsWith(folderSlug)
    })

    if (matchingFolder && opts?.rootToFolder) {
      // Strip the folder prefix from the slug
      const folderSlug = matchingFolder.toLowerCase().replace(/ /g, "-")
      const newSlug = slug.slice(folderSlug.length).replace(/^\//, "") || "index"
      vfile.data.slug = newSlug as FullSlug
    }

    return matchingFolder !== undefined
  },
})
