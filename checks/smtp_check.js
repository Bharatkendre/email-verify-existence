const { check } = require('does-email-exist')


/**
 * 
 * @param {*} emailOrEmailOptions
 * @param {*} timeout Default 5 sec
 * @returns Promise<{ smtp_check, mx_check, format_check}>
 * @description Performs smtp check and returns the check details
 * 
 */
async function smtpCheck(emailOrEmailOptions, timeout = 5000) {

    try {

        const res = await Promise.race([
            check(emailOrEmailOptions),
            new Promise((resolve, reject) => setTimeout(() => reject(new Error("Timeout")), timeout))
        ])

        return {
            smtp_check: {
                ...res.validators.smtp
            },
            mx_check: {
                ...res.validators.mx
            },
            typo_check: {
                ...res.validators.typo
            },
            regex_check: {
                ...res.validators.regex
            }
        }

    } catch (error) {
        console.error(`Error in smtp check. Error :: ${error.stack}`);
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
            }
        }
    }

}

module.exports = { smtpCheck }