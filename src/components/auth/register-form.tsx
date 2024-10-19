import { loginOrRegister } from '~/api/auth';
import { Button } from '../ui/button';
import { TextFieldLabel, TextFieldInput, TextField } from '../ui/text-field';

type Props = {
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
};

const RegisterForm = (props: Props) => {
  const showPassword = () => props.showPassword;
  return (
    <form method="post" action={loginOrRegister}>
      <input type="hidden" name="intent" value="register" />
      <div class="space-y-4">
        {/* <TextField class="space-y-2">
          <TextFieldLabel for="name">First Name</TextFieldLabel>

          <TextFieldInput
            id="name"
            type="text"
            name="firstName"
            placeholder="John Doe"
            required
          />
        </TextField> */}
        <TextField class="space-y-2">
          <TextFieldLabel for="username">Username</TextFieldLabel>

          <TextFieldInput
            id="username"
            type="text"
            placeholder="kody"
            name="username"
            required
          />
        </TextField>
        <TextField class="space-y-2">
          <TextFieldLabel for="password">Password</TextFieldLabel>

          <TextFieldInput
            id="password"
            type={showPassword() ? 'text' : 'password'}
            name="password"
            required
          />
        </TextField>
      </div>

      <Button class="w-full mt-6" type="submit">
        Create Account
      </Button>
    </form>
  );
};
export default RegisterForm;
