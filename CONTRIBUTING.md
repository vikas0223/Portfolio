# Contributing Guidelines

Thank you for your interest in contributing to Vikas Singh's Developer & Designer Portfolio repository!

## Code of Conduct

This project adheres to a standard Code of Conduct to ensure a welcoming environment for everyone. Please review [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) before participating.

## How to Contribute

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page.
2. **Clone your Fork**:
   ```bash
   git clone https://github.com/<your-username>/Portfolio.git
   cd Portfolio
   ```
3. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install Dependencies & Start Server**:
   ```bash
   npm install
   npm run dev
   ```
5. **Commit your Changes**:
   ```bash
   git commit -m "feat: add awesome feature"
   ```
6. **Push to your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Submit a Pull Request**: Open a PR targeting the `main` branch with a descriptive summary of your changes.

## Development Guidelines

- **Code Style**: Ensure clean, readable JSX and CSS. Run `npm run lint` before committing.
- **3D Optimization**: Keep Three.js geometries and textures optimized to maintain high FPS performance.
- **Animation Philosophy**: Ensure GSAP scroll triggers and R3F frames use passive listeners and smooth easing curves.
