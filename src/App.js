import React, { useState, useEffect } from 'react';

// 画像インポート
import top01 from "./assets/images/top01.png";

function App() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initPi = async () => {
      const pi = window.Pi;
      if (!pi) {
        setError("Pi Browser not detected. Please open in Pi Browser.");
        return;
      }
      try {
        // 最も安定しているバージョン 1.5.0 で初期化
        await pi.init({ version: "1.5.0" });
        
        const auth = await pi.authenticate(['username', 'payments'], (payment) => {
          console.log("Unfinished payment found:", payment);
        });
        
        setUser(auth.user);
        setIsReady(true);
      } catch (e) {
        console.error("Primary init failed, trying fallback:", e);
        try {
          // 予備としてバージョン 1 で再試行
          await pi.init({ version: "1" });
          const auth = await pi.authenticate(['username', 'payments'], (payment) => {});
          setUser(auth.user);
          setIsReady(true);
        } catch (e2) {
          setError("Init Error: " + e2.message);
        }
      }
    };
    initPi();
  }, []);

  const handlePayment = async () => {
    if (!isReady) {
      alert("Initializing... Please wait.");
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
      
      <div style={{ margin: "30px 0" }}>
        {error && <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>}
        {!isReady && !error && <p>Initializing Pi SDK...</p>}
        
        {isReady && (
          <button 
            onClick={handlePayment} 
            style={{ 
              padding: "15px 40px", 
              fontSize: "18px", 
              background: "#FFD700", 
              border: "none", 
              borderRadius: "12px", 
              fontWeight: "bold", 
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              cursor: "pointer" 
            }}
          >
            Support (3 Pi)
          </button>
        )}
      </div>

      {user && (
        <div style={{ marginTop: "20px", color: "#444" }}>
          Logged in as: <strong>{user.username}</strong>
        </div>
      )}
      
      <p style={{ fontSize: "12px", color: "#999", marginTop: "50px" }}>
        v1.1.0 - Checklist Item 10 Integration Mode
      </p>
    </div>
  );
}

export default App;
