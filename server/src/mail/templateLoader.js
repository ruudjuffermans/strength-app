const fs = require("fs/promises");
const path = require("path");
const h = require("handlebars");

async function createFromTemplate(data, fileName) {
  const file = path.resolve("src", "mail", "templates", fileName);
  const content = await fs.readFile(file, "utf8");
  const template = h.compile(content);
  const result = template(data);
  return result;
}

module.exports = {createFromTemplate}