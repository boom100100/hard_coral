// Here's some dead code.
// const voicesToUse = ["Ellen", "Daniel (English (United Kingdom))", "Reed (English (United States))"]; // reed is more monotonous in a whole sentence, but it sounds slightly more like a machine. See if one works better than the other in practice.
// Generally, the voices that end with "(English (United Kingdom))" and "(English (United States))" have a monotonous quality when queueing one word at a time. But the pitch declines at the end of the word. Some way to prevent that would be ideal. 
// Appending "?" seems to change ending pitch decline slightly.
// Using phonetic spelling of word (e.g. "cool" as "kuˈl" or "kul") is completely unrecognizable as the intended word.
// The easiest approach is to find the most monotonous voices (i.e. no pitch change mid-word) that can vary pitch (e.g. voiceURIs Good News, Bad News). Cellos sounds all right, too.

// monotonous voices
// [
//   "Sara",
//   "Yelda",
//   "Satu",
//   "Nora",
//   "Kyoko",
//   "Kathy",
//   "Kanya",
//   "Damayanti",
//   "Catherine"
// ]

// const voicesToUse = ["Ellen", "Daniel (English (United Kingdom))", "Reed (English (United States))"]; // reed is more monotonous in a whole sentence, but it sounds slightly more like a machine. See if one works better than the other in practice.

// // some potentially useful voice names:
//   const monotonousOneWord = [
//     "Amira", "Bad News", "Catherine", "Cellos", "Daniel (English (United Kingdom))", "Eddy (English (United Kingdom))", " Eddy (English (United States))", "Ellen", "Flo (English (United Kingdom))", "Flo (English (United States))", "Good News", "Gordon", "Grandma (English (United Kingdom))", "Grandma (English (United States))", "Grandpa (English (United Kingdom))", "Grandpa (English (United States))", "Junior", "Karen", "Kathy", "Linh", "Melina", "Nicky", "Reed (English (United Kingdom))", "Reed (English (United States))", "Rocko (English (United Kingdom))", "Rocko (English (United States))", "Sandy (English (United Kingdom))", "Sandy (English (United States))", "Satu", "Shelley (English (United Kingdom))", "Shelley (English (United States))", "Tessa", "Yelda", 
//   ] // these have not been checked for if a string of words are also monotonous.
//   const deepVoices = [ // deep/rich
//       "Aaron", "Daniel (English (United Kingdom))", "Eddy (English (United States))", "Ellen", "Fred", "Gordon", "Grandma (English (United Kingdom))", "Grandma (English (United States))", "Grandpa (English (United Kingdom))", "Grandpa (English (United States))", "Joana", "Junior", "Kanya", "Li-Mu", "Luciana", "Marie", "Martha", "Milena", "Moira", "Ralph", "Reed (English (United Kingdom))", "Reed (English (United States))", "Rishi", "Rocko (English (United Kingdom))", "Satu", "Shelley (English (United Kingdom))", "Shelley (English (United States))", "Sinji", "Superstar", "Tessa", "Xander", "Yelda", "Zosia", "Zuzana", 
//   ]
//   const deepAndMonotonousOneWord = [
//     "Daniel (English (United Kingdom))", "Ellen", "Grandma (English (United Kingdom))", "Grandma (English (United States))", "Grandpa (English (United Kingdom))", "Grandpa (English (United States))", "Junior", "Reed (English (United Kingdom))", "Reed (English (United States))", "Rocko (English (United Kingdom))", "Satu", "Shelley (English (United Kingdom))", "Shelley (English (United States))", "Tessa", "Yelda"
//   ]
//   const deepAndMonotonousOneWordAndSoundsGood = [
//     "Daniel (English (United Kingdom))", "Ellen", "Grandpa (English (United Kingdom))", "Grandpa (English (United States))", "Reed (English (United Kingdom))", "Reed (English (United States))", "Rocko (English (United Kingdom))", "Satu", "Shelley (English (United Kingdom))", "Shelley (English (United States))", "Tessa",
//   ];




//   // const voice = voicesByName["Aaron"]; // 
//   // const voice = voicesByName["Daniel (English (United Kingdom))"]; // 
//   // const voice = voicesByName["Eddy (English (United States))"]; // 
//   // const voice = voicesByName["Ellen"]; // 
//   // const voice = voicesByName["Fred"]; // 
//   // const voice = voicesByName["Gordon"]; // 
//   // const voice = voicesByName["Grandma (English (United Kingdom))"]; // 
//   // const voice = voicesByName["Grandma (English (United States))"]; // 
//   // const voice = voicesByName["Grandpa (English (United Kingdom))"]; // 
//   // const voice = voicesByName["Grandpa (English (United States))"]; // 
//   // const voice = voicesByName["Joana"]; // 
//   // const voice = voicesByName["Junior"]; // 
//   // const voice = voicesByName["Kanya"]; // 
//   // const voice = voicesByName["Li-Mu"]; // 
//   // const voice = voicesByName["Luciana"]; // 
//   // const voice = voicesByName["Marie"]; // 
//   // const voice = voicesByName["Martha"]; // 
//   // const voice = voicesByName["Milena"]; // 
//   // const voice = voicesByName["Moira"]; // 
//   // const voice = voicesByName["Ralph"]; // 
//   // const voice = voicesByName["Reed (English (United Kingdom))"]; // 
//   // const voice = voicesByName["Reed (English (United States))"]; // 
//   // const voice = voicesByName["Rishi"]; // liked, is deep, can vary  pitch
//   // const voice = voicesByName["Rocko (English (United Kingdom))"]; // 
//   // const voice = voicesByName["Satu"]; // 
//   // const voice = voicesByName["Shelley (English (United Kingdom))"]; // 
//   // const voice = voicesByName["Shelley (English (United States))"]; // 
//   // const voice = voicesByName["Sinji"]; // 
//   // const voice = voicesByName["Superstar"]; // 
//   // const voice = voicesByName["Tessa"]; // 
//   // const voice = voicesByName["Xander"]; // 
//   // const voice = voicesByName["Yelda"]; // 
//   // const voice = voicesByName["Zosia"]; // 
//   // const voice = voicesByName["Zuzana"]; //

//   // can the pitch for the voice vary?
//   // const voice = voicesByName["Albert"]; // y, it can vary
//   // const voice = voicesByName["Bells"]; // n
//   // const voice = voicesByName["Boing"]; // y
//   // const voice = voicesByName["Cellos"]; // y
//   // const voice = voicesByName["Jester"]; // n
//   // const voice = voicesByName["Kyoko"]; // y
//   // const voice = voicesByName["O-Ren"]; // y
//   // const voice = voicesByName["Organ"]; // y
//   // Trinoids sounds horrible
//   // Albert sounds horrible over drums
//   // Boing sounds horrible over drums
//   // Organ sounds horrible over drums
//   // Whisper sounds the best
//   // Wobble is really interesting, I like it.
//   // Zarvox sounds robotic and slightly bouncy, but works well.
//   // const voice = voicesByName["Trinoids"]; // y
//   // const voice = voicesByName["Whisper"]; // n
//   // const voice = voicesByName["Wobble"]; // not sure, seems like no
//   // const voice = voicesByName["Zarvox"]; // y
  