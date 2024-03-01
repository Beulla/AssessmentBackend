const isEmpty = arr => {
    return arr.length === 0;
};
const validateFields = (req, requiredFields) => {
    const missingFields = requiredFields.filter(field => !req.body[field]);
    return missingFields;
};
const validateEmail = email => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
};
const formatDateTime = (dateTime, options = null) => {
    const defaultOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    const mergedOptions = { ...defaultOptions, ...options };
    return dateTime.toLocaleString('en-US', mergedOptions);
};
const validatePhoneNumber=(phoneNumber)=> {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}
function validateZipCode(zipCode) {
    const validZipCodes = ['10001', '10002', '10003'];
    return validZipCodes.includes(zipCode);
}
module.exports={
    formatDateTime,validateEmail,validateFields,isEmpty,validatePhoneNumber,validateZipCode
}