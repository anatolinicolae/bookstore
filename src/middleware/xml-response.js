const convert = require('xml-js');

// Handle XML response
module.exports = (req, res, next) => {
    const _send = res.send;
    const _json = res.json;

    // Check if Accept or Content-Type header is set for XML transformation
    const shouldTransform = () => req.header('Accept') === 'application/xml' || req.header('Content-Type') === 'application/xml';

    // Check if current body can be transformed to XML
    const canTransform = body => typeof body === 'object' || typeof body === 'string'

    // Transform JS/JSON object to XML string
    const toXML = body => {
        return convert.js2xml({
            "_declaration": {
                "_attributes": {
                    "version": "1.0",
                    "encoding": "utf-8"
                }
            },
            response: JSON.parse(JSON.stringify(body)),
        }, {
            compact: true,
            spaces: 4,
        });
    }

    // Handle res.send(data) calls
    res.send = function (body) {
        if (canTransform(body) && shouldTransform()) {
            res.type('application/xml');
            _send.call(this, toXML(body));
        } else {
            _send.call(this, body);
        }
    };

    // Handle res.json(data) calls
    res.json = function (body) {
        if (canTransform(body) && shouldTransform()) {
            res.type('application/xml');
            _send.call(this, toXML(body));
        } else {
            _json.call(this, body);
        }
    };

    next();
};
