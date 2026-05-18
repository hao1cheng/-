exports.handler = async (req) => {
    try {
        const { path, method, headers, body } = JSON.parse(req.body || '{}');

        const url = `https://open.feishu.cn/open-apis/${path}`;
        const options = {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...headers
            }
        };

        const response = await fetch(url, {
            ...options,
            body: body ? JSON.stringify(body) : undefined
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ code: -1, msg: error.message })
        };
    }
};