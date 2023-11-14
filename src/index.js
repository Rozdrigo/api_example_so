const EXPRESS = require("express");
const APP = EXPRESS();
const OS = require("os");
const PORT = process.argv[2];

if (!PORT) {
  throw new Error("🚪 É necessario informar o parametro de porta");
}

let requisitions_in_seconds = 5;
let requisitions_amount = 0;

APP.get("/", (req, res) => {
  if (requisitions_amount >= requisitions_in_seconds) {
    console.log("🔃 Limite atingido, redirecionando requisição")
    res.redirect("/");
    return;
  }
  requisitions_amount++;
  setTimeout(() => {
    requisitions_amount--;
  }, 10000);
  const remainingRequests = requisitions_in_seconds - requisitions_amount;
  const progressBar = Array.from({ length: requisitions_in_seconds }, (_, index) =>
    index < remainingRequests ? "#" : "-"
  ).join("");

  console.log(
    `🔴 Requisições restantes: ${remainingRequests}/${requisitions_in_seconds} [${progressBar}]`
  );
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
  console.log(`🚀 Aplicação rodando na porta ${PORT}`);
});
