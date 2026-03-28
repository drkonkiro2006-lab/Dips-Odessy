import { useParams, Link } from "react-router-dom"
import { useState, useRef, useMemo, useCallback } from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { Download, Calculator, Info, Wallet, PieChart, ShieldCheck, Briefcase, User } from "lucide-react"

import itrImg from "../assets/images/service-itr.jpg"
import gstRegImg from "../assets/images/service-gst-registration.jpg"

/* =========================
   TAX CALCULATION UTIL
   ========================= */

const toNumber = (val) => Number(val) || 0

const computeTax = (form) => {
  let incomeFromITR = 0;
  
  if (form.itrType === "itr1") {
    incomeFromITR = toNumber(form.salary);
  } else {
    // ITR-4 Presumptive Logic
    const turnover = toNumber(form.turnover);
    if (form.presumptiveType === "business") {
      const profitPercent = Math.max(6, Math.min(8, toNumber(form.profitPercent) || 8));
      incomeFromITR = turnover * (profitPercent / 100);
    } else {
      // Professional 44ADA is fixed at 50%
      incomeFromITR = turnover * 0.50;
    }
  }

  const otherIncome = toNumber(form.otherIncome)
  let stdDeduction = form.regime === "new" ? 75000 : 50000
  
  // Standard deduction only applies to Salary (ITR-1)
  const appliedStdDeduction = form.itrType === "itr1" ? stdDeduction : 0;
  let grossIncomeAfterStd = Math.max(0, incomeFromITR + otherIncome - appliedStdDeduction)

  let deductionsTotal = 0
  if (form.regime === "old") {
    deductionsTotal =
      Math.min(toNumber(form.deductions80C), 150000) +
      Math.min(toNumber(form.deductions80D), 100000) +
      toNumber(form.hra) +
      Math.min(toNumber(form.homeLoanInterest), 200000) +
      Math.min(toNumber(form.nps), 50000)
  }

  let taxableIncome = Math.max(0, grossIncomeAfterStd - deductionsTotal)
  let tax = 0

  // Budget 2026 Slabs (New) & Old Slabs Logic
  if (form.regime === "new") {
    if (taxableIncome <= 400000) tax = 0
    else if (taxableIncome <= 800000) tax = (taxableIncome - 400000) * 0.05
    else if (taxableIncome <= 1200000) tax = 20000 + (taxableIncome - 800000) * 0.1
    else if (taxableIncome <= 1600000) tax = 60000 + (taxableIncome - 1200000) * 0.15
    else if (taxableIncome <= 2000000) tax = 120000 + (taxableIncome - 1600000) * 0.2
    else if (taxableIncome <= 2400000) tax = 200000 + (taxableIncome - 2000000) * 0.25
    else tax = 300000 + (taxableIncome - 2400000) * 0.3

    if (taxableIncome <= 1200000) tax = Math.max(0, tax - 60000)
  } else {
    let basicExemption = form.age === "60to80" ? 300000 : form.age === "above80" ? 500000 : 250000
    if (taxableIncome <= basicExemption) tax = 0
    else if (taxableIncome <= 500000) tax = (taxableIncome - basicExemption) * 0.05
    else if (taxableIncome <= 1000000) tax = (500000 - basicExemption) * 0.05 + (taxableIncome - 500000) * 0.2
    else tax = (500000 - basicExemption) * 0.05 + 100000 + (taxableIncome - 1000000) * 0.3

    if (taxableIncome <= 500000) tax = Math.max(0, tax - 12500)
  }

  const surcharge = taxableIncome > 5000000 ? tax * 0.10 : 0 // Simplified surcharge
  const cess = (tax + surcharge) * 0.04

  return {
    grossTotal: incomeFromITR + otherIncome,
    incomeFromITR,
    stdDeduction: appliedStdDeduction,
    deductionsTotal,
    taxableIncome,
    baseTax: tax,
    surcharge,
    cess,
    totalTax: tax + surcharge + cess,
  }
}

function IncomeTaxCalculator() {
  const [form, setForm] = useState({
    itrType: "itr1", // "itr1" or "itr4"
    regime: "new",
    age: "below60",
    salary: "",
    turnover: "",
    presumptiveType: "business", // "business" (44AD) or "professional" (44ADA)
    profitPercent: "8",
    otherIncome: "",
    deductions80C: "",
    deductions80D: "",
    hra: "",
    homeLoanInterest: "",
    nps: "",
  })

  const reportRef = useRef()
  const result = useMemo(() => computeTax(form), [form])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const downloadReport = async () => {
    const element = reportRef.current
    const canvas = await html2canvas(element, { scale: 2, backgroundColor: "#ffffff" })
    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save(`Tax_Report_${form.itrType.toUpperCase()}.pdf`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-4 md:p-8 transition-colors">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Configuration */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-600 rounded-2xl shadow-indigo-500/20 shadow-lg">
              <Calculator className="text-white w-6 h-6" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Tax Planner</h1>
          </div>

          <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 p-6 rounded-3xl shadow-xl space-y-6">
            
            {/* ITR TYPE TOGGLE */}
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase mb-3 block">Choose Return Type</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button onClick={() => setForm(p => ({ ...p, itrType: "itr1" }))} className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${form.itrType === "itr1" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-slate-500"}`}>
                  <User size={16}/> ITR-1 (Salary)
                </button>
                <button onClick={() => setForm(p => ({ ...p, itrType: "itr4" }))} className={`flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-bold transition-all ${form.itrType === "itr4" ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400" : "text-slate-500"}`}>
                  <Briefcase size={16}/> ITR-4 (Business)
                </button>
              </div>
            </div>

            {/* REGIME TOGGLE */}
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button onClick={() => setForm(p => ({ ...p, regime: "new" }))} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${form.regime === "new" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 dark:text-slate-400"}`}>
                New Regime (2026)
              </button>
              <button onClick={() => setForm(p => ({ ...p, regime: "old" }))} className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${form.regime === "old" ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 dark:text-slate-400"}`}>
                Old Regime
              </button>
            </div>

            <div className="space-y-4">
              {form.itrType === "itr1" ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Annual Gross Salary</label>
                    <input type="number" name="salary" value={form.salary} onChange={handleChange} placeholder="Enter Salary" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 p-4 bg-indigo-50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/50">
                   <div className="space-y-1">
                    <label className="text-xs font-bold text-indigo-600 uppercase">Nature of Income</label>
                    <select name="presumptiveType" value={form.presumptiveType} onChange={handleChange} className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm font-bold">
                      <option value="business">Business (Sec 44AD)</option>
                      <option value="professional">Professional (Sec 44ADA)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Gross Turnover / Receipts</label>
                    <input type="number" name="turnover" value={form.turnover} onChange={handleChange} placeholder="Enter Turnover" className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  {form.presumptiveType === "business" && (
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 flex justify-between">Profit Percentage <span>{form.profitPercent}%</span></label>
                      <input type="range" name="profitPercent" min="6" max="25" step="0.5" value={form.profitPercent} onChange={handleChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                      <p className="text-[10px] text-slate-400 italic mt-1">*Min 6% for Digital payments, 8% for Cash</p>
                    </div>
                  )}
                  {form.presumptiveType === "professional" && (
                    <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-indigo-300">
                      <p className="text-xs font-bold text-indigo-600">Presumptive Profit Locked at 50%</p>
                    </div>
                  )}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Other Income (Rent, Interest)</label>
                <input type="number" name="otherIncome" value={form.otherIncome} onChange={handleChange} placeholder="0" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              {form.regime === "old" && (
                <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
                  <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Deductions (Old Regime Only)</p>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 flex justify-between">Section 80C <span className="text-amber-600">Max ₹1.5L</span></label>
                      <input type="number" name="deductions80C" value={form.deductions80C} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600 flex justify-between">Section 80D <span className="text-amber-600">Max ₹1L</span></label>
                      <input type="number" name="deductions80D" value={form.deductions80D} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2 text-sm" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel: Summary */}
        <div className="lg:col-span-7 space-y-6">
          <div ref={reportRef} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-indigo-950/30">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1">
                    <PieChart size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">{form.itrType.toUpperCase()} Tax Estimate</span>
                  </div>
                  <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                    ₹{result.totalTax.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                  </h2>
                </div>
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 text-center">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Regime</p>
                   <p className="text-sm font-black text-indigo-600 uppercase">{form.regime}</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-slate-400 text-[10px] uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                    <th className="pb-4 font-bold">Income Breakup</th>
                    <th className="pb-4 font-bold text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700 dark:text-slate-300 divide-y divide-slate-100 dark:divide-slate-800/50">
                  <tr>
                    <td className="py-4 font-medium flex items-center gap-2">
                       <Wallet size={14} className="text-slate-400"/> 
                       {form.itrType === "itr1" ? "Salary Income" : `Presumptive Profit (${form.presumptiveType === "business" ? form.profitPercent + "%" : "50%"})`}
                    </td>
                    <td className="py-4 text-right font-bold">{result.incomeFromITR.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium">Standard Deduction</td>
                    <td className="py-4 text-right text-rose-600 font-bold">- {result.stdDeduction.toLocaleString()}</td>
                  </tr>
                  <tr className="bg-indigo-50/50 dark:bg-indigo-500/5">
                    <td className="py-4 font-bold text-indigo-700 dark:text-indigo-300">Net Taxable Income</td>
                    <td className="py-4 text-right font-black text-indigo-700 dark:text-indigo-300">{result.taxableIncome.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium text-slate-500">Income Tax (Slabs)</td>
                    <td className="py-4 text-right text-slate-900 dark:text-white">{result.baseTax.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td className="py-4 font-medium text-slate-500">Health & Education Cess (4%)</td>
                    <td className="py-4 text-right text-slate-900 dark:text-white">{result.cess.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>

              <div className="mt-8 flex gap-3 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/20">
                <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                  {form.itrType === "itr4" && "Note: ITR-4 is for small businesses (44AD) and professionals (44ADA) where books of accounts are not required. "}
                  Calculated based on Budget 2026.
                </p>
              </div>
            </div>
          </div>

          <button onClick={downloadReport} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-indigo-500/20 transition-all active:scale-[0.98]">
            <Download size={20} /> Download {form.itrType.toUpperCase()} Report
          </button>
        </div>
      </div>
    </div>
  )
}

/* =========================
   REMAINING SERVICES LOGIC
   ========================= */

const map = {
  "Tax-Calculation": { title: "Income Tax Calculator" },
  "itr-filing": {
    title: "Income Tax Return Filing",
    image: itrImg,
    narrative: "Expert review, accurate filing, and timely submission for individuals and businesses.",
    steps: ["Document Intake", "Income Mapping", "Draft Review", "Final E-filing"],
    faqs: [{ q: "Documents needed?", a: "Form 16, Bank Statements, Investment proofs." }],
    price: "₹1,499",
  },
  "gst-registration": {
    title: "GST Registration",
    image: gstRegImg,
    narrative: "Get your GSTIN within days with our simplified registration process.",
    steps: ["Doc Verification", "Portal Application", "ARN Followup", "GSTIN Issuance"],
    faqs: [{ q: "Timeframe?", a: "Generally 3-7 working days." }],
    price: "₹2,999",
  }
}

export default function ServiceDetail() {
  const { slug } = useParams()
  const s = map[slug]

  if (!s) return <div className="p-20 text-center text-slate-500 font-bold">Service not found</div>
  if (slug === "Tax-Calculation") return <IncomeTaxCalculator />

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-8 dark:bg-slate-950">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <img src={s.image} alt={s.title} className="relative w-full rounded-2xl shadow-2xl object-cover aspect-video" />
        </div>
        <div>
          <span className="text-indigo-600 dark:text-indigo-500 font-bold text-xs uppercase tracking-[0.2em]">Service Excellence</span>
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mt-2">{s.title}</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg leading-relaxed font-light">{s.narrative}</p>
          <div className="mt-8 flex items-baseline gap-2">
            <span className="text-slate-500 dark:text-slate-500 text-sm">Starting Professional Fee</span>
            <div className="text-3xl font-black text-indigo-700 dark:text-white">{s.price}</div>
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20">
              Book Consultation
            </Link>
            <Link to="/services" className="px-8 py-3 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold transition-all border border-slate-200 dark:border-slate-700">
              Explore Services
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 pt-12">
        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="text-indigo-600 dark:text-indigo-500" size={18} /> Our Process
          </h3>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            {s.steps.map((step, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-indigo-600 dark:text-indigo-500 font-bold">0{idx + 1}.</span> {step}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 md:col-span-2 shadow-sm">
          <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
            <Info className="text-indigo-600 dark:text-indigo-500" size={18} /> Common Queries
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {s.faqs.map((faq, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase">{faq.q}</p>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}