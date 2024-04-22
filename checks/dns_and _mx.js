const dns = require('dns');


/**
 * 
 * @param {*} domain 
 * @returns 
 */
async function getMXRecords(domain) {
    return new Promise((resolve, reject) => {
        dns.resolveMx(domain, (err, addresses) => {
            if (err) {
                reject(err);
            } else {
                resolve(addresses);
            }
        });
    });
}


/**
 * 
 * @param {*} domain 
 * @returns Array<string> Mx records
 * 
 */
async function dnsAndMxCheck(domain) {

    try {
        const addresses = await getMXRecords(domain);
        const mxRecords = addresses.map(address => address.exchange);
        return {
            dns_check: {
                valid: true
            },
            mx_records: mxRecords
        };
    } catch (err) {
        console.error(`Error retrieving MX records. Error : ${error.stack}`);
        return {
            dns_check: {
                valid: false,
                reason: error.message
            },
            mx_records: []
        };
    }
}

module.exports = { dnsAndMxCheck }