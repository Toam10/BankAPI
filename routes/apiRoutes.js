const express = require("express");
const {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
  editing,
  depositing,
  updateCredit,
  withdraw,
  transferring,
  sortByCash,
  sortDebtors
} = require("../controllers/userControllers");

const apiRouter = express.Router();
apiRouter.get("/", (req, res) => res.send("ok"));
// please move all the /users in to this Router (userRouter)
//apiRouter.use("/users", userRouter);

apiRouter.get("/users", getAllUsers);

apiRouter.get("/user", getUser);
// todo: adding users
apiRouter.post("/users", addUser);

// todo: delete user
apiRouter.delete("/users", deleteUser);

// todo: editing user data
apiRouter.put("/users/editing", editing);
apiRouter.put("/users/depositing", depositing);
apiRouter.put("/users/updateCredit", updateCredit);
apiRouter.put("/users/withdraw", withdraw);
apiRouter.put("/users/transferring", transferring);
apiRouter.post("/users/sortCash", sortByCash);
apiRouter.post("/users/sortDebtors", sortDebtors);


// export default apiRouter;
module.exports = apiRouter;

// really really nice code I love the way you writing
