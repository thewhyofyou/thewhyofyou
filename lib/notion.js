import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DATABASE_ID;

export async function getBlogs() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Status",
      status: {
        equals: "Published",
      },
    },
    sorts: [
      {
        property: "Publish Date",
        direction: "descending",
      },
    ],
  });

  return response.results.map((page) => ({
    id: page.id,
    title: page.properties.Title.title[0]?.plain_text || "Untitled",
    summary: page.properties.Summary?.rich_text[0]?.plain_text || "",
    content: page.properties.Content?.rich_text[0]?.plain_text || "",
    image: page.properties["Featured Image"]?.files[0]?.file?.url || "",
    video: page.properties["Video Embed"]?.url || "",
    date: page.properties["Publish Date"]?.date?.start || "",
  }));
}
