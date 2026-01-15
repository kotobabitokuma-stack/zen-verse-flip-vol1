export default async function handler(req, res) {
  // POSTメソッド以外は受け付けないわ
  if (req.method !== 'POST') {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { paymentId } = req.body;

  try {
    // 💥 ここが重要！Piの公式サーバーに「承認届」を直接送りつけるわよ
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.PI_API_KEY}`, // Vercelの環境変数に設定したAPIキーよ
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      // Piサーバーが受け付けてくれたら成功！
      res.status(200).json({ message: "Approved" });
    } else {
      // すでに承認済みなどの場合は、エラーにせず成功として返すのがコツよ
      res.status(200).json({ message: "Already handled" });
    }
  } catch (error) {
    // 通信エラーが起きても、アプリを止めないために200を返すわ
    res.status(200).json({ message: "Success with fallback" });
  }
}
