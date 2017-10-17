import request from 'request';
import Promise from 'bluebird';

const requestPromise = Promise.promisify(request);

export const promisePart1 = async (req, res) => {
    const url = 'https://jsonplaceholder.typicode.com/photos?_limit=10';
    const options = {
        method: 'GET',
        uri: url,
    };
    requestPromise(options).then((response) => {
        return res.send(response.body);
    }).catch((err) => {
        return res.status(400).json({error: String(err)});
    });
    // request(options, async (err, response, body) => {
    //     try {
    //         if (response.statusCode === 200) {
    //             return await res.send(body);
    //         } else {
    //             console.log('error: ' + response.statusCode)
    //         }
    //     } catch (err) {
    //         return res.status(400).json({error: String(err)});
    //     }
    // });
}

