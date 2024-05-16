const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // db.json 파일 경로
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Vercel의 환경 변수를 사용하여 포트를 설정
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
