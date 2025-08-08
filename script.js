// Carbon Footprint Calculator - AI-Powered
class CarbonFootprintCalculator {
    constructor() {
        this.currentQuestion = 0;
        this.answers = {};
        this.questions = this.initializeQuestions();
        this.emissionFactors = this.initializeEmissionFactors();
        
        this.initializeEventListeners();
        this.showQuestion();
    }

    initializeQuestions() {
        return [
            {
                id: 'car_travel',
                title: 'Car Travel',
                question: 'How many kilometers do you travel by car per month?',
                description: 'Include all car trips - commuting, shopping, leisure, etc.',
                type: 'number',
                unit: 'km',
                placeholder: 'Enter kilometers'
            },
            {
                id: 'public_transport',
                title: 'Public Transport',
                question: 'How many kilometers do you travel by public transport per month?',
                description: 'Bus, train, subway, tram, etc.',
                type: 'number',
                unit: 'km',
                placeholder: 'Enter kilometers'
            },
            {
                id: 'flights',
                title: 'Air Travel',
                question: 'How many flights do you take per month?',
                description: 'Include both domestic and international flights',
                type: 'number',
                unit: 'flights',
                placeholder: 'Enter number of flights'
            },
            {
                id: 'flight_distance',
                title: 'Average Flight Distance',
                question: 'What is the average distance of your flights?',
                description: 'Estimate the typical distance per flight',
                type: 'select',
                options: [
                    { value: 500, label: 'Short haul (< 500 km)' },
                    { value: 1500, label: 'Medium haul (500-1500 km)' },
                    { value: 3500, label: 'Long haul (1500-3500 km)' },
                    { value: 7000, label: 'Very long haul (> 3500 km)' }
                ]
            },
            {
                id: 'electricity',
                title: 'Electricity Usage',
                question: 'How many kWh of electricity do you use per month?',
                description: 'Check your electricity bill for this information',
                type: 'number',
                unit: 'kWh',
                placeholder: 'Enter kWh'
            },
            {
                id: 'heating_cooling',
                title: 'Heating & Cooling',
                question: 'How many hours per day do you use air conditioning or heating?',
                description: 'Average daily usage of HVAC systems',
                type: 'number',
                unit: 'hours/day',
                placeholder: 'Enter hours per day'
            },
            {
                id: 'meat_meals',
                title: 'Meat Consumption',
                question: 'How many meat-based meals do you eat per week?',
                description: 'Include beef, pork, lamb, chicken, fish, etc.',
                type: 'number',
                unit: 'meals/week',
                placeholder: 'Enter meals per week'
            },
            {
                id: 'clothing',
                title: 'Clothing Purchases',
                question: 'How much do you spend on new clothes per month?',
                description: 'Average monthly spending on clothing and accessories',
                type: 'number',
                unit: '$',
                placeholder: 'Enter amount in dollars'
            },
            {
                id: 'water_heating',
                title: 'Water Heating',
                question: 'How many liters of water do you heat per day?',
                description: 'Showers, baths, dishwashing, laundry, etc.',
                type: 'number',
                unit: 'liters/day',
                placeholder: 'Enter liters per day'
            },
            {
                id: 'electronics',
                title: 'Electronics Usage',
                question: 'How many hours of electronics use do you have daily?',
                description: 'TV, computer, gaming, phone charging, etc.',
                type: 'number',
                unit: 'hours/day',
                placeholder: 'Enter hours per day'
            }
        ];
    }

    initializeEmissionFactors() {
        return {
            car_travel: 0.2, // kg CO2 per km (average car)
            public_transport: 0.04, // kg CO2 per km (bus/train average)
            flights: 0.25, // kg CO2 per km (average flight)
            electricity: 0.5, // kg CO2 per kWh (grid average)
            heating_cooling: 0.3, // kg CO2 per hour (HVAC)
            meat_meals: 2.5, // kg CO2 per meal (average meat meal)
            clothing: 0.01, // kg CO2 per dollar spent
            water_heating: 0.02, // kg CO2 per liter heated
            electronics: 0.1 // kg CO2 per hour of use
        };
    }

    initializeEventListeners() {
        document.getElementById('nextBtn').addEventListener('click', () => this.nextQuestion());
        document.getElementById('prevBtn').addEventListener('click', () => this.previousQuestion());
        document.getElementById('calculateBtn').addEventListener('click', () => this.calculateFootprint());
        document.getElementById('restartBtn').addEventListener('click', () => this.restart());
    }

    showQuestion() {
        const question = this.questions[this.currentQuestion];
        const container = document.getElementById('questionContainer');
        
        let inputHtml = '';
        if (question.type === 'number') {
            inputHtml = `
                <div class="input-group">
                    <label for="${question.id}">${question.question}</label>
                    <input type="number" id="${question.id}" placeholder="${question.placeholder}" 
                           value="${this.answers[question.id] || ''}" min="0" step="0.1">
                    <small>${question.description}</small>
                </div>
            `;
        } else if (question.type === 'select') {
            const options = question.options.map(opt => 
                `<option value="${opt.value}" ${this.answers[question.id] == opt.value ? 'selected' : ''}>
                    ${opt.label}
                </option>`
            ).join('');
            
            inputHtml = `
                <div class="input-group">
                    <label for="${question.id}">${question.question}</label>
                    <select id="${question.id}">
                        <option value="">Select an option</option>
                        ${options}
                    </select>
                    <small>${question.description}</small>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="question">
                <h3>${question.title}</h3>
                <p>${question.description}</p>
                ${inputHtml}
            </div>
        `;

        this.updateProgress();
        this.updateNavigationButtons();
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progressFill').style.width = `${progress}%`;
    }

    updateNavigationButtons() {
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const calculateBtn = document.getElementById('calculateBtn');

        prevBtn.style.display = this.currentQuestion > 0 ? 'block' : 'none';
        
        if (this.currentQuestion === this.questions.length - 1) {
            nextBtn.style.display = 'none';
            calculateBtn.style.display = 'block';
        } else {
            nextBtn.style.display = 'block';
            calculateBtn.style.display = 'none';
        }
    }

    saveCurrentAnswer() {
        const question = this.questions[this.currentQuestion];
        const input = document.getElementById(question.id);
        
        if (input.value !== '') {
            this.answers[question.id] = parseFloat(input.value) || input.value;
        }
    }

    nextQuestion() {
        this.saveCurrentAnswer();
        
        if (this.currentQuestion < this.questions.length - 1) {
            this.currentQuestion++;
            this.showQuestion();
        }
    }

    previousQuestion() {
        this.saveCurrentAnswer();
        
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.showQuestion();
        }
    }

    calculateFootprint() {
        this.saveCurrentAnswer();
        
        // Calculate emissions by category
        const emissions = {
            transport: this.calculateTransportEmissions(),
            energy: this.calculateEnergyEmissions(),
            food: this.calculateFoodEmissions(),
            shopping: this.calculateShoppingEmissions()
        };

        const totalEmissions = Object.values(emissions).reduce((sum, val) => sum + val, 0);
        
        console.log('Calculated emissions:', emissions);
        console.log('Total emissions:', totalEmissions);
        
        this.displayResults(totalEmissions, emissions);
        this.generateAITips(totalEmissions, emissions);
    }

    calculateTransportEmissions() {
        let emissions = 0;
        
        // Car travel
        if (this.answers.car_travel) {
            emissions += this.answers.car_travel * this.emissionFactors.car_travel;
        }
        
        // Public transport
        if (this.answers.public_transport) {
            emissions += this.answers.public_transport * this.emissionFactors.public_transport;
        }
        
        // Flights
        if (this.answers.flights && this.answers.flight_distance) {
            emissions += this.answers.flights * this.answers.flight_distance * this.emissionFactors.flights;
        }
        
        return emissions;
    }

    calculateEnergyEmissions() {
        let emissions = 0;
        
        // Electricity
        if (this.answers.electricity) {
            emissions += this.answers.electricity * this.emissionFactors.electricity;
        }
        
        // Heating and cooling
        if (this.answers.heating_cooling) {
            emissions += this.answers.heating_cooling * 30 * this.emissionFactors.heating_cooling; // 30 days
        }
        
        // Water heating
        if (this.answers.water_heating) {
            emissions += this.answers.water_heating * 30 * this.emissionFactors.water_heating; // 30 days
        }
        
        // Electronics
        if (this.answers.electronics) {
            emissions += this.answers.electronics * 30 * this.emissionFactors.electronics; // 30 days
        }
        
        return emissions;
    }

    calculateFoodEmissions() {
        let emissions = 0;
        
        // Meat consumption
        if (this.answers.meat_meals) {
            emissions += this.answers.meat_meals * 4 * this.emissionFactors.meat_meals; // 4 weeks
        }
        
        return emissions;
    }

    calculateShoppingEmissions() {
        let emissions = 0;
        
        // Clothing
        if (this.answers.clothing) {
            emissions += this.answers.clothing * this.emissionFactors.clothing;
        }
        
        return emissions;
    }

    displayResults(totalEmissions, emissions) {
        try {
            // Show results section
            const questionForm = document.getElementById('questionForm');
            const resultsSection = document.getElementById('resultsSection');
            
            if (questionForm) questionForm.style.display = 'none';
            if (resultsSection) resultsSection.style.display = 'block';
            
            // Update total footprint
            const totalFootprintElement = document.getElementById('totalFootprint');
            if (totalFootprintElement) {
                totalFootprintElement.textContent = Math.round(totalEmissions);
            }
            
            // Create breakdown display
            this.createBreakdownDisplay(emissions);
            
        } catch (error) {
            console.error('Error displaying results:', error);
            // Fallback: show basic results
            this.showBasicResults(totalEmissions, emissions);
        }
    }

    showBasicResults(totalEmissions, emissions) {
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection) {
            resultsSection.innerHTML = `
                <div class="results-header">
                    <h2>Your Carbon Footprint Results</h2>
                    <div class="total-footprint">
                        <div class="footprint-number">${Math.round(totalEmissions)}</div>
                        <div class="footprint-unit">kg CO₂ per month</div>
                    </div>
                </div>
                <div class="results-grid">
                    <div class="breakdown-container">
                        <h3>Breakdown by Category</h3>
                        <div class="breakdown-data">
                            <div class="breakdown-item transport">
                                <h4>🚗 Transport</h4>
                                <div class="emission-value">${Math.round(emissions.transport)}</div>
                                <div class="emission-label">kg CO₂ per month</div>
                            </div>
                            <div class="breakdown-item energy">
                                <h4>⚡ Energy</h4>
                                <div class="emission-value">${Math.round(emissions.energy)}</div>
                                <div class="emission-label">kg CO₂ per month</div>
                            </div>
                            <div class="breakdown-item food">
                                <h4>🥗 Food</h4>
                                <div class="emission-value">${Math.round(emissions.food)}</div>
                                <div class="emission-label">kg CO₂ per month</div>
                            </div>
                            <div class="breakdown-item shopping">
                                <h4>🛍️ Shopping</h4>
                                <div class="emission-value">${Math.round(emissions.shopping)}</div>
                                <div class="emission-label">kg CO₂ per month</div>
                            </div>
                        </div>
                    </div>
                    <div class="tips-container">
                        <h3>AI-Powered Tips to Reduce Your Footprint</h3>
                        <div id="aiTips" class="tips-list">
                            <!-- AI tips will be generated here -->
                        </div>
                    </div>
                </div>
                <div class="comparison-section">
                    <h3>How You Compare</h3>
                    <div class="comparison-grid">
                        <div class="comparison-item">
                            <div class="comparison-label">Global Average</div>
                            <div class="comparison-value">500 kg CO₂/month</div>
                        </div>
                        <div class="comparison-item">
                            <div class="comparison-label">Sustainable Target</div>
                            <div class="comparison-value">200 kg CO₂/month</div>
                        </div>
                    </div>
                </div>
                <button id="restartBtn" class="btn btn-primary">Calculate Again</button>
            `;
            
            // Re-attach event listener for restart button
            const restartBtn = document.getElementById('restartBtn');
            if (restartBtn) {
                restartBtn.addEventListener('click', () => this.restart());
            }
        }
    }

    createBreakdownDisplay(emissions) {
        const breakdownContainer = document.getElementById('breakdownData');
        if (breakdownContainer) {
            breakdownContainer.innerHTML = `
                <div class="breakdown-item transport">
                    <h4>🚗 Transport</h4>
                    <div class="emission-value">${Math.round(emissions.transport)}</div>
                    <div class="emission-label">kg CO₂ per month</div>
                </div>
                <div class="breakdown-item energy">
                    <h4>⚡ Energy</h4>
                    <div class="emission-value">${Math.round(emissions.energy)}</div>
                    <div class="emission-label">kg CO₂ per month</div>
                </div>
                <div class="breakdown-item food">
                    <h4>🥗 Food</h4>
                    <div class="emission-value">${Math.round(emissions.food)}</div>
                    <div class="emission-label">kg CO₂ per month</div>
                </div>
                <div class="breakdown-item shopping">
                    <h4>🛍️ Shopping</h4>
                    <div class="emission-value">${Math.round(emissions.shopping)}</div>
                    <div class="emission-label">kg CO₂ per month</div>
                </div>
            `;
        }
    }

    generateAITips(totalEmissions, emissions) {
        const tips = [];
        
        // Analyze the highest emission category and generate specific tips
        const categories = Object.entries(emissions);
        categories.sort((a, b) => b[1] - a[1]);
        
        const highestCategory = categories[0][0];
        const highestValue = categories[0][1];
        
        // Generate tips based on highest emission category
        if (highestCategory === 'transport') {
            tips.push({
                title: '🚗 Optimize Your Transportation',
                description: `Your transport emissions (${Math.round(highestValue)} kg CO₂) are your biggest impact. Consider carpooling, using public transport more, or switching to an electric vehicle.`
            });
        }
        
        if (highestCategory === 'energy') {
            tips.push({
                title: '⚡ Reduce Energy Consumption',
                description: `Your energy usage (${Math.round(highestValue)} kg CO₂) is significant. Switch to LED bulbs, unplug devices when not in use, and consider renewable energy sources.`
            });
        }
        
        if (highestCategory === 'food') {
            tips.push({
                title: '🥗 Adjust Your Diet',
                description: `Your food choices (${Math.round(highestValue)} kg CO₂) have a big impact. Try reducing meat consumption and choosing local, seasonal produce.`
            });
        }
        
        // Generate general tips based on total emissions
        if (totalEmissions > 500) {
            tips.push({
                title: '🎯 Set Reduction Goals',
                description: 'Your footprint is above average. Set specific monthly reduction goals and track your progress to stay motivated.'
            });
        } else if (totalEmissions < 200) {
            tips.push({
                title: '🌟 You\'re Doing Great!',
                description: 'Your footprint is already quite low! Share your sustainable practices with friends and family to inspire others.'
            });
        } else {
            tips.push({
                title: '📈 Small Changes, Big Impact',
                description: 'Your footprint is moderate. Focus on one area at a time - small changes can add up to significant reductions.'
            });
        }
        
        // Add a personalized tip based on specific answers
        if (this.answers.car_travel && this.answers.car_travel > 500) {
            tips.push({
                title: '🚲 Consider Alternative Transport',
                description: `You drive ${this.answers.car_travel} km monthly. Try cycling for short trips or working from home occasionally.`
            });
        }
        
        if (this.answers.meat_meals && this.answers.meat_meals > 10) {
            tips.push({
                title: '🌱 Try Meat-Free Mondays',
                description: `You eat ${this.answers.meat_meals} meat meals weekly. Start with one meat-free day per week to reduce your impact.`
            });
        }
        
        // Display tips
        const tipsContainer = document.getElementById('aiTips');
        tipsContainer.innerHTML = tips.map(tip => `
            <div class="tip-item">
                <h4>${tip.title}</h4>
                <p>${tip.description}</p>
            </div>
        `).join('');
    }

    restart() {
        this.currentQuestion = 0;
        this.answers = {};
        
        document.getElementById('questionForm').style.display = 'block';
        document.getElementById('resultsSection').style.display = 'none';
        
        this.showQuestion();
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CarbonFootprintCalculator();
});
