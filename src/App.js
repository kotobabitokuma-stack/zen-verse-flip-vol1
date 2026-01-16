import React, { useState, useEffect } from 'react';

// 画像インポート
import top01 from "./assets/images/top01.png";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initPi = async () => {
      // window.Pi が存在するか確認
      const pi = window.Pi;
      if (!pi) {
        setError("Pi Browser not detected.");
        return;
      }

      try {
        // 【重要】引用符を外した数値の 1.5 または、最もシンプルな "1" を試します
        // まずは公式ドキュメントで最も推奨される数値形式を試行
        await pi.init({ version: "1" }); 
        
        console.log("Pi SDK Initialized with version 1");
        
        const auth = await pi.authenticate(['username', 'payments'], (payment) => {
          console.log("Unfinished payment:", payment);
        });
        
        setUser(auth.user);
        setIsReady(true);
      } catch (e) {
        setError("Init Error: " + e.message);
      }
    };

    // ページ読み込み完了後に少しだけ待ってから実行（SDKの読み込み漏れ防止）
    const timer = setTimeout(() => {
      initPi();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handlePayment = async () => {
    if (!isReady) return;
    const pi = window.Pi;
    try {
      await pi.createPayment({
        amount: 3,
        memo: "Support Zen Verse Flip Vol.1",
        metadata: { productId: "item_10" },
      }, {
        onIncompletePaymentFound: (id) => window.Pi.completePayment(id, "manual_fix"),
        onReadyForServerApproval: (id) => console.log("Approved"),
        onReadyForServerCompletion: (id, txid) => window.Pi.completePayment(id, txid),
        onCancel: () => {},
        onError: (err) => alert("Payment Error: " + err.message)
      });
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Zen Verse Flip</h2>
      <img src={top01} alt="Top" style={{ width: "80%", borderRadius: "10px" }} />
      
      <div style={{ margin: "30px 0" }}>
        {error && (
          <div style={{ color: "red" }}>
            <p><strong>{error}</strong></p>
            <p style={{ fontSize: "12px" }}>ブラウザを一度閉じて、Pi Browserの再起動を試してください。</p>
          </div>
        )}
        
        {!isReady && !error && <p>Connecting to Pi Network...</p>}
        
        {isReady && (
          <button 
            onClick={handlePayment} 
            style={{ padding: "15px 40px", fontSize: "18px", background: "#FFD700", border: "none", borderRadius: "12px", fontWeight: "bold" }}
          >
            Support (3 Pi)
          </button>
        )}
      </div>

      {user && <div>Logged in as: {user.username}</div>}
      <p style={{ fontSize: "10px", color: "#ccc", marginTop: "40px" }}>SDK Mode: v1</p>
    </div>
  );
}

export default App;
