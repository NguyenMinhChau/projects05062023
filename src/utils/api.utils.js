import axios from 'axios';

const HOST = 'http://172.27.17.68';
const PORT = 8000;
const VERSION = 1;

export async function fetchAPI(url, body, method) {
  try {
    const data = await axios({
      method: method,
      url: `${HOST}:${PORT}/v${VERSION}/${url}`,
      data: body,
    });

    const {payload} = data.data;

    return payload;
  } catch (error) {
    return false;
  }
}

export async function login(method, url, body) {
  try {
    const raw = JSON.stringify(body);
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    requestOptions = {
      method: method,
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const data = await fetch(url, requestOptions);
    return data.text();
  } catch (error) {
    return false;
  }
}
