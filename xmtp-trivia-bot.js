const { Client } = require("@xmtp/xmtp-js");
const { Wallet } = require("ethers");

// Trivia questions
const triviaQuestions = [
  {
    question: "What is the capital of France?",
    options: ["A) Paris", "B) Madrid", "C) Berlin"],
    answer: "A"
  },
  {
    question: "Who wrote 'One Hundred Years of Solitude'?",
    options: ["A) Pablo Neruda", "B) Gabriel García Márquez", "C) Mario Vargas Llosa"],
    answer: "B"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["A) Earth", "B) Jupiter", "C) Saturn"],
    answer: "B"
  }
];

// Store trivia state per user (address)
const triviaState = {};

// --- Add your own commands here ---
async function handleCommand(text, user) {
  // Trivia
  if (text && text.trim().toLowerCase().startsWith("/trivia")) {
    const q = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    triviaState[user] = {
      question: q,
      askedAt: Date.now(),
      score: triviaState[user]?.score || 0
    };
    return `❓ Trivia Time!\n${q.question}\n${q.options.join("\n")}\nReply with A, B, or C.`;
  }

  // Answer to trivia
  if (["a", "b", "c"].includes(text?.trim().toLowerCase()) && triviaState[user]?.question) {
    const userAnswer = text.trim().toUpperCase();
    const correct = userAnswer === triviaState[user].question.answer;
    let response = "";
    if (correct) {
      triviaState[user].score += 1;
      response = `✅ Correct! Your score: ${triviaState[user].score}\nType /trivia for another question.`;
    } else {
      response = `❌ Incorrect. The correct answer was ${triviaState[user].question.answer}.\nYour score: ${triviaState[user].score}\nType /trivia for another question.`;
    }
    delete triviaState[user].question;
    return response;
  }

  // Show score
  if (text && text.trim().toLowerCase().startsWith("/score")) {
    const score = triviaState[user]?.score || 0;
    return `🏆 Your trivia score: ${score}\nType /trivia to play again!`;
  }

  // Help
  if (text && text.trim().toLowerCase().startsWith("/help")) {
    return "Commands:\n/trivia - Start a trivia question\n/score - Show your score\n/help - Show this help message\nType /trivia to play!";
  }

  return "Unknown command. Type /help for available commands.";
}

// --- Main function ---
async function main() {
  // Use your bot's private key (never use a real user key!)
  const wallet = new Wallet("a34a9d258213116e5353ecd5ff09cc301c79675ee4aba730c9acfc2b90d9b52f");
  const xmtp = await Client.create(wallet, { env: "production" }); // or "dev" for testnet

  console.log("XMTP Trivia Bot is running!");

  for await (const convo of await xmtp.conversations.stream()) {
    (async () => {
      for await (const msg of await convo.streamMessages()) {
        // Ignore messages sent by the bot itself
        if (msg.senderAddress === xmtp.address) continue;

        const text = msg.content?.trim();
        const user = msg.senderAddress;

        // Debug: log received text
        console.log("Received message:", JSON.stringify(text), "from", user);

        // Handle command and send response
        const response = await handleCommand(text, user);
        await convo.send(response);
      }
    })();
  }
}

main();