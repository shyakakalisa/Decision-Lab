const scenarios = [
  {
    id: 1,
    title: "Career Risk",
    description: "You find a junior web developer internship that looks exciting, but you feel nervous about applying.",
    steps: [
      {
        text: "What do you do first?",
        choices: [
          {
            text: "Apply anyway and do your best",
            result: "You take action despite uncertainty. That builds momentum and confidence.",
            confidence: 2,
            growth: 3,
            risk: 2
          },
          {
            text: "Wait until you feel perfectly ready",
            result: "You feel temporarily safe, but you may lose time and miss opportunities.",
            confidence: -1,
            growth: 0,
            risk: -1
          },
          {
            text: "Ask someone to review your resume, then apply",
            result: "You combine courage with preparation. This is a smart growth move.",
            confidence: 1,
            growth: 2,
            risk: 1
          }
        ]
      },
      {
        text: "You get invited to an interview. What is your next move?",
        choices: [
          {
            text: "Practice common interview questions",
            result: "Preparation lowers anxiety and improves your delivery.",
            confidence: 2,
            growth: 2,
            risk: 0
          },
          {
            text: "Avoid thinking about it and hope for the best",
            result: "You may feel less pressure in the moment, but performance usually suffers.",
            confidence: -1,
            growth: -1,
            risk: 1
          },
          {
            text: "Research the company and your projects carefully",
            result: "You become more grounded and prepared to speak clearly.",
            confidence: 2,
            growth: 3,
            risk: 0
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Dating Confidence",
    description: "You meet someone interesting and want to start a conversation, but you worry about saying the wrong thing.",
    steps: [
      {
        text: "How do you respond?",
        choices: [
          {
            text: "Say hello and ask a simple question",
            result: "Simple and natural usually works better than trying to be perfect.",
            confidence: 2,
            growth: 2,
            risk: 1
          },
          {
            text: "Overthink until the moment passes",
            result: "You avoid immediate discomfort, but lose a real chance at connection.",
            confidence: -2,
            growth: 0,
            risk: -1
          },
          {
            text: "Smile, make eye contact, and keep it casual",
            result: "Calm energy creates a better first impression than forced intensity.",
            confidence: 2,
            growth: 2,
            risk: 1
          }
        ]
      },
      {
        text: "The conversation goes well. What next?",
        choices: [
          {
            text: "Ask for their number respectfully",
            result: "You show confidence and honesty. Even rejection becomes useful practice.",
            confidence: 3,
            growth: 2,
            risk: 2
          },
          {
            text: "Say nothing and hope they ask you",
            result: "You leave the outcome to chance instead of taking initiative.",
            confidence: -1,
            growth: 0,
            risk: -1
          },
          {
            text: "Suggest meeting again sometime",
            result: "This keeps things natural and gives the connection room to grow.",
            confidence: 2,
            growth: 2,
            risk: 1
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Health Decision",
    description: "You feel stressed and overwhelmed, and you know your routine has been slipping.",
    steps: [
      {
        text: "What is your first step?",
        choices: [
          {
            text: "Start with one healthy habit today",
            result: "Small consistent actions often create more change than dramatic plans.",
            confidence: 1,
            growth: 3,
            risk: 0
          },
          {
            text: "Ignore it and hope it improves on its own",
            result: "Problems often grow when they are repeatedly avoided.",
            confidence: -1,
            growth: -2,
            risk: 1
          },
          {
            text: "Write down the top 3 things affecting you",
            result: "Clarity reduces stress and helps you choose better actions.",
            confidence: 1,
            growth: 2,
            risk: 0
          }
        ]
      },
      {
        text: "How do you follow through?",
        choices: [
          {
            text: "Take a walk, hydrate, and reset your day",
            result: "A simple reset can calm your system and help you think more clearly.",
            confidence: 1,
            growth: 2,
            risk: 0
          },
          {
            text: "Stay stuck scrolling and doing nothing",
            result: "Avoidance can feel soothing for a moment, but often worsens stress later.",
            confidence: -2,
            growth: -1,
            risk: 0
          },
          {
            text: "Create a realistic plan for tomorrow",
            result: "You turn stress into structure, which builds stability.",
            confidence: 2,
            growth: 2,
            risk: 0
          }
        ]
      }
    ]
  }
];

const scenarioGrid = document.getElementById("scenarioGrid");
const gameArea = document.getElementById("gameArea");
const scenarioTitle = document.getElementById("scenarioTitle");
const scenarioText = document.getElementById("scenarioText");
const choicesContainer = document.getElementById("choicesContainer");
const resultBox = document.getElementById("resultBox");
const resultText = document.getElementById("resultText");
const confidenceValue = document.getElementById("confidenceValue");
const growthValue = document.getElementById("growthValue");
const riskValue = document.getElementById("riskValue");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");
const backButton = document.getElementById("backButton");

let currentScenario = null;
let currentStepIndex = 0;
let confidence = 0;
let growth = 0;
let risk = 0;

function renderScenarios() {
  scenarioGrid.innerHTML = "";

  scenarios.forEach((scenario) => {
    const card = document.createElement("div");
    card.className = "scenario-card";

    card.innerHTML = `
      <h3>${scenario.title}</h3>
      <p>${scenario.description}</p>
      <button class="primary-btn">Start Scenario</button>
    `;

    card.querySelector("button").addEventListener("click", () => {
      startScenario(scenario);
    });

    scenarioGrid.appendChild(card);
  });
}

function startScenario(scenario) {
  currentScenario = scenario;
  currentStepIndex = 0;
  confidence = 0;
  growth = 0;
  risk = 0;

  updateStats();
  showStep();

  gameArea.classList.remove("hidden");
  resultBox.classList.add("hidden");
  nextButton.classList.add("hidden");
  restartButton.classList.add("hidden");
}

function showStep() {
  const step = currentScenario.steps[currentStepIndex];

  scenarioTitle.textContent = currentScenario.title;
  scenarioText.textContent = step.text;
  choicesContainer.innerHTML = "";
  resultBox.classList.add("hidden");
  nextButton.classList.add("hidden");

  step.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.className = "choice-btn";
    button.textContent = choice.text;

    button.addEventListener("click", () => handleChoice(choice));

    choicesContainer.appendChild(button);
  });
}

function handleChoice(choice) {
  confidence += choice.confidence;
  growth += choice.growth;
  risk += choice.risk;

  updateStats();

  resultText.textContent = choice.result;
  resultBox.classList.remove("hidden");

  Array.from(choicesContainer.children).forEach((button) => {
    button.disabled = true;
    button.style.opacity = "0.7";
  });

  if (currentStepIndex < currentScenario.steps.length - 1) {
    nextButton.classList.remove("hidden");
  } else {
    scenarioText.textContent = getFinalSummary();
    choicesContainer.innerHTML = "";
    nextButton.classList.add("hidden");
    restartButton.classList.remove("hidden");
  }
}

function getFinalSummary() {
  let summary = "Scenario complete. ";

  if (confidence >= 4) {
    summary += "You built strong confidence through your choices. ";
  } else if (confidence >= 1) {
    summary += "You showed some confidence and potential for growth. ";
  } else {
    summary += "Your choices leaned toward caution or hesitation. ";
  }

  if (growth >= 4) {
    summary += "You made decisions that supported long-term growth. ";
  } else if (growth >= 1) {
    summary += "You made a few positive growth decisions. ";
  } else {
    summary += "You avoided several growth opportunities. ";
  }

  if (risk >= 3) {
    summary += "You were willing to take meaningful risks.";
  } else if (risk >= 0) {
    summary += "You balanced safety and action reasonably well.";
  } else {
    summary += "You played it very safe, which may limit progress.";
  }

  return summary;
}

function updateStats() {
  confidenceValue.textContent = confidence;
  growthValue.textContent = growth;
  riskValue.textContent = risk;
}

nextButton.addEventListener("click", () => {
  currentStepIndex++;
  showStep();
});

restartButton.addEventListener("click", () => {
  if (currentScenario) {
    startScenario(currentScenario);
  }
});

backButton.addEventListener("click", () => {
  gameArea.classList.add("hidden");
});

renderScenarios();
