const freeEmailDomains = require('free-email-domains')


async function freeCheck(emailDomain) {

    try {
        const isFreeEmailProvider = freeEmailDomains.includes(emailDomain);
        return {
            free_check: {
                valid: isFreeEmailProvider
            }
        }
    } catch (error) {
        console.error(`Error in free check. Error: ${error.stack}`);

        return {
            free_check: {
                valid: false,
                reason: error.message
            }
        }
    }

}


module.exports = { freeCheck }