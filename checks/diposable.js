const fetch = require('node-fetch');


async function getFileContent(url) {

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch file content: ${response.statusText}`);
    }
    const content = await response.text();
    return content;
}

const fileUrl = 'https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf';
let disposableEmailDomains = [];

/**
 * 
 * @param {*} emailDomain 
 * @returns object
 * @description checks email domain is disposable or not
 * 
 */
async function disposableCheck(emailDomain) {

    try {
        if (disposableEmailDomains.length == 0) {
            disposableEmailDomains = (await getFileContent(fileUrl)).split('\n');
        }

        const isDisposableEmailDomain = disposableEmailDomains.includes(emailDomain);
        return {
            disposable_check: {
                valid: isDisposableEmailDomain
            }
        }
    } catch (error) {
        console.error(`Error in disposable check. Error : ${error.stack}`);
        return {
            disposable_check: {
                valid: false,
                reason: error.message
            }
        }
    }

}

module.exports = { disposableCheck }