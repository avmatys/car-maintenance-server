import {
  getWebProfileByEmailQuery,
  createWebProfileQuery,
  getTgProfileByTelegramIdQuery,
  createTgProfileQuery,
} from "../queries/userQueries.js";
import {
  hashPassword,
  comparePasswords,
  generateToken,
  getExpirationDate,
} from "../utils/cryptoUtils.js";
import { formErrorResponse } from "../utils/errorUtils.js";

// Web profile
export const registerWebUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const webProfile = await getWebProfileByEmailQuery(email);
    if (webProfile) {
      return res
        .status(400)
        .json(formErrorResponse("User with the same email is already exists"));
    }
    const hashedPassword = await hashPassword(password);
    const userWebProfile = await createWebProfileQuery(email, hashedPassword);
    const { password: _, ...userWithoutPassword } = userWebProfile;
    res.status(201).json(userWithoutPassword);
  } catch (err) {
    return res
      .status(500)
      .json(formErrorResponse("Error creating user", err.message));
  }
};

export const loginWebUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getWebProfileByEmailQuery(email);
    if (!user) {
      return res.status(404).json(formErrorResponse("User doesn't exist"));
    }
    if (!(await comparePasswords(password, user.password))) {
      return res
        .status(401)
        .json(formErrorResponse("Invalid email or password"));
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
      userId: user.user_id,
    });
    res.json({ token, expiration_date: getExpirationDate(token) });
  } catch (err) {
    return res
      .status(500)
      .json(formErrorResponse("Error generating token.", err.message));
  }
};

// Telegram profile
export const registerTgUser = async (req, res) => {
  const { telegramId } = req.body;
  try {
    const tgProfile = await getTgProfileByTelegramIdQuery(telegramId);
    if (tgProfile) {
      return res
        .status(400)
        .json(
          formErrorResponse("User with the same telegram id is already exists")
        );
    }
    const userTgProfile = await createTgProfileQuery(telegramId);
    res.status(201).json(userTgProfile);
  } catch (err) {
    return res
      .status(500)
      .json(formErrorResponse("Error creating user", err.message));
  }
};

export const loginTgUser = async (req, res) => {
  const { telegramId } = req.body;
  try {
    const user = await getTgProfileByTelegramIdQuery(telegramId);
    if (!user) {
      return res.status(404).json(formErrorResponse("User doesn't exist"));
    }
    const token = generateToken({
      id: user.id,
      telegramId: user.telegram_id,
      userId: user.user_id,
    });
    res.json({ token, expiration_date: getExpirationDate(token) });
  } catch (err) {
    return res.status(500).json(formErrorResponse("Error generating token.", err.message));
  }
};
