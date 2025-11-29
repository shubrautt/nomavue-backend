import UserModel from "../models/user.model.js";

import { type User } from "../types/user.type.js";

const generateAccessToken =  async () => {
    // TODO: generate access Token
}

const validateAccessToken = async () => {
    // TODO: validate access token
}

const createUser = async ({ name, email, password }: User) => {
    const user = await UserModel.create({
        name, email, password
    });
}

export { createUser, generateAccessToken, validateAccessToken };
