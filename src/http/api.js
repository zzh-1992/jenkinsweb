// api.js

import http from "./http";

export function saveMarkdown(input, id, title, tags) {
  return http
    .post("/saveMarkdown", {
      id: id,
      title: title,
      content: input,
      tags: tags.toString()
    })
    .then((response) => {
      return response.data; // 或者根据API响应的数据结构返回特定的值
    })
    .catch((err) => {
      throw err;
    });
}
