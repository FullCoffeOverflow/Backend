import { Duration, Distance } from '@google/maps';

import mapsClient from '../config/MapsConfig';

type MapsQuery = {
    address: string;
};

type MapsResponse = {
    lat: number;
    lng: number;
};

type DistanceResponse = {
    duration: Duration;
    distance: Distance;
};

const getDistances = async (origin: MapsResponse, destinations: MapsResponse[]): Promise<DistanceResponse[]> => {
    const query = {
        origins: [origin],
        destinations: destinations,
    };

    const response = await mapsClient.distanceMatrix(query).asPromise();

    return response.json.rows[0].elements;
};

const getLatLgn = async (query: MapsQuery): Promise<MapsResponse> => {
    const response = await mapsClient.geocode(query).asPromise();

    console.log(`${response.headers}`);

    return response.json.results[0].geometry.location;
};

export { getDistances, getLatLgn, MapsQuery, MapsResponse };
