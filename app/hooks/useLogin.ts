import { useFormik } from "formik";
import validationSchema from "../utils/ValidationSchema";

const useLogin = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema.login,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return { formik };
};

export default useLogin;
