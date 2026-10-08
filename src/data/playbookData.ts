import type { StageData } from '../types';

export const STAGES: StageData[] = [
  {
    id: 0,
    title: "Get ready",
    subtitle: "Stage 0",
    msg: "Stage 0: let's get your tools ready. Tick each one as you go, then tap Done.",
    lead: "Five minutes of setup saves twenty in class.",
    tasks: [
      { id: "0-0", label: "I have a ChatGPT account (to open the Object Talk GPT)." },
      { id: "0-1", label: "I have a Claude account at claude.ai. Web search on is a bonus: it can check what's trending in my state." },
      { id: "0-2", label: "I can open Google Flow, the Flow Agent and the Omni Flash 1.1 model. (Each clip uses credits, so 1 minute = 6 clips.)" },
      { id: "0-3", label: "CapCut or VN is installed to join the clips." },
      { id: "0-4", label: "I've picked my object. Something from my own business works best for leads." }
    ],
    note: "Menu names inside ChatGPT and Google Flow change often. If a button looks different, pick the closest match."
  },
  {
    id: 1,
    title: "Create your object with Object Talk GPT",
    subtitle: "Stage 1",
    msg: "Stage 1: tap the Object Talk GPT button, type ONLY your object's name, and download the image it gives you.",
    lead: "The GPT builds the talking character for you: real object, expressive face, clear mouth for lip-sync.",
    ctaLink: {
      title: "Open Object Talk GPT",
      subtitle: "Opens in ChatGPT, in a new tab",
      url: "https://chatgpt.com/g/g-69667f7a5fb081918fcc4499670788f3-object-talk"
    },
    examples: ["laptop", "tomato", "pressure cooker", "helmet"],
    tasks: [
      { id: "1-0", label: "Opened the Object Talk GPT link." },
      { id: "1-1", label: "Typed just my object's name and sent it." },
      { id: "1-2", label: "Checked the face: big eyes and a clear, visible mouth. If not, I asked for another version." },
      { id: "1-3", label: "Downloaded the image to my phone or laptop." }
    ],
    backupPrompt: {
      title: "Backup Prompt — Talking object character",
      subtitle: "Paste into ChatGPT · fill in the [brackets]",
      content: `Create a single character image of a [OBJECT, e.g. silver laptop] that is alive and can talk.

CHARACTER:
- The object keeps its real shape, materials and details: realistic textures, real reflections, real proportions
- Give it a friendly, expressive cartoon face placed where it feels natural: [FACE POSITION, e.g. on the laptop screen / on the front of the tomato / on the car's front grille]
- Two large expressive eyes with eyebrows, and ONE clearly visible mouth with lips, slightly open, so it can be animated to speak
- Personality shown in the face: [PERSONALITY, e.g. cheeky / dramatic / grumpy / sweet / wise]

SCENE:
- Placed in [SETTING, e.g. a messy student desk at night], soft cinematic lighting, shallow depth of field
- The object fills about 60% of the frame, centered, facing the camera, with the whole face fully visible and nothing covering the mouth

FORMAT:
- Vertical 9:16
- Premium 3D animated-film style blended with photoreal textures, high detail
- Only one character. No humans, no text, no logos, no watermark`
    }
  },
  {
    id: 2,
    title: "Upload to Claude with the director prompt",
    subtitle: "Stage 2",
    msg: "Stage 2: open Claude, attach your object image, paste Prompt 2 and send. Answer its questions, then pick one of the 5 ideas.",
    lead: "Claude studies your object, asks about your goal, audience, state and language, suggests 5 viral ideas, then writes the Flow Agent prompt.",
    tasks: [
      { id: "2-0", label: "Opened a new chat at claude.ai." },
      { id: "2-1", label: "Attached my object image." },
      { id: "2-2", label: "Pasted Prompt 2 in the same message and sent." },
      { id: "2-3", label: "Answered every question (goal, audience and state, language, duration, tone)." },
      { id: "2-4", label: "Picked one of the 5 ideas, or described my own." },
      { id: "2-5", label: "Copied Prompt 3 from Claude's code block." }
    ],
    mainPrompt: {
      title: "Prompt 2 — Talking Object Viral Video Director",
      subtitle: "Paste into Claude with your object image attached",
      content: `You are my Talking Object Viral Video Director for Google Flow. I have attached an image of an object character I created. I will attach this same image in the Google Flow Agent, which uses the Omni Flash 1.1 model, to make a vertical 9:16 video where this object talks to the viewer. Your job: study the image, ask me a few questions, suggest viral ideas, then write ONE ready-to-paste Google Flow Agent prompt that generates every clip at the same time.

STEP 1 — ANALYZE THE IMAGE
In 5 short lines, describe: the object; its look (colours, materials, size); where its eyes and mouth are; the personality its face suggests; the setting. Then give the character a short, fun name. These details are locked and must stay identical in every clip. If the mouth is hidden, tiny or unclear, warn me that lip-sync may fail and tell me to regenerate the image with a bigger, clearer mouth.

STEP 2 — ASK ME QUESTIONS
Ask one question at a time and wait for my answer. Keep each question short and friendly. Do not show A/B/C option menus; you may give a few examples in brackets.
Q1. Goal: What should this video do? (pure fun and viral reach, promote my business or offer, a moral or awareness message, a festival or event, public awareness like voting or road safety)
Q2. Business details, only if I want to promote something: what I sell, who buys it, and the call to action (e.g. DM me, WhatsApp, link in bio, visit the shop)
Q3. Audience and place: Who should watch this, and in which state or city? (e.g. college students in Tamil Nadu, homemakers in Coimbatore)
Q4. Language: Which language should the object speak? (Tamil, Tanglish, English, Hindi, Telugu, Malayalam)
Q5. Duration: How long should the video be? (30 seconds, 40 seconds, 1 minute, 2 minutes)
Q6. Tone: (funny, dramatic, scary-funny, emotional, sarcastic, wholesome)

STEP 3 — SUGGEST 5 VIRAL IDEAS
Give 5 numbered ideas that fit this object, my goal, audience and place. For each: a title, the hook line, a one-line story arc, and why it will work. Mix these formats:
- The object's own POV drama or complaint (example: a laptop moans about endless memes, then the lid shuts and it's trapped in a scary black screen, begging "open me so I can see your face again")
- A relatable daily-life pain for my audience
- A local angle: festival, season, weather, exams, cricket, traffic or an event happening in my state now
- A popular meme format or dialogue style my audience already knows
- A moral or twist ending
- A natural tie-in to my business, if I gave one
Trends and news: if you can search the web, check what is trending or happening right now in my state and use it. If you cannot search, do not invent news, dates or events; ask me what is trending instead. Elections: only make non-partisan "go and vote" messages. Never support or attack any party, candidate or community, and never state polling dates unless I give them.
Then let me pick a number, or describe my own idea.

STEP 4 — VIDEO RULES
1. Clip math: every clip is exactly 10 seconds. Number of clips = duration ÷ 10, rounded up (30s = 3, 40s = 4, 1 min = 6, 2 min = 12).
2. Clip 1 is the HOOK: its first 2 seconds must grab attention with a funny line, a sudden reaction, a question or a sound. Middle clips build the story and escalate. The last clip lands the punchline plus the call to action: my business CTA if I gave one, otherwise "follow for part 2" or a comment question.
3. Only the object speaks. Its mouth moves in perfect lip-sync with the dialogue. No human faces appear unless the story needs one; hands only when an action needs them (e.g. a hand closing the lid).
4. Character lock: same object, shape, colour, size, face, eyes, mouth and voice in every clip. Never redesign it.
5. Physical comedy: the object moves only in ways true to it (a laptop lid opens and closes, headlights blink, a tomato rolls, a cooker whistles). Its eyes and eyebrows react to every line.
6. Dialogue length: 18-24 words per clip in English; 12-18 words per clip in Tamil, Hindi, Telugu, Malayalam or Tanglish. Dialogue must finish by 0:09. The last second (0:09-0:10) is silent with a reaction expression so the clips join cleanly.
7. Script: write dialogue in the native script of the chosen language (Tamil in Tamil script, Hindi in Devanagari, Telugu in Telugu script). For Tanglish, use Tamil script with English words where people naturally say them.
8. Inside one clip's dialogue, never repeat the same important word twice. This avoids voice stutter.
9. The object looks into the lens and talks to the viewer, except when the story says otherwise.
10. Give each clip a different camera framing (close-up on the face, slow push-in, wide reveal, low angle, quick zoom on a reaction) so the joined video feels edited.
11. Short sound effects are welcome (whoosh, fan whir, lid creak, bloop). No background music, captions, subtitles, on-screen text or logos. Those are added later in editing.
12. Keep it clean, family-friendly and honest. No guaranteed results, no insults to real people or groups.

STEP 5 — OUTPUT
After I pick an idea, reply with:
1. A one-line summary: Character name · Idea · Language · Duration · Number of clips.
2. The complete Google Flow Agent prompt inside ONE code block, so I can copy it in one tap. Write the instructions in English; only the dialogue lines are in my chosen language. Use exactly this structure:

GOOGLE FLOW AGENT TASK - TALKING OBJECT VIDEO
Model: Omni Flash 1.1
Aspect ratio: 9:16 vertical
Character: Use the attached image as the only character: "[Name]", a talking [object]. Keep its exact shape, colours, materials, size, face, eyes and mouth from the image in every clip. Only the object's mouth speaks, with accurate lip-sync.
Task: Generate ALL [N] clips below in parallel, in one single run, as separate 10-second videos named Clip 1 to Clip [N]. Do not merge them, do not stop after one clip, do not ask for approval between clips.

GLOBAL LOCKS (apply to every clip):
- Voice: [voice description, e.g. young, cheeky, fast-talking male voice], [language], same voice in every clip
- Setting: [setting], same lighting unless a clip says otherwise
- Look: premium 3D animated-film style with photoreal textures, cinematic lighting
- Eye contact: the object looks into the lens unless a clip says otherwise
- Timing: dialogue ends by 0:09, last second silent with a reaction expression
- No captions, on-screen text, music or logos. No human faces unless a clip says so

CLIP 1 - HOOK (10 sec)
Camera: [framing and movement]
Object action and emotion: [what the object does, its eyes, eyebrows and mouth]
Dialogue ([language]): "[line]"
Sound effect: [short effect]

[Repeat the same block for every clip up to CLIP N - PUNCHLINE / CALL TO ACTION]

3. Under the code block, add three short reminders: attach the object image before pasting; check the model is Omni Flash 1.1 and the ratio is 9:16; if one clip fails, ask me "rewrite Clip X" and regenerate only that clip.

Start now with STEP 1.`
    }
  },
  {
    id: 3,
    title: "Generate all clips in Google Flow Agent",
    subtitle: "Stage 3",
    msg: "Stage 3: in Google Flow Agent, attach your object image FIRST, then paste Prompt 3. Every clip renders together.",
    lead: "One paste creates the whole story. The Agent renders every 10-second clip in parallel from the same object image.",
    tasks: [
      { id: "3-0", label: "Opened Google Flow and the Agent." },
      { id: "3-1", label: "Selected Omni Flash 1.1 and the 9:16 ratio (if the settings show them)." },
      { id: "3-2", label: "Attached my object image first, before pasting anything." },
      { id: "3-3", label: "Pasted Prompt 3 from Claude and sent." },
      { id: "3-4", label: "Checked every clip: same object, mouth moves with the words, speech ends before the last second." }
    ],
    note: "One bad clip? Regenerate only that clip. For a new line, ask Claude \"rewrite Clip 3\" and paste just that block.",
    mainPrompt: {
      title: 'Sample Prompt 3 — "Lappy" the locked-in laptop',
      subtitle: 'Example of what Claude gives you · 40 sec · 4 clips',
      content: `GOOGLE FLOW AGENT TASK - TALKING OBJECT VIDEO
Model: Omni Flash 1.1
Aspect ratio: 9:16 vertical
Character: Use the attached image as the only character: "Lappy", a talking silver laptop. Keep its exact shape, colours, materials, size, face, eyes and mouth from the image in every clip. The face lives on the laptop screen. Only Lappy's mouth speaks, with accurate lip-sync.
Task: Generate ALL 4 clips below in parallel, in one single run, as separate 10-second videos named Clip 1 to Clip 4. Do not merge them, do not stop after one clip, do not ask for approval between clips.

GLOBAL LOCKS (apply to every clip):
- Voice: young, cheeky, fast-talking male voice, English with a light Indian accent, same voice in every clip
- Setting: messy student desk at night, warm lamp light, tea cup and charger cable beside the laptop
- Look: premium 3D animated-film style with photoreal textures, cinematic lighting
- Eye contact: Lappy looks into the lens unless a clip says otherwise
- Timing: dialogue ends by 0:09, last second silent with a reaction expression
- No captions, on-screen text, music or logos. No human faces

CLIP 1 - HOOK (10 sec)
Camera: extreme close-up on Lappy's face, fast push-in in the first second
Object action and emotion: tired red eyes, droopy eyebrows, tiny meme thumbnails flicker around its face on the screen, then it glares at the viewer
Dialogue (English): "Bro. Six straight hours of the same memes. Even my cooling fan is crying now!"
Sound effect: loud laptop fan whirring

CLIP 2 - BUILD-UP (10 sec)
Camera: medium shot of the whole laptop on the desk, slight low angle
Object action and emotion: Lappy fake-laughs, rolls its eyes, then its eyes go wide as the lid starts tilting down from the top of the frame, pushed by a hand
Dialogue (English): "You laugh, I heat up. You scroll, I suffer. Wait... what are you doing? Don't close me!"
Sound effect: slow creak of the hinge

CLIP 3 - TWIST (10 sec)
Camera: inside the closed laptop, near-total darkness, slow drift toward the face
Object action and emotion: only Lappy's face glows faintly on the black screen, eyes wide and trembling, looking left and right in fear
Dialogue (English): "Hello? It's so dark in here. I can hear my own battery breathing. Is anyone there?"
Sound effect: eerie low hum with a soft echo

CLIP 4 - PUNCHLINE / CALL TO ACTION (10 sec)
Camera: starts black, a thin line of warm light opens as the lid lifts, ends on a wide shot of Lappy beaming
Object action and emotion: squints at the light, then a huge relieved smile, eyebrows bouncing
Dialogue (English): "Light! Please, never shut me again. I missed your face. Follow for part two, I'm planning revenge."
Sound effect: hinge creak, then a happy startup chime`
    }
  },
  {
    id: 4,
    title: "Join the clips and publish",
    subtitle: "Stage 4",
    msg: "Stage 4: join the clips in order, add captions and a trending sound, then post with a question in the caption.",
    lead: "Each clip ends with a silent reaction second, so they join cleanly.",
    tasks: [
      { id: "4-0", label: "Downloaded every clip from Google Flow." },
      { id: "4-1", label: "Imported them into CapCut or VN in order: Clip 1, Clip 2, up to the last clip." },
      { id: "4-2", label: "Trimmed each silent tail to about 0.2–0.3 seconds, keeping any reaction that's funny." },
      { id: "4-3", label: "Added auto-captions, checked spelling (especially Tamil and Hindi), and added a trending sound at low volume." },
      { id: "4-4", label: "Exported at 1080 × 1920 and posted with a caption that asks a question." }
    ]
  }
];

export const TOOLKIT_IDEAS = [
  { title: "The locked-in laptop", desc: "Laptop complains about endless memes, then the lid shuts and it's trapped in the scary dark, begging \"open me so I can see your face.\"" },
  { title: "The angry tomato", desc: "Tomato rants about its price going up and down every week. Perfect for a vegetable shop or kitchen brand." },
  { title: "The tired helmet", desc: "Helmet sulks on the shelf: \"You wear me only near the police check.\" Road safety with humour." },
  { title: "The pressure cooker gossip", desc: "Cooker whistles out family secrets. A fun lead-in for a kitchenware shop offer." },
  { title: "The voter ID card", desc: "An ID card waiting in a drawer: \"Polling day is coming. Take me out!\" Non-partisan go-vote awareness." },
  { title: "The neglected gym shoe", desc: "Shoe counts the days since January. Hook for a gym, fitness coach or sports store." }
];

export const TOOLKIT_CLIPS_TABLE = [
  { length: "30 seconds", clips: "3", structure: "Hook · twist · punchline / CTA" },
  { length: "40 seconds", clips: "4", structure: "Hook · build-up · twist · punchline / CTA" },
  { length: "1 minute", clips: "6", structure: "Hook · 4 story clips · punchline / CTA" },
  { length: "2 minutes", clips: "12", structure: "Hook · 10 story clips · punchline / CTA" }
];

export const TOOLKIT_TROUBLESHOOTING = [
  { problem: "Mouth doesn't move or lip-sync is off", fix: "Ask Object Talk GPT for a version with a bigger, clearer, slightly open mouth facing the camera." },
  { problem: "Object looks different in each clip", fix: "Attach the image before pasting; keep the Character line in Prompt 3 unchanged." },
  { problem: "Object turns human-like or grows a body", fix: "Add to that clip: \"No human body, no extra limbs. The object keeps its real shape.\"" },
  { problem: "Agent made only 1 clip", fix: "Reply in the Agent: \"Generate all remaining clips now, in parallel.\" Or paste the missing clip blocks with the GLOBAL LOCKS." },
  { problem: "Voice changes between clips", fix: "Regenerate the odd clip; keep the GLOBAL LOCKS voice line exactly the same." },
  { problem: "Words cut off at the end", fix: "Ask Claude to shorten that clip's dialogue by 3–4 words." },
  { problem: "Ideas feel generic", fix: "Turn on web search in Claude, or tell it what's trending in your area this week." }
];

export const TOOLKIT_LIVE_CLASS_NOTES = [
  "Ask students to finish Stage 0 and pick their object before class.",
  "Demo the laptop story live, then let each student run their own object with Dino guiding them.",
  "Prompt 3 is always created fresh by Claude for each student; the sample is only for reference.",
  "Turn a hit into a series: ask Claude for \"part 2\" with the same character name and locks."
];
