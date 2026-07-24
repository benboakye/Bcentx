-- Core MVP seed: 12 categories, priority countries, foundational risk warnings
-- Opportunity deep-seed comes in a later content sprint

insert into categories (code, name, slug, summary, risk_level, beginner_friendly, display_order, status)
values
('CAT-001', 'Careers and Employment', 'careers-and-employment', 'Employment, career development, remote work, salary growth, and professional advancement pathways.', 'low', true, 1, 'published'),
('CAT-002', 'Freelancing and Professional Services', 'freelancing-and-professional-services', 'Skill-based service income through freelancing, agencies, consulting, and professional service delivery.', 'medium', true, 2, 'published'),
('CAT-003', 'Business and Entrepreneurship', 'business-and-entrepreneurship', 'Business creation, small business models, entrepreneurship, and scalable commercial ventures.', 'medium', true, 3, 'published'),
('CAT-004', 'Digital Economy', 'digital-economy', 'Online income models, digital platforms, creator economy, e-commerce, and internet-based business models.', 'medium', true, 4, 'published'),
('CAT-005', 'Financial Markets and Trading', 'financial-markets-and-trading', 'Trading, financial markets, speculation, technical analysis, market platforms, and trading risk education.', 'very_high', false, 5, 'published'),
('CAT-006', 'Investing and Wealth Management', 'investing-and-wealth-management', 'Long-term investing, portfolio building, wealth management, financial planning, and investment literacy.', 'medium', false, 6, 'published'),
('CAT-007', 'Real Estate', 'real-estate', 'Property ownership, rental income, REITs, land, property development, and real estate-related wealth paths.', 'medium', false, 7, 'published'),
('CAT-008', 'Affiliate and Performance Marketing', 'affiliate-and-performance-marketing', 'Affiliate programs, referral income, CPA marketing, performance partnerships, and ethical promotion models.', 'medium', true, 8, 'published'),
('CAT-009', 'Education and Knowledge Monetization', 'education-and-knowledge-monetization', 'Tutoring, online courses, coaching, consulting, digital products, and knowledge-based income.', 'medium', true, 9, 'published'),
('CAT-010', 'Technology and Innovation', 'technology-and-innovation', 'Software, AI, cybersecurity, SaaS, open source, technical freelancing, and innovation commercialization.', 'medium', true, 10, 'published'),
('CAT-011', 'Alternative Investments', 'alternative-investments', 'Alternative assets including precious metals, collectibles, private markets, royalties, and digital assets.', 'very_high', false, 11, 'published'),
('CAT-012', 'Passive Income and Royalties', 'passive-income-and-royalties', 'Income-generating assets, royalties, licensing, digital products, semi-passive systems, and recurring revenue.', 'medium', true, 12, 'published')
on conflict (code) do nothing;

insert into countries (name, iso_code, slug, region, currency_code, summary, status)
values
('Ghana', 'GH', 'ghana', 'Africa', 'GHS', 'Ghana-focused guidance for digital income, local business, freelancing, education, real estate, and payment access.', 'published'),
('Canada', 'CA', 'canada', 'North America', 'CAD', 'Canada-focused guidance for careers, education, investing, taxes, benefits, platforms, and online income.', 'published'),
('United States', 'US', 'united-states', 'North America', 'USD', 'United States-focused guidance for platforms, investing, employment, affiliate programs, business, and compliance.', 'published'),
('Nigeria', 'NG', 'nigeria', 'Africa', 'NGN', 'Nigeria-focused guidance for digital income, freelancing, fintech, creator economy, and scam awareness.', 'published'),
('Kenya', 'KE', 'kenya', 'Africa', 'KES', 'Kenya-focused guidance for mobile-first digital income, entrepreneurship, freelancing, and local platforms.', 'published'),
('South Africa', 'ZA', 'south-africa', 'Africa', 'ZAR', 'South Africa-focused guidance for careers, business, investing, real estate, and online income.', 'published'),
('United Kingdom', 'GB', 'united-kingdom', 'Europe', 'GBP', 'UK-focused guidance for employment, freelancing, investing, tax, platforms, and financial promotion caution.', 'published'),
('India', 'IN', 'india', 'Asia', 'INR', 'India-focused guidance for technology, freelancing, education, startup paths, and platform access.', 'published'),
('Australia', 'AU', 'australia', 'Oceania', 'AUD', 'Australia-focused guidance for careers, investing, business, digital income, and tax awareness.', 'published'),
('United Arab Emirates', 'AE', 'united-arab-emirates', 'Middle East', 'AED', 'UAE-focused guidance for business, tax residency education, technology, real estate, and international income.', 'published')
on conflict (iso_code) do nothing;

insert into risk_warnings (title, slug, warning_type, severity, description, recommended_action, status)
values
('No Guaranteed Income', 'no-guaranteed-income', 'financial', 'high', 'No legitimate wealth-building path can guarantee income or profit. Results depend on skill, capital, timing, execution, market conditions, and risk.', 'Avoid any platform or person promising guaranteed income.', 'published'),
('Scam and Fraud Risk', 'scam-and-fraud-risk', 'scam', 'critical', 'Many online income, trading, crypto, passive income, and investment opportunities are used by scammers to exploit beginners.', 'Verify official sources, avoid pressure tactics, and never send money to unverified schemes.', 'published'),
('Affiliate Disclosure Required', 'affiliate-disclosure-required', 'compliance', 'medium', 'Affiliate links create a financial relationship that must be disclosed clearly to users.', 'Display a clear affiliate disclosure near affiliate links and on disclosure pages.', 'published'),
('Tax Advice Disclaimer Required', 'tax-advice-disclaimer-required', 'tax', 'high', 'Tax rules vary by country and user circumstances. Bcentx content must not be treated as personal tax advice.', 'Advise users to verify official tax authority guidance or consult a qualified tax professional.', 'published'),
('Legal Advice Disclaimer Required', 'legal-advice-disclaimer-required', 'legal', 'high', 'Legal requirements vary by country, business type, platform, and industry. Bcentx should not provide personal legal advice.', 'Use legal disclaimers and link to official sources where possible.', 'published'),
('High Capital Loss Risk', 'high-capital-loss-risk', 'financial', 'critical', 'Some opportunities can lead to partial or total loss of capital, especially trading, crypto, startup investing, private markets, and leveraged strategies.', 'Only risk money you can afford to lose and consult qualified professionals when needed.', 'published'),
('Platform Availability May Change', 'platform-availability-may-change', 'platform', 'medium', 'Platforms may change country availability, fees, payout methods, affiliate terms, and account rules without notice.', 'Verify platform information from official pages before acting.', 'published'),
('Unlicensed Financial Advice Risk', 'unlicensed-financial-advice-risk', 'compliance', 'critical', 'Providing personalized financial or investment advice may require licensing in many jurisdictions.', 'Keep content educational and general. Do not give personalized recommendations.', 'published')
on conflict (slug) do nothing;
