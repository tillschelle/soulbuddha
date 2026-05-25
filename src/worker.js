export default {
  async fetch(request, env) {
    const auth = request.headers.get("Authorization") || "";
    const expected = "Basic " + btoa("soulbuddha:" + env.AUTH_PASSWORD);

    if (auth !== expected) {
      return new Response(
        `<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8">
<title>Soul Buddha – gesperrt</title>
<style>
  body { margin:0; display:flex; align-items:center; justify-content:center;
         min-height:100vh; background:#0c0b09; font-family:sans-serif; }
  .box { text-align:center; color:#b8a998; }
  h1 { color:#e8c278; font-size:2rem; margin-bottom:.5rem; }
  p  { font-size:.9rem; opacity:.7; }
</style></head><body>
<div class="box">
  <h1>Soul Buddha</h1>
  <p>Diese Seite ist derzeit nicht öffentlich zugänglich.</p>
</div>
</body></html>`,
        {
          status: 401,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
            "WWW-Authenticate": 'Basic realm="Soul Buddha", charset="UTF-8"',
          },
        }
      );
    }

    return env.ASSETS.fetch(request);
  },
};
