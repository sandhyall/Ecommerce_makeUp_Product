const Validation = (form) => {
  const error = {};

  if (!form.name || form.name.trim().length < 3) {
    error.name = "Name must be at least 3 characters";
  }

  if (
    !form.email ||
    !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
  ) {
    error.email = "Enter a valid email";
  }

  if (!form.message || form.message.trim().length < 3) {
    error.message = "Message must be at least 3 characters";
  }

  return error; 
};

export default Validation;
