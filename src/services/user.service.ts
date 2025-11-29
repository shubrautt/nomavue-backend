const UserModel = require("../models/user.model");

import type { User } from "../types/user.type";

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

module.exports = { createUser, generateAccessToken, validateAccessToken };
