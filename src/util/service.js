import axios from "axios";

const baseUrl = "http://localhost:8081/nanlin-sql" // 本地调试
// const baseUrl = "http://121.248.114.514:8081/nanlin-sql" // prod

export function querySupportedDatasourceTypes() {
    return axios({
        baseURL: baseUrl,
        method: 'get',
        url: '/datasource/types',
        // headers: {"": ""}
    });
}
