import { serve } from "bun";

const port = 3000;

serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);

    // Root -> index.html
    if (url.pathname === "/") {
      const index = Bun.file("public/index.html");
      if (await index.exists()) {
        return new Response(index, {
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
      return new Response("<!doctype html><html><body><h1>Fill public/index.html</h1></body></html>", {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Serve static from public
    const path = `public${url.pathname}`;
    const file = Bun.file(path);
    if (await file.exists()) {
      return new Response(file);
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Server running at http://localhost:${port}/`);