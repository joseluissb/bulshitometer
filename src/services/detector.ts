// Check if SpeechRecognition is supported
const supportedSpeechRecognition = window.webkitSpeechRecognition !== undefined;

const subscribedCallbacks: ((bullshitUnits: number) => void)[] = [];

let currentBullshitUnits = 100;

export function startTracking() {
  console.log("Starting speech recognition...");

  if (!supportedSpeechRecognition) {
    console.error("Speech Recognition API is not supported in this browser.");
    return;
  }
  // Word list to track and their counters
  const wordsToTrack: { [key: string]: number } = {
    OKR: 0,
    agile: 0,
    collaboration: 0,
    stakeholders: 0,
    clients: 0,
    efficiency: 0,
  };

  // Initialize SpeechRecognition
  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US"; // Set the language
  recognition.continuous = true; // Keep listening continuously
  recognition.interimResults = false; // Only handle finalized words

  console.log("Speech recognition initialized.");

  // Event: On receiving results
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    console.log("Speech recognition result received.");
    for (let i = 0; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript.trim().toLowerCase();
      console.log(`Heard: ${transcript}`);

      // Check if the word is in our list and increment counter
      if (wordsToTrack[transcript] !== undefined) {
        wordsToTrack[transcript]++;
        console.log(`Word detected: "${transcript}". Count: ${wordsToTrack[transcript]}`);
        currentBullshitUnits += 100;
        notifySubscribers();
      }
    }
  };

  // Event: On error
  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error("Speech Recognition Error:", event.error);
    console.error("event.error:", event);
  };

  // Event: On end (auto-restarts)
  recognition.onend = () => {
    console.log("Speech recognition stopped. Restarting...");
    setTimeout(() => {
      recognition.start();
    }, 5000); // Restart after 1 second
  };

  // Start recognition
  console.log("Starting speech recognition...");
  recognition.start();
}

export function subscribeToBullshitUnits(onUnitsChange: (bullshitUnits: number) => void) {
  subscribedCallbacks.push(onUnitsChange);
}

function notifySubscribers() {
  for (const callback of subscribedCallbacks) {
    callback(currentBullshitUnits);
  }
}
