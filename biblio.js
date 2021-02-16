let { DateTime } = require("luxon")

function ValidateEmail(mail)
{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(mail);
}

function getLocalDate()
{
    let dt = DateTime.now();
    let f = {month: 'long', day: 'numeric', year:"numeric", hour: 'numeric', minute: '2-digit'};
    return dt.setLocale('fr').toLocaleString(f)
}

function formatDateInLocalDate(datetime)
{
    DateTime.utc().toLocal();
    let f = {month: 'long', day: 'numeric', year:"numeric", hour: 'numeric', minute: '2-digit'};
    return datetime.setLocale('fr').toLocaleString(f)
}

module.exports  = {
    ValidateEmail,
    getLocalDate,
    formatDateInLocalDate
}