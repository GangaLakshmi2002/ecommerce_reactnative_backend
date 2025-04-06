// paypalRoutes.js
import axios from "axios";
import express, {Request, Response} from "express";
const router = express.Router();

// Replace these with your actual PayPal sandbox credentials or load from environment variables.
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || 'YOUR_PAYPAL_SECRET';
const PAYPAL_BASE = 'https://api-m.sandbox.paypal.com';

// Helper: Get Access Token from PayPal
async function getAccessToken() {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
  const response = await axios({
    url: `${PAYPAL_BASE}/v1/oauth2/token`,
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`
    },
    data: 'grant_type=client_credentials'
  });
  return response.data.access_token;
}

// Create Order endpoint
router.post('/create-order', async (req: Request, res: Response) => {
  try {
    // total amount is sent from client (ensure to validate this server-side)
    const { total } = req.body;
    const accessToken = await getAccessToken();
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: total.toString()
          }
        }
      ],
      application_context: {
        return_url: 'https://your-server.com/paypal/capture-order', // update with your URL
        cancel_url: 'https://your-server.com/paypal/cancel'
      }
    };

    const response = await axios({
      url: `${PAYPAL_BASE}/v2/checkout/orders`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: orderData
    });

    // Find approval_url from the response links
    const approvalLink = response.data.links.find((link: {rel: string;}) => link.rel === 'approve');

    res.json({
      id: response.data.id,
      approvalUrl: approvalLink.href
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    res.status(500).json({ error: error });

    // res.status(500).json({ error: error.message });
  }
});

// Capture Order endpoint (called after approval)
router.post('/capture-order', async (req: Request, res: Response) => {
  try {
    const { orderID } = req.body;
    const accessToken = await getAccessToken();
    const response = await axios({
      url: `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    res.status(500).json({ error: error });
  }
});

export {router as PaypalRoute};

