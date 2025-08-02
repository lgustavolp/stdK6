
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [{ duration: '10s', target: 10 }],
    thresholds: {
        checks: ['rate > 0.95'],
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 500']
    }
}

export default function () {
    const USER = `user_${__VU}_${Date.now()}@mail.com`
    const PASS = 'user123'
    const BASE_URL = 'https://test-api.k6.io';

    console.log( USER + PASS);

    const payload = JSON.stringify({
        username: USER,
        email: USER,
        password: PASS
    });

    const headers = {
        headers: { 'Content-Type': 'application/json' }
    };

    const res = http.post(`${BASE_URL}/api/users/`, payload, headers);

    // //   const res = http.post(`${BASE_URL}/user/register/`, {
    // const res = http.post(`${BASE_URL}/api/users/`, {
    //     username: USER,
    //     // first_name: 'crocrodilo',
    //     // last_name: 'dino',
    //     email: USER,
    //     password: PASS
    // });

    console.log(res.status)

    check(res, {
        'sucesso ao registrar': (r) => r.status === 201
    });

     console.log(`Status: ${res.status} | Usuário: ${USER}`);

    sleep(1)
}