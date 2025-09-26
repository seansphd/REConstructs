const passages = {
  start: {
    sections: [
      "This exhibition presents a set of reconstructed works originally described in PAGE, the magazine of the Computer Arts Society.",
      "Each piece has been rebuilt using generative AI, guided by curatorial research into early computer-based art systems.",
      "These are not restorations. They are interpretive models — attempts to resurface procedural ideas and logics that once shaped digital artworks.",
      "The question is not what the work looked like, but how it worked, and what we might learn by building with what remains.",
      "Each 'construct' reimagines a lost computer artwork from the archive.",
      "Curatorial inputs were translated into structured prompts. The system searched for procedural logic beneath missing code and incomplete records."
    ],
    choices: [
      { text: "Initiate Reconstruction", action: "merge" }
    ]
  },

  merge: {
    sections: [
      "INTERPRETIVE SYSTEM ACTIVE...Click to Load"
    ],
    choices: [
      { text: "ART1 – Grid-based ASCII Design Tool", action: "popup", popupWindow: "art1.html" },
      { text: "Modules – Modular Grid System", action: "popup", popupWindow: "modules.html" },
      { text: "Field Work – Wave-based Participation", action: "popup", popupWindow: "fieldwork.html" },
      { text: "Transformation – Interpolated Line Morphing", action: "popup", popupWindow: "transform.html" },
      { text: "Letter-like Shapes – Algorithmic Typographic Forms", action: "popup", popupWindow: "letterlike.html" },
      { text: "Patterns – Modular Grid with Controlled Randomness", action: "popup", popupWindow: "patterns.html" },
      { text: "TRPL – Moiré Plotter Generator", action: "popup", popupWindow: "trpl.html" }
    ]
  }
};
