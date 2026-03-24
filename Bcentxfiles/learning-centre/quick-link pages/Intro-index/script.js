document.addEventListener('DOMContentLoaded', () => {
            
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');

    const data = {
        archetypes: {
            employee: {
                label: 'Employee',
                color: '#1F52B3',
                description: `<h3>Characteristics</h3><p>Seeks security, operates within a system, income determined by an employer.</p><h3>Strategy Focus</h3><p>Maximize income via high-value skills and negotiation. Utilize employer-sponsored retirement plans.</p><h3>Limitations</h3><p>Income is capped, relies solely on one employer, limited leverage.</p>`,
                scores: { risk: 2, scalability: 2, time_freedom: 3, income_potential: 4 }
            },
            'self-employed': {
                label: 'Self-Employed',
                color: '#7CDCFE',
                description: `<h3>Characteristics</h3><p>Owns their job, has more freedom but is still the central pillar of their income generation.</p><h3>Strategy Focus</h3><p>Master a craft or service. Often a more demanding version of the time-for-money trap.</p><h3>Limitations</h3><p>Lack of scalability, direct responsibility for everything, high risk of burnout.</p>`,
                scores: { risk: 6, scalability: 3, time_freedom: 2, income_potential: 6 }
            },
            'business-owner': {
                label: 'Business Owner',
                color: '#00FA9A',
                description: `<h3>Characteristics</h3><p>Owns a system that works for them, leverages other people's time and resources.</p><h3>Strategy Focus</h3><p>Systemization, delegation, and leadership. Build an asset that generates profit independently.</p><h3>Limitations</h3><p>High initial risk and time commitment, requires strong leadership skills.</p>`,
                scores: { risk: 8, scalability: 9, time_freedom: 8, income_potential: 9 }
            },
            investor: {
                label: 'Investor',
                color: '#8e44ad',
                description: `<h3>Characteristics</h3><p>Makes money work for them, focuses on asset allocation and compounding.</p><h3>Strategy Focus</h3><p>Identify and acquire income-producing assets. Risk management and long-term horizons.</p><h3>Limitations</h3><p>Requires initial capital and financial literacy. Market risks are inherent.</p>`,
                scores: { risk: 5, scalability: 8, time_freedom: 9, income_potential: 8 }
            }
        },
        incomeStreams: [
            { name: 'Royalty Income', scalability: 9, passivity: 9 },
            { name: 'Capital Gains', scalability: 8, passivity: 6 },
            { name: 'Rental Income', scalability: 7, passivity: 7 },
            { name: 'Dividend Income', scalability: 7, passivity: 8 },
            { name: 'Profit from Business', scalability: 10, passivity: 5 },
            { name: 'Interest Income', scalability: 4, passivity: 9 },
            { name: 'Earned Income', scalability: 2, passivity: 1 },
        ],
        avenues: [
            { title: 'Content Creation', barrier: 'low', content: 'Platforms: YouTube, Blogging, Podcasting. Monetization: Ads, sponsorships, affiliate marketing, digital products. High potential for scalability with low initial cost.'},
            { title: 'The Freelance Economy', barrier: 'low', content: 'Platforms: Upwork, Fiverr. Sell a specific skill. Pathway to agency owner (micro-M3 model) by leveraging other freelancers.'},
            { title: 'Affiliate Marketing', barrier: 'low', content: 'Earn commissions promoting others\' products. Success depends on niche selection, audience building (SEO, social media), and trust.'},
            { title: 'E-commerce', barrier: 'medium', content: 'Models: Dropshipping, private label, direct-to-consumer. Requires marketing, logistics, and customer service skills.'},
            { title: 'Trading', barrier: 'medium', content: 'Markets: Stocks, Forex, Crypto. High risk, requires deep knowledge, psychology, and risk management. Distinct from long-term investing.'},
            { title: 'Real Estate', barrier: 'high', content: 'Strategies: Long-term rentals, flipping, REITs. Traditionally capital-intensive but a proven path to wealth through leverage and appreciation.'},
            { title: 'Entrepreneurship', barrier: 'high', content: 'Building a business from the ground up. The ultimate application of the M3 model (leverage). High risk, high reward.'},
            { title: 'High-Income Career', barrier: 'high', content: 'Fields: Tech, medicine, finance. Use high M1 income to aggressively fund M2 (investing) activities.'},
        ]
    };
    
    function hexToRgba(hex, alpha) {
        const sanitized = hex.replace('#', '').trim();
        const normalized = sanitized.length === 3
            ? sanitized.split('').map((char) => char + char).join('')
            : sanitized;
        const bigint = parseInt(normalized, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const detailsContainer = document.getElementById('archetype-details');

    let archetypeRadarChart, incomeModelChart, incomeStreamChart;

    function switchSection(sectionId) {
        sections.forEach(section => {
            section.classList.toggle('active', section.id === sectionId);
        });
        navLinks.forEach(link => {
            const isActive = link.dataset.section === sectionId;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-pressed', String(isActive));
        });
        window.location.hash = sectionId;
        window.scrollTo(0, 0);
    }

    function initializeSectionFromHash() {
        const sectionId = window.location.hash.replace('#', '');
        if (sectionId && document.getElementById(sectionId)) {
            switchSection(sectionId);
        }
    }

    document.getElementById('main-nav').addEventListener('click', (e) => {
        if (e.target.matches('.nav-link[data-section]')) {
            switchSection(e.target.dataset.section);
            return;
        }

        if (e.target.matches('.nav-link[data-page]')) {
            window.location.href = e.target.dataset.page;
        }
    });

    initializeSectionFromHash();

    function createIncomeModelChart() {
        const ctx = document.getElementById('incomeModelChart').getContext('2d');
        if (incomeModelChart) incomeModelChart.destroy();
        incomeModelChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Year 1', 'Year 5', 'Year 10', 'Year 15', 'Year 20'],
                datasets: [{
                    label: 'Linear Income (Time-for-Money)',
                    data: [50, 60, 70, 80, 90],
                    borderColor: '#1F52B3',
                    backgroundColor: 'rgba(31, 82, 179, 0.2)',
                    fill: true,
                    tension: 0.1
                }, {
                    label: 'Scalable Income (Assets/Systems)',
                    data: [10, 40, 120, 300, 700],
                    borderColor: '#00FA9A',
                    backgroundColor: 'rgba(0, 250, 154, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, ticks: { callback: value => '$' + value + 'k' } },
                    x: {}
                },
                plugins: {
                    legend: { position: 'bottom', labels: { boxWidth: 12 } },
                    tooltip: { callbacks: { label: context => `${context.dataset.label}: $${context.parsed.y}k` } }
                }
            }
        });
    }

function createArchetypeRadarChart() {
    const ctx = document.getElementById('archetypeRadarChart').getContext('2d');
     if (archetypeRadarChart) archetypeRadarChart.destroy();

    // Sort the archetypes to draw the smallest shapes last (so they appear on top)
    const archetypesArray = Object.values(data.archetypes);
    archetypesArray.sort((a, b) => {
        const sumA = Object.values(a.scores).reduce((acc, score) => acc + score, 0);
        const sumB = Object.values(b.scores).reduce((acc, score) => acc + score, 0);
        return sumB - sumA; // Sorts biggest to smallest
    });

    archetypeRadarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Risk', 'Scalability', 'Time Freedom', 'Income Potential'],
            datasets: archetypesArray.map(archetype => ({ // Use the new sorted array
                label: archetype.label,
                data: Object.values(archetype.scores),
                borderColor: archetype.color,
                backgroundColor: hexToRgba(archetype.color, 0.16),
                pointBackgroundColor: '#ffffff',
                pointBorderColor: archetype.color,
                pointHoverBackgroundColor: archetype.color,
                pointHoverBorderColor: '#ffffff',
                borderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }))
        },
        options: {
            // The "parsing: false" line that caused the error has been removed.
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 10,
                    ticks: {
                        display: true,
                        stepSize: 2,
                        backdropColor: 'rgba(255, 255, 255, 0.75)'
                    },
                    pointLabels: {
                        font: {
                            size: 13,
                            weight: '500'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    align: 'center',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 12,
                        padding: 18,
                        color: '#1d1d1f',
                        font: {
                            size: 12,
                            lineHeight: 1.3,
                            family: 'Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
                        },
                        generateLabels(chart) {
                            const base = Chart.defaults.plugins.legend.labels.generateLabels(chart);
                            return base.map(label => {
                                const text = label.text.replace('-', ' ');
                                const words = text.split(' ');
                                if (words.length > 1) {
                                    const midpoint = Math.ceil(words.length / 2);
                                    const firstLine = words.slice(0, midpoint).join(' ');
                                    const secondLine = words.slice(midpoint).join(' ');
                                    return { ...label, text: `${firstLine}\n${secondLine}`.trim() };
                                }
                                return label;
                            });
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        }
                    }
                }
            }
        }
    });
}
    function renderArchetypeDetails(archetypeKey) {
        if (!detailsContainer) {
            return;
        }
        if (!archetypeKey || !data.archetypes[archetypeKey]) {
            detailsContainer.innerHTML = `
                <span class="highlight-meta">Choose an archetype</span>
                <h3>Player Insights</h3>
                <p>Select a player profile below to explore strategy, strengths, and risk profile.</p>
            `;
            return;
        }

        const archetypeData = data.archetypes[archetypeKey];
        const temp = document.createElement('div');
        temp.innerHTML = archetypeData.description;

        const detailStack = document.createElement('div');
        detailStack.className = 'detail-stack';

        temp.querySelectorAll('h3').forEach((heading) => {
            const block = document.createElement('div');
            block.className = 'detail-block';

            const detailHeading = document.createElement('h4');
            detailHeading.className = 'detail-heading';
            detailHeading.textContent = heading.textContent;
            block.appendChild(detailHeading);

            const paragraph = heading.nextElementSibling;
            if (paragraph && paragraph.tagName.toLowerCase() === 'p') {
                const copy = document.createElement('p');
                copy.textContent = paragraph.textContent;
                block.appendChild(copy);
            }

            detailStack.appendChild(block);
        });

        detailsContainer.innerHTML = `
            <span class="highlight-meta">Spotlight</span>
            <h3>${archetypeData.label}</h3>
        `;
        detailsContainer.appendChild(detailStack);
    }

    document.querySelectorAll('.archetype-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            renderArchetypeDetails(e.currentTarget.dataset.archetype);
        });
    });

    function createIncomeStreamChart() {
    const ctx = document.getElementById('incomeStreamChart').getContext('2d');
    if (incomeStreamChart) incomeStreamChart.destroy();
    incomeStreamChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.incomeStreams.map(s => s.name),
            datasets: [
                {
                    label: 'Scalability',
                    data: data.incomeStreams.map(s => s.scalability),
                    // --- CHANGED: Using a theme-consistent dark blue ---
                    backgroundColor: 'rgba(31, 82, 179, 0.8)', // Was green
                    borderColor: '#1F52B3',
                    borderWidth: 1
                },
                {
                    label: 'Passivity',
                    data: data.incomeStreams.map(s => s.passivity),
                    // --- CHANGED: Using the existing light blue for consistency ---
                    backgroundColor: 'rgba(124, 220, 254, 0.8)',
                    borderColor: '#7CDCFE',
                    borderWidth: 1
                }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true, max: 10, grid: { display: false } },
                y: { grid: { color: 'rgba(0, 0, 0, 0.1)' } } // Softened grid line color
            },
            plugins: {
                legend: { position: 'bottom' }
            }
        }
        });
    }

    const avenuesGrid = document.getElementById('avenues-grid');
    function renderAvenues(filter = 'all') {
        avenuesGrid.innerHTML = '';
        const filteredAvenues = data.avenues.filter(avenue => filter === 'all' || avenue.barrier === filter);
        
        filteredAvenues.forEach(avenue => {
            const card = document.createElement('article');
            card.className = 'avenue-card custom-card';
            card.dataset.barrier = avenue.barrier;
            card.innerHTML = `
                <h3>${avenue.title}</h3>
                <p>${avenue.content}</p>
            `;
            avenuesGrid.appendChild(card);
        });
    }

    const filterButtons = document.querySelectorAll('.avenue-filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('is-active'));
            e.currentTarget.classList.add('is-active');
            renderAvenues(e.currentTarget.dataset.filter);
        });
    });

    function initializeApp() {
        switchSection('foundation');
        createIncomeModelChart();
        createArchetypeRadarChart();
        createIncomeStreamChart();
        renderArchetypeDetails();
        renderAvenues();
    }

    initializeApp();
});