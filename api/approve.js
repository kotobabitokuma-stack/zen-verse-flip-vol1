export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // App.jsから送られてきた paymentId を受け取るわ
  const { paymentId } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  try {
    // 1. Pi Networkの公式サーバーに「この決済を承認します」と伝えるわよ
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`, // Vercelに設定したAPIキーを使うわ
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();

    if (response.ok) {
      // 2. Piサーバーが認めてくれたら、アプリ側にも成功を返すわ
      console.log("Pi Server Approved:", result);
      res.status(200).json({ message: "Approved" });
    } else {
      console.error("Pi Server Error:", result);
      res.status(response.status).json(result);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ error: error.message });
  }
}
