const ERROR_MESSAGES = {
  FIELD_REQUIRED: (field) => `Field ${field} is required.`,
  LENGTH_RANGE: (field, min, max) =>
    `Field ${field} must be between ${min} and ${max} symbols.`,
  INVALID_FORMAT: (field) => `Invalid ${field}.`,
  AT_LEAST_ONE: "At least one field must be provided.",
  NOT_FOUND: (entity) => `This ${entity} not found.`,
  EMAIL_EXISTS: "User with this email already exists.",
  ONLY_FIELDS_ALLOWED: (fields) => `Only ${fields.join(", ")} are allowed.`,
};

module.exports = ERROR_MESSAGES;
