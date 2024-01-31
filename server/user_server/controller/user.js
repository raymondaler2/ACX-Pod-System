const User = require("./../model/user");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const UserPosition = require("./../model/userPosition");
const UserRole = require("./../model/userRole");
const UserRelationship = require("./../model/userRelationship");

const addUser = asyncHandler(async (req, res) => {
  try {
    const { position, role, relationship, ...userData } = req.body;

    let existingPosition = await UserPosition.findOne({ position });
    let existingUserRole = await UserRole.findOne({ role });
    let existingRelationship = await UserRelationship.findOne({ relationship });

    if (!existingPosition) {
      existingPosition = await UserPosition.create({ position });
    }

    if (!existingUserRole) {
      existingUserRole = await UserRole.create({ role });
    }

    if (!existingRelationship) {
      existingRelationship = await UserRelationship.create({ relationship });
    }

    const user = await User.create({
      ...userData,
      position: existingPosition._id,
      role: existingUserRole._id,
      relationship: existingRelationship._id,
    });

    res.status(200).json(`User Created: ${user._id}`);
  } catch (error) {
    res.status(500).json(`Add User by ERROR: ${error}`);
    console.error(`Add User by ERROR: ${error}`);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json(`Delete User ERROR: User with ID ${id} not found`);
      console.error(`Delete User ERROR: User with ID ${id} not found`);
    }
    res.status(200).json("User Deleted");
  } catch (error) {
    res.status(500).json(`Delete User ERROR: ${error}`);
    console.error(`Delete User ERROR: ${error}`);
  }
});

const getAllUser = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ username: { $ne: "acx_super_admin" } })
      .populate("position", "position")
      .populate("role", "role")
      .populate("relationship", "relationship");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(`Get All Users ERROR: ${error}`);
    console.error(`Get All Users ERROR: ${error}`);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json("Login User ERROR: username and password are required for login");
      console.error(
        "Login User ERROR: username and password are required for login"
      );
    }

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      const secretKey = process.env.JWT_SECRET;

      const token = jwt.sign(
        {
          user: user.username,
          userId: user._id,
        },
        secretKey,
        { expiresIn: "720h" }
      );

      res.status(200).json({
        token,
        _id: user._id,
      });
    } else {
      res.status(401).json("Login User ERROR: Invalid username or password");
      console.error("Login User ERROR: Invalid username or password");
    }
  } catch (error) {
    res.status(500).json(`Login User ERROR: ${error}`);
    console.error(`Login User ERROR: ${error}`);
  }
});

const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`Get User by Id ERROR: ${error}`);
    console.error(`Get User by Id ERROR: ${error}`);
  }
});

const updateUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { position, role, relationship, ...userData } = req.body;

    let existingPosition, existingUserRole, existingRelationship;

    if (position) {
      existingPosition = await UserPosition.findOneAndUpdate(
        { position },
        { position },
        { upsert: true, new: true }
      );
    }

    if (role) {
      existingUserRole = await UserRole.findOneAndUpdate(
        { role },
        { role },
        { upsert: true, new: true }
      );
    }

    if (relationship) {
      existingRelationship = await UserRelationship.findOneAndUpdate(
        { relationship },
        { relationship },
        { upsert: true, new: true }
      );
    }

    const updateFields = {
      ...userData,
      ...(existingPosition && { position: existingPosition._id }),
      ...(existingUserRole && { role: existingUserRole._id }),
      ...(existingRelationship && { relationship: existingRelationship._id }),
    };

    const updatedUser = await User.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json(`Update User ERROR: User with ID ${id} not found`);
      console.error(`Update User ERROR: User with ID ${id} not found`);
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(`Update User ERROR: ${error}`);
    console.error(`Update User ERROR: ${error}`);
  }
});

module.exports = {
  getUserById,
  getAllUser,
  addUser,
  deleteUser,
  loginUser,
  updateUserById,
};
