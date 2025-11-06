# 🚀 Modern Developer Portfolio

A stunning, interactive portfolio website built with React, TypeScript, and Tailwind CSS. Features AI-powered chatbot, project idea generator, and a modern glassmorphism design.

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-brightgreen)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)

## ✨ Features

### 🎨 Modern Design
- **Glassmorphism UI** with backdrop blur effects
- **Animated background** with pulsing gradients
- **3D tilt effects** on interactive cards
- **Smooth scrolling** navigation
- **Responsive design** for all devices

### 🤖 AI-Powered Components
- **AI Chatbot** - Interactive assistant powered by Google Gemini AI
- **Project Idea Generator** - AI-generated project suggestions based on keywords
- **Personalized responses** about skills and experience

### 📱 Interactive Sections
- **Hero Section** - Animated typewriter effect with role rotation
- **About Section** - 3D tilt card with downloadable resume
- **Skills Section** - Colorful tech stack with official brand icons
- **Projects Section** - Showcase with live demos and GitHub links
- **Contact Section** - Direct email and social media links

### 🛠️ Technical Features
- **TypeScript** for type safety
- **Vite** for fast development and building
- **Component-based architecture**
- **Custom SVG icons** with brand colors
- **Smooth animations** and transitions
- **SEO optimized**

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Google AI API key (for chatbot and project generator)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/alihashmi2288/modern-portfolio.git
   cd modern-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_google_ai_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Configuration

### Google AI Setup
1. Get your API key from [Google AI Studio](https://aistudio.google.com/)
2. Add it to your `.env` file as `VITE_API_KEY`
3. The chatbot and project generator will automatically work

### Customization
- **Personal Info**: Update `components/About.tsx` and `components/Hero.tsx`
- **Projects**: Modify `projectsData` in `components/Projects.tsx`
- **Skills**: Update `skillsData` in `components/Skills.tsx`
- **Contact**: Change links in `components/Contact.tsx`
- **Resume**: Replace `public/Syed_Ali_Hashmi_Resume..pdf` with your resume

## 📁 Project Structure

```
├── components/
│   ├── About.tsx           # About section with 3D card
│   ├── Chatbot.tsx         # AI-powered chatbot
│   ├── Contact.tsx         # Contact information
│   ├── Footer.tsx          # Footer component
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Landing section
│   ├── IconComponents.tsx  # Custom SVG icons
│   ├── Projects.tsx        # Project showcase
│   ├── ProjectIdeaGenerator.tsx # AI project generator
│   ├── Section.tsx         # Reusable section wrapper
│   └── Skills.tsx          # Tech stack display
├── public/
│   ├── images/            # Project screenshots
│   └── *.pdf             # Resume file
├── App.tsx               # Main app component
├── types.ts              # TypeScript definitions
└── index.html           # HTML template
```

## 🎨 Tech Stack

### Frontend
- **React 19.2.0** - UI library
- **TypeScript 5.8.2** - Type safety
- **Tailwind CSS** - Styling framework
- **Vite 7.2.0** - Build tool

### AI Integration
- **Google Gemini AI** - Chatbot and content generation
- **@google/genai** - AI SDK

### Icons & Assets
- **Custom SVG icons** with official brand colors
- **Poppins font** from Google Fonts
- **Responsive images** with optimization

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add `VITE_API_KEY` to environment variables
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Set environment variables in Netlify dashboard

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🎯 Key Components

### AI Chatbot
- Powered by Google Gemini AI
- Personalized responses about the developer
- Smooth chat interface with typing indicators
- Context-aware conversations

### Project Idea Generator
- AI-generated project suggestions
- Keyword-based customization
- JSON-structured responses
- Interactive UI with loading states

### Skills Section
- Official brand colors for tech icons
- Hover animations and effects
- Categorized skill groups
- Responsive grid layout

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_KEY` | Google AI API key | Yes |

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Syed Ali Hashmi**
- 🌐 Portfolio: [Live Demo](https://your-portfolio-url.com)
- 💼 LinkedIn: [alihashmi2288](https://linkedin.com/in/alihashmi2288)
- 🐙 GitHub: [alihashmi2288](https://github.com/alihashmi2288)
- 📧 Email: hashmi.ali2288@gmail.com

## 🙏 Acknowledgments

- Google AI for the Gemini API
- Tailwind CSS for the styling framework
- React team for the amazing library
- All the open-source contributors

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ by Syed Ali Hashmi