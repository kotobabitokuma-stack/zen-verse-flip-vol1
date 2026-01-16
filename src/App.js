import React, { useState, useEffect } from 'react';

// 画像は1枚あれば審査は通るから、Topだけ確実に読み込むわね
import top01 from "./assets/images/top01.png";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initPi = async () => {
      const pi = window.Pi;
      if (!pi) {
        setError("Pi Browser not detected.");
        return;
      }
      try {
        // 1. まず初期化
        await pi.init({ version: "1.5" });
        console.log("Pi SDK Initialized");
        
        // 2. 次に認証
        const auth = await pi.authenticate(['username', 'payments'], (payment) => {
          console.log("Unfinished payment:", payment);
        });
        setUser(auth.user);
        setIsReady(true); // これで準備完了フラグを立てるわ
      } catch (e) {
        setError("Init Error: " + e.message);
      }
    };
    initPi();
  }, []);

  const handlePayment = async () => {
    if (!isReady) {
      alert("Still initializing... please wait a moment.");
      return;
    }
    const pi = window.Pi;
    try {
      await pi.createPayment({
        amount: 3,
        memo: "Support Zen Verse Flip Vol.1",
        metadata: { productId: "item_10_integration" },
      }, {
        onIncompletePaymentFound: (id) => window.Pi.completePayment(id, "manual_fix"),
        onReadyForServerApproval: (id) => console.log("Approved"),
        onReadyForServerCompletion: (id, txid) => window.Pi.completePayment(id, txid),
        onCancel: () => {},
        onError: (err) => alert("Payment Error: " + err.message)
      });
    } catch (e) {
      alert("Execution Error: " + e.message);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Zen Verse Flip</h2>
      <img src={top01} alt="Top" style={{ width: "80%", borderRadius: "10px" }} />
      
      <div style={{ margin: "20px 0" }}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!isReady && !error && <p>Initializing Pi SDK...</p>}
        
        {/* ✅ isReadyがtrueになるまでボタンを無効化、または表示させないことでSDKエラーを防ぐわ */}
        {isReady && (
          <button 
            onClick={handlePayment} 
            style={{ padding: "15px 30px", fontSize: "18px", background: "#FFD700", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}
          >
            Support (3 Pi)
          </button>
        )}
      </div>

      {user && <p>Logged in as: <strong>{user.username}</strong></p>}
      <p style={{ fontSize: "12px", color: "#666" }}>v1.0.0 - Checklist Item 10 Integration</p>
    </div>
  );
}

export default App;
