import configs from './config/Config';

import server from './server';

server.listen(configs.PORT, () => {
    console.log(`[SERVER] Running at http://localhost:${configs.PORT}`);
});
