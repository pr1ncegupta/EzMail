# EzMail

EzMail is a modern web application that helps users craft professional emails with AI assistance. Simply fill in details like recipient, subject, message content, and desired tone, and let the AI create the perfect email.

## Features

- Quick Email Drafting - Create professional emails in seconds with AI assistance
- Customizable Tone - Choose from Professional, Friendly, Formal, Casual, or Urgent tones
- Adjustable Length - Select Short, Medium, Long, or Detailed options based on your needs
- Personalization - Add your signature and personal style to every email
- Modern UI - Clean and responsive interface built with React and TailwindCSS

## Tech Stack

- Frontend: React 18, TypeScript
- Styling: TailwindCSS
- Build Tool: Vite
- Icons: Lucide React
- Agent Integration: Connects to Lyzr AI studio Agent

## Quick Setup

1. Fork this Repository  
   - Click Fork (top right) to create your own copy of this repo.

2. Create a Lyzr Agent  
   - Go to https://studio.lyzr.ai and log in  
   - Under Agents, click Create Agent and give it a name.  
   - In the Tools section, connect the Gmail App  
   - Set up the agent to generate email drafts based on inputs

3. Get Your API Credentials  
   - In the agent dashboard, click the Agent API button  
   - Copy the following:  
     - API Endpoint  
     - API Key  
     - User ID  
     - Agent ID  
     - Session ID

4. Clone the Repo or build a fresh UI (I used bolt) & Add Environment Variables  
   ```bash
   git clone https://github.com/your-username/email-agent.git
   cd email-agent
   ```
   Fill the Env file with Credentials

5. Install the dependencies (Npm i) and Run (npm run dev) Ensure you have latest node js installed
   
