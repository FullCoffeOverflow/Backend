import { resolve } from "path"

// Configuring environmental variables 
import { config } from "dotenv"
config({ path: resolve(__dirname, "../.env") })

import server from './server';  

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[SERVER] Running at http://localhost:${PORT}`);
});
