const pattern = {
  twPhone: /^09\d{2}(\d{6}|-\d{3}-\d{3})$/,
  pass: /^\w{4,12}$/,
  acc: /^\w{4,12}$/,
  email: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
  positiveInt: /^\+?[1-9][0-9]*$/,
}

export default pattern
