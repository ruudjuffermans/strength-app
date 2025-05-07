function validateEnum(value, enumArray) {
    return enumArray.includes(value);
  }
  
  module.exports = {
    validateEnum,
  };