export default function deepTrim(obj) {
    Object.keys(obj).forEach(prop => {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            const value = obj[prop];
            const type = typeof value;
            if (value != null && (type === 'string' || type === 'object')) {
                if (type === 'object') {
                    deepTrim(obj[prop]);
                } else {
                    // eslint-disable-next-line
                    obj[prop] = obj[prop].trim();
                }
            }
        }
    });

    return obj;
}
