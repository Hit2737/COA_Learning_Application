# 🚀 COA Educational GUI Tool 🎓

**Enhance your understanding of Computer Organization and Architecture (COA) concepts with this interactive, web-based GUI tool!**

### 🌐 Overview
This COA Educational GUI Tool is designed to simplify complex COA concepts, making them accessible through interactive visualizations and real-time analysis. Developed using **React** and **Chart.js**, it includes tools for:

1. **CPU Performance Metrics Analysis**
2. **Number Conversion Simulator**
3. **Cache Replacement Policy Simulator**
4. **IEEE Floating Point Converter**

With step-by-step explanations, dynamic simulations, and customizable parameters, this tool is perfect for students and enthusiasts who want hands-on learning. 

---

## 🎨 Features

### 🧮 Performance Metric Analyzer
Analyze and visualize CPU performance metrics like **Speedup, Throughput, and Efficiency**! This module supports customization of core count, sequential instructions, parallelizable instructions, CPI, clock rate, and overhead time.

- **Detailed Calculations**: Calculate **Sequential Execution Time**, **Parallel Execution Time**, **Total Execution Time**, and more.
- **Graphical Visualizations**: Get insights into how parallelization affects speedup, powered by **Chart.js** graphs.

### 🔢 Number Conversion Simulator
Convert numbers between **binary, decimal, octal, hexadecimal**, and even **IEEE formats**!

- **Base Conversion**: Convert between any base system with step-by-step explanations.
- **IEEE Converter**: Shows the conversion process from decimal to IEEE-754 (single and double precision), handling special cases like `+∞`, `-∞`, and `NaN`.

### 🧩 Cache Replacement Visualizer
Simulate and understand cache replacement policies with this powerful visual tool.

- **Supported Policies**: **LRU, FIFO, LFU, and LIFO Replacement**.
- **Cache Levels**: Switch between **L1 and L2** cache levels to see how each works in practice.
- **Custom Parameters**: Adjust cache size, block size, and access patterns for deeper insights.

### 🔍 IEEE Floating Point Converter
Visualize the conversion from decimal to IEEE-754 floating point formats (32 and 64 bit).

- **Step-by-Step Conversion**: See each stage of the conversion, along with the exact value stored and any error in representation.
- **Special Case Handling**: Recognizes and accurately represents special cases like infinities and `NaN`.

---

## 📚 Project Objectives

### Key Goals
1. **Visual Learning**: Provide students with graphical simulations to reinforce COA theory.
2. **Hands-On Interaction**: Allow users to experiment with parameters to see immediate results.
3. **Comprehensive Coverage**: Cover essential COA topics with clarity and interactivity.

---

## 📷 Screenshots

### Performance Metric Analyzer
<img src="img/PMA.png" width="100%" height="500px">

### Number System Converter
<img src="img/NC.png">

### Cache Replacement Visualizer
<img src="img/CS.png">

### IEEE Floating Point Converter
<img src="img/IEEE.png">
---

## 🛠️ Tech Stack

- **Frontend**: React, React Flow
- **Visualizations**: Chart.js
- **Styling**: CSS, Styled Components, Bootstrap

---

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed
- Clone the repository
  ```bash
  git clone https://github.com/Hit2737/COA_GUI_Tool_Project.git
  ```
  
### Installation
1. Navigate to the project directory
   ```bash
   cd myapp
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm start
   ```
   Open your browser at `http://localhost:3000` to view the app.

---

## 📖 Usage Guide

1. **Performance Metric Analyzer**: Adjust sliders for core count, clock rate, and other parameters. Hit "Calculate" to see execution times and speedup.
2. **Number Conversion**: Enter your base and number, select the target base, and see conversion steps.
3. **Cache Simulator**: Choose a cache size, enter memory addresses, and watch the cache replacement policy in action.
4. **IEEE Converter**: Enter a decimal number, select IEEE-754 format, and view the binary representation. Use show and hide button to see or hide the conversion steps.

---

## 👥 Contributors
- **Hitesh Kumar** - Project Lead & Performance Metric Analyzer & Cache Replacement Visualizer
- **Bhavik Patel** - Number Conversion Simulator & IEEE Floating Point Converter 
- **Ruchit Jagodhara** - IEEE Floating Point Converter 
- **Jinil Patel** - Cache Replacement Visualizer

---

## 🌟 Acknowledgments

Special thanks to our mentors and reviewers who provided valuable feedback throughout the development process. 

---

## 📄 License

This project is licensed under the MIT License.

---
