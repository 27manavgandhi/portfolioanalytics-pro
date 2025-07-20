# 📊 Investment Portfolio Analytics Dashboard

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0+-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.8+-FF6B6B?logo=chart.js&logoColor=white)](https://recharts.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> **A comprehensive, institutional-grade investment portfolio management platform with advanced analytics, risk management, and client reporting capabilities.**

<img width="1920" height="3845" alt="screencapture-portfolioanalytics-iu5mt4roz-27manavgandhis-projects-vercel-app-2025-07-20-22_01_34" src="https://github.com/user-attachments/assets/ee99c6a8-5906-4b56-85f1-3f51dc774848" />

<img width="1920" height="912" alt="screencapture-portfolioanalytics-iu5mt4roz-27manavgandhis-projects-vercel-app-portfolio-management-2025-07-20-22_02_08" src="https://github.com/user-attachments/assets/182cb7c9-9d22-40f3-a669-c0ad2a552a18" />
<img width="1920" height="912" alt="screencapture-portfolioanalytics-iu5mt4roz-27manavgandhis-projects-vercel-app-transactions-2025-07-20-22_03_09" src="https://github.com/user-attachments/assets/8a1c5f3f-eee3-46b5-b15e-0b540eab8284" />
<img width="1920" height="1412" alt="screencapture-portfolioanalytics-iu5mt4roz-27manavgandhis-projects-vercel-app-research-2025-07-20-22_03_45" src="https://github.com/user-attachments/assets/5a54dc67-5004-4611-a324-608b9a02865c" />




## 🚀 Features

### 🔐 **Authentication & Security**
- Multi-factor authentication (2FA) with QR code setup
- Role-based access control (Admin, Manager, Analyst, Client)
- JWT-based secure authentication
- Session management with automatic logout
- Password strength validation

### 📈 **Portfolio Management**
- Real-time portfolio tracking and monitoring
- Interactive asset allocation with drag-and-drop rebalancing
- Transaction history with complete audit trails
- Holdings management with bulk operations
- Multi-portfolio support per user
- Automated rebalancing suggestions

### 📊 **Advanced Analytics**
- **Performance Metrics**: Total Return, Sharpe Ratio, Alpha, Beta, Maximum Drawdown
- **Risk Analytics**: VaR, Conditional VaR, Portfolio Volatility, Correlation Analysis
- **Benchmark Comparison**: S&P 500, Custom Benchmarks
- **Time-Series Analysis**: Historical performance trending
- **Monte Carlo Simulations**: Future performance scenarios

### 📱 **Interactive Dashboard**
- Customizable widget layouts with drag-and-drop
- Real-time P&L updates and portfolio values
- Responsive design for mobile and desktop
- Dark/Light mode toggle
- Multi-timeframe analysis (Daily, Weekly, Monthly, Yearly)

### 📋 **Reporting & Communication**
- Professional PDF report generation
- Automated client report scheduling
- Email distribution system
- Custom report templates
- Performance summaries and insights

### ⚠️ **Risk Management**
- Real-time risk monitoring and alerts
- Stress testing scenarios
- Correlation matrices and heat maps
- Position sizing recommendations
- Risk attribution analysis

### 🔔 **Alerts & Notifications**
- Performance threshold alerts
- Risk spike notifications
- Market event alerts
- Custom alert builder
- Email and in-app notifications

### 📅 **Additional Features**
- Market research and news integration
- Economic calendar with event tracking
- Transaction management system
- Client communication tools
- Advanced charting with technical indicators

## 🛠️ Tech Stack

- **Frontend**: React 18+, TypeScript, Tailwind CSS
- **Charts**: Recharts for financial visualizations
- **Icons**: Lucide React for modern iconography
- **State Management**: React Hooks and Context API
- **Authentication**: JWT with role-based access
- **Styling**: Tailwind CSS with custom components
- **Charts**: Interactive financial charts with Recharts

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0 or higher)
- **npm** (v8.0 or higher) or **yarn** (v1.22 or higher)
- **Git** for version control

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/27manavgandhi/investment-portfolio-dashboard.git
cd investment-portfolio-dashboard
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Start the Development Server
```bash
npm start
# or
yarn start
```

The application will open at `http://localhost:3000`

### 4. Login Credentials (Demo)
Use these demo credentials to explore the platform:

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@portfolioanalytics.com | Admin@123 |
| **Manager** | manager@portfolioanalytics.com | Manager@123 |
| **Analyst** | analyst@portfolioanalytics.com | Analyst@123 |
| **Client** | client@portfolioanalytics.com | Client@123 |

**2FA Demo Code**: `123456`

## 🏗️ Project Structure

```
investment-portfolio-dashboard/
├── public/                 # Static files
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # Base UI components
│   │   ├── charts/       # Chart components
│   │   ├── forms/        # Form components
│   │   └── layout/       # Layout components
│   ├── pages/            # Page components
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Analytics.tsx
│   │   ├── Reports.tsx
│   │   ├── RiskManagement.tsx
│   │   ├── MarketResearch.tsx
│   │   └── Settings.tsx
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript type definitions
│   └── styles/           # Global styles
├── package.json
└── README.md
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Starts the development server |
| `npm build` | Creates production build |
| `npm test` | Runs test suite |
| `npm run eject` | Ejects from Create React App |

## 🚀 Deployment

### Deploy on Vercel (Free)

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel
   ```

3. **Follow the prompts** and your app will be live!

### Deploy on Netlify (Free)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Visit [netlify.com](https://netlify.com)
   - Drag and drop the `build` folder
   - Your app is live!

### Deploy on GitHub Pages (Free)

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add homepage to package.json**:
   ```json
   "homepage": "https://27manavgandhi.github.io/investment-portfolio-dashboard"
   ```

3. **Add deployment scripts**:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🎨 Customization

### Color Scheme
Modify the color palette in `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#1976d2',    // Deep Blue
        success: '#388e3c',    // Green
        error: '#d32f2f',      // Red
        warning: '#f57c00',    // Orange
      }
    }
  }
}
```

### Adding New Components
1. Create component in `src/components/`
2. Export from `src/components/index.ts`
3. Import and use in your pages

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access**: Granular permission system
- **Input Validation**: Comprehensive form validation
- **XSS Protection**: Content Security Policy implementation
- **CORS Configuration**: Proper cross-origin resource sharing

## 📊 Performance Optimization

- **Code Splitting**: React.lazy() for route-based splitting
- **Memoization**: React.memo() for expensive components
- **Virtual Scrolling**: Efficient large dataset rendering
- **Image Optimization**: Lazy loading and compression
- **Bundle Analysis**: Webpack Bundle Analyzer integration

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please create an issue with:
- Bug description
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Recharts** for beautiful chart components
- **Lucide** for the comprehensive icon library

## 📞 Support

- 📧 Email: 27manavgandhi@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/27manavgandhi/portfolioanalytics-pro/issues)
- 📖 Documentation: [Wiki](https://github.com/27manavgandhi/portfolioanalytics-pro/wiki)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=27manavgandhi/investment-portfolio-dashboard&type=Date)](https://star-history.com/#27manavgandhi/investment-portfolio-dashboard&Date)

---

<div align="center">

### 🚀 **Coming Soon in v2.0**

- **AI-Powered Insights**: Machine learning for portfolio optimization
- **Cryptocurrency Support**: Digital asset management
- **Advanced ESG Scoring**: Environmental, Social, Governance metrics
- **Real-Time Market Data**: Live price feeds and news
- **Mobile App**: iOS and Android applications
- **API Integrations**: Broker and bank account connections
- **Advanced Charting**: TradingView-style technical analysis
- **Tax Optimization**: Automated tax-loss harvesting

**Stay tuned for exciting updates!** ⭐

</div>

---

<div align="center">
Made with ❤️ by Manav Gandhi
<br>
<sub>Built for institutional-grade portfolio management</sub>
</div>
