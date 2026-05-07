# The Semantic Brancher 🌿

## An Experimental Research Probe into Non-Linear Human-AI Interaction

## The Research Inquiry
Does the conventional "chat bubble" interface hinder the articulation of complex ideas by enforcing a linear path?

Current AI interfaces typically rely on a chronological, single-path history. My research seeks to interrogate whether this structure restricts iterative control. When a user cannot easily branch away from a specific output, their ability to refine or explore divergent possibilities is limited by the previous context.

The Semantic Brancher is designed as an experimental probe to explore these frictions. By treating conversation history as a manipulable state tree, the project asks:

- How does a branching structure facilitate the articulation of non-linear thoughts?

- Does the ability to "fork" a conversation improve iterative control over the model's outputs?

- What happens to the creative process when a user can manipulate dialogue as a visual, branching object rather than a fixed sequence?

## 🛠 The Artifact: Design & Architecture

The interface is built to facilitate State-Forking—the ability to branch a conversation at any node to explore divergent creative paths.

**Branching Workspace**: A visual representation of the conversation as a directed graph (State Tree).

**Node Forking**: Users can "save" a specific point in the dialogue and spawn multiple parallel prompts from that single origin.

**Side-by-Side Comparison**: UI for evaluating divergent AI outputs to identify where the "latent space" of the model aligns with or deviates from user intent.

## 🚀 Tech Stack

**Frontend**: React / TypeScript (for robust state management)

**Visualisation**: [D3.js] for the Branching Path UI

**Backend/Auth**: PostgreSQL for real-time state persistence

**AI Integration**: OpenAI

## 🧪 The Experiment: Practice-Led Research

This tool serves as a probe for a practice-led study in System Design and World Building.
