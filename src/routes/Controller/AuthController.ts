import * as jwt from "jsonwebtoken";
import { User } from "../../entity/User";
import * as bcrypt from "bcryptjs";

interface Register {
  body: {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };
}

const RegisterController = async (req: Register, reply) => {
  try {
    const { username, email, passwordHash } = await registerValidation(
      reply,
      req.body
    );

    const newUser = await User.create({
      username,
      email,
      passwordHash,
    }).save();

    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    reply
      .setCookie("token", token, {
        httpOnly: true,
        // secure: true,
        // sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .send("Successfully registered!");
  } catch (error) {
    console.log("error");
    reply.code(400).send(error);
  }
};

const registerValidation = async (
  reply: any,
  { username, email, password, passwordConfirmation }
) => {
  if (password !== passwordConfirmation) {
    return reply
      .code(400)
      .send("Please make sure to type the same password twice.");
  }

  const existingUserUsername = await User.findOne({
    username,
  });

  const existingUserEmail = await User.findOne({
    email,
  });

  if (existingUserUsername || existingUserEmail) {
    return reply
      .code(400)
      .send("A user with the same email or username already exists!");
  }

  const usernameValidation = (username: string) =>
    /^(?!.*\.\.)(?!.*\.$)[^\W][\w-]{0,29}$/.test(username);

  const emailValidation = (email: string) => /\S+@\S+\.\S+/.test(email);

  if (!usernameValidation(username)) {
    return reply.code(400).send("Please enter a valid username.");
  }

  if (!emailValidation(email)) {
    return reply.code(400).send("Please enter a valid email adress.");
  }

  if (password.length < 6) {
    return reply
      .code(400)
      .send(
        "Please make sure that your password is at least 6 characters long."
      );
  }

  const bcryptSalt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, bcryptSalt);

  return {
    username,
    email,
    passwordHash,
  };
};

interface Login {
  body: {
    email: string;
    password: string;
  };
}

const LoginController = async (req: Login, reply) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return reply.send("Please enter all required fields.");
    }
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) return reply.code(400).send("Wrong email or password.");

    const correctPassword = await bcrypt.compare(password, user.passwordHash);

    if (!correctPassword)
      return reply.code(400).send("Wrong email or password.");

    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    reply
      .setCookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .send("Succesfully logged in!");
  } catch (error) {
    reply.code(400).send("Error!");
    console.log(error);
  }
};

const LogoutController = async (req, reply) => {
  reply
    .setCookie("token", "", {
      httpOnly: true,
      expiresIn: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send("Logged out successfully!");
};

export { RegisterController, LoginController, LogoutController };
