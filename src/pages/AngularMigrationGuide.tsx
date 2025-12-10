import { Button } from "@/components/ui/button";
import { FileDown, Printer, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AngularMigrationGuide = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Print/Download controls - hidden when printing */}
      <div className="print:hidden sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/documentation">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Docs
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Angular Migration Guide</h1>
          </div>
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
          <h1 className="text-5xl font-bold mb-4">React to Angular</h1>
          <h2 className="text-3xl text-muted-foreground mb-8">Migration Guide for Rockwell Wealth OS</h2>
          <p className="text-xl text-muted-foreground">
            Complete Technical Documentation for Framework Conversion
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
            <a href="#introduction" className="block text-primary hover:underline">1. Introduction & Prerequisites</a>
            <a href="#architecture" className="block text-primary hover:underline">2. Architecture Mapping</a>
            <a href="#architecture" className="block text-primary hover:underline ml-4">2.1 Project Structure Comparison</a>
            <a href="#architecture" className="block text-primary hover:underline ml-4">2.2 State Management (Context → Services)</a>
            <a href="#architecture" className="block text-primary hover:underline ml-4">2.3 Routing Comparison</a>
            <a href="#reusable" className="block text-primary hover:underline">3. Directly Reusable Code</a>
            <a href="#reusable" className="block text-primary hover:underline ml-4">3.1 TypeScript Types (100% Compatible)</a>
            <a href="#reusable" className="block text-primary hover:underline ml-4">3.2 Utility Functions (100% Compatible)</a>
            <a href="#reusable" className="block text-primary hover:underline ml-4">3.3 Constants & Configuration</a>
            <a href="#state" className="block text-primary hover:underline">4. State Management Migration</a>
            <a href="#state" className="block text-primary hover:underline ml-4">4.1 FinancialDataContext → FinancialDataService</a>
            <a href="#state" className="block text-primary hover:underline ml-4">4.2 BehaviorSubject Pattern</a>
            <a href="#state" className="block text-primary hover:underline ml-4">4.3 localStorage Persistence</a>
            <a href="#components" className="block text-primary hover:underline">5. Component Migration</a>
            <a href="#components" className="block text-primary hover:underline ml-4">5.1 UI Library Mapping (shadcn → Angular Material)</a>
            <a href="#components" className="block text-primary hover:underline ml-4">5.2 Component Conversion Pattern</a>
            <a href="#components" className="block text-primary hover:underline ml-4">5.3 Hooks → Services/Directives</a>
            <a href="#forms" className="block text-primary hover:underline">6. Forms Migration</a>
            <a href="#forms" className="block text-primary hover:underline ml-4">6.1 react-hook-form → Reactive Forms</a>
            <a href="#forms" className="block text-primary hover:underline ml-4">6.2 Zod → Class-validator</a>
            <a href="#charts" className="block text-primary hover:underline">7. Charts Migration</a>
            <a href="#charts" className="block text-primary hover:underline ml-4">7.1 Recharts → ngx-charts</a>
            <a href="#charts" className="block text-primary hover:underline ml-4">7.2 Chart Configuration Mapping</a>
            <a href="#features" className="block text-primary hover:underline">8. Feature-by-Feature Migration</a>
            <a href="#features" className="block text-primary hover:underline ml-4">8.1 Dashboard / Net Worth</a>
            <a href="#features" className="block text-primary hover:underline ml-4">8.2 Budget Analyzer</a>
            <a href="#features" className="block text-primary hover:underline ml-4">8.3 Strategy Assessment & Broker Setup</a>
            <a href="#features" className="block text-primary hover:underline ml-4">8.4 Twin-Engine Projection</a>
            <a href="#features" className="block text-primary hover:underline ml-4">8.5 Optimize Assets</a>
            <a href="#styling" className="block text-primary hover:underline">9. Styling Migration</a>
            <a href="#styling" className="block text-primary hover:underline ml-4">9.1 Tailwind CSS in Angular</a>
            <a href="#styling" className="block text-primary hover:underline ml-4">9.2 CSS Variables & Theming</a>
            <a href="#checklist" className="block text-primary hover:underline">10. Migration Checklist</a>
          </nav>
        </div>

        {/* 1. Introduction */}
        <section id="introduction" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">1. Introduction & Prerequisites</h2>
          
          <h3 className="text-2xl font-semibold mb-4">Purpose of This Guide</h3>
          <p className="mb-4">
            This document provides a comprehensive technical guide for converting the Rockwell Wealth OS application 
            from React to Angular. It maps React concepts to their Angular equivalents and identifies code that can 
            be directly reused without modification.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Prerequisites</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Angular Project Setup</h4>
            <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
              <code className="block whitespace-pre-wrap">
{`# Create new Angular project
ng new rockwell-wealth-os --routing --style=scss

# Install required dependencies
npm install @angular/material @angular/cdk
npm install @swimlane/ngx-charts d3
npm install tailwindcss postcss autoprefixer
npm install class-validator class-transformer

# Initialize Tailwind
npx tailwindcss init`}
              </code>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">React Source Structure</h3>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`src/
├── components/          # React components
│   ├── dashboard/       # Dashboard-specific components
│   ├── goals/           # Goals/Projection components
│   ├── investments/     # Investment planning components
│   └── ui/              # shadcn/ui components
├── contexts/            # React Context providers
├── hooks/               # Custom React hooks
├── pages/               # Page-level components
├── types/               # TypeScript type definitions ✅ REUSABLE
├── utils/               # Utility functions ✅ REUSABLE
└── constants/           # Static configuration ✅ REUSABLE`}
            </code>
          </div>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <p className="text-sm">
              <strong>Key Insight:</strong> Approximately 30-40% of the codebase (types, utils, constants) 
              can be directly copied to Angular without any modifications.
            </p>
          </div>
        </section>

        {/* 2. Architecture Mapping */}
        <section id="architecture" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">2. Architecture Mapping</h2>

          <h3 className="text-2xl font-semibold mb-4">2.1 Project Structure Comparison</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">React (Current)</th>
                  <th className="border border-border px-4 py-2 text-left">Angular (Target)</th>
                  <th className="border border-border px-4 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/components/</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/app/components/</td>
                  <td className="border border-border px-4 py-2">Convert to Angular components</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/contexts/</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/app/services/</td>
                  <td className="border border-border px-4 py-2">Context → Injectable Services</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/hooks/</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/app/services/</td>
                  <td className="border border-border px-4 py-2">Hooks → Services or Directives</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/pages/</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/app/pages/</td>
                  <td className="border border-border px-4 py-2">Page components with routing</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/types/</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/app/types/</td>
                  <td className="border border-border px-4 py-2">✅ Copy directly (100% compatible)</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/utils/</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/app/utils/</td>
                  <td className="border border-border px-4 py-2">✅ Copy directly (100% compatible)</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/constants/</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">src/app/constants/</td>
                  <td className="border border-border px-4 py-2">✅ Copy directly (100% compatible)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold mb-4">2.2 State Management (Context → Services)</h3>
          <p className="mb-4">
            React Context API maps directly to Angular Injectable Services with RxJS BehaviorSubjects:
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">React Concept</th>
                  <th className="border border-border px-4 py-2 text-left">Angular Equivalent</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">createContext()</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">@Injectable({'{providedIn: "root"}'})</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">useContext()</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">constructor injection</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">useState()</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">BehaviorSubject&lt;T&gt;</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">useEffect()</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">ngOnInit / ngOnChanges / RxJS pipe</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">useMemo()</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">RxJS pipe with shareReplay()</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">useCallback()</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">Regular method (no equivalent needed)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold mb-4">2.3 Routing Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">React Router</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/goals" element={<Goals />} />
  </Routes>
</BrowserRouter>

// Navigation
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/dashboard');`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Angular Router</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// app-routing.module.ts
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'goals', component: GoalsComponent }
];

// Navigation
import { Router } from '@angular/router';
constructor(private router: Router) {}
this.router.navigate(['/dashboard']);`}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Directly Reusable Code */}
        <section id="reusable" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">3. Directly Reusable Code</h2>
          <p className="mb-4">
            The following files can be copied directly to the Angular project without any modifications. 
            They contain pure TypeScript with no framework-specific dependencies.
          </p>

          <h3 className="text-2xl font-semibold mb-4">3.1 TypeScript Types (100% Compatible)</h3>
          <p className="mb-4">Copy these files to <code className="bg-muted px-1 py-0.5 rounded">src/app/types/</code>:</p>
          
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">src/types/financial.ts</h4>
            <p className="text-sm mb-2">Core financial data structures:</p>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li><code>AccountType</code>, <code>AssetClass</code>, <code>Liquidity</code> - Union type enums</li>
              <li><code>Account</code>, <code>Holding</code>, <code>Liability</code> - Data interfaces</li>
              <li><code>StagingTransaction</code> - Transaction processing</li>
              <li><code>FinancialSnapshot</code> - Complete user financial state</li>
              <li><code>IngestSummary</code> - Data import statistics</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">src/types/trading.ts</h4>
            <p className="text-sm mb-2">Trading and investment types:</p>
            <ul className="list-disc pl-6 text-sm space-y-1">
              <li><code>PaperTrade</code>, <code>TradingChecklist</code> - Paper trading structures</li>
              <li><code>TradingStrategy</code>, <code>PermissionLevel</code> - Strategy enums</li>
              <li><code>StrategyAlignmentMatrix</code>, <code>StrategyMatchResult</code> - Assessment logic</li>
              <li><code>BrokerSetup</code>, <code>BrokerSetupProgress</code> - Wizard state</li>
              <li><code>DerivedBrokerRequirements</code> - Calculated requirements</li>
            </ul>
          </div>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">src/types/dashboard.ts</h4>
            <p className="text-sm mb-2">Dashboard visualization types (copy entirely)</p>
          </div>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">src/types/sixMonthPlan.ts</h4>
            <p className="text-sm mb-2">Plan generation interfaces (copy entirely)</p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">3.2 Utility Functions (100% Compatible)</h3>
          <p className="mb-4">Copy these files to <code className="bg-muted px-1 py-0.5 rounded">src/app/utils/</code>:</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">File</th>
                  <th className="border border-border px-4 py-2 text-left">Purpose</th>
                  <th className="border border-border px-4 py-2 text-left">Key Functions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">transactionClassifier.ts</td>
                  <td className="border border-border px-4 py-2">50/30/20 categorization</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">classifyTransactions(), isValidIncome()</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">investmentCalculations.ts</td>
                  <td className="border border-border px-4 py-2">Investment metrics</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">calculateReadinessScore(), calculateEquityOpportunities()</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">twinEngineCalculations.ts</td>
                  <td className="border border-border px-4 py-2">Projection model</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">calculateTwinEngineProjection()</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">rpicCalculations.ts</td>
                  <td className="border border-border px-4 py-2">RPIC metrics</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">calculateRpic()</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">sixMonthPlanGenerator.ts</td>
                  <td className="border border-border px-4 py-2">Plan generation</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">generateSixMonthPlan()</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">deriveRequirements.ts</td>
                  <td className="border border-border px-4 py-2">Broker requirements</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">deriveRequirementsFromStrategies()</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">strategyAlignmentMatrix.ts</td>
                  <td className="border border-border px-4 py-2">Strategy matching</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">STRATEGY_ALIGNMENT_MATRIX</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">brokerRequirements.ts</td>
                  <td className="border border-border px-4 py-2">Broker data</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">BROKERS, filterCompatibleBrokers()</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">snapshotHelpers.ts</td>
                  <td className="border border-border px-4 py-2">Data aggregation</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">Various helper functions</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold mb-4">3.3 Constants & Configuration</h3>
          <p className="mb-4">Copy to <code className="bg-muted px-1 py-0.5 rounded">src/app/constants/</code>:</p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><code>src/constants/permissions.ts</code> - Permission levels and descriptions</li>
            <li><code>src/constants/strategies.ts</code> - Strategy definitions and metadata</li>
          </ul>

          <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
            <p className="text-sm">
              <strong>Migration Effort:</strong> These files represent approximately 2,500+ lines of tested business logic 
              that can be reused immediately. This includes all financial calculations, classification algorithms, 
              and projection models.
            </p>
          </div>
        </section>

        {/* 4. State Management Migration */}
        <section id="state" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">4. State Management Migration</h2>

          <h3 className="text-2xl font-semibold mb-4">4.1 FinancialDataContext → FinancialDataService</h3>
          <p className="mb-4">
            The React Context <code className="bg-muted px-1 py-0.5 rounded">FinancialDataContext</code> should be converted 
            to an Angular Injectable Service with BehaviorSubjects:
          </p>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">React Context (Original)</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// src/contexts/FinancialDataContext.tsx
export const FinancialDataContext = createContext<FinancialDataContextType | null>(null);

export const FinancialDataProvider = ({ children }) => {
  const [snapshot, setSnapshot] = useState<FinancialSnapshot | null>(() => {
    const saved = localStorage.getItem('financialSnapshot');
    return saved ? JSON.parse(saved) : null;
  });

  const [brokerSetup, setBrokerSetup] = useState<BrokerSetup>(() => {
    const saved = localStorage.getItem('brokerSetup');
    return saved ? JSON.parse(saved) : defaultBrokerSetup;
  });

  // ... more state

  return (
    <FinancialDataContext.Provider value={{ snapshot, setSnapshot, brokerSetup, setBrokerSetup }}>
      {children}
    </FinancialDataContext.Provider>
  );
};

export const useFinancialData = () => {
  const context = useContext(FinancialDataContext);
  if (!context) throw new Error('Must be used within FinancialDataProvider');
  return context;
};`}
                </code>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Angular Service (Converted)</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// src/app/services/financial-data.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FinancialSnapshot, BrokerSetup } from '../types';

@Injectable({ providedIn: 'root' })
export class FinancialDataService {
  // BehaviorSubjects for reactive state
  private snapshotSubject = new BehaviorSubject<FinancialSnapshot | null>(
    this.loadFromStorage('financialSnapshot')
  );
  private brokerSetupSubject = new BehaviorSubject<BrokerSetup>(
    this.loadFromStorage('brokerSetup') || this.defaultBrokerSetup
  );

  // Public observables
  snapshot$: Observable<FinancialSnapshot | null> = this.snapshotSubject.asObservable();
  brokerSetup$: Observable<BrokerSetup> = this.brokerSetupSubject.asObservable();

  // Current value getters
  get snapshot(): FinancialSnapshot | null { return this.snapshotSubject.getValue(); }
  get brokerSetup(): BrokerSetup { return this.brokerSetupSubject.getValue(); }

  // Setters with persistence
  setSnapshot(snapshot: FinancialSnapshot | null): void {
    this.snapshotSubject.next(snapshot);
    this.saveToStorage('financialSnapshot', snapshot);
  }

  setBrokerSetup(setup: BrokerSetup): void {
    this.brokerSetupSubject.next(setup);
    this.saveToStorage('brokerSetup', setup);
  }

  // localStorage helpers
  private loadFromStorage<T>(key: string): T | null {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  }

  private saveToStorage(key: string, data: any): void {
    if (data === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  private defaultBrokerSetup: BrokerSetup = {
    chosenBroker: null,
    accountType: null,
    targetOptionsLevel: 0,
    wizardStep: 1,
    progress: { openAccount: false, funded: false, optionsSubmitted: false, optionsApproved: false, connected: false },
    notes: []
  };
}`}
                </code>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">4.2 Component Usage Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">React Component</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// React - using Context
import { useFinancialData } from '@/contexts/FinancialDataContext';

const Dashboard = () => {
  const { snapshot, brokerSetup, setBrokerSetup } = useFinancialData();

  const handleUpdate = () => {
    setBrokerSetup({ ...brokerSetup, wizardStep: 2 });
  };

  return (
    <div>
      {snapshot && <NetWorth data={snapshot} />}
    </div>
  );
};`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Angular Component</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// Angular - using Service
import { FinancialDataService } from '../services/financial-data.service';

@Component({
  selector: 'app-dashboard',
  template: \`
    <app-net-worth 
      *ngIf="snapshot$ | async as snapshot" 
      [data]="snapshot">
    </app-net-worth>
  \`
})
export class DashboardComponent {
  snapshot$ = this.financialData.snapshot$;
  brokerSetup$ = this.financialData.brokerSetup$;

  constructor(private financialData: FinancialDataService) {}

  handleUpdate(): void {
    const current = this.financialData.brokerSetup;
    this.financialData.setBrokerSetup({ ...current, wizardStep: 2 });
  }
}`}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Component Migration */}
        <section id="components" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">5. Component Migration</h2>

          <h3 className="text-2xl font-semibold mb-4">5.1 UI Library Mapping (shadcn → Angular Material)</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">shadcn/ui (React)</th>
                  <th className="border border-border px-4 py-2 text-left">Angular Material</th>
                  <th className="border border-border px-4 py-2 text-left">Import</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Button&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;button mat-raised-button&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatButtonModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Card&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;mat-card&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatCardModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Dialog&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatDialog.open()</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatDialogModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Tabs&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;mat-tab-group&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatTabsModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Select&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;mat-select&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatSelectModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Input&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;input matInput&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatInputModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Table&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;mat-table&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatTableModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Progress&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;mat-progress-bar&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatProgressBarModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Slider&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;mat-slider&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatSliderModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Switch&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;mat-slide-toggle&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatSlideToggleModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Accordion&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;mat-accordion&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatExpansionModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Tooltip&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">[matTooltip]</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatTooltipModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;Badge&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">[matBadge]</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatBadgeModule</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">toast / Sonner</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatSnackBar.open()</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatSnackBarModule</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold mb-4">5.2 Component Conversion Pattern</h3>
          <p className="mb-4">Follow this pattern to convert React functional components to Angular:</p>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">React Component</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// src/components/dashboard/NetWorthKPI.tsx
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import type { FinancialSnapshot } from '@/types/financial';

interface NetWorthKPIProps {
  snapshot: FinancialSnapshot;
}

export const NetWorthKPI = ({ snapshot }: NetWorthKPIProps) => {
  const { netWorth, trend } = useMemo(() => {
    const assets = snapshot.holdings.reduce((sum, h) => sum + h.balance, 0);
    const liabilities = snapshot.liabilities.reduce((sum, l) => sum + l.balance, 0);
    const net = assets - liabilities;
    const trend = snapshot.trends.d30.pct;
    return { netWorth: net, trend };
  }, [snapshot]);

  const isPositive = trend >= 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Net Worth
          {isPositive ? <TrendingUp className="text-green-500" /> : <TrendingDown className="text-red-500" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold">\${netWorth.toLocaleString()}</p>
        <p className={\`text-sm \${isPositive ? 'text-green-500' : 'text-red-500'}\`}>
          {isPositive ? '+' : ''}{trend.toFixed(1)}% (30d)
        </p>
      </CardContent>
    </Card>
  );
};`}
                </code>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Angular Component</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// src/app/components/dashboard/net-worth-kpi/net-worth-kpi.component.ts
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FinancialSnapshot } from '../../../types/financial';

@Component({
  selector: 'app-net-worth-kpi',
  templateUrl: './net-worth-kpi.component.html',
  styleUrls: ['./net-worth-kpi.component.scss']
})
export class NetWorthKpiComponent implements OnChanges {
  @Input() snapshot!: FinancialSnapshot;

  netWorth: number = 0;
  trend: number = 0;
  isPositive: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['snapshot'] && this.snapshot) {
      this.calculateValues();
    }
  }

  private calculateValues(): void {
    const assets = this.snapshot.holdings.reduce((sum, h) => sum + h.balance, 0);
    const liabilities = this.snapshot.liabilities.reduce((sum, l) => sum + l.balance, 0);
    this.netWorth = assets - liabilities;
    this.trend = this.snapshot.trends.d30.pct;
    this.isPositive = this.trend >= 0;
  }
}

// net-worth-kpi.component.html
<mat-card>
  <mat-card-header>
    <mat-card-title class="flex items-center gap-2">
      Net Worth
      <lucide-icon *ngIf="isPositive" name="trending-up" class="text-green-500"></lucide-icon>
      <lucide-icon *ngIf="!isPositive" name="trending-down" class="text-red-500"></lucide-icon>
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <p class="text-3xl font-bold">\{{ netWorth | currency }}</p>
    <p [ngClass]="isPositive ? 'text-green-500' : 'text-red-500'" class="text-sm">
      {{ isPositive ? '+' : '' }}{{ trend | number:'1.1-1' }}% (30d)
    </p>
  </mat-card-content>
</mat-card>`}
                </code>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">5.3 Hooks → Services/Directives</h3>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">React Hook</th>
                  <th className="border border-border px-4 py-2 text-left">Angular Equivalent</th>
                  <th className="border border-border px-4 py-2 text-left">Implementation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">useMobile()</td>
                  <td className="border border-border px-4 py-2">BreakpointObserver Service</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">@angular/cdk/layout</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">useToast()</td>
                  <td className="border border-border px-4 py-2">SnackBar Service</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">MatSnackBar</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">useDashboardData()</td>
                  <td className="border border-border px-4 py-2">DashboardDataService</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">Injectable service with BehaviorSubject</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">React useMobile Hook</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// src/hooks/use-mobile.tsx
export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => 
      setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}`}
                </code>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">Angular BreakpointObserver</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// src/app/services/responsive.service.ts
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Injectable({ providedIn: 'root' })
export class ResponsiveService {
  isMobile$ = this.breakpoint
    .observe([Breakpoints.Handset])
    .pipe(map(result => result.matches));

  constructor(private breakpoint: BreakpointObserver) {}
}

// Usage in component
@Component({ ... })
export class MyComponent {
  isMobile$ = this.responsive.isMobile$;
  constructor(private responsive: ResponsiveService) {}
}`}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Forms Migration */}
        <section id="forms" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">6. Forms Migration</h2>

          <h3 className="text-2xl font-semibold mb-4">6.1 react-hook-form → Reactive Forms</h3>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">React Hook Form</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// React with react-hook-form + zod
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  capitalLevel: z.string().min(1, 'Required'),
  riskLevel: z.string().min(1, 'Required'),
  timeLevel: z.string().min(1, 'Required'),
  experienceLevel: z.string().min(1, 'Required'),
});

type FormData = z.infer<typeof schema>;

const StrategyAssessment = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { capitalLevel: '', riskLevel: '', timeLevel: '', experienceLevel: '' }
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <select {...form.register('capitalLevel')}>
        <option value="">Select capital level</option>
        <option value="1">Less than $10,000</option>
        <option value="2">$10,000 - $25,000</option>
      </select>
      {form.formState.errors.capitalLevel && (
        <span className="text-red-500">{form.formState.errors.capitalLevel.message}</span>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};`}
                </code>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Angular Reactive Forms</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// Angular with Reactive Forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-strategy-assessment',
  template: \`
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <mat-form-field>
        <mat-label>Capital Level</mat-label>
        <mat-select formControlName="capitalLevel">
          <mat-option value="">Select capital level</mat-option>
          <mat-option value="1">Less than $10,000</mat-option>
          <mat-option value="2">$10,000 - $25,000</mat-option>
        </mat-select>
        <mat-error *ngIf="form.get('capitalLevel')?.hasError('required')">
          Required
        </mat-error>
      </mat-form-field>
      
      <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">
        Submit
      </button>
    </form>
  \`
})
export class StrategyAssessmentComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      capitalLevel: ['', Validators.required],
      riskLevel: ['', Validators.required],
      timeLevel: ['', Validators.required],
      experienceLevel: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}`}
                </code>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">6.2 Zod → Class-validator (Optional)</h3>
          <p className="mb-4">
            For complex validation scenarios, you can use <code className="bg-muted px-1 py-0.5 rounded">class-validator</code>:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            <code className="block whitespace-pre-wrap">
{`// src/app/models/strategy-assessment.model.ts
import { IsNotEmpty, IsIn } from 'class-validator';

export class StrategyAssessmentDto {
  @IsNotEmpty({ message: 'Capital level is required' })
  @IsIn(['1', '2', '3', '4', '5'], { message: 'Invalid capital level' })
  capitalLevel: string;

  @IsNotEmpty({ message: 'Risk level is required' })
  @IsIn(['1', '2', '3', '4', '5'], { message: 'Invalid risk level' })
  riskLevel: string;

  // ... more fields
}`}
            </code>
          </div>
        </section>

        {/* 7. Charts Migration */}
        <section id="charts" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">7. Charts Migration</h2>

          <h3 className="text-2xl font-semibold mb-4">7.1 Recharts → ngx-charts</h3>
          <p className="mb-4">
            The application uses Recharts for data visualization. The recommended Angular equivalent is 
            <code className="bg-muted px-1 py-0.5 rounded">@swimlane/ngx-charts</code>:
          </p>

          <div className="overflow-x-auto mb-6">
            <table className="min-w-full border-collapse border border-border">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-2 text-left">Recharts Component</th>
                  <th className="border border-border px-4 py-2 text-left">ngx-charts Component</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;LineChart&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;ngx-charts-line-chart&gt;</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;BarChart&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;ngx-charts-bar-vertical&gt;</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;PieChart&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;ngx-charts-pie-chart&gt;</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;AreaChart&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;ngx-charts-area-chart&gt;</td>
                </tr>
                <tr>
                  <td className="border border-border px-4 py-2 font-mono text-sm">&lt;ReferenceLine&gt;</td>
                  <td className="border border-border px-4 py-2 font-mono text-sm">[referenceLines] input</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl font-semibold mb-4">7.2 Twin-Engine Chart Conversion</h3>
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold mb-2">React Recharts</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// TwinEngineChart.tsx (React)
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ReferenceLine, ResponsiveContainer } from 'recharts';

const TwinEngineChart = ({ data, settings, milestones }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <XAxis dataKey="year" />
        <YAxis tickFormatter={(v) => \`$\${(v/1000).toFixed(0)}k\`} />
        <Tooltip formatter={(v) => \`$\${v.toLocaleString()}\`} />
        <Legend />
        
        <Line type="monotone" dataKey="activeBalance" stroke="#3b82f6" name="Active Trading" />
        <Line type="monotone" dataKey="passiveBalance" stroke="#22c55e" name="Passive Income" />
        <Line type="monotone" dataKey="traditionalBalance" stroke="#6b7280" strokeDasharray="5 5" name="Traditional" />
        
        {milestones.freedomYear && (
          <ReferenceLine x={milestones.freedomYear} stroke="#22c55e" strokeDasharray="3 3" />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
};`}
                </code>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Angular ngx-charts</h4>
              <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                <code className="block whitespace-pre-wrap">
{`// twin-engine-chart.component.ts (Angular)
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-twin-engine-chart',
  template: \`
    <ngx-charts-line-chart
      [view]="[800, 400]"
      [results]="chartData"
      [xAxis]="true"
      [yAxis]="true"
      [legend]="true"
      [showXAxisLabel]="true"
      [showYAxisLabel]="true"
      [xAxisLabel]="'Year'"
      [yAxisLabel]="'Balance'"
      [yAxisTickFormatting]="formatYAxis"
      [referenceLines]="referenceLines"
      [showRefLines]="true"
      [scheme]="colorScheme">
    </ngx-charts-line-chart>
  \`
})
export class TwinEngineChartComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() milestones: any;

  chartData: any[] = [];
  referenceLines: any[] = [];
  
  colorScheme = {
    domain: ['#3b82f6', '#22c55e', '#6b7280']
  };

  ngOnChanges(): void {
    this.transformData();
    this.updateReferenceLines();
  }

  private transformData(): void {
    // ngx-charts requires specific data format
    this.chartData = [
      {
        name: 'Active Trading',
        series: this.data.map(d => ({ name: d.year, value: d.activeBalance }))
      },
      {
        name: 'Passive Income',
        series: this.data.map(d => ({ name: d.year, value: d.passiveBalance }))
      },
      {
        name: 'Traditional',
        series: this.data.map(d => ({ name: d.year, value: d.traditionalBalance }))
      }
    ];
  }

  private updateReferenceLines(): void {
    this.referenceLines = [];
    if (this.milestones?.freedomYear) {
      this.referenceLines.push({
        name: 'Wealth OS Freedom',
        value: this.milestones.freedomYear
      });
    }
  }

  formatYAxis = (value: number): string => {
    return '$' + (value / 1000).toFixed(0) + 'k';
  };
}`}
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Feature-by-Feature Migration */}
        <section id="features" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">8. Feature-by-Feature Migration</h2>

          <h3 className="text-2xl font-semibold mb-4">8.1 Dashboard / Net Worth</h3>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Components to Convert:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>NetWorthKPICard.tsx</code> → <code>net-worth-kpi-card.component.ts</code></li>
              <li><code>AssetsKPICard.tsx</code> → <code>assets-kpi-card.component.ts</code></li>
              <li><code>LiabilitiesKPICard.tsx</code> → <code>liabilities-kpi-card.component.ts</code></li>
              <li><code>HoldingsTable.tsx</code> → <code>holdings-table.component.ts</code> (use mat-table)</li>
              <li><code>LiabilitiesTable.tsx</code> → <code>liabilities-table.component.ts</code></li>
              <li><code>AssetAllocationView.tsx</code> → <code>asset-allocation-view.component.ts</code> (use ngx-charts pie)</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Reusable Logic (copy directly):</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>snapshotHelpers.ts</code> - All aggregation functions</li>
              <li>Type definitions from <code>financial.ts</code></li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">8.2 Budget Analyzer</h3>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Components to Convert:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>BudgetOverviewCard.tsx</code> → <code>budget-overview-card.component.ts</code></li>
              <li><code>BudgetDonut.tsx</code> → <code>budget-donut.component.ts</code> (use ngx-charts advanced-pie-chart)</li>
              <li><code>MonthlyStackedBars.tsx</code> → <code>monthly-stacked-bars.component.ts</code></li>
              <li><code>TransactionsList.tsx</code> → <code>transactions-list.component.ts</code></li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Reusable Logic (copy directly):</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>transactionClassifier.ts</code> - Complete classification algorithm</li>
              <li><code>classifyTransactions()</code>, <code>isValidIncome()</code>, <code>mapSubcategoryToCategory()</code></li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">8.3 Strategy Assessment & Broker Setup</h3>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Components to Convert:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>StrategySelection.tsx</code> → <code>strategy-selection.component.ts</code></li>
              <li><code>ReadinessScore.tsx</code> → <code>readiness-score.component.ts</code></li>
              <li><code>BrokerSetupWizard.tsx</code> → <code>broker-setup-wizard.component.ts</code> (use MatStepper)</li>
              <li>Wizard steps: <code>Step1ChooseBroker</code> through <code>Step5Connect</code></li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Reusable Logic (copy directly):</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>strategyAlignmentMatrix.ts</code> - Complete matrix and scoring</li>
              <li><code>deriveRequirements.ts</code> - <code>deriveRequirementsFromStrategies()</code></li>
              <li><code>brokerRequirements.ts</code> - Broker data and filtering</li>
              <li><code>investmentCalculations.ts</code> - <code>calculateReadinessScore()</code></li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">8.4 Twin-Engine Projection</h3>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Components to Convert:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>TwinEngineSettingsPanel.tsx</code> → <code>twin-engine-settings-panel.component.ts</code></li>
              <li><code>TwinEngineChart.tsx</code> → <code>twin-engine-chart.component.ts</code></li>
              <li><code>TwinEngineTable.tsx</code> → <code>twin-engine-table.component.ts</code></li>
              <li><code>TwinEngineKPIHeader.tsx</code> → <code>twin-engine-kpi-header.component.ts</code></li>
              <li><code>LifestyleRoadmapView.tsx</code> → <code>lifestyle-roadmap-view.component.ts</code></li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Reusable Logic (copy directly):</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>twinEngineCalculations.ts</code> - Complete projection engine</li>
              <li><code>calculateTwinEngineProjection()</code> - Core algorithm</li>
              <li><code>TwinEngineSettings</code>, <code>TwinEngineRow</code> interfaces</li>
              <li>All milestone detection and KPI formulas</li>
            </ul>
            <div className="bg-green-50 border-l-4 border-green-400 p-3 mt-4">
              <p className="text-sm">
                <strong>Note:</strong> The Twin-Engine calculation file (~800 lines) contains all projection logic 
                and can be copied without modification. This is the most complex reusable module.
              </p>
            </div>
          </div>

          <h3 className="text-2xl font-semibold mb-4">8.5 Optimize Assets</h3>
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h4 className="font-semibold mb-2">Components to Convert:</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>OptimizeAssets.tsx</code> → <code>optimize-assets.component.ts</code></li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Reusable Logic (copy directly):</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><code>investmentCalculations.ts</code>:</li>
              <li className="ml-4"><code>calculateEquityOpportunities()</code> - HELOC analysis</li>
              <li className="ml-4"><code>calculateHighInterestDebt()</code> - Debt optimization</li>
              <li className="ml-4"><code>calculateDebtPayoffAmortization()</code> - Payoff scenarios</li>
            </ul>
          </div>
        </section>

        {/* 9. Styling Migration */}
        <section id="styling" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">9. Styling Migration</h2>

          <h3 className="text-2xl font-semibold mb-4">9.1 Tailwind CSS in Angular</h3>
          <p className="mb-4">
            Tailwind CSS works identically in Angular. Install and configure:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`// tailwind.config.js (Angular)
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... copy all from React tailwind.config.ts
      }
    }
  },
  plugins: [],
}`}
            </code>
          </div>

          <h3 className="text-2xl font-semibold mb-4">9.2 CSS Variables & Theming</h3>
          <p className="mb-4">
            Copy the CSS variables from <code className="bg-muted px-1 py-0.5 rounded">src/index.css</code> 
            to Angular's <code className="bg-muted px-1 py-0.5 rounded">src/styles.scss</code>:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-6">
            <code className="block whitespace-pre-wrap">
{`/* src/styles.scss (Angular) */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --ring: 221.2 83.2% 53.3%;
  --radius: 0.5rem;
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}`}
            </code>
          </div>
        </section>

        {/* 10. Migration Checklist */}
        <section id="checklist" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">10. Migration Checklist</h2>

          <div className="space-y-6">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Phase 1: Project Setup</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Create Angular project with routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Install Angular Material</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Install ngx-charts</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Configure Tailwind CSS</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Copy CSS variables to styles.scss</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Phase 2: Copy Reusable Code</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Copy src/types/ → src/app/types/</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Copy src/utils/ → src/app/utils/</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Copy src/constants/ → src/app/constants/</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Verify TypeScript compilation (no errors)</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Phase 3: Core Services</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Create FinancialDataService</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Implement BehaviorSubject state management</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Add localStorage persistence</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Create ResponsiveService (replace useMobile)</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Phase 4: Feature Modules</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Dashboard Module (Net Worth, KPIs, Tables)</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Budget Module (Analyzer, Charts, Transactions)</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Investments Module (Strategy, Broker Wizard, Optimize)</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Goals Module (RPIC, Twin-Engine, Lifestyle)</span>
                </li>
              </ul>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Phase 5: Testing & Validation</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Verify all calculations match React version</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Test localStorage persistence</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Validate chart rendering</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Test responsive behavior</span>
                </li>
                <li className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4" disabled />
                  <span>Cross-browser testing</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
            <h4 className="font-semibold mb-2">Estimated Migration Effort</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li><strong>Phase 1-2:</strong> 1-2 days (setup + copy reusable code)</li>
              <li><strong>Phase 3:</strong> 2-3 days (core services)</li>
              <li><strong>Phase 4:</strong> 10-15 days (feature modules)</li>
              <li><strong>Phase 5:</strong> 3-5 days (testing)</li>
              <li><strong>Total:</strong> ~3-4 weeks for full migration</li>
            </ul>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rockwell Wealth OS - Angular Migration Guide</p>
          <p className="mt-2">Generated on {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  );
};

export default AngularMigrationGuide;
