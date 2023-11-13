const EXPRESS = require("express");
const APP = EXPRESS();
const OS = require("os");
const PORT = process.argv[2];

if (!PORT) {
  console.log(PORT);
  throw new Error("É necessario informar o parametro de porta");
}

APP.get("/", (req, res) => {
  console.log("acess event");
  const clientInfo = {
    message: `Aplicação ${OS.hostname()} :: ${PORT}`,
    method: req.method,
    protocol: req.protocol,
    host: req.get("host"),
    path: req.originalUrl,
    userAgent: req.get("user-agent"),
  };
  res.json(clientInfo);
});

APP.listen(PORT, () => {
  console.log(`Aplicação rodando na porta ${PORT}`);
});
