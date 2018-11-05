import axios from 'axios';
import { truncate } from 'fs';

export const backendUrl = path => `${process.env.REACT_APP_BACKEND_URL}${path}`;

export const get = path =>
  axios.get(backendUrl(path), {
    withCredentials: true,
  });

export const post = (path, body) =>
  axios.post(backendUrl(path), body, {
    withCredentials: truncate,
  });
