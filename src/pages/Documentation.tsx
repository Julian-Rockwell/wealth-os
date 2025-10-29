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
          <h1 className="text-2xl font-bold">Documentación del Sistema</h1>
          <div className="flex gap-2">
            <Button onClick={handlePrint} variant="outline">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir / Guardar PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Documentation content */}
      <div className="container max-w-4xl py-8 prose prose-slate dark:prose-invert max-w-none">
        {/* Cover Page */}
        <div className="text-center mb-16 page-break-after">
          <h1 className="text-5xl font-bold mb-4">Rockwell Wealth OS</h1>
          <h2 className="text-3xl text-muted-foreground mb-8">Documentación Técnica del Sistema</h2>
          <p className="text-xl text-muted-foreground">
            Plataforma Integral de Gestión Financiera Personal
          </p>
          <div className="mt-16">
            <p className="text-sm text-muted-foreground">Versión 1.0</p>
            <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="mb-12 page-break-after">
          <h2 className="text-3xl font-bold mb-6">Índice de Contenidos</h2>
          <nav className="space-y-2">
            <a href="#overview" className="block text-primary hover:underline">1. Descripción General del Sistema</a>
            <a href="#architecture" className="block text-primary hover:underline ml-4">1.1 Arquitectura y Flujo de Datos</a>
            <a href="#tech-stack" className="block text-primary hover:underline ml-4">1.2 Stack Tecnológico</a>
            <a href="#command-center" className="block text-primary hover:underline">2. Command Center - Ingesta de Datos</a>
            <a href="#dashboard" className="block text-primary hover:underline">3. Dashboard - Vista de Patrimonio Neto</a>
            <a href="#budget" className="block text-primary hover:underline">4. Budget Analyzer - Análisis 50/30/20</a>
            <a href="#classification" className="block text-primary hover:underline ml-4">4.1 Sistema de Clasificación de Transacciones</a>
            <a href="#calculation" className="block text-primary hover:underline ml-4">4.2 Flujo de Cálculo 50/30/20</a>
            <a href="#visualizations" className="block text-primary hover:underline ml-4">4.3 Visualizaciones y Componentes</a>
            <a href="#investments" className="block text-primary hover:underline">5. Investment Planning - Preparación para Inversión Activa</a>
            <a href="#goals" className="block text-primary hover:underline">6. Goals - Calculadora RPIC</a>
            <a href="#formulas" className="block text-primary hover:underline">7. Cálculos y Fórmulas Clave</a>
            <a href="#user-flow" className="block text-primary hover:underline">8. Flujo de Usuario Típico</a>
            <a href="#glossary" className="block text-primary hover:underline">9. Glosario de Términos</a>
          </nav>
        </div>

        {/* 1. System Overview */}
        <section id="overview" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">1. Descripción General del Sistema</h2>
          
          <h3 className="text-2xl font-semibold mb-4">Propósito</h3>
          <p className="mb-4">
            Rockwell Wealth OS es una plataforma integral de gestión financiera personal diseñada para ayudar a los usuarios a:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Visualizar y analizar su patrimonio neto consolidado</li>
            <li>Evaluar y optimizar su presupuesto usando la regla 50/30/20</li>
            <li>Planificar y prepararse para inversiones activas</li>
            <li>Calcular objetivos de independencia financiera (RPIC)</li>
            <li>Tomar decisiones financieras informadas basadas en datos reales</li>
          </ul>

          <h3 id="architecture" className="text-2xl font-semibold mb-4">1.1 Arquitectura y Flujo de Datos</h3>
          <p className="mb-4">
            El sistema utiliza una arquitectura de contexto centralizado (<code>FinancialDataContext</code>) que gestiona todo el estado financiero de la aplicación:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>FinancialSnapshot</strong>: Datos completos del usuario (activos, pasivos, transacciones)</li>
            <li><strong>DashboardData</strong>: Datos procesados para visualizaciones del dashboard</li>
            <li><strong>PaperTradingProgress</strong>: Estado del progreso de paper trading</li>
            <li><strong>RpicResult</strong>: Resultados de cálculos RPIC</li>
          </ul>
          <p className="mb-4">
            Los datos se persisten localmente usando <code>localStorage</code> y se comparten entre todos los módulos mediante React Context API.
          </p>

          <h3 id="tech-stack" className="text-2xl font-semibold mb-4">1.2 Stack Tecnológico</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Frontend Core</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>React 18</strong>: Librería de UI con hooks y componentes funcionales</li>
              <li><strong>TypeScript</strong>: Tipado estático para mayor seguridad</li>
              <li><strong>Vite</strong>: Build tool moderno y rápido</li>
              <li><strong>React Router v6</strong>: Navegación entre páginas</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Estado y Datos</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Context API</strong>: Gestión de estado global</li>
              <li><strong>localStorage</strong>: Persistencia de datos del lado del cliente</li>
              <li><strong>React Hooks</strong>: useState, useEffect, useContext, useMemo</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">UI/UX</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Tailwind CSS</strong>: Framework de utilidades CSS</li>
              <li><strong>shadcn/ui</strong>: Componentes UI accesibles y personalizables</li>
              <li><strong>Radix UI</strong>: Primitivos de componentes sin estilos</li>
              <li><strong>Lucide React</strong>: Iconos modernos</li>
              <li><strong>Recharts</strong>: Gráficos y visualizaciones de datos</li>
            </ul>
          </div>
        </section>

        {/* 2. Command Center */}
        <section id="command-center" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">2. Command Center - Ingesta de Datos</h2>
          <p className="mb-4">
            El Command Center es el punto de entrada para cargar datos financieros al sistema. Soporta múltiples métodos de ingesta:
          </p>

          <h3 className="text-2xl font-semibold mb-4">Métodos de Ingesta</h3>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">1. Sample Data</h4>
            <p className="mb-2">Carga datos de demostración predefinidos para explorar el sistema.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Datos sintéticos realistas de cuentas, inversiones y transacciones</li>
              <li>Útil para demos y pruebas</li>
              <li>Ubicación: <code>src/utils/sampleData.ts</code></li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">2. Mock Connect</h4>
            <p className="mb-2">Simula una conexión a instituciones financieras.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Genera datos aleatorios de múltiples cuentas</li>
              <li>Incluye checking, savings, credit cards, loans, investments</li>
              <li>Transacciones de los últimos 90 días</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">3. Upload Files (PDF/CSV/XLSX)</h4>
            <p className="mb-2">Permite cargar estados de cuenta en múltiples formatos.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>PDF</strong>: Extracción de texto con validación de formato</li>
              <li><strong>CSV</strong>: Parsing directo con detección automática de columnas</li>
              <li><strong>XLSX</strong>: Lectura de hojas de cálculo Excel</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">4. Manual Entry</h4>
            <p className="mb-2">Formulario para ingresar datos manualmente.</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Campos validados para cuentas, balances y transacciones</li>
              <li>Útil para ajustes o datos de fuentes no digitales</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Validación de Datos</h3>
          <p className="mb-4">
            Todos los datos ingresados pasan por validación:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Verificación de tipos de datos (números, fechas, strings)</li>
            <li>Validación de rangos (balances positivos/negativos según tipo)</li>
            <li>Detección de duplicados por ID único</li>
            <li>Notificaciones de errores con toast messages</li>
          </ul>
        </section>

        {/* 3. Dashboard */}
        <section id="dashboard" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">3. Dashboard - Vista de Patrimonio Neto</h2>
          <p className="mb-4">
            El Dashboard proporciona una vista consolidada del patrimonio neto del usuario, desglosando activos por clase y liquidez.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Cálculos Principales</h3>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Net Worth (Patrimonio Neto)</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Net Worth = Total Assets - Total Liabilities</code>
            </div>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Total Assets incluye: cash, inversiones, propiedades, otros activos</li>
              <li>Total Liabilities incluye: hipotecas, préstamos, tarjetas de crédito, otras deudas</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Liquid Assets (Activos Líquidos)</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Liquid Assets = Cash + Investments (stocks, bonds, mutual funds, ETFs)</code>
            </div>
            <p className="mb-4">Activos que pueden convertirse rápidamente en efectivo sin pérdida significativa de valor.</p>

            <h4 className="text-xl font-semibold mb-3">Emergency Fund (Fondo de Emergencia)</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Emergency Fund = Liquid Assets × 0.30</code>
            </div>
            <p className="mb-4">30% de los activos líquidos se reserva como fondo de emergencia (3-6 meses de gastos).</p>

            <h4 className="text-xl font-semibold mb-3">Available to Invest (Disponible para Invertir)</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>Available to Invest = Liquid Assets - Emergency Fund</code>
            </div>
            <p className="mb-4">Capital disponible para inversiones después de asegurar el fondo de emergencia.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Componentes Visuales</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Asset Allocation View</strong>: Gráfico de pastel mostrando distribución de activos</li>
            <li><strong>Holdings Table</strong>: Tabla detallada de todas las cuentas e inversiones</li>
            <li><strong>Liabilities Table</strong>: Tabla de todas las deudas y pasivos</li>
            <li><strong>KPI Panel</strong>: Tarjetas con métricas clave (Net Worth, Liquid Assets, etc.)</li>
          </ul>
        </section>

        {/* 4. Budget Analyzer */}
        <section id="budget" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">4. Budget Analyzer - Análisis 50/30/20</h2>
          <p className="mb-4">
            El Budget Analyzer evalúa la salud financiera del usuario aplicando la regla 50/30/20:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>50% Necesidades</strong>: Gastos esenciales (vivienda, alimentación, transporte, servicios)</li>
            <li><strong>30% Deseos</strong>: Gastos discrecionales (entretenimiento, compras, hobbies)</li>
            <li><strong>20% Ahorros</strong>: Inversiones, pagos de deuda, fondos de emergencia</li>
          </ul>

          <h3 id="classification" className="text-2xl font-semibold mb-4">4.1 Sistema de Clasificación de Transacciones</h3>
          <p className="mb-4">
            El sistema utiliza un clasificador automático (<code>transactionClassifier.ts</code>) que categoriza cada transacción basándose en palabras clave y patrones.
          </p>

          <h4 className="text-xl font-semibold mb-3">Filtrado de Ingresos Operacionales</h4>
          <p className="mb-4">
            La función <code>isValidIncome()</code> identifica ingresos reales, excluyendo movimientos no operacionales:
          </p>
          <div className="mb-4">
            <p className="font-semibold mb-2">Ingresos Válidos (INCLUIDOS):</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Payroll / Salarios</li>
              <li>Investment Income (dividendos, intereses)</li>
              <li>Gig/Freelance Income</li>
            </ul>
            <p className="font-semibold mb-2">Movimientos Excluidos (NO SON INGRESOS):</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Internal Transfers (transferencias entre cuentas propias)</li>
              <li>Credit Card Payments</li>
              <li>Refunds / Reembolsos</li>
              <li>Asset Sales (venta de activos)</li>
            </ul>
          </div>

          <h4 className="text-xl font-semibold mb-3">Clasificación de Gastos</h4>
          <p className="mb-4">
            La función <code>mapSubcategoryToCategory()</code> mapea subcategorías a las tres categorías principales:
          </p>
          <div className="mb-4">
            <p className="font-semibold mb-2">Needs (50% - Necesidades):</p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li>housing, utilities, internet, phone</li>
              <li>groceries, food_delivery</li>
              <li>gas, public_transit, car_maintenance, parking, tolls</li>
              <li>insurance (health, car, home, life)</li>
              <li>healthcare, pharmacy, medical</li>
              <li>childcare, education, tuition</li>
              <li>minimum_debt_payment</li>
            </ul>

            <p className="font-semibold mb-2">Wants (30% - Deseos):</p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li>restaurants, bars, coffee_shops</li>
              <li>entertainment, streaming, subscriptions</li>
              <li>shopping, clothing, personal_care</li>
              <li>travel, vacation, hotels</li>
              <li>hobbies, sports, gym_membership</li>
              <li>pet_care (no esencial)</li>
            </ul>

            <p className="font-semibold mb-2">Savings (20% - Ahorros):</p>
            <ul className="list-disc pl-6 mb-3 space-y-1 text-sm">
              <li>investment, brokerage, retirement_contribution</li>
              <li>savings_transfer</li>
              <li>extra_debt_payment (por encima del mínimo)</li>
              <li>emergency_fund</li>
            </ul>
          </div>

          <h3 id="calculation" className="text-2xl font-semibold mb-4 page-break-before">4.2 Flujo de Cálculo 50/30/20</h3>
          <p className="mb-4">
            El cálculo se realiza en el componente <code>BudgetDonut.tsx</code> siguiendo estos pasos:
          </p>
          
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Paso 1: Filtrado por Período</h4>
            <p className="mb-2">Las transacciones se filtran según el período seleccionado (30, 60 o 90 días).</p>

            <h4 className="text-xl font-semibold mb-3">Paso 2: Clasificación Operacional</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>filterOperationalTransactions(filteredTransactions)</code>
            </div>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Separa débitos (gastos) y créditos (ingresos)</li>
              <li>Aplica <code>isValidIncome()</code> para filtrar solo ingresos reales</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Paso 3: Cálculo de Ingreso Neto Real</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code>totalIncome = sum(operationalCredits.map(txn =&gt; txn.amount))</code>
            </div>
            <p className="mb-4">Si <code>totalIncome &lt; $500</code>, se muestra una advertencia de ingreso insuficiente.</p>

            <h4 className="text-xl font-semibold mb-3">Paso 4: Clasificación de Gastos</h4>
            <p className="mb-2">Los débitos operacionales se categorizan:</p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`needs = sum(expenses where category === "need")
wants = sum(expenses where category === "want")
savings = sum(expenses where category === "saving")`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Paso 5: Cálculo de Porcentajes</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`needsPct = (needs / totalIncome) × 100
wantsPct = (wants / totalIncome) × 100
savingsPct = (savings / totalIncome) × 100`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Paso 6: Validación 50/30/20</h4>
            <p className="mb-2">La función <code>validate50_30_20()</code> verifica:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Needs ≤ 50%</li>
              <li>Wants ≤ 30%</li>
              <li>Savings ≥ 20%</li>
            </ul>
            <p className="mb-4">Genera alertas específicas si no se cumplen los objetivos.</p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Corrección: Average Monthly Income</h3>
          <p className="mb-4">
            En <code>useDashboardData.ts</code>, el cálculo de <code>avgIncomeAmount</code> fue corregido:
          </p>
          <div className="bg-muted p-4 rounded-lg mb-4">
            <code className="text-sm">
              {`// ANTES (INCORRECTO): dividía por número de transacciones
avgIncomeAmount = totalValidIncome / validIncomeTransactions.length

// AHORA (CORRECTO): divide por número de meses en el período
avgIncomeAmount = totalValidIncome / period.months`}
            </code>
          </div>

          <h3 id="visualizations" className="text-2xl font-semibold mb-4 page-break-before">4.3 Visualizaciones y Componentes</h3>
          
          <h4 className="text-xl font-semibold mb-3">BudgetDonut</h4>
          <p className="mb-4">
            Gráfico de dona circular mostrando la distribución 50/30/20 con:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Gradiente cónico con colores diferenciados por categoría</li>
            <li>Porcentajes y montos para cada categoría</li>
            <li>Indicadores visuales de cumplimiento (✓ o ⚠)</li>
            <li>Tooltip explicativo de la regla 50/30/20</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">MonthlyStackedBars</h4>
          <p className="mb-4">
            Gráfico de barras apiladas mostrando la evolución mensual de:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Needs (verde)</li>
            <li>Wants (azul)</li>
            <li>Savings (morado)</li>
            <li>Incluye <strong>InfoTooltip</strong> explicando qué es el "Monthly Breakdown"</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">KeyInsights</h4>
          <p className="mb-4">
            Tarjetas de insights destacando:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Positive Trend</strong>: Tendencias favorables en el presupuesto (con <strong>InfoTooltip</strong> explicativo)</li>
            <li><strong>Red Flag</strong>: Alertas de gastos excesivos (con <strong>InfoTooltip</strong> explicativo)</li>
            <li><strong>Quick Win</strong>: Oportunidades inmediatas de ahorro</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">TransactionsList / TransactionsTable</h4>
          <p className="mb-4">
            Lista/tabla detallada de todas las transacciones con filtros:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Date Range</strong>: Rango de fechas personalizado</li>
            <li><strong>Type</strong>: Income, Expense, Transfer</li>
            <li><strong>Category</strong>: Need, Want, Saving</li>
            <li><strong>Subcategory</strong>: housing, groceries, transportation, healthcare, etc. (nuevo filtro agregado)</li>
            <li><strong>Account</strong>: Filtro por cuenta específica</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">FiltersCard</h4>
          <p className="mb-4">
            Panel de filtros actualizado con el nuevo filtro de <strong>Subcategory</strong> que permite ver transacciones específicas como:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Groceries (Comestibles)</li>
            <li>Transportation (Transporte)</li>
            <li>Healthcare (Salud)</li>
            <li>Housing (Vivienda)</li>
            <li>Y muchas más subcategorías...</li>
          </ul>
        </section>

        {/* 5. Investments */}
        <section id="investments" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">5. Investment Planning - Preparación para Inversión Activa</h2>
          <p className="mb-4">
            El módulo de Investments guía al usuario a través de un proceso paso a paso para determinar su preparación para inversiones activas.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Paso 1: Readiness Score (Puntuación de Preparación)</h3>
          <p className="mb-4">
            Evalúa 5 factores clave:
          </p>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">1. Emergency Fund Status</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`emergencyFund = liquidAssets × 0.30
score = (emergencyFund / (monthlyExpenses × 6)) × 20
max score = 20 puntos`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">2. Debt-to-Income Ratio</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`DTI = (totalDebtPayments / monthlyIncome) × 100
score = max(0, 20 - (DTI - 20) / 2)
max score = 20 puntos`}
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
max score = 20 puntos`}
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

          <h3 className="text-2xl font-semibold mb-4">Paso 2: Optimize Assets</h3>
          <p className="mb-4">
            Identifica oportunidades para liberar capital:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Equity Opportunities</strong>: Activos que podrían venderse o refinanciarse</li>
            <li><strong>Debt Payoff Scenarios</strong>: Simulaciones de pago de deudas de alto interés</li>
            <li>Muestra el impacto en disponibilidad de capital</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Paso 3: Strategy Selection</h3>
          <p className="mb-4">
            Presenta estrategias de inversión activa:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Long-term Holdings (LEAP options, wheel strategy)</li>
            <li>Cash-Secured Puts</li>
            <li>Swing Trading</li>
            <li>Income Generation (covered calls, cash-secured puts)</li>
          </ul>
          <p className="mb-4">
            Cada estrategia incluye descripción, riesgo, retorno esperado y capital mínimo requerido.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Paso 4: Paper Trading</h3>
          <p className="mb-4">
            Simulación de trading con requisitos específicos de gates:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li><strong>Gate 1</strong>: Completar 40+ trades simulados</li>
            <li><strong>Gate 2</strong>: 95%+ adherencia al plan de trading</li>
            <li><strong>Gate 3</strong>: 70%+ completitud del checklist pre-trade</li>
          </ul>
          <p className="mb-4">
            El usuario debe pasar todas las gates antes de recibir recomendación de capital real.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Paso 5: Capital Allocation</h3>
          <p className="mb-4">
            Lógica de waterfall para determinar capital asignable:
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
          <h2 className="text-3xl font-bold mb-6">6. Goals - Calculadora RPIC</h2>
          <p className="mb-4">
            El módulo Goals ayuda a los usuarios a calcular su <strong>Retirement Passive Income Capital (RPIC)</strong>, el capital necesario para generar ingresos pasivos suficientes para la jubilación.
          </p>

          <h3 className="text-2xl font-semibold mb-4">Inputs del Usuario (3 Preguntas)</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">1. Target Monthly Passive Income</h4>
            <p className="mb-2">¿Cuánto deseas ganar mensualmente en pasivos al jubilarte?</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Input numérico en dólares</li>
              <li>Típicamente basado en gastos mensuales actuales</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">2. Lifestyle Multiplier</h4>
            <p className="mb-2">¿Cómo esperas que cambie tu estilo de vida?</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>0.7x: Downsize (reducción de gastos)</li>
              <li>1.0x: Same (igual que ahora) - <strong>Corregido: value="1"</strong></li>
              <li>1.3x: Upgrade (aumento de gastos)</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">3. Geography Multiplier</h4>
            <p className="mb-2">¿Dónde planeas vivir?</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>0.5x: Lower cost area (área de bajo costo)</li>
              <li>1.0x: Same location (mismo lugar) - <strong>Corregido: value="1"</strong></li>
              <li>1.5x: Higher cost area (área de alto costo)</li>
            </ul>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Cálculo de RPIC</h3>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Paso 1: Ajustar Ingreso Objetivo</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`adjustedMonthlyIncome = targetMonthly × lifestyle × geography`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Paso 2: RPIC Anualizado</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`annualRPIC = adjustedMonthlyIncome × 12`}
              </code>
            </div>

            <h4 className="text-xl font-semibold mb-3">Paso 3: Capital Requerido</h4>
            <p className="mb-4">Se calculan dos escenarios:</p>
            
            <p className="font-semibold mb-2">A. Wealth OS Hybrid Approach</p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`assumedReturn = 12% (combinación de inversiones activas/pasivas)
capitalRequired = annualRPIC / 0.12`}
              </code>
            </div>

            <p className="font-semibold mb-2">B. Traditional Passive Approach</p>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`assumedReturn = 4% (regla del 4% tradicional)
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
              El enfoque Wealth OS Hybrid requiere 67% menos capital que el tradicional debido a los mayores retornos proyectados.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Cálculo de Timeline</h3>
          <p className="mb-4">
            ¿Cuántos años tomará alcanzar el RPIC objetivo?
          </p>
          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3">Inputs Adicionales</h4>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li><strong>Starting Capital</strong>: Capital inicial disponible</li>
              <li><strong>Monthly Contribution</strong>: Aporte mensual hacia el objetivo</li>
              <li><strong>Expected Annual Return</strong>: Retorno anual esperado (%)</li>
            </ul>

            <h4 className="text-xl font-semibold mb-3">Fórmula de Valor Futuro</h4>
            <div className="bg-muted p-4 rounded-lg mb-4">
              <code className="text-sm">
                {`FV = PV × (1 + r)^n + PMT × [((1 + r)^n - 1) / r]

Donde:
- FV = Future Value (capitalRequired)
- PV = Present Value (startingCapital)
- PMT = Monthly Contribution (monthlyContribution)
- r = Monthly Return (annualReturn / 12)
- n = Number of months (what we solve for)

Resolviendo para n:
yearsToGoal = n / 12`}
              </code>
            </div>

            <p className="mb-4">
              Si el objetivo no es alcanzable con los parámetros actuales (retorna años muy altos o negativos), se muestra una alerta sugerente:
            </p>
            <div className="bg-amber-100 dark:bg-amber-900/20 border border-amber-500 p-4 rounded-lg mb-4">
              <p className="text-foreground text-sm">
                "With current parameters, you'd reach RPIC in X years, exceeding your Y-year goal. Consider increasing monthly contributions or adjusting return assumptions."
              </p>
            </div>
            <p className="mb-4">
              <strong>Corrección aplicada:</strong> El texto de esta alerta ahora usa <code>text-foreground</code> (negro) en lugar de <code>text-warning-foreground</code> (blanco) para mejor visibilidad.
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4">Visualizaciones</h3>
          
          <h4 className="text-xl font-semibold mb-3">Required Capital Table</h4>
          <p className="mb-4">
            Tabla comparativa mostrando:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Capital requerido para cada enfoque (Hybrid vs Traditional)</li>
            <li>Gap de capital (diferencia con capital actual)</li>
            <li>Años hasta alcanzar objetivo</li>
            <li>Eficiencia de capital (ahorro del enfoque Hybrid)</li>
          </ul>

          <h4 className="text-xl font-semibold mb-3">Visual Roadmap</h4>
          <p className="mb-4">
            Timeline visual con milestones:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Emergency Fund Secured</li>
            <li>Debt-Free</li>
            <li>First $100K Invested</li>
            <li>Half-Way to RPIC</li>
            <li>RPIC Goal Reached</li>
          </ul>
          <p className="mb-4">
            Cada milestone muestra fecha estimada de logro y progreso actual.
          </p>

          <h4 className="text-xl font-semibold mb-3">RPIC Result Card</h4>
          <p className="mb-4">
            Resumen ejecutivo mostrando:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>RPIC anualizado ajustado</li>
            <li>Capital requerido (ambos enfoques)</li>
            <li>Ahorro de capital (Hybrid vs Traditional)</li>
            <li>RPIC Index (progreso como porcentaje)</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4">Corrección: Expense Baseline Card</h3>
          <p className="mb-4">
            <strong>Issue identificado:</strong> El botón "Yes, this reflects my lifestyle" no funcionaba correctamente, y el estado de edición no se manejaba bien.
          </p>
          <p className="mb-4">
            <strong>Corrección aplicada:</strong>
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>El botón "Yes, this reflects my lifestyle" ahora confirma correctamente el <code>autoMonthlyExpenses</code> y llama a <code>onExpensesConfirmed(autoMonthlyExpenses)</code></li>
            <li>Ambos botones ("Yes" y "Adjust") se muestran siempre cuando hay datos disponibles</li>
            <li>El flujo de edición ahora es consistente: guardar actualiza el valor y sale del modo de edición</li>
          </ul>
        </section>

        {/* 7. Key Calculations */}
        <section id="formulas" className="mb-12 page-break-before">
          <h2 className="text-3xl font-bold mb-6">7. Cálculos y Fórmulas Clave</h2>
          <p className="mb-4">
            Resumen consolidado de todas las fórmulas utilizadas en el sistema:
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
          <h2 className="text-3xl font-bold mb-6">8. Flujo de Usuario Típico</h2>

          <h3 className="text-2xl font-semibold mb-4">Primera Vez (Onboarding)</h3>
          <ol className="list-decimal pl-6 mb-6 space-y-3">
            <li>
              <strong>Command Center - Data Intake</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Usuario carga datos vía Sample Data, Mock Connect, Upload Files, o Manual Entry</li>
                <li>Sistema valida y procesa los datos</li>
                <li>FinancialSnapshot se crea y persiste en localStorage</li>
              </ul>
            </li>
            <li>
              <strong>Dashboard - Net Worth Overview</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Usuario ve su patrimonio neto consolidado</li>
                <li>Revisa distribución de activos y pasivos</li>
                <li>Identifica activos líquidos y capital disponible</li>
              </ul>
            </li>
            <li>
              <strong>Budget Analyzer - 50/30/20 Analysis</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Sistema clasifica automáticamente transacciones</li>
                <li>Usuario ve distribución actual vs objetivo 50/30/20</li>
                <li>Identifica áreas de mejora y quick wins</li>
                <li>Puede filtrar transacciones por Type, Category, Subcategory, Account, Date</li>
              </ul>
            </li>
            <li>
              <strong>Investments - Readiness Assessment</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Completa Readiness Score (5 factores)</li>
                <li>Revisa oportunidades de optimización de activos</li>
                <li>Selecciona estrategia de inversión activa</li>
                <li>Comienza paper trading si es apropiado</li>
              </ul>
            </li>
            <li>
              <strong>Goals - RPIC Planning</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Responde 3 preguntas clave (Target Income, Lifestyle, Geography)</li>
                <li>Confirma o ajusta baseline de gastos mensuales</li>
                <li>Sistema calcula RPIC requerido y timeline</li>
                <li>Usuario ve roadmap visual con milestones</li>
              </ul>
            </li>
          </ol>

          <h3 className="text-2xl font-semibold mb-4">Usuario Recurrente</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Dashboard carga automáticamente datos persistidos</li>
            <li>Usuario puede actualizar datos en Command Center</li>
            <li>Revisa progreso en Budget Analyzer (filtros de período: 30/60/90 días)</li>
            <li>Actualiza paper trading progress en Investments</li>
            <li>Ajusta assumptions en Goals según cambios de vida</li>
            <li>Puede resetear todos los datos con "New Analysis" en cualquier momento</li>
          </ul>
        </section>

        {/* 9. Glossary */}
        <section id="glossary" className="mb-12">
          <h2 className="text-3xl font-bold mb-6">9. Glosario de Términos</h2>

          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-lg mb-1">50/30/20 Rule</dt>
              <dd className="text-muted-foreground">
                Regla de presupuesto que sugiere asignar 50% del ingreso a necesidades, 30% a deseos, y 20% a ahorros/inversiones.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Asset Allocation</dt>
              <dd className="text-muted-foreground">
                Distribución de inversiones entre diferentes clases de activos (acciones, bonos, real estate, etc.).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Debt-to-Income Ratio (DTI)</dt>
              <dd className="text-muted-foreground">
                Porcentaje del ingreso mensual que se destina a pagos de deuda. DTI bajo indica mejor salud financiera.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Emergency Fund</dt>
              <dd className="text-muted-foreground">
                Reserva de efectivo equivalente a 3-6 meses de gastos para emergencias imprevistas.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Liquid Assets</dt>
              <dd className="text-muted-foreground">
                Activos que pueden convertirse rápidamente en efectivo sin pérdida significativa de valor (cash, acciones, bonos).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Net Worth</dt>
              <dd className="text-muted-foreground">
                Valor total de todos los activos menos todos los pasivos. Métrica principal de salud financiera.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Operational Income</dt>
              <dd className="text-muted-foreground">
                Ingresos reales (salarios, inversiones, freelance) excluyendo transferencias internas, reembolsos, y ventas de activos.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Paper Trading</dt>
              <dd className="text-muted-foreground">
                Simulación de trading con dinero virtual para practicar estrategias sin riesgo financiero real.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Readiness Score</dt>
              <dd className="text-muted-foreground">
                Puntuación de 0-100 que evalúa la preparación de un usuario para inversiones activas basada en 5 factores clave.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">RPIC (Retirement Passive Income Capital)</dt>
              <dd className="text-muted-foreground">
                Capital total necesario para generar ingresos pasivos suficientes para la jubilación sin agotar el principal.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">RPIC Index</dt>
              <dd className="text-muted-foreground">
                Porcentaje de progreso hacia el RPIC objetivo. RPIC Index = (Current Capital / Target RPIC) × 100.
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Subcategory</dt>
              <dd className="text-muted-foreground">
                Clasificación detallada de transacciones (groceries, transportation, healthcare, etc.) que se mapea a categorías principales (Need/Want/Saving).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Waterfall Logic</dt>
              <dd className="text-muted-foreground">
                Proceso secuencial de cálculo donde cada paso depende del resultado del anterior (usado en capital allocation).
              </dd>
            </div>

            <div>
              <dt className="font-semibold text-lg mb-1">Wealth OS Hybrid Approach</dt>
              <dd className="text-muted-foreground">
                Estrategia que combina inversiones pasivas tradicionales con inversiones activas para lograr retornos del ~12% anual, requiriendo 67% menos capital que enfoques tradicionales.
              </dd>
            </div>
          </dl>
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Rockwell Wealth OS. Documentación Técnica del Sistema.</p>
          <p className="mt-2">Generado el {new Date().toLocaleString()}</p>
        </footer>
      </div>
    </div>
  );
};

export default Documentation;
