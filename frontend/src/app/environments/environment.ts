
import url from '../../../proxy-config.json';

//export const BASE_URL = 'http://localhost:3000';
var firstOP = url["/"].target;
firstOP=firstOP.substring(0,firstOP.length -1);
export const BASE_URL=firstOP;


export const environment = {
  production: true,
  chatUrl: BASE_URL,
  backendUrl: `${BASE_URL}`,
  chatPath: '/mean-chat-app.io',
};
