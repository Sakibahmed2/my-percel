import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createPrivateSdk, FetchClient, PostShipments } from "@myparcel/sdk";
dotenv.config();

const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://my-percel-frontend.vercel.app"],
  })
);
app.use(express.json());

const sdk = createPrivateSdk(
  new FetchClient({
    headers: {
      Authorization: `Bearer ${process.env.MY_PARCEL_API_KYE}`,
    },
  }),
  [new PostShipments()]
);

// Routes

app.post("/shipments", async (req, res) => {
  try {
    const { body } = req.body;
    const result = await sdk.postShipments({ body });

    res.status(200).json({
      message: "Shipment created successfully",
      data: result[0],
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
