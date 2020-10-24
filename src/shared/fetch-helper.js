import { getAuthToken } from './storage-helper';

export const callAuthApi = (requestInfoParams, requestInitParams = {}) => {
    const token = getAuthToken();
    return fetch(requestInfoParams, {
        ...requestInitParams,
        headers: {
            ...requestInitParams.headers,
            Authorization: `Bearer ${token}`
        },
    });
};

export const callUnAuthApi = (requestInfoParams, requestInitParams = {}) => fetch(requestInfoParams, {
    ...requestInitParams,
    headers: {
        ...requestInitParams.headers,
    },
});