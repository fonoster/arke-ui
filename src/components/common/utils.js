export function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function getEndpoint (apiURL, resource, filter, token) {
    let endpoint = apiURL + '/' + resource

    if (filter) {
        endpoint = endpoint + '?filter=' + filter
    }

    if (token) {
        filter ? endpoint = endpoint + '&token=' + token : endpoint = endpoint + '?token=' + token
    }

    return endpoint
}
