// Handles data changes in a form
const handleChange = (e, data) => {
  const { name, value } = e.target;
  data((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

export default handleChange;
