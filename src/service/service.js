import axios from "axios";

const baseUrl = "http://localhost:8081/nanlin-sql"

export function querySupportedDatasourceTypes() {
    return axios({
        baseURL: baseUrl,
        method: 'get',
        url: '/datasource/types',
        headers: {"": ""}
    });
}