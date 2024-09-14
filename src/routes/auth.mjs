import { Router } from "express";
import { mockUsers } from "../utils/constants.mjs";
import passport from "passport";

const router = Router();

// router.post("/api/auth", (req, res) => {
//   const {
//     body: { username, password },
//   } = req;
//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser || findUser.password !== password)
//     return res.status(401).send({ msg: "BAD CREDENTIALS" });

//   req.session.user = findUser;
//   return res.status(200).send(findUser);
// });

// router.get("/api/auth/status", (req, res) => {
//   req.sessionStore.get(req.sessionID, (err, session) => {
//     console.log(session);
//   });
//   return req.session.user
//     ? res.status(200).send(req.session.user)
//     : res.status(401).send({ msg: "Not Authenticated" });
// });

router.post(
  "/api/auth",
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200);
  }
);

router.get("/api/auth/status", (request, response) => {
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

router.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);
  request.logout((err) => {
    if (err) return response.sendStatus(400);
    response.send(200);
  });
});

router.get("/api/auth/discord", passport.authenticate("discord"));
router.get(
  "/api/auth/discord/redirect",
  passport.authenticate("discord"),
  (request, response) => {
    response.sendStatus(200);
  }
);

export default router;
