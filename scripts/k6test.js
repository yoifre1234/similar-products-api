import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 10 },
    { duration: '20s', target: 20 }, 
    { duration: '10s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
  },
};

export default function () {
  // 1. Usamos host.docker.internal (el puente que configuramos en el yaml)
  // 2. Apuntamos al puerto 5000 (donde corre tu Backend real)
  const BASE_URL = 'http://host.docker.internal:5000'; 
  
  // Ajusta la ruta si es necesario. Si en tu app.js usaste app.use('/product', ...), entonces:
  let res = http.get(`${BASE_URL}/product/1/similar`);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}