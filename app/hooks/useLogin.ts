import { FormikProps, useFormik } from "formik";
import validationSchema from "../utils/ValidationSchema";
import { LoginFormValues } from "../screens/Login/LoginTypes";

const useLogin = () => {
  const formik: FormikProps<LoginFormValues> = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema.login,
    onSubmit: (values: LoginFormValues) => {
      console.log(values);
    },
  });

  return { formik };
};

export default useLogin;
