export default async function handler(req, res) {
  // Pi Networkからの承認リクエストに「OK」と答える魔法の言葉よ
  res.status(200).json({ message: "Approved" });
}
