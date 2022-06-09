import axios from 'axios';

let url;

if (process.env.NODE_ENV === 'production') {
  url = process.env.NEXT_PUBLIC_API_URL;
}

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3000';
}

export const api = axios.create({
  baseURL: url,
});
