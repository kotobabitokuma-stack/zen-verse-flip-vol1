import React, { useState, useRef, useEffect } from 'react'; // 1行目: useEffect を追加してね！

// --- 画像インポート部分はそのまま維持 ---
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

// 便宜上、daysの定義はゆうきくんの元のフルバージョンを使ってね！
const days = [
  { day: "Top", image: top01, text: "" },
  { day: "Day 1", image: day1, text: `Every encounter and event comes to bring happiness.
Painful moments, tough experiences, joyful times—they all contribute to your happiness.
Looking back, some experiences shaped who you are today. Without them, your current happiness might not exist.
If you are facing hardship, acknowledge it: "I am in a difficult time," and trust yourself: "This will lead to happiness."
If you are in joy, savor it, knowing it will lead to even more happiness.
Past events, encounters, and decisions all connect to the present, shaping your future happiness.` },
  { day: "Day 2", image: day2, text: `No Judgement.
People, especially in Japan, often have a habit of judging others. From news reports to social norms, we’re constantly shown who is right or wrong, and apologies are expected. Over time, this can make us judge others—and ourselves—harshly.
But judgement isn’t necessary. Mistakes happen, regrets happen, and that’s okay. Start by not judging yourself. Accept and embrace your failures, and gradually you’ll stop blaming others too.
The time and energy spent judging can instead be devoted to enriching your heart and life.` },
  { day: "Day 3", image: day3, text: `Just living in the present is a great success.
Everyone is born to be happy, but many forget this along the way. Society, social norms, and the pressures of life can make us lose sight of the happiness that’s right in front of us.
Even things like money, which are not inherently bad, are often made to feel stressful, pushing people to work hard even at things they don’t love. But true success doesn’t come from exhaustion—it comes from remembering that we are free to live as we like.
Being born into this world, in this era, is already a success. And above all, simply living in the present—being here, now—is a great success.
So today, take a moment to acknowledge and celebrate the fact that you are already succeeding.` },
  { day: "Day 4", image: day4, text: `Life is the sum of every moment.
Every moment you live now is built from past moments.
Most of our daily choices happen unconsciously, often holding us back.
Be aware of your decisions: choose what truly fulfills you.
Even small conscious choices lead to a lifetime of satisfaction and fulfillment.` },
{ day: "Day 5", image: day5, text: `SMILE.
Smiles are contagious — but so is anger.
When you meet someone smiling, you naturally smile too.
Your smile can spread from one person to another, across the world, and someday come back to you.
Maybe the smile you see today began with your own.` },
{ day: "Day 6", image: day6, text: `If You Can’t Fly, Then Run.
An ostrich is a bird, yet it can’t fly — it runs, and runs fast.
It doesn’t question why it can’t fly; it simply does what it can.
You don’t have to compare yourself with others.
Just do what you can, and what you love.
Can’t fly? Then run!` },
{ day: "Day 7", image: day7, text: `Even a Half Step Is a Big Step Forward.
Taking the first step can be scary — especially when it’s something new or something you must succeed at.
But even if it’s just a half step, it’s still a real and meaningful step.
Because that small move leads you toward your wonderful future.
Others might not understand your courage, and that’s okay.
Be proud of yourself — you’ve taken that brave first step.` },
{ day: "Day 8", image: day8, text: `Everything Is a Passing Point.
When things don’t go as planned, don’t blame yourself.
Every “failure” is just a step toward true success — an experience only you could gain.
You might not see it yet, but trust that this moment is a necessary step on your journey.
Even when you succeed, that’s not the end. Each success becomes the foundation for the next.
Keep walking, believe in yourself, and remember — today is simply another passing point toward something greater.` },
{ day: "Day 9", image: day9, text: `Keisei Saimin — To Govern the World and Save the People.
The word “Keisei Saimin” — meaning “to govern the world and save the people” — is the origin of the word economy.
When we hear “economy,” we often think of money and trade. But its true purpose was to bring peace and well-being to people.
Yet today, money often feels like a burden rather than a tool of compassion.
So when you spend money, try doing it with gratitude — thinking, “I’m supporting others; I’m part of Keisei Saimin.”
If more of us used money with that spirit, the world would become richer — not just in wealth, but in kindness and connection.
Next time you make a payment, remember: Keisei Saimin begins with you.` },
{ day: "Day 10", image: day10, text: `Choose Love When in Doubt.
When you’re unsure which path to take or faced with a tough decision, let love be your guide.
It’s easy to choose what seems safe or convenient, but that often leads to compromise, regret, or emotional strain.
When choices are made based on gain or loss, the heart rarely feels satisfied — even if things appear to go well.
But when love becomes your compass, something shifts.
Love might take many forms — kindness, understanding, honesty, or courage — but it always leads you closer to your truth.
When you act from love, new paths open and ideas flow naturally.
No matter the result, love-based decisions leave your heart full and your spirit light.
So today, let your choices come from love — and enjoy the gentle magic that follows.` },
{ day: "Day 11", image: day11, text: `Cherish Yourself First.
Whatever is precious to you—family, friends, memories—start by valuing yourself. Even if it feels like you have nothing, prioritize your own well-being.
Many people sacrifice themselves for others, but filling your own cup first allows you to care for others genuinely. When you honor yourself, your life, relationships, and happiness naturally improve.
So ask yourself—what is truly precious to you today?` },
{ day: "Day 12", image: day12, text: `'Oh, Well' Can Weigh on You Later.
Have you ever thought, “Oh, well, it’s fine”?
From my experience in snowy Hokkaido, skipping small chores like shoveling snow seems easy at the moment—but it often piles up and becomes a much heavier burden later.
The lesson: don’t dismiss things lightly. Check carefully if “oh, well” is really okay. This mindset has helped me avoid unnecessary struggles in daily life and at work.` },
{ day: "Day 13", image: day13, text: `Common Sense is Mostly Someone Else’s Convenience.
Have you ever felt pressured by phrases like, “That’s obvious,” “Everyone says so,” or “You’re really unusual”? I used to blame myself, thinking I didn’t fit in.
Remember: common sense isn’t absolute. It often reflects other people’s convenience, changes with time, place, or situation, and can be rewritten to suit someone’s interests.
Following it might keep the peace, but does it truly fulfill your heart? Often, the secrets to real happiness lie outside what’s considered “normal.”
Common sense is mostly someone else’s convenience.` },
{ day: "Day 14", image: day14, text: `Even in Complete Darkness.
Sometimes it feels like everything is hopeless and you can’t see a way forward. I’ve faced many trials myself, and often lost confidence.
Yet here I am—and so are you. Somehow, we’ve overcome obstacles and reached this moment.
So it’s okay. Even in total darkness, light will eventually appear. When you can’t see which way to go, consider the direction you’re facing as forward. If it doesn’t work out, you can turn back or change course.
Trust yourself, and move today in the direction you are facing.` }, 
{ day: "Day 15", image: day15, text: `It Might Feel a Little Embarrassing, but...
When you translate "I love you" directly, it simply means “愛している.” In many countries, people say I love you almost like a greeting.
But in Japan, it’s a bit different — saying “I love you” feels special, something reserved for rare moments.
Many of us are shy about expressing love in words. But that’s why it’s beautiful to say it once in a while.
Even if you think, “They already know how I feel,” putting it into words still has power.
Say it to your partner, your parents, your children, your siblings, or even your friends.
No need for fancy words — simple and honest is best.
And if “I love you” feels too shy, just say “thank you.” That alone carries love too.
Words aren’t always necessary to show love, but they exist to help us express it. So, don’t be afraid to use them. I love you.` },
{ day: "Day 16", image: day16, text: `Take Three Steps Forward, Two Steps Back.
There's a saying, "Three steps forward, two steps back."
But when you can, go forward boldly and with momentum!
Even if you stumble or hit a wall, it means you're moving forward.
Believe in yourself, trust life, and keep charging toward your future.
Every step forward brings new sights that only those who keep going can see.` },
{ day: "Day 17", image: day17, text: `I’ll Always Push You Forward.
Sometimes taking a step forward feels scary.
It’s hard to move, but that means it’s important. Don’t blame yourself for hesitating.
Even though we don’t know each other, through this book, I hope to give you courage and a spark of happiness.
Whenever you want to take a step, open this page.
I’ll always be here to gently push you forward.
You might not know what lies ahead, and you might stumble.
But beyond that, your happiness is waiting.
Everything will work out, I promise!` },
{ day: "Day 18", image: day18, text: `Adults Can Cry Too.
It’s okay to cry when you need to.
It doesn’t matter if you’re a man, a woman, an adult, or a child. Tears exist for a reason.
Even I sometimes cry in secret.
Cry for joy, cry for sadness—let your tears warm your life.
Being alive is wonderful.` },
{ day: "Day 19", image: day19, text: `When All Paths Are Blocked, Look for the Ninth.
Sometimes it feels like every path is blocked. But it’s too early to give up. Look for the ninth path.
It might be up, it might be down.
If you can’t find it alone, asking someone for help is also a way forward.
Unexpected ideas can come from it, and new paths may open.
So don’t give up just yet.` },
{ day: "Day 20", image: day20, text: `It’s Tough, Frustrating, Lonely—but No Big Deal.
This phrase was given to me by a teacher when I graduated high school.
That teacher had received it from their own teacher, long ago. Words can be wonderful, can’t they?
Even when life is tough, frustrating, or lonely, it’s okay.
Smile, stay cheerful, stay energetic, and enjoy life. That’s my mindset.
Of course, when things are really tough, frustrating, or lonely, it’s normal to feel it.` },
{ day: "Day 21", image: day21, text: `Don’t worry, the sun is always watching.
When I was a child, my grandmother often said, in her firm way, “The sun is always watching!”
She meant that even if no one else notices, the sun sees everything—and it was her way of guiding me.
Now I understand it differently.
Maybe right now you are quietly doing your best, feeling unseen or unrecognized. That’s okay. The sun is watching.
Even on rainy days or in the darkest nights, your efforts are noticed.
You don’t need anyone else to acknowledge it. The person who truly knows and values your effort is… you.` },
{ day: "Day 22", image: day22, text: `We’re all connected.
Have you looked up at the sky recently? What’s the weather like today?
Whether it’s sunny, cloudy, rainy, or a beautiful starry night, the sky connects us all.
So whenever you feel lonely, try looking up.
We are all connected. You and I are connected.
What does today’s sky look like for you?` },
{ day: "Day 23", image: day23, text: `Someone will follow your footsteps.
It takes courage to walk a path where there’s no clear way ahead.
Even when there’s nothing in sight and you don’t know what lies ahead, you keep moving forward.
When you do, every strong step you take leaves a clear footprint, guiding those who come after you.
One person follows your steps, then another follows theirs, and eventually, those footprints overlap to create a path.
Thanks to you walking where there was no path, a road to happiness is made, guiding many people.
So take that first step with courage.
That single step will lead to happiness.` },
{ day: "Day 24", image: day24, text: `Wind.
A headwind, when looked back upon, can become a tailwind.
Of course, you might think, "If you look back, your direction changes!"—and you’re right (laughs).
But here, the point is to change your perspective.
Instead of blindly pushing forward, shifting your viewpoint or mindset can turn what seemed like obstacles into a tailwind that propels you toward your goal.
A force can only be pushed back if it meets an equal or lesser power.
But if you can harness that energy, even a small effort can generate a great force.
When the headwind feels strong, it might be helpful to pause and look back for a moment.
Surprisingly, this applies to human relationships as well.` },
{ day: "Day 25", image: day25, text: `A Letter to the Future.
In my work, I write on blank sheets every day. Moments ago, the paper was empty, and now it carries a message. Something emerges where there was nothing.
Life is the same. You are free to live as you wish. With just a thought, a previously empty life can fill with dreams. You don’t have to force it—anything that brings you joy counts.
The future is always blank and unknown. So draw it freely, however you like.
What will you write in your letter to the future?` },
{ day: "Day 26", image: day26, text: `I’m Truly Glad I Met You.
Are there people you can truly say, from the bottom of your heart, you’re glad to have met? And are there people who feel the same about you?
If yes, that’s a great happiness. If not, perhaps those encounters are yet to come.
Who makes you feel this way? And how would having such people in your life shape your journey?
These meaningful encounters aren’t something you search for—they are drawn to you, whether family, friends, or others. In a way, we are born with the promise of certain meetings.
Live your life authentically and joyfully, and you’ll notice these encounters all around you.
Who were you born to meet?` },
{ day: "Day 27", image: day27, text: `Your 'Too Much' Side.
Have you ever been told you’re “too much” at something?
For example, “too kind.” Being kind is a wonderful thing, but when it becomes “too much,” it can feel like the opposite. Sometimes you might even try to hold back your kindness, yet end up repeating the same patterns.
The truth is, your “too much” side is often hard to suppress because it’s actually one of your strengths. So, why not embrace it fully? By doing so, your unique charm shines even brighter.
The key is not to deny yourself. Your “too much” side can be seen as part of your individuality. When you stop denying it, you can begin to accept yourself, and surprisingly, you’ll find you can even manage that “too much” side naturally.
Sometimes what people call “too much” is actually your greatest strength. Your “too much” side? That’s part of what makes you wonderful.` },
{ day: "Day 28", image: day28, text: `Excitement, Thrill, Joy.
Are you feeling excited? Thrilled? Joyful?
These moments are when your energy is at its peak, and even your cells are rejoicing. Your mind and body become healthier, and it’s a secret to staying youthful.
Have you noticed people around you who always seem happy and vibrant? Chances are, they’re living in alignment with what they love, following their “likes” and passions. This naturally brings more moments of excitement, thrill, and joy into their lives.
Start by noticing your own “likes.” From there, the energy of excitement and joy begins to flow.
(By the way, I get a different kind of thrill every month… when paying bills)` },
{ day: "Day 29", image: day29, text: `Everything Is a Treasure.
Thank you for encountering and reading this daily calendar.
You’ve truly done your best to reach today. Surely, you’ve experienced many things—some wonderful, some difficult—but you are here now, alive, reading this. Even one different choice in the past could have changed this moment, including your encounters with important people around you.
Though the hard and sad times were challenging, overcoming them has brought you to the present. Failures or regrets may have existed, but nothing was truly wrong.
From joys and struggles alike, you’ve gained learning and awareness. Even the warmth of tears shed has contributed to the smile you wear today.
All your days up to now are your treasures.` },
{ day: "Day 30", image: day30, text: `The Future Is Yours to Shape.
Are you imagining your future? Sometimes daily life can make it hard to see ahead. But now, having this book, try envisioning your future again—and know that it’s completely flexible.
There are no limits to the future you can imagine. Many people set restrictions: “I have family,” “I need money,” “I have work,” and so on. It’s understandable, but your future can be as free as drawing on a blank sheet of paper. Only you can create your unique vision.
Above all, start by imagining it for yourself. Don’t worry about whether it’s possible—just begin by drawing it in your mind.
What future will you create?` },
{ day: "Day 31", image: day31, text: `You don’t need to hold back in your life. Live freely, live happily.
This doesn’t mean doing whatever you want without care. The happiness of others is important too. But to help others truly be happy, you must first make yourself happy. To do that, there’s no need to hold back in your own life.
So, live boldly, shine brightly, and embrace happiness.
There’s no need to hold back in your life.` }
];


// --- Pi SDK 決済ロジック ---
const handlePayment = async () => {
  const pi = window.Pi;
  if (!pi) return;

  try {
    await pi.init({ version: "2.0", sandbox: false });

    await pi.createPayment({
      amount: 3.14,
      memo: "Support Zen Verse Flip Vol.1",
      metadata: { productId: "zen_verse_flip_v1" },
    }, {
      // 💡 公式が推奨する「未完了決済」の唯一の正しい窓口
      onIncompletePaymentFound: (id) => pi.completePayment(id, "manual_fix"),
      
      onReadyForServerApproval: (id) => {
        console.log("Approved:", id);
        // 本来はここでバックエンドを叩くけれど、まずはフロントで完結させるわ
      },
      
      onReadyForServerCompletion: (id, txid) => {
        pi.completePayment(id, txid);
        alert("決済が完了しました！ありがとうございます！");
      },
      
      onCancel: (id) => {},
      onError: (err) => alert("エラーが発生しました。時間を置いて再度お試しください。")
    });
  } catch (err) {
    console.error(err);
  }
};

// --- UIコンポーネント ---
function PiUserBadge({ user }) {
  if (!user) return null;
  return (
    <div style={{
      position: "fixed", top: 15, right: 15, background: "#5B45FF", color: "white",
      padding: "8px 14px", borderRadius: "20px", fontSize: "14px", fontWeight: "bold", zIndex: 1000
    }}>
      {user.username}
    </div>
  );
}

const buttonStyle = {
  padding: "6px 12px", fontSize: "14px", background: "transparent", color: "#555",
  border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer", opacity: 0.8
};

// --- アプリ本体 ---
function AppWithPi({ user }) {
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [showText, setShowText] = useState(false);
  const [isTop, setIsTop] = useState(true);
  const touchStartX = useRef(0);

  // ✅ 1. 自動お掃除機能（ここで完結するように閉じカッコを整理したわ）
  useEffect(() => {
    const autoCleanUp = async () => {
      if (window.Pi) {
        try {
          await window.Pi.init({ version: "2.0", sandbox: false });
          const getIncomplete = window.Pi.getIncompletePayment || window.Pi.get_incomplete_payment;
          if (typeof getIncomplete === 'function') {
            const incomplete = await getIncomplete();
            if (incomplete) {
              await window.Pi.completePayment(incomplete.paymentId, "manual_fix");
              alert("古い決済をお掃除したわ！これでボタンが使えるはずよ。");
            }
          }
        } catch (e) {
          console.log("お掃除不要（または失敗）:", e);
        }
      }
    };
    autoCleanUp();
  }, []); // 👈 閉じカッコはここ！ここで一度区切るのが正解よ。

  // ✅ 2. データのガード（お掃除の外に出したわ）
  if (!days || days.length === 0) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading calendar data...</div>;
  }

  // ✅ 3. 以降のロジック（ここからはゆうきくんの元のコードと同じよ）
  const selectedDay = selectedDayIndex !== null ? days[selectedDayIndex] : null;

  const handleSwipe = (direction) => {
    if (selectedDayIndex === null) return;
    if (direction === "left" && selectedDayIndex < days.length - 1) {
      setSelectedDayIndex(selectedDayIndex + 1);
      setShowText(false);
    }
    if (direction === "right") {
      if (selectedDayIndex === 1) {
        setIsTop(true);
        setSelectedDayIndex(null);
      } else if (selectedDayIndex > 1) {
        setSelectedDayIndex(selectedDayIndex - 1);
        setShowText(false);
      }
    }
  };

  if (selectedDay === null) {
    if (isTop) {
      return (
        <div style={{ textAlign: "center", padding: "10px", paddingBottom: "100px" }}>
          <img
            src={days[0].image}
            alt="Top"
            style={{ width: "100%", height: "auto", borderRadius: "10px", cursor: "pointer" }}
            onClick={() => setIsTop(false)}
          />
          <p style={{ marginTop: "12px", fontSize: "18px", color: "#666" }}>Tap to Start</p>
          <button 
            onClick={(e) => { e.stopPropagation(); handlePayment(); }}
            style={{ 
              ...buttonStyle, background: "#FFD700", color: "#000", fontWeight: "bold", 
              marginTop: "10px", marginBottom: "80px", padding: "12px 24px", opacity: 1, position: "relative", zIndex: 1001
            }}
          >
            Support this App (3 Pi)
          </button>
          <PiUserBadge user={user} />
        </div>
      );
    }
    return (
      <div style={{ textAlign: "center", padding: "10px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(70px, 1fr))", gap: "10px", justifyItems: "center", marginBottom: "20px" }}>
          {days.slice(1).map((d, i) => (
            <button key={i} onClick={() => { setSelectedDayIndex(i + 1); setShowText(false); }}
              style={{ padding: "16px", fontSize: "18px", borderRadius: "8px", border: "1px solid #ccc", backgroundColor: "#f9f9f9", width: "100%" }}>
              {d.day}
            </button>
          ))}
        </div>
        <PiUserBadge user={user} />
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: 0 }}
          onTouchStart={e => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const deltaX = e.changedTouches[0].clientX - touchStartX.current;
            if (deltaX > 50) handleSwipe("right");
            else if (deltaX < -50) handleSwipe("left");
          }}
    >
      <div style={{ position: "relative", width: "100%", cursor: "pointer" }} onClick={() => setShowText(!showText)}>
        <img src={selectedDay.image} alt={selectedDay.day} style={{ width: "100%", height: "auto", borderRadius: "10px" }} />
        {selectedDay.text && (
          <div style={{
            position: "absolute", bottom: 0, left: 0, width: "100%", maxHeight: showText ? "60%" : "0",
            overflowY: "auto", background: "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.3))",
            color: "white", padding: showText ? "15px" : "0", fontSize: "18px", lineHeight: "1.6",
            textAlign: "left", borderRadius: "0 0 10px 10px", transition: "all 0.4s ease-in-out"
          }}>
            {selectedDay.text.split("\n").map((line, idx) => (
              <p key={idx} style={{ margin: "0 0 12px 0" }}>{line}</p>
            ))}
          </div>
        )}
      </div>
      <div style={{ position: "fixed", bottom: "80px", left: 0, width: "100%", display: "flex", justifyContent: "space-between", padding: "0 12px", boxSizing: "border-box", zIndex: 200 }}>
        <button onClick={() => { setSelectedDayIndex(null); setShowText(false); }} style={buttonStyle}>All Days</button>
        <button onClick={() => { setSelectedDayIndex(null); setShowText(false); setIsTop(true); }} style={buttonStyle}>Top</button>
      </div>
      <PiUserBadge user={user} />
    </div>
  );
}
export default AppWithPi;
