import { Client, iteratePaginatedAPI, LogLevel } from "@notionhq/client"
import { promises as fs } from "fs"

const notion = new Client({
  auth: process.env.N_PAT,
  logLevel: LogLevel.DEBUG,
})

async function Main() {
  try {
    for await (const page of iteratePaginatedAPI(notion.dataSources.query, {
      data_source_id: "1c2d7c6a-c15d-8014-bb87-000bc612ca0e",
    })) {
      const md = await notion.pages.retrieveMarkdown({ page_id: page.id })
      const filepath = "./ntn_md/" + page.id + ".md"

      try {
        await fs.writeFile(filepath, md.markdown, "utf8")
        console.log(`${page.id} - markdown saved!`)
      } catch (error) {
        console.error("Error writing file:", error)
      }
    }
  } catch (error) {
    console.error(error)
  }
}
Main()
