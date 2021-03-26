import 'whatwg-fetch';

export default class Api {
    constructor(opts = {}, handelrs = {}) {
        this.initHandlers(handelrs);
        const token = document.head.querySelector('meta[name="csrf-token"]');

        const defaults = {
            credentials : 'include',
            mode        : 'cors',
            headers     : {
                'x-csrf-token' : token ? token.content : null
            }
        };

        this.baseUrl = opts.baseUrl;
        this.baseOpts = { ...opts.baseOpts || {}, ...defaults };
    }

    initHandlers = () => {};

    get(url = '', data = {}, params = {}) {
        const opts = { ...params, ...this.baseOpts };

        const queryStringParams = this.formatData(data);

        opts.method = 'GET';

        return this.fetch(`${this.baseUrl}/${url}?${queryStringParams}`, opts);
    }

    postMultipart(url = '', data = {}, params = {}) {
        const opts = { ...params, ...this.baseOpts };

        opts.method = 'POST';
        opts.body = this.formatMultipartData(data);

        return this.fetch(`${this.baseUrl}/${url}`, opts).catch(err => err);
    }

    post(url = '', data = {}, params = {}) {
        const opts = { ...params, ...this.baseOpts };

        opts.method = 'POST';
        opts.headers = {
            ...this.baseOpts.headers,
            ...{ 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        };
        opts.body = this.formatData(data);

        return this.fetch(`${this.baseUrl}/${url}`, opts).catch(err => console.log(err));
    }

    put(url = '', data = {}, params = {}) {
        const opts = { ...params, ...this.baseOpts };

        opts.method = 'PUT';
        opts.headers = {
            ...this.baseOpts.headers,
            ...{ 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8' }
        };
        opts.body = this.formatData(data);

        return this.fetch(`${this.baseUrl}/${url}`, opts).catch(err => err);
    }

    postJson(url = '', json = '', params = {}) {
        const opts = { ...params, ...this.baseOpts };

        opts.method = 'POST';
        opts.headers = {
            ...this.baseOpts.headers,
            ...{ 'Content-type': 'application/json' }
        };
        opts.body = json;

        return this.fetch(`${this.baseUrl}/${url}`, opts).catch(err => err);
    }

    delete(url = '', data = {}) {
        const queryStringParams = this.formatData(data);

        const opts = this.baseOpts;

        opts.method = 'DELETE';
        opts.headers = {
            ...this.baseOpts.headers,
            ...{ 'Chrome-bug': true }
        };

        return this.fetch(`${this.baseUrl}/${url}?${queryStringParams}`, opts).catch(err => err);
    }


    async fetch(url, opts) {
        const response = await fetch(url, opts);
        const errCode = 400;
        const result = await response.json();

        if (response.status >= errCode) throw new Error(`${response.url}, ${response.status}`);

        if (result.ok) {
            return result;
        }

        const responseError = {
            type    : 'Error',
            message : result.message || 'Something went wrong',
            data    : result.data || '',
            code    : result.code || ''
        };

        let error = new Error();

        error = { ...error, ...responseError };
        throw (error);
    }

    formatData(data) {
        if (data instanceof FormData) {
            return data;
        } else if ($.isPlainObject(data)) {
            return $.param(data);
        }
    }

    formatMultipartData(data) {
        if (data instanceof FormData) {
            return data;
        } else if ($.isPlainObject(data)) {
            const formData = new FormData();

            $.each(data, (key, value) => {
                formData.append(key, value);
            });

            return formData;
        }
    }
}

