import React, { useState, useRef, useEffect } from 'react';

// --- 1. 画像インポート (ゆうきくんの環境に合わせてね) ---
import top01 from "./assets/images/top01.png";
import day1 from "./assets/images/day1.png";
import day2 from "./assets/images/day2.png";
import day3 from "./assets/images/day3.png";
import day4 from "./assets/images/day4.png";
import day5 from "./assets/images/day5.png";
import day6 from "./assets/images/day6.png";
import day7 from "./assets/images/day7.png";
import day8 from "./assets/images/day8.png";
import day9 from "./assets/images/day9.png";
import day10 from "./assets/images/day10.png";
import day11 from "./assets/images/day11.png";
import day12 from "./assets/images/day12.png";
import day13 from "./assets/images/day13.png";
import day14 from "./assets/images/day14.png";
import day15 from "./assets/images/day15.png";
import day16 from "./assets/images/day16.png";
import day17 from "./assets/images/day17.png";
import day18 from "./assets/images/day18.png";
import day19 from "./assets/images/day19.png";
import day20 from "./assets/images/day20.png";
import day21 from "./assets/images/day21.png";
import day22 from "./assets/images/day22.png";
import day23 from "./assets/images/day23.png";
import day24 from "./assets/images/day24.png";
import day25 from "./assets/images/day25.png";
import day26 from "./assets/images/day26.png";
import day27 from "./assets/images/day27.png";
import day28 from "./assets/images/day28.png";
import day29 from "./assets/images/day29.png";
import day30 from "./assets/images/day30.png";
import day31 from "./assets/images/day31.png";

// --- 2. データ定義 ---
const days = [
  { day: "Top", image: top01, text: "" },
  { day: "Day 1", image: day1, text: `Every encounter and event comes to bring happiness...` },
  { day: "Day 2", image: day2, text: `No Judgement...` },
  { day: "Day 3", image: day3, text: `Just living in the present is a great success...` },
  { day: "Day 4", image: day4, text: `Life is the sum of every moment...` },
  { day: "Day 5", image: day5, text: `SMILE...` },
  { day: "Day 6", image: day6, text: `If You Can’t Fly, Then Run...` },
  { day: "Day 7", image: day7, text: `Even a Half Step Is a Big Step Forward...` },
  { day: "Day 8", image: day8, text: `Everything Is a Passing Point...` },
  { day: "Day 9", image: day9, text: `Keisei Saimin — To Govern the World and Save the People...` },
  { day: "Day 10", image: day10, text: `Choose Love When in Doubt...` },
  { day: "Day 11", image: day11, text: `Cherish Yourself First...` },
  { day: "Day 12", image: day12, text: `'Oh, Well' Can Weigh on You Later...` },
  { day: "Day 13", image: day13, text: `Common Sense is Mostly Someone Else’s Convenience...` },
  { day: "Day 14", image: day14, text: `Even in Complete Darkness...` },
  { day: "Day 15", image: day15, text: `It Might Feel a Little Embarrassing, but...` },
  { day: "Day 16", image: day16, text: `Take Three Steps Forward, Two Steps Back...` },
  { day: "Day 17", image: day17, text: `I’ll Always Push You Forward...` },
  { day: "Day 18", image: day18, text: `Adults Can Cry Too...` },
  { day: "Day 19", image: day19, text: `When All Paths Are Blocked, Look for the Ninth...` },
  { day: "Day 20", image: day20, text: `It’s Tough, Frustrating, Lonely—but No Big Deal...` },
  { day: "Day 21", image: day21, text: `Don’t worry, the sun is always watching...` },
  { day: "Day 22", image: day22, text: `We’re all connected...` },
  { day: "Day 23", image: day23, text: `Someone will follow your footsteps...` },
  { day: "Day 24", image: day24, text: `Wind...` },
  { day: "Day 25", image: day25, text: `A Letter to the Future...` },
  { day: "Day 26", image: day26, text: `I’m Truly Glad I Met You...` },
  { day: "Day 27", image: day27, text: `Your 'Too Much' Side...` },
  { day: "Day 28", image: day28, text: `Excitement, Thrill, Joy...` },
  { day: "Day 29", image: day29, text: `Everything Is a Treasure...` },
  { day: "Day 30", image: day30, text: `The Future Is Yours to Shape...` },
  { day: "Day 31", image: day31, text: `You don’t need to hold back in your life. Live freely, live happily.` }
];

// --- 3. アプリ本体 ---
function App() {
  const [user, setUser] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [showText, setShowText] = useState(false);

  // 初期化と認証
  useEffect(() => {
    const pi = window.Pi;
    if (pi) {
      pi.init({ version: "1.5", sandbox: true }); 
      pi.authenticate(['username', 'payments'], (payment) => {
        console.log("Unfinished payment:", payment);
      }).then(auth => setUser(auth.user))
        .catch(err => console.error(err));
    }
  }, []);

  // 決済処理
  const handlePayment = async () => {
    const pi = window.Pi;
    if (!pi) return;
    try {
      await pi.createPayment({
        amount: 3, 
        memo: "Support Zen Verse Flip Vol.1",
        metadata: { productId: "zen_verse_flip_v1" },
      }, {
        onIncompletePaymentFound: (id) => window.Pi.completePayment(id, "manual_fix"),
        onReadyForServerApproval: (id) => console.log("Approved"),
        onReadyForServerCompletion: (id, txid) => window.Pi.completePayment(id, txid),
        onCancel: () => {},
        onError: (err) => alert("Error: " + err.message)
      });
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  if (!days || days.length === 0) return <div>Loading...</div>;
  const selectedDay = selectedDayIndex !== null ? days[selectedDayIndex] : null;

  if (selectedDay === null) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <img src={days[0].image} alt="Top" style={{ width: "100%", borderRadius: "10px", cursor: "pointer" }} onClick={() => setSelectedDayIndex(1)} />
        <button onClick={handlePayment} style={{ marginTop: "20px", padding: "12px 24px", background: "#FFD700", border: "none", borderRadius: "8px", fontWeight: "bold" }}>Support (3 Pi)</button>
        {user && <div style={{ marginTop: "10px" }}>Hi, {user.username}</div>}
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ position: "relative" }} onClick={() => setShowText(!showText)}>
        <img src={selectedDay.image} alt={selectedDay.day} style={{ width: "100%", borderRadius: "10px" }} />
        {showText && <div style={{ position: "absolute", bottom: 0, background: "rgba(0,0,0,0.7)", color: "white", padding: "15px", width: "100%", boxSizing: "border-box" }}>{selectedDay.text}</div>}
      </div>
      <button onClick={() => setSelectedDayIndex(null)} style={{ marginTop: "20px", padding: "10px 20px" }}>Menu</button>
    </div>
  );
}

export default App;
