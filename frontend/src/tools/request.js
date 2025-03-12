export let req_post = (data, path) => {
    let url = "http://127.0.0.1:8000/" + path;
    let headers = {
        "Content-Type": "application/json"
    };
    let body = JSON.stringify(data);
    console.log(body);

    let result = fetch(url, {
        method: "POST",
        headers: headers,
        body: body
    }).then(response => {
        if (!response.ok) {
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    })

    return result;
}