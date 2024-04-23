const { smtpCheck } = require('./smtp_check');


/**
 * 
 * @param {*} email 
 * @returns object
 * @description performs catch all check
 * 
 */
async function catchAllCheck(email) {

    try {
        const [emailUser, domain] = email.split('@');

        const randomEmail = emailUser + generateRandomString(8) + '@' + domain;

        const res = await smtpCheck(randomEmail, 2000);

        return {
            catch_all_check: {
                ...res.smtp_check
            }
        }
    } catch (error) {
        console.error(`Error in catchAll check. Error : ${error.stack}`);
        return {
            catch_all_check: {
                valid: false,
                reason: error.message
            }
        }
    }



}


/**
 * 
 * @param {*} length 
 * @returns string
 * @description generates random string
 * 
 */
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }
    return randomString;
}


module.exports = { catchAllCheck }