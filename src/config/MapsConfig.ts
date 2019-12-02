import maps from '@google/maps';

import configs from './Config';

const options = {
    key: configs.MAPS_API_KEY,
    Promise: Promise,
};

const mapsClient = maps.createClient(options);

export default mapsClient;
