import Promise from 'bluebird';
import axios from 'axios';
import CURRICULUM, { lookupName, lookupCategoryName } from 'common/curriculum';

axios.interceptors.response.use(response => response.data);

// Bundled Hebrew markdown notes for the "notes" category (loaded via raw-loader,
// matching the pattern used in src/files/index.js).
const NOTES_CONTEXT = require.context('!raw-loader!../files/notes', false, /\.md$/);
const loadNote = (algorithmKey) => {
  try {
    const mod = NOTES_CONTEXT(`./${algorithmKey}.md`);
    return mod.default || mod;
  } catch (e) {
    return `# הערה לא נמצאה\n\nהמפתח \`${algorithmKey}\` אינו מוגדר.`;
  }
};

const request = (url, process) => {
  const tokens = url.split('/');
  const baseURL = /^https?:\/\//i.test(url) ? '' : '/api';
  return (...args) => {
    const mappedURL = baseURL + tokens.map((token, i) => token.startsWith(':') ? args.shift() : token).join('/');
    return Promise.resolve(process(mappedURL, args));
  };
};

const GET = URL => {
  return request(URL, (mappedURL, args) => {
    const [params, cancelToken] = args;
    return axios.get(mappedURL, { params, cancelToken });
  });
};

const DELETE = URL => {
  return request(URL, (mappedURL, args) => {
    const [params, cancelToken] = args;
    return axios.delete(mappedURL, { params, cancelToken });
  });
};

const POST = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params, cancelToken] = args;
    return axios.post(mappedURL, body, { params, cancelToken });
  });
};

const PUT = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params, cancelToken] = args;
    return axios.put(mappedURL, body, { params, cancelToken });
  });
};

const PATCH = URL => {
  return request(URL, (mappedURL, args) => {
    const [body, params, cancelToken] = args;
    return axios.patch(mappedURL, body, { params, cancelToken });
  });
};

// Upstream AlgorithmApi calls (kept for non-notes categories that still use the
// live algorithm-visualizer.org backend).
const upstreamGetAlgorithm = GET('/algorithms/:categoryKey/:algorithmKey');

const AlgorithmApi = {
  // Menu tree is served from the static Hebrew curriculum, not from /api/algorithms.
  getCategories: () => Promise.resolve(CURRICULUM),
  // For bundled theoretical notes, synthesize the response locally. For all
  // other categories, defer to the upstream endpoint unchanged.
  getAlgorithm: (categoryKey, algorithmKey, ...rest) => {
    if (categoryKey === 'notes') {
      const content = loadNote(algorithmKey);
      return Promise.resolve({
        algorithm: {
          categoryKey,
          categoryName: lookupCategoryName(categoryKey),
          algorithmKey,
          algorithmName: lookupName(categoryKey, algorithmKey),
          description: null,
          files: [
            {
              name: 'README.md',
              content,
              contributors: [{
                login: 'maayan-learns-algorithms',
                avatar_url: 'https://github.com/algorithm-visualizer.png',
              }],
              toggled: true,
            },
          ],
        },
      });
    }
    return upstreamGetAlgorithm(categoryKey, algorithmKey, ...rest);
  },
};

const VisualizationApi = {
  getVisualization: GET('/visualizations/:visualizationId'),
};

const GitHubApi = {
  auth: token => Promise.resolve(axios.defaults.headers.common['Authorization'] = token && `token ${token}`),
  getUser: GET('https://api.github.com/user'),
  listGists: GET('https://api.github.com/gists'),
  createGist: POST('https://api.github.com/gists'),
  editGist: PATCH('https://api.github.com/gists/:id'),
  getGist: GET('https://api.github.com/gists/:id'),
  deleteGist: DELETE('https://api.github.com/gists/:id'),
  forkGist: POST('https://api.github.com/gists/:id/forks'),
};

const TracerApi = {
  md: ({ code }) => Promise.resolve([{
    key: 'markdown',
    method: 'MarkdownTracer',
    args: ['Markdown'],
  }, {
    key: 'markdown',
    method: 'set',
    args: [code],
  }, {
    key: null,
    method: 'setRoot',
    args: ['markdown'],
  }]),
  json: ({ code }) => new Promise(resolve => resolve(JSON.parse(code))),
  js: ({ code }, params, cancelToken) => new Promise((resolve, reject) => {
    const worker = new Worker('/api/tracers/js/worker');
    if (cancelToken) {
      cancelToken.promise.then(cancel => {
        worker.terminate();
        reject(cancel);
      });
    }
    worker.onmessage = e => {
      worker.terminate();
      resolve(e.data);
    };
    worker.onerror = error => {
      worker.terminate();
      reject(error);
    };
    worker.postMessage(code);
  }),
  cpp: POST('/tracers/cpp'),
  java: POST('/tracers/java'),
};

export {
  AlgorithmApi,
  VisualizationApi,
  GitHubApi,
  TracerApi,
};
