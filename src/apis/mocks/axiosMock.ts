import { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import schema from './json/openapi.json';

const httpMethods = ['get', 'post', 'put', 'delete'];

/**
 * axiosのインスタンスにモックを設定する
 * OpenAPIのJSONファイルを元にレスポンスを返す
 */
export function setMockRequestsToAxios(axios: AxiosInstance) {
    const adapter = new MockAdapter(axios);
    const pathEntries = Object.entries(schema.paths);
    for (const [path, pathData] of pathEntries) {
        const modifiedPath = path.replace(/{.*}/g, '.*');
        const methods = Object.entries(pathData).filter(([methodName]) =>
            httpMethods.includes(methodName)
        );
        for (const [methodName, methodData] of methods) {
            const responses = methodData.responses;
            const res200Content = responses['200'].content ?? {};
            const res200Example = (res200Content['application/json'] ?? {})
                .example;
            const pathRegExp = new RegExp(modifiedPath);
            switch (methodName) {
                case 'get': {
                    adapter.onGet(pathRegExp).reply(200, res200Example);
                    break;
                }
                case 'post': {
                    adapter.onPost(pathRegExp).reply(200);
                    break;
                }
                case 'put': {
                    adapter.onPut(pathRegExp).reply(200, res200Example);
                    break;
                }
                case 'delete': {
                    adapter.onDelete(pathRegExp).reply(200, res200Example);
                }
            }
        }
    }
}
