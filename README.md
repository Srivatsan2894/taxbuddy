# TaxBuddy - India's Smart Salary & Tax Companion

A professional Android app for calculating Indian income taxes with real-time comparisons between Old and New tax regimes.

## 🎯 Features

- **Real-time Tax Calculation**: Calculate income taxes instantly for FY 2024-25, 2025-26, and 2026-27
- **Old vs New Regime Comparison**: Compare tax liability under both regimes
- **Detailed Tax Breakdown**: View surcharge, cess, and effective tax rates
- **Deduction Tracking**: Track Section 80C, 80D, 80E, NPS, and home loan interest
- **Tax Health Score**: Get personalized tax planning recommendations
- **Tax Academy**: Learn about Indian tax system with comprehensive lessons
- **Offline Support**: Works without internet connection
- **Dark Mode**: Eye-friendly dark theme
- **Local Storage**: All data stored securely on your device

## 📱 Technical Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Mobile Framework**: Capacitor + Ionic
- **Build Tool**: Gradle (Android)
- **State Management**: React Hooks
- **Styling**: Inline CSS + CSS-in-JS
- **Storage**: Capacitor Storage API + LocalStorage fallback

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- Android SDK 24+
- Java 17
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/Srivatsan2894/taxbuddy.git
cd taxbuddy

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Building APK

```bash
# Add Android platform
npm run cap:add:android

# Sync Capacitor
npm run cap:sync

# Build APK
npm run cap:build:android
```

The APK will be available at: `android/app/build/outputs/apk/release/app-release.apk`

## 📊 App Structure

```
src/
├── pages/              # Page components (Home, Dashboard, Wizard, Results, Academy, Settings)
├── components/         # Reusable components (Navbar)
├── lib/               # Business logic (tax calculator)
├── types/             # TypeScript type definitions
├── utils/             # Utility functions (storage, formatting)
├── App.tsx            # Main app component with routing
└── main.tsx           # Entry point
```

## 🧮 Tax Calculation Logic

### Old Regime
- Allows various deductions: Section 80C (max ₹1,50,000), 80D, 80E, NPS, etc.
- Best for people with substantial investments
- Progressive tax slabs

### New Regime
- Standard deduction of ₹75,000 only
- Lower tax slabs overall
- Simpler filing, no need to track deductions

### Tax Components
- **Surcharge**: 25% on tax if income > ₹50 lakh, 15% if > ₹10 lakh
- **Cess**: 4% of (tax + surcharge)
- **Tax Health Score**: Based on deductions, insurance, and effective rate

## 🔒 Privacy & Security

- **Local Storage**: All calculations stored on your device
- **No Server**: Data is never sent to any server or third party
- **Clear All**: Option to permanently delete all stored data
- **Offline**: Works completely offline without internet

## ⚠️ Disclaimer

TaxBuddy provides general tax information for educational purposes. While we strive for accuracy:

- Results are estimates based on current tax laws
- Tax laws change frequently
- Always consult with a Chartered Accountant (CA) for personalized advice
- We are NOT responsible for any tax liability or penalties arising from using this app

## 📝 Supported Financial Years

- FY 2024-25 (AY 2024-25)
- FY 2025-26 (AY 2025-26)
- FY 2026-27 (AY 2026-27)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Created with ❤️ for Indian taxpayers

## 📞 Support

For issues, suggestions, or feedback, please create an issue on GitHub.

---

**Start planning your taxes smartly with TaxBuddy!** 💰
