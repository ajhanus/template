import { attachNextServer, createServer } from './server';

async function startServer() {
  const { app, httpServer } = await createServer();
  await attachNextServer(app);
  httpServer.listen(3000, () => {
    console.log(`Server ready at http://localhost:3000`);
  });
}

startServer();
