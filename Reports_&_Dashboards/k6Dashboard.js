import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    vus: 5,
    duration: '60s',
}

export default function(){
    const BASE_URL = 'https://test-api.k6.io/public/crocodiles/';

    const res = http.get(BASE_URL);

    sleep(1); 
}

