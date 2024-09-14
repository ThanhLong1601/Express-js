export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 35,
      },
      errorMessage: "Username must be at least 5 - 32 characters",
    },
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  displayName: {
    notEmpty: {
      errorMessage: "DisplayName cannot be empty",
    },
  },
  password: {
    notEmpty: true,
  },
};
