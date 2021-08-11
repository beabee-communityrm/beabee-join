import express from "express";
import { wrapAsync, wrapAsyncForm } from "./lib/utils";

const router = express.Router();

function goToSetup(apiResponse, res) {
  // Pass the cookie along
  const cookie = apiResponse.headers["set-cookie"].find((s) =>
    s.startsWith("session")
  );
  const match = cookie.match(/session=([^;]+);/);
  res.cookie("session", decodeURIComponent(match[1]), {
    maxAge: 267840000,
    httpOnly: true
  });

  res.redirect("/join/setup");
}

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
      const response = await req.api.post("/signup/complete", {
        redirectFlowId: req.query.redirect_flow_id
      });
      goToSetup(response, res);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        switch (error.response.data.code) {
          case "duplicate-email":
            return res.redirect("/join/duplicate-email");
          case "restart-membership":
            return res.redirect("/join/restart-membership");
          case "confirm-email":
            return res.redirect("/join/confirm-email");
        }
      }

      res.redirect("/join/failed");
    }
  })
);

router.get(
  "/confirm-email/:id",
  wrapAsync(async (req, res) => {
    try {
      const response = await req.api.post("/signup/confirm-email", {
        restartFlowId: req.params.id
      });
      goToSetup(response, res);
    } catch (error) {
      res.redirect("/join/failed");
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
