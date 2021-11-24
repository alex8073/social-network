import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormsControls/FormsControls";
import { required } from "../../utils/validators/validators";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import styles from "../common/FormsControls/FormsControls.module.css";
import { getCaptchaUrl, getIsAuth } from "../../redux/auth-selectors";

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector(getCaptchaUrl);
    const isAuth = useSelector(getIsAuth);
    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    };
    if (isAuth) {
        return <Redirect to={"/profile"} />;
    }
    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    );
};

type LoginFormOwnProps = {
    captchaUrl: string | null;
};

export type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
};

type LoginFormValuesTypeKeys = Extract<keyof LoginFormValuesType, string>;

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
    handleSubmit,
    error,
    captchaUrl,
}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
            {createField<LoginFormValuesTypeKeys>(
                undefined,
                "rememberMe",
                [],
                Input,
                { type: "checkbox" },
                "remember me"
            )}

            {captchaUrl && <img src={captchaUrl} alt={"captcha"} />}
            {captchaUrl && createField("Enter symbols from image", "captcha", [required], Input, {})}

            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: "login",
})(LoginForm);
