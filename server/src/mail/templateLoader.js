import fs from "fs/promises";
import path from "path";
import h from "handlebars";

export async function createFromTemplate(data, fileName) {
  const file = path.resolve("src", "mail", "templates", fileName);
  const content = await fs.readFile(file, "utf8");
  const template = h.compile(content);
  const result = template(data);
  return result;
}
