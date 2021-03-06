import * as bcrypt from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import * as jwt from "jsonwebtoken";
import { User } from "../../entity/UserEntity";
import { LoginInterface, RegisterInterface } from "../../types/types";

const RegisterController = async (
  req: FastifyRequest<{ Body: RegisterInterface }>,
  reply: FastifyReply
) => {
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
        secure: true,
        sameSite: "none",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })

      .send("Successfully registered!");
  } catch (error) {
    console.log("error");
    reply.code(400).send(error);
  }
};

const registerValidation = async (
  reply: FastifyReply,
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
    /^(?!.*\.\.)(?!.*\.$)[^\W][\w-]{0,32}$/.test(username); //i can delete these probably

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

const LoginController = async (
  req: FastifyRequest<{ Body: LoginInterface }>,
  reply: FastifyReply
) => {
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
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .send(user);
  } catch (error) {
    reply.code(400).send("Error!");
    console.log(error);
  }
};

const LogoutController = async (req: FastifyRequest, reply: FastifyReply) => {
  reply
    .setCookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .clearCookie("token") //here
    .send("Logged out successfully!");
};

const CheckController = async (req: FastifyRequest, reply: FastifyReply) => {
  /*
   * returns boolean
   * true  -> user is logged in
   * // I think i'm gonna make this return the user data
   * so i can preserve it more easily on the frontend
   * false -> user is not logged in
   *
   *
   * jwt verifies token, if there is a match returns "true" (so logged in)
   * if not then it throws an error, which i catch (using a trycatch block)
   * and just return "false"
   *
   */

  const { token } = req.cookies;
  if (!token) return reply.send(false);

  try {
    const userToken = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
    };

    const user = await User.findOne(userToken.id);

    reply.send(user);
  } catch (error) {
    console.log(error);

    reply.send(false);
  }
};

export {
  RegisterController,
  LoginController,
  LogoutController,
  CheckController,
};
