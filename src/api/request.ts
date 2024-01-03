import axios from './http';
import NProgress from 'nprogress';
NProgress.configure({ showSpinner: false });

interface Http {
  get<T>(url: string, params?: unknown): Promise<any>;
  post<T>(url: string, params?: unknown): Promise<any>;
  put<T>(url: string, params?: unknown): Promise<any>;
  upload<T>(url: string, params: unknown): Promise<any>;
  download(url: string): void;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .get(url, { params })
        .then(res => {
          NProgress.done();
          resolve(res);
        })
        .catch(err => {
          NProgress.done();
          reject(err);
        });
    });
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .post(url, JSON.stringify(params))
        .then(res => {
          NProgress.done();
          resolve(res);
        })
        .catch(err => {
          NProgress.done();
          reject(err);
        });
    });
  },
  put(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .put(url, JSON.stringify(params))
        .then(res => {
          NProgress.done();
          resolve(res);
        })
        .catch(err => {
          NProgress.done();
          reject(err);
        });
    });
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .post(url, file, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then(res => {
          NProgress.done();
          resolve(res);
        })
        .catch(err => {
          NProgress.done();
          reject(err);
        });
    });
  },
  download(url) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};
export default http;
