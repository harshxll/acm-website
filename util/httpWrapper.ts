export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete,
};

async function get({ url, token = "" }: { url: string; token?: string }) {
    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };
    console.log(requestOptions);
    return fetch(fetchUrl(url), requestOptions).then(handleResponse);
}

async function post({
    url,
    body,
    token = "",
}: {
    url: string;
    token?: string;
    body: any;
}) {
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    };
    return fetch(fetchUrl(url), requestOptions).then(handleResponse);
}

async function put({
    url,
    body,
    token,
}: {
    url: string;
    token?: string;
    body: any;
}) {
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    };
    return fetch(fetchUrl(url), requestOptions).then(handleResponse);
}

async function _delete({ url, token }: { url: string; token?: string }) {
    const requestOptions = {
        method: "DELETE",
        Authorization: `Bearer ${token}`,
    };
    return fetch(fetchUrl(url), requestOptions).then(handleResponse);
}

async function handleResponse(response: Response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export function fetchUrl(url: string) {
    const backendUrl = process.env.BACKEND;
    const root =
        process.env.NODE_ENV === "development"
            ? "http://localhost:8080"
            : backendUrl;
    return `${root}/${url}`;
}

export function fetchFrontendUrl() {
    return process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://www.pecacm.com";
}
