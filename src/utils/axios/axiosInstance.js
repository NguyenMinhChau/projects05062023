import axios from 'axios';
import {HOST_101, PORT, VERSION, HOST_TOOLS_AI, HOST_CPE} from '@env';
import {
  getAsyncCacheAccessTokenKEY,
  getAsyncCacheTokenSecurityKEY,
} from '../cache.services';
import {getVerifiedKeys} from '../refreshToken.utils';
import React from 'react';
import useAppContext from '../hooks/useAppContext';
import {useNotificationToast} from '../notification_toast.utils';
import {isValidToken} from '../../services/jwt';

export const URL_101 = `${HOST_101}:${PORT}/v${VERSION}/icdp-backend-mobile/`;

export const AxiosInterceptorResponse = ({children}) => {
  const {state, dispatch} = useAppContext();

  React.useEffect(() => {
    const interceptor101 = axiosInstance101.interceptors.response.use(
      async response => {
        const accessToken = await getAsyncCacheAccessTokenKEY();
        await getVerifiedKeys(accessToken, dispatch);
        return response;
      },
      async error => {
        return Promise.reject(error);
      },
    );

    const interceptor101FormData =
      axiosInstance101FormData.interceptors.response.use(
        async response => {
          const accessToken = await getAsyncCacheAccessTokenKEY();
          await getVerifiedKeys(accessToken, dispatch);
          return response;
        },
        async error => {
          return Promise.reject(error);
        },
      );

    const interceptorToolAI = axiosInstanceToolsAI.interceptors.response.use(
      async response => {
        const accessToken = await getAsyncCacheAccessTokenKEY();
        await getVerifiedKeys(accessToken, dispatch);
        return response;
      },
      async error => {
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.response.eject(interceptor101);
      axios.interceptors.response.eject(interceptor101FormData);
      axios.interceptors.response.eject(interceptorToolAI);
    };
  }, []);
  return children;
};

export const axiosInstance101 = axios.create({
  baseURL: `${URL_101}`,
});

export const axiosInstance101FormData = axios.create({
  baseURL: `${URL_101}`,
  maxBodyLength: Infinity,
});

export const axiosInstance101NoToken = axios.create({
  baseURL: `${URL_101}`,
});

// ? AUTO ADD TOKEN TO HEADER WHEN CALL API
axiosInstance101.interceptors.request.use(
  async config => {
    const accessToken = await getAsyncCacheAccessTokenKEY();
    const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
    const {accessToken: tokenAccess} = {...accessToken};
    const {tokenSecurity: securityToken} = {...tokenSecurity};
    config.headers.Authorization = `Bearer ${tokenAccess}`;
    config.headers.token = securityToken;
    config.headers.tokenAPI = tokenAccess;
    config.data = {
      ...config.data,
      token: securityToken,
      tokenAPI: tokenAccess,
    };

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance101FormData.interceptors.request.use(
  async config => {
    const accessToken = await getAsyncCacheAccessTokenKEY();
    const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
    const {accessToken: tokenAccess} = {...accessToken};
    const {tokenSecurity: securityToken} = {...tokenSecurity};

    config.headers.Authorization = `Bearer ${tokenAccess}`;
    config.headers.token = securityToken;
    config.headers.tokenAPI = tokenAccess;
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const axios101Get = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101.get(path, options, others);
  return res.data;
};

export const axios101Post = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101.post(path, options, others);
  return res.data;
};

export const axios101Put = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101.put(path, options, others);
  return res.data;
};

export const axios101Delete = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101.delete(path, options, others);
  return res.data;
};

export const axios101GetFormData = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101FormData.get(path, options, others);
  return res.data;
};

export const axios101PostFormData = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101FormData.post(path, options, others);
  return res.data;
};

export const axios101PutFormData = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101FormData.put(path, options, others);
  return res.data;
};

export const axios101DeleteFormData = async (
  path,
  options = {},
  others = {},
) => {
  const res = await axiosInstance101FormData.delete(path, options, others);
  return res.data;
};

export const axios101GetNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101NoToken.get(path, options, others);
  return res.data;
};

export const axios101PostNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101NoToken.post(path, options, others);
  return res.data;
};

export const axios101PutNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstance101NoToken.put(path, options, others);
  return res.data;
};

export const axios101DeleteNoToken = async (
  path,
  options = {},
  others = {},
) => {
  const res = await axiosInstance101NoToken.delete(path, options, others);
  return res.data;
};

export const axiosInstanceToolsAI = axios.create({
  baseURL: `${HOST_TOOLS_AI}`,
  maxBodyLength: Infinity,
});

export const axiosInstanceToolsAINoToken = axios.create({
  baseURL: `${HOST_TOOLS_AI}`,
  maxBodyLength: Infinity,
});

// ? AUTO ADD TOKEN TO HEADER WHEN CALL API
axiosInstanceToolsAI.interceptors.request.use(
  async config => {
    const accessToken = await getAsyncCacheAccessTokenKEY();
    const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
    const {accessToken: tokenAccess} = {...accessToken};
    const {tokenSecurity: securityToken} = {...tokenSecurity};
    config.headers.Authorization = `Bearer ${tokenAccess}`;
    config.headers.token = securityToken;
    config.headers['Content-Type'] = 'multipart/form-data';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const axiosToolsAIGet = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceToolsAI.get(path, options, others);
  return res.data;
};

export const axiosToolsAIPost = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceToolsAI.post(path, options, others);
  return res.data;
};

export const axiosToolsAIPut = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceToolsAI.put(path, options, others);
  return res.data;
};

export const axiosToolsAIDelete = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceToolsAI.delete(path, options, others);
  return res.data;
};

export const axiosToolsAIGetNoToken = async (
  path,
  options = {},
  others = {},
) => {
  const res = await axiosInstanceToolsAINoToken.get(path, options, others);
  return res.data;
};

export const axiosToolsAIPostNoToken = async (
  path,
  options = {},
  others = {},
) => {
  const res = await axiosInstanceToolsAINoToken.post(path, options, others);
  return res.data;
};

export const axiosToolsAIPutNoToken = async (
  path,
  options = {},
  others = {},
) => {
  const res = await axiosInstanceToolsAINoToken.put(path, options, others);
  return res.data;
};

export const axiosToolsAIDeleteNoToken = async (
  path,
  options = {},
  others = {},
) => {
  const res = await axiosInstanceToolsAINoToken.delete(path, options, others);
  return res.data;
};

//! CPE
export const axiosInstanceCPE = axios.create({
  baseURL: `${HOST_CPE}`,
});

export const axiosInstanceCPENoToken = axios.create({
  baseURL: `${HOST_CPE}`,
});

// ? AUTO ADD TOKEN TO HEADER WHEN CALL API
axiosInstanceCPE.interceptors.request.use(
  async config => {
    const accessToken = await getAsyncCacheAccessTokenKEY();
    const tokenSecurity = await getAsyncCacheTokenSecurityKEY();
    const {accessToken: tokenAccess} = {...accessToken};
    const {tokenSecurity: securityToken} = {...tokenSecurity};
    config.headers.Authorization = `Bearer ${tokenAccess}`;
    config.headers.token = securityToken;
    config.headers.tokenAPI = tokenAccess;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const axiosCPEGet = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceCPE.get(path, options, others);
  return res.data;
};

export const axiosCPEPost = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceCPE.post(path, options, others);
  return res.data;
};

export const axiosCPEPut = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceCPE.put(path, options, others);
  return res.data;
};

export const axiosCPEDelete = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceCPE.delete(path, options, others);
  return res.data;
};

export const axiosCPEGetNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceCPENoToken.get(path, options, others);
  return res.data;
};

export const axiosCPEPostNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceCPENoToken.post(path, options, others);
  return res.data;
};

export const axiosCPEPutNoToken = async (path, options = {}, others = {}) => {
  const res = await axiosInstanceCPENoToken.put(path, options, others);
  return res.data;
};

export const axiosCPEDeleteNoToken = async (
  path,
  options = {},
  others = {},
) => {
  const res = await axiosInstanceCPENoToken.delete(path, options, others);
  return res.data;
};
