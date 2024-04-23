const { catchAllCheck } = require('./catchAll');
const { disposableCheck } = require('./diposable');
const { dnsAndMxCheck } = require('./dns_and _mx');
const { freeCheck } = require('./freeProvider');
const { smtpCheck } = require('./smtp_check');


/**
 * 
 * @param {*} email 
 * @param {*} timeout 
 * @returns object
 * 
 */
async function performEmailCheck(email, timeout) {

    try {
        if (!(email && email.includes('@'))) {
            throw new Error('Invalid email Id');
        }

        const [, emailDomain] = email.split('@');

        const smtpCheckPromise = smtpCheck(email, timeout);
        const freeCheckPromise = freeCheck(emailDomain);
        const dnsAndMxCheckPromise = dnsAndMxCheck(emailDomain);
        const disposableCheckPromise = disposableCheck(emailDomain);
        const catchAllPromise = catchAllCheck(email);


        const results = await Promise.allSettled([smtpCheckPromise, freeCheckPromise, dnsAndMxCheckPromise, disposableCheckPromise, catchAllPromise]);

        const finalResult = results.reduce((acc, result) => {
            return { ...acc, ...result.value };
        }, {});

        return finalResult;

    } catch (error) {
        console.error(`Error in performEmailCheck. Error : ${error.stack}`);
        return {
            smtp_check: {
                valid: false,
                reason: error.message
            },
            mx_check: {
                valid: false,
                reason: error.message
            },
            typo_check: {
                valid: false,
                reason: error.message
            },
            regex_check: {
                valid: false,
                reason: error.message
            },
            disposable_check: {
                valid: false,
                reason: error.message
            },
            dns_check: {
                valid: false,
                reason: error.message
            },
            mx_records: [],
            catch_all_check: {
                valid: false,
                reason: error.message
            },
            free_check: {
                valid: false,
                reason: error.message
            }
        }
    }

}

module.exports = { performEmailCheck }