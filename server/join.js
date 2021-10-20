import express from "express";
import { wrapAsync, wrapAsyncForm } from "./lib/utils";

const router = express.Router();

router.post(
  "/",
  wrapAsyncForm(async (req, res) => {
    const response = await req.api.post("/signup", {
      email: req.body.email,
      password: req.body.password,
      amount: Number(req.body.amount),
      period: req.body.period,
      payFee: req.body.payFee === "true",
      completeUrl: process.env.AUDIENCE_URL + "/join/complete"
    });

    res.redirect(response.data.redirectUrl);
  })
);

router.get(
  "/complete",
  wrapAsync(async (req, res) => {
    try {
      await req.api.post("/signup/complete", {
        redirectFlowId: req.query.redirect_flow_id,
        confirmUrl: process.env.AUDIENCE_URL + "/join/confirm-email"
      });
      res.redirect("/join/confirm-email");
    } catch (error) {
      res.redirect("/join/failed");
    }
  })
);

router.get(
  "/confirm-email/:id",
  wrapAsync(async (req, res) => {
    try {
      const apiResponse = await req.api.post("/signup/confirm-email", {
        joinFlowId: req.params.id
      });
      // Pass the cookie along
      const cookie = apiResponse.headers["set-cookie"].find((s) =>
        s.startsWith("session")
      );
      res.set("Set-Cookie", cookie);
      res.redirect("/join/setup");
    } catch (error) {
      if (error.response?.data?.code === "duplicate-email") {
        res.redirect("/join/duplicate-email");
      } else {
        res.redirect("/join/failed");
      }
    }
  })
);

router.post(
  "/setup",
  wrapAsyncForm(async (req, res) => {
    await req.api.put("/member/me", {
      email: req.body.email,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      profile: {
        deliveryOptIn: req.body.deliveryOptIn === "true",
        deliveryAddress: req.body.deliveryAddress,
        newsletterStatus: req.body.newsletterStatus || "unsubscribed"
      }
    });
    res.redirect("/profile");
  })
);

export default router;
