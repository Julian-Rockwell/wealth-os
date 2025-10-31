import { Button } from "@/components/ui/button";
import { FileDown, Printer } from "lucide-react";

const Documentation = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Print/Download controls - hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">System Documentation</h1>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Print / Save as PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Documentation content */}
      <div className="container max-w-4xl py-8 prose prose-slate dark:prose-invert max-w-none">
        {/* Cover Page */}
        <div className="text-center mb-16 page-break-after">
          <h1 className="text-5xl font-bold mb-4">Rockwell Wealth OS</h1>
          <h2 className="text-3xl text-muted-foreground mb-8">Technical System Documentation</h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive Personal Financial Management Platform
          </p>
          <div className="mt-16">
            <p className="text-sm text-muted-foreground">Version 1.0</p>
            <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 page-break-after">
          <h2 className="text-3xl font-bold mb-6">Table of Contents</h2>
          <nav className="space-y-2">
            <a href="#overview" className="block text-primary hover:underline">1. System Overview</a>
            <a href="#architecture" className="block text-primary hover:underline ml-4">1.1 Architecture and Data Flow</a>
            <a href="#tech-stack" className="block text-primary hover:underline ml-4">1.2 Technology Stack</a>
            <a href="#command-center" className="block text-primary hover:underline">2. Command Center - Data Ingestion</a>
            <a href="#dashboard" className="block text-primary hover:underline">3. Dashboard - Net Worth Overview</a>
            <a href="#budget" className="block text-primary hover:underline">4. Budget Analyzer - 50/30/20 Analysis</a>
            <a href="#classification" className="block text-primary hover:underline ml-4">4.1 Transaction Classification System</a>
            <a href="#calculation" className="block text-primary hover:underline ml-4">4.2 50/30/20 Calculation Flow</a>
            <a href="#visualizations" className="block text-primary hover:underline ml-4">4.3 Visualizations and Components</a>
            <a href="#investments" className="block text-primary hover:underline">5. Investment Planning - Active Investment Readiness</a>
            <a href="#goals" className="block text-primary hover:underline">6. Goals - RPIC Calculator</a>
            <a href="#formulas" className="block text-primary hover:underline">7. Key Calculations and Formulas</a>
            <a href="#user-flow" className="block text-primary hover:underline">8. Typical User Flow</a>
            <a href="#glossary" className="block text-primary hover:underline">9. Glossary of Terms</a>
          </nav>
        </div>

        {/* 1. System Overview */}
        <section id="overview" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">1. System Overview</h2>
          
          <h3 className="text-2xl font-semibold mb-4">Purpose</h3>
          <p className="mb-4">
            Rockwell Wealth OS is a comprehensive personal financial management platform designed to help users:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Visualize and analyze their consolidated net worth</li>
            <li>Evaluate and optimize their budget using the 50/30/20 rule</li>
            <li>Plan and prepare for active investments</li>
            <li>Calculate financial independence goals (RPIC)</li>
            <li>Make informed financial decisions based on real data</li>
          </ul>

          <h3 id="architecture" className="text-2xl font-semibold mb-4">1.1 Architecture and Data Flow</h3>
          <p className="mb-4">
            The system uses a centralized context architecture (<code>FinancialDataContext</code>) that manages all financial state of the application:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>FinancialSnapshot</strong>: Complete user data (assets, liabilities, transactions)</li>
            <li><strong>DashboardData</strong>: Processed data for dashboard visualizations</li>
            <li><strong>PaperTradingProgress</strong>: Paper trading progress state</li>
            <li><strong>RpicResult</strong>: RPIC calculation results</li>
          </ul>
          <p className="mb-4">
            Data is persisted locally using <code>localStorage</code> and shared across all modules via React Context API.
          </p>

          <h3 id="tech-stack" className="text-2xl font-semibold mb-4">1.2 Technology Stack</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Frontend Core</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>React 18</strong>: UI library with hooks and functional components</li>
              <li><strong>TypeScript</strong>: Static typing for enhanced safety</li>
              <li><strong>Vite</strong>: Modern and fast build tool</li>
              <li><strong>React Router v6</strong>: Page navigation</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">State and Data</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Context API</strong>: Global state management</li>
              <li><strong>localStorage</strong>: Client-side data persistence</li>
              <li><strong>React Hooks</strong>: useState, useEffect, useContext, useMemo</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">UI/UX</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Tailwind CSS</strong>: CSS utility framework</li>
              <li><strong>shadcn/ui</strong>: Accessible and customizable UI components</li>
              <li><strong>Radix UI</strong>: Unstyled component primitives</li>
              <li><strong>Lucide React</strong>: Modern icons</li>
              <li><strong>Recharts</strong>: Charts and data visualizations</li>
            </ul>
          </div>
        </section>

        {/* 2. Command Center */}
        <section id="command-center" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">2. Command Center - Data Ingestion</h2>
          <p className="mb-4">
            The Command Center is the entry point for loading financial data into the system. It supports multiple ingestion methods:
          </p>

          <h3 className="text-2xl font-semibold mb-4">Ingestion Methods</h3>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">1. Sample Data</h4>
            <p className="mb-2">Loads predefined demo data to explore the system.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Realistic synthetic data for accounts, investments, and transactions</li>
              <li>Useful for demos and testing</li>
              <li>Location: <code>src/utils/sampleData.ts</code></li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">2. Mock Connect</h4>
            <p className="mb-2">Simulates a connection to financial institutions.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Generates random data from multiple accounts</li>
              <li>Includes checking, savings, credit cards, loans, investments</li>
              <li>Transactions from the last 90 days</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">3. Upload Files (PDF/CSV/XLSX)</h4>
            <p className="mb-2">Allows uploading account statements in multiple formats.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>PDF</strong>: Text extraction with format validation</li>
              <li><strong>CSV</strong>: Direct parsing with automatic column detection</li>
              <li><strong>XLSX</strong>: Excel spreadsheet reading</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">4. Manual Entry</h4>
            <p className="mb-2">Form to manually input data.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Validated fields for accounts, balances, and transactions</li>
              <li>Useful for adjustments or data from non-digital sources</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Data Validation</h3>
          <p className="mb-4">
            All entered data goes through validation:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Data type verification (numbers, dates, strings)</li>
            <li>Range validation (positive/negative balances by type)</li>
            <li>Duplicate detection by unique ID</li>
            <li>Error notifications with toast messages</li>
          </ul>
        </section>

        {/* 3. Dashboard */}
        <section id="dashboard" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">3. Dashboard - Net Worth Overview</h2>
          <p className="mb-4">
            The Dashboard provides a consolidated view of the user's net worth, breaking down assets by class and liquidity.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Main Calculations</h3>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Net Worth</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Net Worth = Total Assets - Total Liabilities</code>
            </div>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Total Assets includes: cash, investments, properties, other assets</li>
              <li>Total Liabilities includes: mortgages, loans, credit cards, other debts</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Liquid Assets</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Liquid Assets = Cash + Investments (stocks, bonds, mutual funds, ETFs)</code>
            </div>
            <p className="mb-4">Assets that can be quickly converted to cash without significant loss of value.</p>

            <h4 className="text-xl font-semibold mb-3">Emergency Fund</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Emergency Fund = Liquid Assets × 0.30</code>
            </div>
            <p className="mb-4">30% of liquid assets is reserved as an emergency fund (3-6 months of expenses).</p>

            <h4 className="text-xl font-semibold mb-3">Available to Invest</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Available to Invest = Liquid Assets - Emergency Fund</code>
            </div>
            <p className="mb-4">Capital available for investments after securing the emergency fund.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Visual Components</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Asset Allocation View</strong>: Pie chart showing asset distribution</li>
            <li><strong>Holdings Table</strong>: Detailed table of all accounts and investments</li>
            <li><strong>Liabilities Table</strong>: Table of all debts and liabilities</li>
            <li><strong>KPI Panel</strong>: Cards with key metrics (Net Worth, Liquid Assets, etc.)</li>
          </ul>
        </section>

        {/* 4. Budget Analyzer */}
        <section id="budget" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">4. Budget Analyzer - 50/30/20 Analysis</h2>
          <p className="mb-4">
            The Budget Analyzer evaluates the user's financial health by applying the 50/30/20 rule:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>50% Needs</strong>: Essential expenses (housing, food, transportation, utilities)</li>
            <li><strong>30% Wants</strong>: Discretionary spending (entertainment, shopping, hobbies)</li>
            <li><strong>20% Savings</strong>: Investments, debt payments, emergency funds</li>
          </ul>

          <h3 id="classification" className="text-2xl font-semibold mb-4">4.1 Transaction Classification System</h3>
          <p className="mb-4">
            The system uses an automatic classifier (<code>transactionClassifier.ts</code>) that categorizes each transaction based on keywords and patterns.
          </p>

          <h4 className="text-xl font-semibold mb-3">Operational Income Filtering</h4>
          <p className="mb-4">
            The <code>isValidIncome()</code> function identifies real income, excluding non-operational movements:
          </p>
          <div className="mb-4">
            <p className="font-semibold mb-2">Valid Income (INCLUDED):</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Payroll / Salaries</li>
              <li>Investment Income (dividends, interest)</li>
              <li>Gig/Freelance Income</li>
            </ul>
            <p className="font-semibold mb-2">Excluded Movements (NOT INCOME):</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Internal Transfers (transfers between own accounts)</li>
              <li>Credit Card Payments</li>
              <li>Refunds / Reimbursements</li>
              <li>Asset Sales</li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold mb-3">Expense Classification</h4>
          <p className="mb-4">
            The <code>mapSubcategoryToCategory()</code> function maps subcategories to the three main categories:
          </p>
          <div className="mb-4">
            <p className="font-semibold mb-2">Needs (50%):</p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li>housing, utilities, internet, phone</li>
              <li>groceries, food_delivery</li>
              <li>gas, public_transit, car_maintenance, parking, tolls</li>
              <li>insurance (health, car, home, life)</li>
              <li>healthcare, pharmacy, medical</li>
              <li>childcare, education, tuition</li>
              <li>minimum_debt_payment</li>
            </ul>

            <p className="font-semibold mb-2">Wants (30%):</p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li>restaurants, bars, coffee_shops</li>
              <li>entertainment, streaming, subscriptions</li>
              <li>shopping, clothing, personal_care</li>
              <li>travel, vacation, hotels</li>
              <li>hobbies, sports, gym_membership</li>
              <li>pet_care (non-essential)</li>
            </ul>

            <p className="font-semibold mb-2">Savings (20%):</p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li>investment, brokerage, retirement_contribution</li>
              <li>savings_transfer</li>
              <li>extra_debt_payment (above minimum)</li>
              <li>emergency_fund</li>
            </ul>
          </div>

          <h3 id="calculation" className="text-2xl font-semibold mb-4 page-break-before">4.2 50/30/20 Calculation Flow</h3>
          <p className="mb-4">
            The calculation is performed in the <code>BudgetDonut.tsx</code> component following these steps:
          </p>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Step 1: Period Filtering</h4>
            <p className="mb-2">Transactions are filtered by the selected period (30, 60, or 90 days).</p>

            <h4 className="text-xl font-semibold mb-3">Step 2: Operational Classification</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>filterOperationalTransactions(filteredTransactions)</code>
            </div>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Separates debits (expenses) and credits (income)</li>
              <li>Applies <code>isValidIncome()</code> to filter only real income</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Step 3: Real Net Income Calculation</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>totalIncome = sum(operationalCredits.map(txn =&gt; txn.amount))</code>
            </div>
            <p className="mb-4">If <code>totalIncome &lt; $500</code>, an insufficient income warning is displayed.</p>

            <h4 className="text-xl font-semibold mb-3">Step 4: Expense Classification</h4>
            <p className="mb-2">Operational debits are categorized:</p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`needs = sum(expenses where category === "need")
wants = sum(expenses where category === "want")
savings = sum(expenses where category === "saving")`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Step 5: Percentage Calculation</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`needsPct = (needs / totalIncome) × 100
wantsPct = (wants / totalIncome) × 100
savingsPct = (savings / totalIncome) × 100`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Step 6: 50/30/20 Validation</h4>
            <p className="mb-2">The <code>validate50_30_20()</code> function verifies:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Needs ≤ 50%</li>
              <li>Wants ≤ 30%</li>
              <li>Savings ≥ 20%</li>
            </ul>
            <p className="mb-4">Generates specific alerts if targets are not met.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Correction: Average Monthly Income</h3>
          <p className="mb-4">
            In <code>useDashboardData.ts</code>, the <code>avgIncomeAmount</code> calculation was corrected:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <code className="text-sm">
              {`// BEFORE (INCORRECT): divided by number of transactions
avgIncomeAmount = totalValidIncome / validIncomeTransactions.length

// NOW (CORRECT): divides by number of months in period
avgIncomeAmount = totalValidIncome / period.months`}
            </code>
          </div>

          <h3 id="visualizations" className="text-2xl font-semibold mb-4 page-break-before">4.3 Visualizations and Components</h3>
          
          <h4 className="text-xl font-semibold mb-3">BudgetDonut</h4>
          <p className="mb-4">
            Circular donut chart showing 50/30/20 distribution with:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Conic gradient with differentiated colors by category</li>
            <li>Percentages and amounts for each category</li>
            <li>Visual compliance indicators (✓ or ⚠)</li>
            <li>Explanatory tooltip of the 50/30/20 rule</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">MonthlyStackedBars</h4>
          <p className="mb-4">
            Stacked bar chart showing monthly evolution of:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Needs (green)</li>
            <li>Wants (blue)</li>
            <li>Savings (purple)</li>
            <li>Includes <strong>InfoTooltip</strong> explaining what "Monthly Breakdown" is</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">KeyInsights</h4>
          <p className="mb-4">
            Insight cards highlighting:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Positive Trend</strong>: Favorable budget trends (with explanatory <strong>InfoTooltip</strong>)</li>
            <li><strong>Red Flag</strong>: Excessive spending alerts (with explanatory <strong>InfoTooltip</strong>)</li>
            <li><strong>Quick Win</strong>: Immediate savings opportunities</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">TransactionsList / TransactionsTable</h4>
          <p className="mb-4">
            Detailed list/table of all transactions with filters:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Date Range</strong>: Custom date range</li>
            <li><strong>Type</strong>: Income, Expense, Transfer</li>
            <li><strong>Category</strong>: Need, Want, Saving</li>
            <li><strong>Subcategory</strong>: housing, groceries, transportation, healthcare, etc. (new filter added)</li>
            <li><strong>Account</strong>: Filter by specific account</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">FiltersCard</h4>
          <p className="mb-4">
            Updated filters panel with the new <strong>Subcategory</strong> filter that allows viewing specific transactions such as:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Groceries</li>
            <li>Transportation</li>
            <li>Healthcare</li>
            <li>Housing</li>
            <li>And many more subcategories...</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">UnspentIncomeCard</h4>
          <p className="mb-4">
            Displays income that was not allocated to expenses during the selected period:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <code className="text-sm">
              Unspent Income = Total Income - Total Expenses
            </code>
          </div>
          <p className="mb-4">
            <strong>Note:</strong> This card displays "(strange calculation)" as a label to indicate that the calculation methodology for unspent income differs from traditional approaches and may require further refinement or clarification in future iterations.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Shows the difference between income and expenses for the period</li>
            <li>Indicates available surplus for additional savings or investments</li>
            <li>Updates dynamically based on selected time period (30, 60, or 90 days)</li>
          </ul>
        </section>

        {/* 5. Investments */}
        <section id="investments" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">5. Investment Planning - Active Investment Readiness</h2>
          <p className="mb-4">
            The Investments module guides the user through a step-by-step process to determine their readiness for active investments.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Step 1: Readiness Score</h3>
          <p className="mb-4">
            Evaluates 5 key factors:
          </p>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">1. Emergency Fund Status</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`emergencyFund = liquidAssets × 0.30
score = (emergencyFund / (monthlyExpenses × 6)) × 20
max score = 20 points`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">2. Debt-to-Income Ratio</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`DTI = (totalDebtPayments / monthlyIncome) × 100
score = max(0, 20 - (DTI - 20) / 2)
max score = 20 points`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">3. Income Stability</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`Based on variance of monthly income
Low variance = 20 points
High variance = lower score`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">4. Expense Discipline</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`Based on 50/30/20 rule adherence
Perfect adherence = 20 points
Deviations reduce score`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">5. Capital Available</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`availableCapital = liquidAssets - emergencyFund
score = min(20, availableCapital / 5000)
max score = 20 points`}
              </code>
            </div>

            <p className="mt-4 mb-2"><strong>Total Readiness Score:</strong></p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Total = sum of all 5 factors (max 100 points)</code>
            </div>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>80-100: Excellent - Ready for active investing</li>
              <li>60-79: Good - Minor improvements needed</li>
              <li>40-59: Fair - Foundation work required</li>
              <li>0-39: Poor - Focus on financial basics first</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Step 2: Optimize Assets</h3>
          <p className="mb-4">
            Identifies opportunities to free up capital:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Equity Opportunities</strong>: Assets that could be sold or refinanced</li>
            <li><strong>Debt Payoff Scenarios</strong>: Simulations of high-interest debt payoff</li>
            <li>Shows impact on capital availability</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Step 3: Strategy Selection</h3>
          <p className="mb-4">
            Presents active investment strategies:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Long-term Holdings (LEAP options, wheel strategy)</li>
            <li>Cash-Secured Puts</li>
            <li>Swing Trading</li>
            <li>Income Generation (covered calls, cash-secured puts)</li>
          </ul>
          <p className="mb-4">
            Each strategy includes description, risk, expected return, and minimum required capital.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Step 4: Paper Trading</h3>
          <p className="mb-4">
            Trading simulation with specific gate requirements:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Gate 1</strong>: Complete 40+ simulated trades</li>
            <li><strong>Gate 2</strong>: 95%+ adherence to trading plan</li>
            <li><strong>Gate 3</strong>: 70%+ completion of pre-trade checklist</li>
          </ul>
          <p className="mb-4">
            User must pass all gates before receiving real capital recommendation.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Step 5: Capital Allocation</h3>
          <p className="mb-4">
            Waterfall logic to determine allocable capital:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <code className="text-sm">
              {`1. availableCapital = liquidAssets - emergencyFund
2. highInterestDebtBuffer = highInterestDebt × 0.5
3. capitalAfterDebtBuffer = availableCapital - highInterestDebtBuffer
4. allocableCapital = max(0, capitalAfterDebtBuffer)
5. recommendedStart = min(allocableCapital × 0.2, 5000)`}
            </code>
          </div>
        </section>

        {/* 6. Goals */}
        <section id="goals" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">6. Goals - RPIC Calculator</h2>
          <p className="mb-4">
            The Goals module helps users calculate their <strong>Retirement Passive Income Capital (RPIC)</strong>, the capital needed to generate sufficient passive income for retirement.
          </p>

          <h3 className="text-2xl font-semibold mb-4">User Inputs (3 Questions)</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">1. Target Monthly Passive Income</h4>
            <p className="mb-2">How much do you want to earn monthly in passive income when you retire?</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Numeric input in dollars</li>
              <li>Typically based on current monthly expenses</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">2. Lifestyle Multiplier</h4>
            <p className="mb-2">How do you expect your lifestyle to change?</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>0.7x: Downsize (expense reduction)</li>
              <li>1.0x: Same (same as now) - <strong>Corrected: value="1"</strong></li>
              <li>1.3x: Upgrade (expense increase)</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">3. Geography Multiplier</h4>
            <p className="mb-2">Where do you plan to live?</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>0.5x: Lower cost area</li>
              <li>1.0x: Same location - <strong>Corrected: value="1"</strong></li>
              <li>1.5x: Higher cost area</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">RPIC Calculation</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Step 1: Adjust Target Income</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`adjustedMonthlyIncome = targetMonthly × lifestyle × geography`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Step 2: Annualized RPIC</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`annualRPIC = adjustedMonthlyIncome × 12`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Step 3: Required Capital</h4>
            <p className="mb-4">Two scenarios are calculated:</p>
            
            <p className="font-semibold mb-2">A. Wealth OS Hybrid Approach</p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`assumedReturn = 12% (combination of active/passive investments)
capitalRequired = annualRPIC / 0.12`}
              </code>
            </div>

            <p className="font-semibold mb-2">B. Traditional Passive Approach</p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`assumedReturn = 4% (traditional 4% rule)
capitalRequired = annualRPIC / 0.04`}
              </code>
            </div>

            <p className="mt-4 mb-2"><strong>Capital Efficiency:</strong></p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`savings = traditionalCapital - hybridCapital`}
              </code>
            </div>
            <p className="mb-4">
              The Wealth OS Hybrid approach requires 67% less capital than traditional due to projected higher returns.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Timeline Calculation</h3>
          <p className="mb-4">
            How many years will it take to reach the target RPIC?
          </p>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Additional Inputs</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Starting Capital</strong>: Available initial capital</li>
              <li><strong>Monthly Contribution</strong>: Monthly contribution towards goal</li>
              <li><strong>Expected Annual Return</strong>: Expected annual return (%)</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Future Value Formula</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`FV = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]

Where:
- FV = Future Value (capitalRequired)
- PV = Present Value (startingCapital)
- PMT = Monthly Contribution (monthlyContribution)
- r = Monthly Return (annualReturn / 12)
- n = Number of months (what we solve for)

Solving for n:
yearsToGoal = n / 12`}
              </code>
            </div>

            <p className="mb-4">
              If the goal is not achievable with current parameters (returns very high or negative years), a suggestive alert is shown:
            </p>
            <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-500 p-4 rounded-lg mb-4">
              <p className="text-foreground text-sm">
                "With current parameters, you'd reach RPIC in X years, exceeding your Y-year goal. Consider increasing monthly contributions or adjusting return assumptions."
              </p>
            </div>
            <p className="mb-4">
              <strong>Applied correction:</strong> This alert text now uses <code>text-foreground</code> (black) instead of <code>text-warning-foreground</code> (white) for better visibility.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Visualizations</h3>
          
          <h4 className="text-xl font-semibold mb-3">Required Capital Table</h4>
          <p className="mb-4">
            Comparative table showing:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Required capital for each approach (Hybrid vs Traditional)</li>
            <li>Capital gap (difference with current capital)</li>
            <li>Years to reach goal</li>
            <li>Capital efficiency (Hybrid approach savings)</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">Visual Roadmap</h4>
          <p className="mb-4">
            Visual timeline with milestones:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Emergency Fund Secured</li>
            <li>Debt-Free</li>
            <li>First $100K Invested</li>
            <li>Half-Way to RPIC</li>
            <li>RPIC Goal Reached</li>
          </ul>
          <p className="mb-4">
            Each milestone shows estimated achievement date and current progress.
          </p>

          <h4 className="text-xl font-semibold mb-3">RPIC Result Card</h4>
          <p className="mb-4">
            Executive summary showing:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Adjusted annualized RPIC</li>
            <li>Required capital (both approaches)</li>
            <li>Capital savings (Hybrid vs Traditional)</li>
            <li>RPIC Index (progress as percentage)</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Correction: Expense Baseline Card</h3>
          <p className="mb-4">
            <strong>Identified issue:</strong> The "Yes, this reflects my lifestyle" button did not work correctly, and edit state was not properly managed.
          </p>
          <p className="mb-4">
            <strong>Applied correction:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>The "Yes, this reflects my lifestyle" button now correctly confirms <code>autoMonthlyExpenses</code> and calls <code>onExpensesConfirmed(autoMonthlyExpenses)</code></li>
            <li>Both buttons ("Yes" and "Adjust") are always shown when data is available</li>
            <li>Edit flow is now consistent: saving updates the value and exits edit mode</li>
          </ul>
        </section>

        {/* 7. Key Calculations */}
        <section id="formulas" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">7. Key Calculations and Formulas</h2>
          <p className="mb-4">
            Consolidated summary of all formulas used in the system:
          </p>

          <h3 className="text-2xl font-semibold mb-4">Dashboard Calculations</h3>
          <div className="space-y-4 mb-6">
            <div>
              <p className="font-semibold mb-2">Net Worth</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">Net Worth = Total Assets - Total Liabilities</code>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Liquid Assets</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">Liquid Assets = Cash + Investments (liquid securities)</code>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Emergency Fund</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">Emergency Fund = Liquid Assets × 0.30</code>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Available to Invest</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">Available Capital = Liquid Assets - Emergency Fund</code>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Budget Analysis</h3>
          <div className="space-y-4 mb-6">
            <div>
              <p className="font-semibold mb-2">Average Monthly Income (Corrected)</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">Avg Monthly Income = Total Valid Income / Period Months</code>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">50/30/20 Percentages</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  {`Needs % = (Total Needs / Total Income) × 100
Wants % = (Total Wants / Total Income) × 100
Savings % = (Total Savings / Total Income) × 100`}
                </code>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Investment Readiness</h3>
          <div className="space-y-4 mb-6">
            <div>
              <p className="font-semibold mb-2">Readiness Score (5 Factors × 20 pts)</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  {`Emergency Fund Score = (currentFund / targetFund) × 20
DTI Score = max(0, 20 - (DTI - 20) / 2)
Income Stability Score = based on variance (max 20)
Expense Discipline Score = 50/30/20 adherence (max 20)
Capital Available Score = min(20, availableCapital / 5000)
Total Score = sum of all factors (max 100)`}
                </code>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">RPIC Calculations</h3>
          <div className="space-y-4 mb-6">
            <div>
              <p className="font-semibold mb-2">Adjusted Monthly Passive Income</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  Adjusted = Target × Lifestyle Multiplier × Geography Multiplier
                </code>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Annual RPIC</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">Annual RPIC = Adjusted Monthly × 12</code>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Required Capital</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  {`Hybrid: Capital = Annual RPIC / 0.12
Traditional: Capital = Annual RPIC / 0.04`}
                </code>
              </div>
            </div>
            <div>
              <p className="font-semibold mb-2">Years to Goal (Future Value Formula)</p>
              <div className="bg-muted p-3 rounded-lg">
                <code className="text-sm">
                  {`FV = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]
Solve for n, then: Years = n / 12`}
                </code>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Capital Allocation Waterfall</h3>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <code className="text-sm">
              {`1. availableCapital = liquidAssets - emergencyFund
2. highInterestDebtBuffer = highInterestDebt × 0.5
3. capitalAfterDebtBuffer = availableCapital - highInterestDebtBuffer
4. allocableCapital = max(0, capitalAfterDebtBuffer)
5. recommendedStart = min(allocableCapital × 0.2, 5000)`}
            </code>
          </div>
        </section>

        {/* 8. User Flow */}
        <section id="user-flow" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">8. Typical User Flow</h2>

          <h3 className="text-2xl font-semibold mb-4">First Time (Onboarding)</h3>
          <ol className="list-decimal pl-6 mb-6 space-y-3">
            <li>
              <strong>Command Center - Data Intake</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>User loads data via Sample Data, Mock Connect, Upload Files, or Manual Entry</li>
                <li>System validates and processes data</li>
                <li>FinancialSnapshot is created and persisted in localStorage</li>
              </ul>
            </li>
            <li>
              <strong>Dashboard - Net Worth Overview</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>User sees their consolidated net worth</li>
                <li>Reviews asset and liability distribution</li>
                <li>Identifies liquid assets and available capital</li>
              </ul>
            </li>
            <li>
              <strong>Budget Analyzer - 50/30/20 Analysis</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>System automatically classifies transactions</li>
                <li>User sees current distribution vs 50/30/20 target</li>
                <li>Identifies improvement areas and quick wins</li>
                <li>Can filter transactions by Type, Category, Subcategory, Account, Date</li>
              </ul>
            </li>
            <li>
              <strong>Investments - Readiness Assessment</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Completes Readiness Score (5 factors)</li>
                <li>Reviews asset optimization opportunities</li>
                <li>Selects active investment strategy</li>
                <li>Starts paper trading if appropriate</li>
              </ul>
            </li>
            <li>
              <strong>Goals - RPIC Planning</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Answers 3 key questions (Target Income, Lifestyle, Geography)</li>
                <li>Confirms or adjusts monthly expense baseline</li>
                <li>System calculates required RPIC and timeline</li>
                <li>User sees visual roadmap with milestones</li>
              </ul>
            </li>
          </ol>

          <h3 className="text-2xl font-semibold mb-4">Returning User</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Dashboard automatically loads persisted data</li>
            <li>User can update data in Command Center</li>
            <li>Reviews progress in Budget Analyzer (period filters: 30/60/90 days)</li>
            <li>Updates paper trading progress in Investments</li>
            <li>Adjusts assumptions in Goals based on life changes</li>
            <li>Can reset all data with "New Analysis" at any time</li>
          </ul>
        </section>

        {/* 9. Glossary */}
        <section id="glossary" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">9. Glossary of Terms</h2>

          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-lg mb-1">50/30/20 Rule</dt>
              <dd className="text-muted-foreground">
                Budgeting rule suggesting allocation of 50% of income to needs, 30% to wants, and 20% to savings/investments.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Asset Allocation</dt>
              <dd className="text-muted-foreground">
                Distribution of investments across different asset classes (stocks, bonds, real estate, etc.).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Debt-to-Income Ratio (DTI)</dt>
              <dd className="text-muted-foreground">
                Percentage of monthly income allocated to debt payments. Lower DTI indicates better financial health.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Emergency Fund</dt>
              <dd className="text-muted-foreground">
                Cash reserve equivalent to 3-6 months of expenses for unexpected emergencies.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Liquid Assets</dt>
              <dd className="text-muted-foreground">
                Assets that can be quickly converted to cash without significant loss of value (cash, stocks, bonds).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Net Worth</dt>
              <dd className="text-muted-foreground">
                Total value of all assets minus all liabilities. Primary metric of financial health.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Operational Income</dt>
              <dd className="text-muted-foreground">
                Real income (salaries, investments, freelance) excluding internal transfers, refunds, and asset sales.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Paper Trading</dt>
              <dd className="text-muted-foreground">
                Trading simulation with virtual money to practice strategies without real financial risk.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Readiness Score</dt>
              <dd className="text-muted-foreground">
                0-100 score evaluating a user's readiness for active investments based on 5 key factors.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">RPIC (Retirement Passive Income Capital)</dt>
              <dd className="text-muted-foreground">
                Total capital needed to generate sufficient passive income for retirement without depleting principal.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">RPIC Index</dt>
              <dd className="text-muted-foreground">
                Progress percentage toward target RPIC. RPIC Index = (Current Capital / Target RPIC) × 100.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Subcategory</dt>
              <dd className="text-muted-foreground">
                Detailed transaction classification (groceries, transportation, healthcare, etc.) that maps to main categories (Need/Want/Saving).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Waterfall Logic</dt>
              <dd className="text-muted-foreground">
                Sequential calculation process where each step depends on the result of the previous one (used in capital allocation).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Wealth OS Hybrid Approach</dt>
              <dd className="text-muted-foreground">
                Strategy combining traditional passive investments with active investments to achieve ~12% annual returns, requiring 67% less capital than traditional approaches.
              </dd>
            </div>
          </dl>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rockwell Wealth OS. Technical System Documentation.</p>
          <p className="mt-2">Generated on {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Documentation;
