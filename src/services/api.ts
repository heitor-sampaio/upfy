import axios from 'axios';

let url;

if (process.env.NODE_ENV === 'production') {
  if (process.env.VERCEL || process.env.NETLIFY) {
    url = process.env.NEXT_PUBLIC_API_URL;
  } else {
    url = 'http://localhost:3000';
  }
}

if (process.env.NODE_ENV === 'development') {
  url = 'http://localhost:3000';
}

export const api = axios.create({
  baseURL: url,
});
