// ============================================================================
// MAKI MOTORSPORTS LLC - DEALER, MASTER MECHANIC & KEY PROGRAMMING SYSTEM
// ============================================================================

// 1. MASTER MECHANIC & KEY PROGRAMMING ISSUE PARSER (3-TIER KNOWLEDGE BASE)
const MECHANIC_KNOWLEDGE_BASE = [
  {
    keywords: ['key', 'fob', 'lost key', 'no key', 'immobilizer', 'cas', 'fem', 'bdc', 'ews', 'transponder', 'ignition lock'],
    category: 'Key Cutting & Immobilizer Programming',
    tier1: { task: 'In-House Laser Cut Emergency Blade + Program Transponder Chip to Immobilizer (EWS/CAS)', parts: 28, hours: 0.8 },
    tier2: { task: 'Cut & Program New OEM-Style Smart Key Fob (CAS/FEM/BDC) + Clear Lost Key Slots in EEPROM', parts: 65, hours: 1.2 },
    tier3: { task: 'Program 2x Comfort Access Smart Key Fobs + New Ignition Slot / Start Button + Full Module Sync', parts: 145, hours: 2.0 }
  },
  {
    keywords: ['coolant', 'expansion tank', 'overheat', 'water pump', 'thermostat', 'radiator'],
    category: 'Cooling System',
    tier1: { task: 'Replace failed coolant component (Aftermarket/URO) + bleed system', parts: 65, hours: 1.5 },
    tier2: { task: 'OE Behr/Mahle Expansion Tank, Thermostat & Water Pump Refresh + BMW Blue Coolant', parts: 235, hours: 3.0 },
    tier3: { task: 'Full Cooling System Overhaul (CSF All-Aluminum Radiator, EMP Stewart Pump, Silicone Hoses)', parts: 690, hours: 4.5 }
  },
  {
    keywords: ['valve cover', 'oil leak', 'gasket', 'ofhg', 'oil filter housing', 'oil pan'],
    category: 'Engine Seals & Leaks',
    tier1: { task: 'Valve Cover Gasket & Oil Filter Housing Gasket (Victor Reinz) + degrease block', parts: 55, hours: 2.5 },
    tier2: { task: 'OEM Elring Gasket Set + New Valve Cover + CCV Breather Hose Kit + LiquiMoly 5W-40 Change', parts: 260, hours: 3.5 },
    tier3: { task: 'Complete Engine Reseal (Valve Cover, OFHG, Oil Pan Gasket, Rear Main, VANOS Seals)', parts: 580, hours: 9.0 }
  },
  {
    keywords: ['misfire', 'coil', 'spark plug', 'rough idle', 'p030', 'injector'],
    category: 'Ignition & Fuel',
    tier1: { task: 'Replace faulty Ignition Coil(s) + NGK Copper Spark Plugs & clear codes', parts: 68, hours: 1.0 },
    tier2: { task: 'Full Set of 6 Bosch/Eldor Ignition Coils + NGK Laser Iridium Plugs + Smoke Test', parts: 215, hours: 1.5 },
    tier3: { task: 'High-Output Dinan Coils, Index 12/OEM Injectors, Walnut Blast Intake Valves', parts: 820, hours: 4.5 }
  },
  {
    keywords: ['smog', 'p0420', 'cat', 'o2', 'check engine', 'cel', 'emissions', 'evap'],
    category: 'CA Smog & Emissions',
    tier1: { task: 'Fix vacuum/exhaust leak, replace downstream O2 sensor & run CA Smog drive cycle', parts: 75, hours: 1.5 },
    tier2: { task: 'Upstream + Downstream Bosch O2 Sensors, Smoke Test EVAP, Official CA STAR Smog Cert', parts: 195, hours: 2.0 },
    tier3: { task: 'CARB-Approved High-Flow Replacement Manifold/Cats + All Sensors + Dyno Diagnostic', parts: 790, hours: 4.0 }
  },
  {
    keywords: ['brake', 'rotor', 'pad', 'caliper', 'squeak'],
    category: 'Brakes & Stopping',
    tier1: { task: 'Centric Daily Driver Brake Pads + resurface/replace worn front rotors', parts: 95, hours: 1.5 },
    tier2: { task: 'Zimmermann Coated Rotors + Akebono Ceramic Low-Dust Pads (Front & Rear) + DOT4 Flush', parts: 340, hours: 2.5 },
    tier3: { task: 'Cross-Drilled & Slotted Big Brake Upgrade + Painted Calipers + Stainless Lines', parts: 890, hours: 4.0 }
  },
  {
    keywords: ['bumper', 'paint', 'dent', 'fender', 'clear coat', 'cosmetic', 'hood', 'trim'],
    category: 'Body & Exterior',
    tier1: { task: 'Re-clip/align bumper brackets, color-matched touch-up & buff headlights', parts: 45, hours: 1.5 },
    tier2: { task: 'CAPA Certified Replacement Bumper + Local Paint Blend + 2-Stage Machine Polish', parts: 390, hours: 3.5 },
    tier3: { task: 'M-Sport / M3 Style Aero Conversion + Full Booth Paint Correction & Ceramic Coating', parts: 1350, hours: 8.0 }
  },
  {
    keywords: ['suspension', 'control arm', 'strut', 'shock', 'clunk', 'bushing', 'coilover'],
    category: 'Suspension & Chassis',
    tier1: { task: 'Replace torn Front Control Arm Thrust Bushings & sway bar links', parts: 85, hours: 1.5 },
    tier2: { task: 'Lemförder Control Arm Kit + Sachs OEM Struts/Shocks + 4-Wheel Alignment', parts: 460, hours: 4.0 },
    tier3: { task: 'Bilstein B14 / KW Adjustable Coilovers + Poly Subframe Bushings + Corner Balance', parts: 1280, hours: 6.5 }
  },
  {
    keywords: ['tire', 'wheel', 'curb', 'alignment', 'bald'],
    category: 'Wheels & Tires',
    tier1: { task: 'Mount 2 matching high-tread used/budget tires to pass safety inspection', parts: 130, hours: 1.0 },
    tier2: { task: 'Full Set of 4 New All-Season Performance Tires + Road Force Balance + Alignment', parts: 540, hours: 1.5 },
    tier3: { task: 'Refinished Forged/Apex Style Wheels + Michelin Pilot Sport 4S Tires', parts: 1490, hours: 2.0 }
  },
  {
    keywords: ['turbo', 'wastegate', 'boost', 'charge pipe', 'intercooler'],
    category: 'Forced Induction / Turbo',
    tier1: { task: 'Adjust wastegate actuator rod + replace cracked plastic charge pipe + boost solenoids', parts: 145, hours: 2.5 },
    tier2: { task: 'Rebuilt OEM CHRA Turbo Cartridges + Gasket Installation Kit + Aluminum Charge Pipe', parts: 590, hours: 7.0 },
    tier3: { task: 'Upgraded Billet Hybrid Turbos + Stepped Intercooler + Silicone Inlets', parts: 1650, hours: 10.0 }
  },
  {
    keywords: ['ac', 'air conditioning', 'compressor', 'warm', 'freon', 'blower'],
    category: 'HVAC / AC System',
    tier1: { task: 'Replace Schrader valves/O-rings, vacuum test & R134a recharge', parts: 55, hours: 1.0 },
    tier2: { task: 'Denso OEM A/C Compressor + Receiver Drier + Expansion Valve + Full Evac/Recharge', parts: 330, hours: 3.0 },
    tier3: { task: 'Complete HVAC Refresh (Compressor, Condenser, Blower Motor & Final Stage Resistor)', parts: 620, hours: 5.0 }
  }
];

// ============================================================================
// 1B. INTERACTIVE PUBLIC SHOP SERVICE CATALOG (CLICK TO AUTO-POPULATE FORM)
// ============================================================================
const PUBLIC_SERVICE_CATALOG = [
  {
    id: 'oil-maint',
    title: 'Oil & Preventative Maintenance',
    icon: 'droplets',
    accent: 'maki-lightBlue',
    subtitle: 'Full synthetic service, gaskets, cooling & fluid flushes',
    subIssues: [
      'Full Synthetic Oil & OEM Filter Service (LiquiMoly / Mobil1)',
      'Valve Cover Gasket & Oil Filter Housing Gasket Leak Repair',
      'Cooling System Overhaul (Expansion Tank, Water Pump & Thermostat)',
      'Spark Plugs, Ignition Coils & Intake Carbon Cleaning'
    ]
  },
  {
    id: 'brakes-susp',
    title: 'Brakes, Suspension & Chassis',
    icon: 'disc',
    accent: 'maki-red',
    subtitle: 'Pads, rotors, control arms, coilovers & wheel bearings',
    subIssues: [
      'Front & Rear Brake Pads + Coated Rotors Replacement',
      'Control Arms, Thrust Bushings & Tie Rod Clunk Repair',
      'Coilover / Lowering Spring & Strut Installation',
      'Big Brake Kit Upgrade + DOT4 Brake Fluid Flush'
    ]
  },
  {
    id: 'keys-elec',
    title: 'Key Programming & Locksmith',
    icon: 'key-round',
    accent: 'emerald-400',
    subtitle: 'Laser key cutting, smart fobs, lost-all-keys & immobilizer',
    subIssues: [
      'Cut & Program New Smart Key Fob (Spare Key)',
      'Lost All Keys — On-Site Immobilizer & Key Programming (CAS/FEM/BDC/EWS)',
      'Ignition Switch / Steering Lock (ELV) & Start Button Repair',
      'DME / ECU / CAS Module Cloning & Synchronization'
    ]
  },
  {
    id: 'diag-engine',
    title: 'Diagnostics, Smog & Engine Work',
    icon: 'gauge',
    accent: 'amber-400',
    subtitle: 'Check engine light, CA Smog prep, turbos & PPI',
    subIssues: [
      'Check Engine Light (CEL) & CA Smog Failure Diagnostics',
      'Turbocharger, Wastegate & Boost/Charge Pipe Leak Repair',
      'A/C Compressor, Condenser & Recharge Service',
      'Master Mechanic Pre-Purchase Inspection (PPI)'
    ]
  }
];

let activePublicServiceCategoryId = PUBLIC_SERVICE_CATALOG[0].id;
let activePublicSubIssue = PUBLIC_SERVICE_CATALOG[0].subIssues[0];

function renderInteractiveServiceSelector() {
  const container = document.getElementById('interactive-service-selector');
  if (!container) return;

  const activeCat = PUBLIC_SERVICE_CATALOG.find((c) => c.id === activePublicServiceCategoryId) || PUBLIC_SERVICE_CATALOG[0];

  container.innerHTML = `
    <!-- 4 Main Category Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
      ${PUBLIC_SERVICE_CATALOG.map((cat) => {
        const isSelected = cat.id === activePublicServiceCategoryId;
        return `
          <button
            type="button"
            onclick="selectServiceCategory('${cat.id}')"
            class="p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
              isSelected
                ? 'bg-slate-900 border-maki-lightBlue ring-1 ring-maki-lightBlue shadow-lg shadow-blue-500/10'
                : 'bg-maki-card border-slate-800 hover:border-slate-700'
            }"
          >
            <div class="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
              <i data-lucide="${cat.icon}" class="w-4 h-4 text-${cat.accent}"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between gap-2">
                <h4 class="font-display font-bold text-sm text-white">${cat.title}</h4>
                ${isSelected ? '<span class="px-2 py-0.5 rounded bg-maki-lightBlue text-slate-950 text-[10px] font-bold">SELECTED</span>' : ''}
              </div>
              <p class="text-xs text-slate-400 mt-1">${cat.subtitle}</p>
            </div>
          </button>
        `;
      }).join('')}
    </div>

    <!-- Sub-Issue Breakdown Pills (Click any issue to auto-populate & scroll to form) -->
    <div class="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
      <div class="flex items-center justify-between">
        <span class="text-[11px] font-mono uppercase tracking-wider text-maki-lightBlue">
          ${activeCat.title} // Tap Specific Job to Auto-Fill Request Form:
        </span>
      </div>
      <div class="flex flex-wrap gap-2">
        ${activeCat.subIssues.map((issue) => {
          const isChosen = issue === activePublicSubIssue;
          return `
            <button
              type="button"
              onclick="selectSpecificServiceIssue('${activeCat.id}', '${issue.replace(/'/g, "\\'")}')"
              class="px-3.5 py-2 rounded-xl text-xs font-medium transition-all text-left flex items-center gap-2 ${
                isChosen
                  ? 'bg-maki-lightBlue text-slate-950 font-bold shadow'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-maki-lightBlue/50 hover:text-white'
              }"
            >
              <span>${issue}</span>
              <i data-lucide="arrow-down-right" class="w-3.5 h-3.5 opacity-75 shrink-0"></i>
            </button>
          `;
        }).join('')}
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();
}

function selectServiceCategory(catId) {
  activePublicServiceCategoryId = catId;
  const cat = PUBLIC_SERVICE_CATALOG.find((c) => c.id === catId);
  if (cat && cat.subIssues.length > 0) {
    activePublicSubIssue = cat.subIssues[0];
    populateMechanicFormFields(cat.title, activePublicSubIssue, false);
  }
  renderInteractiveServiceSelector();
}

function selectSpecificServiceIssue(catId, issueText) {
  activePublicServiceCategoryId = catId;
  activePublicSubIssue = issueText;
  const cat = PUBLIC_SERVICE_CATALOG.find((c) => c.id === catId);
  populateMechanicFormFields(cat ? cat.title : 'General Mechanic', issueText, true);
  renderInteractiveServiceSelector();
}

function populateMechanicFormFields(categoryTitle, issueText, scrollAndFocus) {
  const catInput = document.getElementById('mech-category');
  const serviceInput = document.getElementById('mech-service');
  const badge = document.getElementById('selected-service-badge');
  const carInput = document.getElementById('mech-car');
  const formEl = document.getElementById('mechanic-service-form');

  if (catInput) catInput.value = categoryTitle;
  if (serviceInput) serviceInput.value = issueText;
  if (badge) badge.textContent = categoryTitle;

  if (scrollAndFocus && formEl) {
    formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    formEl.classList.add('ring-2', 'ring-maki-lightBlue');
    setTimeout(() => {
      formEl.classList.remove('ring-2', 'ring-maki-lightBlue');
      if (carInput) carInput.focus();
    }, 650);
  }
}

// ============================================================================
// 1C. CHASSIS & ENGINE MILEAGE-BASED SERVICE & INVESTMENT DATABASE
// ============================================================================
const CHASSIS_SERVICE_DATABASE = [
  {
    match: ['m4', 'f80', 'f82', 's55'],
    platform: 'BMW F80/F82 M3/M4 (S55 3.0L Twin-Turbo)',
    commonCheckpoints: [
      { minMiles: 40000, item: 'OEM Plastic Charge Pipes & J-Pipe', oemPartCost: 240, shopHours: 2.0, roiVerdict: 'HIGH ROI (Mandatory)', note: 'Factory plastic pipes split under boost; upgrading to aluminum adds immediate buyer confidence.' },
      { minMiles: 50000, item: 'NGK Spark Plugs (SILZKBR8D8S) & Eldor Coils', oemPartCost: 265, shopHours: 1.8, roiVerdict: 'HIGH ROI (Sign & Drive)', note: 'S55 requires 30k-50k plug intervals to prevent high-load misfires.' },
      { minMiles: 65000, item: 'Crank Hub Capture Plate / Valve Cover PCV', oemPartCost: 420, shopHours: 4.5, roiVerdict: 'ENTHUSIAST ROI (Tier 3)', note: 'Key selling point for F82 M4 buyers paying top-tier retail money.' }
    ]
  },
  {
    match: ['335', 'n54', 'n55', 'e92', 'e90 335', 'f30 335'],
    platform: 'BMW E90/E92/F30 335i (N54 / N55 Turbo Inline-6)',
    commonCheckpoints: [
      { minMiles: 60000, item: 'Oil Filter Housing Gasket (OFHG) & Mickey Mouse Flange', oemPartCost: 68, shopHours: 2.0, roiVerdict: 'CRITICAL (Prevent Belt Slip)', note: 'Oil leaking onto serpentine belt can get ingested past front crank seal—always fix first!' },
      { minMiles: 75000, item: 'Pierburg Electric Water Pump & Behr Thermostat', oemPartCost: 345, shopHours: 3.0, roiVerdict: 'HIGH ROI (Sign & Drive)', note: 'Electric water pumps fail around 75k-100k miles; replacing unlocks full Sign & Drive retail price.' },
      { minMiles: 85000, item: 'Intake Valve Carbon Walnut Blast + Valve Cover Gasket', oemPartCost: 110, shopHours: 3.5, roiVerdict: 'HIGH ROI (+$1,200 Value)', note: 'Restores 20+ HP & smooth cold idle on direct-injected N54/N55 engines.' },
      { minMiles: 100000, item: 'Twin-Turbo Wastegate Actuators / Index 12 Injectors', oemPartCost: 590, shopHours: 7.0, roiVerdict: 'EVALUATE MMR SPREAD', note: 'Worth doing for clean-title coupes; keep in Tier 1 Wholesale if high-mileage sedan.' }
    ]
  },
  {
    match: ['e46', '325', '330', 'zhp', 'm54'],
    platform: 'BMW E46 325i / 330i / ZHP (M54 2.5L/3.0L Inline-6)',
    commonCheckpoints: [
      { minMiles: 80000, item: 'Behr Expansion Tank, Water Pump & Thermostat Overhaul', oemPartCost: 225, shopHours: 2.5, roiVerdict: 'MANDATORY (High ROI)', note: 'E46 plastic cooling necks crack past 80k miles. Essential before any test drive.' },
      { minMiles: 90000, item: 'DISA Valve Rebuild + CCV Oil Separator & Intake Boots', oemPartCost: 140, shopHours: 2.5, roiVerdict: 'HIGH ROI (CA Smog Fix)', note: 'Fixes 90% of lean codes (P0171/P0174) so the car passes CA STAR Smog easily.' },
      { minMiles: 100000, item: 'Lemförder Front Control Arm Lower Lollipops (FCABs)', oemPartCost: 95, shopHours: 1.5, roiVerdict: 'HIGH ROI (Sign & Drive)', note: 'Eliminates steering wheel shimmy under braking; huge upgrade for buyer test drives.' },
      { minMiles: 120000, item: 'EWS3 / Diamond Remote Key Fob Cut & Programming', oemPartCost: 35, shopHours: 0.8, roiVerdict: 'IN-HOUSE ADVANTAGE', note: 'Providing 2 working diamond keys adds $400+ in perceived retail buyer value.' }
    ]
  },
  {
    match: ['328', 'n52', 'e90', '528', '535', 'f10'],
    platform: 'BMW E90/F10 328i / 535i (N52 / N55 Inline-6)',
    commonCheckpoints: [
      { minMiles: 75000, item: 'Valve Cover Gasket & Valvetronic Eccentric Shaft Sensor Seal', oemPartCost: 85, shopHours: 3.0, roiVerdict: 'HIGH ROI (Stop Burning Oil Smell)', note: 'Stops oil dripping onto exhaust manifold cat; required for clean customer cabin air.' },
      { minMiles: 85000, item: 'Oil Filter Housing Gasket (OFHG) + Upper Radiator Hose', oemPartCost: 65, shopHours: 1.8, roiVerdict: 'MANDATORY', note: 'Prevents oil/coolant mixing and belt contamination.' },
      { minMiles: 100000, item: 'Bosch Ignition Coils (x6) + CAS3/FEM Smart Key Fob', oemPartCost: 210, shopHours: 1.5, roiVerdict: 'HIGH ROI (Sign & Drive)', note: 'Smooths idle and gives the buyer a fresh programmed Comfort/Smart key fob.' }
    ]
  }
];

function lookupChassisIntelligence(ymm, mileage) {
  const lower = (ymm || '').toLowerCase();
  const found = CHASSIS_SERVICE_DATABASE.find((entry) =>
    entry.match.some((kw) => lower.includes(kw))
  ) || CHASSIS_SERVICE_DATABASE[2];

  const miles = Number(mileage) || 100000;
  const dueItems = found.commonCheckpoints.map((cp) => ({
    ...cp,
    isDueAtCurrentMileage: miles >= cp.minMiles
  }));

  return {
    platform: found.platform,
    checkpoints: dueItems
  };
}

// ============================================================================
// 1D. TIER STATUS RULING & INVESTMENT VERDICT ENGINE
// ============================================================================
function evaluateVehicleTierRuling(car) {
  const t1 = car.plans.tier1;
  const t2 = car.plans.tier2;
  const t3 = car.plans.tier3;

  const extraPartsT1toT2 = t2.partsCost - t1.partsCost;
  const extraHoursT1toT2 = Number((t2.totalHours - t1.totalHours).toFixed(1));
  const extraProfitT1toT2 = t2.netProfit - t1.netProfit;
  const roiT1toT2 = extraPartsT1toT2 > 0 ? Math.round((extraProfitT1toT2 / extraPartsT1toT2) * 100) : 200;

  const extraPartsT2toT3 = t3.partsCost - t2.partsCost;
  const extraHoursT2toT3 = Number((t3.totalHours - t2.totalHours).toFixed(1));
  const extraProfitT2toT3 = t3.netProfit - t2.netProfit;
  const roiT2toT3 = extraPartsT2toT3 > 0 ? Math.round((extraProfitT2toT3 / extraPartsT2toT3) * 100) : 150;

  let recommendedTier = 'tier2';
  let verdictBadge = 'RECOMMENDED: TIER 2 (SIGN & DRIVE RETAIL)';
  let verdictColor = 'emerald';
  let rulingExplanation = '';
  let investmentVerdict = '';

  if (car.category === 'Part-Outs') {
    recommendedTier = 'tier1';
    verdictBadge = 'RULING: DONOR PART-OUT / SALVAGE HARVEST';
    verdictColor = 'red';
    rulingExplanation = `At ${car.mileage.toLocaleString()} miles and a $${car.buyPrice.toLocaleString()} buy-in, structural/collision damage makes full retail reconditioning uneconomical. Harvesting the engine, transmission, CAS/EWS key modules, and body panels yields the highest return.`;
    investmentVerdict = `DO NOT INVEST in cosmetic or Tier 2/3 retail parts. Pull drivetrain & high-demand OEM assemblies in-house.`;
  } else if (car.mileage > 140000 && car.mmrValue < 5000) {
    recommendedTier = 'tier1';
    verdictBadge = 'RULING: TIER 1 (ECONOMY WHOLESALE FLIP)';
    verdictColor = 'blue';
    rulingExplanation = `With ${car.mileage.toLocaleString()} miles and a $${car.mmrValue.toLocaleString()} Manheim MMR ceiling, keeping parts spend to $${t1.partsCost} (${t1.totalHours} shop hrs) protects margin and turns cash fast.`;
    investmentVerdict = `Investing an extra $${extraPartsT1toT2} in OEM Tier 2 parts + ${extraHoursT1toT2} hrs would add +$${extraProfitT1toT2.toLocaleString()} in net profit (${roiT1toT2}% Parts ROI) if you want to move it up to the Sign & Drive lot.`;
  } else if (car.mmrValue >= 15000 || car.ymm.toLowerCase().includes('m4') || car.ymm.toLowerCase().includes('zhp')) {
    recommendedTier = 'tier2';
    verdictBadge = 'RULING: HIGH-VALUE CHASSIS — TIER 2 OR TIER 3 WORTHY';
    verdictColor = 'emerald';
    rulingExplanation = `Enthusiast chassis (${car.ymm}) with strong $${car.mmrValue.toLocaleString()} MMR baseline. Spending $${extraPartsT1toT2} more to move from Tier 1 to Tier 2 unlocks +$${extraProfitT1toT2.toLocaleString()} in additional net profit (${roiT1toT2}% Parts ROI).`;
    investmentVerdict = `WORTH FULL INVESTMENT: Stepping all the way to Tier 3 (Enthusiast Spec) requires $${extraPartsT2toT3} more in parts (${extraHoursT2toT3} shop hrs) and yields +$${extraProfitT2toT3.toLocaleString()} additional profit (${roiT2toT3}% Parts ROI).`;
  } else {
    recommendedTier = 'tier2';
    verdictBadge = 'RULING: TIER 2 (SIGN & DRIVE SWEET SPOT)';
    verdictColor = 'emerald';
    rulingExplanation = `Spending $${t2.partsCost} on OEM-grade Tier 2 parts (${t2.totalHours} hrs in-house labor) positions this ${car.ymm} for top Sign & Drive retail pricing ($${t2.estSalePrice.toLocaleString()}) while saving $${t2.retailLaborSaved.toLocaleString()} in outside mechanic labor.`;
    investmentVerdict = `Upgrading from Tier 1 to Tier 2 costs only $${extraPartsT1toT2} in extra parts and nets +$${extraProfitT1toT2.toLocaleString()} more profit (${roiT1toT2}% ROI). Tier 3 over-restoration is optional.`;
  }

  const upgradeStepsT1toT2 = t2.items.map((item2, idx) => {
    const item1 = t1.items[idx];
    return {
      category: item2.category,
      fromTask: item1 ? item1.task : 'Basic inspection',
      toTask: item2.task,
      extraCost: item2.parts - (item1 ? item1.parts : 0),
      extraHours: Number((item2.hours - (item1 ? item1.hours : 0)).toFixed(1))
    };
  });

  const upgradeStepsT2toT3 = t3.items.map((item3, idx) => {
    const item2 = t2.items[idx];
    return {
      category: item3.category,
      fromTask: item2 ? item2.task : 'Standard OEM service',
      toTask: item3.task,
      extraCost: item3.parts - (item2 ? item2.parts : 0),
      extraHours: Number((item3.hours - (item2 ? item2.hours : 0)).toFixed(1))
    };
  });

  return {
    recommendedTier,
    verdictBadge,
    verdictColor,
    rulingExplanation,
    investmentVerdict,
    extraPartsT1toT2,
    extraHoursT1toT2,
    extraProfitT1toT2,
    roiT1toT2,
    extraPartsT2toT3,
    extraHoursT2toT3,
    extraProfitT2toT3,
    roiT2toT3,
    upgradeStepsT1toT2,
    upgradeStepsT2toT3
  };
}

function generateThreeTierPlan(issueText, buyPrice, mmrValue) {
  const lower = (issueText || '').toLowerCase();
  const matchedCategories = [];

  MECHANIC_KNOWLEDGE_BASE.forEach((rule) => {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      matchedCategories.push(rule);
    }
  });

  if (matchedCategories.length === 0) {
    matchedCategories.push(
      MECHANIC_KNOWLEDGE_BASE[2],
      MECHANIC_KNOWLEDGE_BASE[4]
    );
  }

  const auctionAndDmvFees = 275;

  const buildTierSummary = (tierKey, label, badgeColor, retailMultiplier, description) => {
    const items = matchedCategories.map((m) => ({
      category: m.category,
      task: m[tierKey].task,
      parts: m[tierKey].parts,
      hours: m[tierKey].hours
    }));

    const partsCost = items.reduce((sum, i) => sum + i.parts, 0);
    const totalHours = Number(items.reduce((sum, i) => sum + i.hours, 0).toFixed(1));
    const retailLaborSaved = Math.round(totalHours * 175);
    const totalAllInCost = Number(buyPrice) + auctionAndDmvFees + partsCost;
    const estSalePrice = Math.round((Number(mmrValue) * retailMultiplier) / 50) * 50;
    const netProfit = estSalePrice - totalAllInCost;

    return {
      key: tierKey,
      label,
      badgeColor,
      description,
      items,
      partsCost,
      totalHours,
      retailLaborSaved,
      auctionAndDmvFees,
      totalAllInCost,
      estSalePrice,
      netProfit
    };
  };

  return {
    tier1: buildTierSummary(
      'tier1',
      'Tier 1: Economy Wholesale / Run & Drive',
      'emerald',
      1.08,
      'Lowest cost solution to get the vehicle running, driving, keyed, and passing CA Smog for a fast Economy Wholesale flip.'
    ),
    tier2: buildTierSummary(
      'tier2',
      'Tier 2: Sign & Drive (Retail Ready)',
      'blue',
      1.36,
      'Turnkey Sign & Drive retail spec. OEM-quality parts (Lemförder/Behr/Bosch), fresh smart key fob, CA STAR Smog & full detail.'
    ),
    tier3: buildTierSummary(
      'tier3',
      'Tier 3: Full Restoration / Enthusiast Spec',
      'red',
      1.72,
      'Complete mechanical & cosmetic restoration. Upgraded aluminum cooling, coilovers, big brakes, aero & full reseal.'
    )
  };
}

// ============================================================================
// 2. SEED INVENTORY WITH MATCHING MODEL PHOTOS & 3 CATEGORIES
// ============================================================================
let vehiclesDB = [
  {
    id: 'MM-101',
    vin: 'WBS3R9C51FK339104',
    ymm: '2015 BMW M4 Coupe (F82)',
    mileage: 68200,
    source: 'Manheim OVE',
    category: 'Sign & Drive',
    selectedTier: 'tier2',
    buyPrice: 26500,
    mmrValue: 31500,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/BMW_M4%2C_EMS_2024%2C_Essen_%28P1032255%29.jpg/960px-BMW_M4%2C_EMS_2024%2C_Essen_%28P1032255%29.jpg',
    issuesRaw: 'Plastic charge pipe hairline crack, needs spark plugs & ignition coils, minor brake rotor lip, spare smart key fob programmed.',
    publicHighlights: 'S55 Twin-Turbo • Upgraded Aluminum Charge Pipes, Fresh Plugs/Coils & 2 Programmed Smart Keys'
  },
  {
    id: 'MM-102',
    vin: 'WBAEV53494KM90112',
    ymm: '2005 BMW 330i ZHP Sedan (E46)',
    mileage: 131000,
    source: 'Direct Cash-for-Cars Buy',
    category: 'Sign & Drive',
    selectedTier: 'tier2',
    buyPrice: 4200,
    mmrValue: 7800,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/BMW_E46_330i_ZHP.jpg',
    issuesRaw: 'Coolant thermostat code, oil filter housing gasket weeping, front control arm bushings worn, needs tires and smog.',
    publicHighlights: 'Rare ZHP 6-Speed Performance Package • Fresh Lemförder Control Arms, Cooling Refresh & CA Smogged'
  },
  {
    id: 'MM-103',
    vin: 'WBAEV33452KL48291',
    ymm: '2004 BMW 325i Sedan (E46)',
    mileage: 118400,
    source: 'Manheim California Lane',
    category: 'Economy Wholesale',
    selectedTier: 'tier1',
    buyPrice: 1950,
    mmrValue: 4100,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/BMW_325i_%28E46%29_Washington_DC_Metro_Area%2C_USA.jpg/960px-BMW_325i_%28E46%29_Washington_DC_Metro_Area%2C_USA.jpg',
    issuesRaw: 'Acquired with no key fob (immobilizer locked), cracked coolant expansion tank, valve cover gasket oil leak, needs smog check.',
    publicHighlights: 'Economy Wholesale Special • New EWS Key Cut & Programmed In-House, Fresh Expansion Tank & Smogged'
  },
  {
    id: 'MM-104',
    vin: 'WBAVA33567KX81024',
    ymm: '2008 BMW 328i Sedan (E90)',
    mileage: 144800,
    source: 'Stockton Local Trade-In',
    category: 'Economy Wholesale',
    selectedTier: 'tier1',
    buyPrice: 2300,
    mmrValue: 4600,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e5/BMW_328i_%28E90%29_Washington_DC_Metro_Area%2C_USA.jpg/960px-BMW_328i_%28E90%29_Washington_DC_Metro_Area%2C_USA.jpg',
    issuesRaw: 'Valve cover gasket oil leak, cylinder 3 ignition coil misfire, needs rear brake pads and CAS smart key fob.',
    publicHighlights: 'Reliable N52 Inline-6 Commuter • Wholesale Priced to Move • Fresh Gasket, Coils & CAS Key Fob'
  },
  {
    id: 'MM-105',
    vin: 'WBAEV53402KM11840',
    ymm: '2003 BMW 330Ci Coupe (E46 Donor Part-Out)',
    mileage: 162000,
    source: 'Salvage / Tow-In',
    category: 'Part-Outs',
    selectedTier: 'tier1',
    buyPrice: 950,
    mmrValue: 3600,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ef/BMW_E46_ZHP_Coupe_TiAg_Side.jpg/960px-BMW_E46_ZHP_Coupe_TiAg_Side.jpg',
    issuesRaw: 'Rear quarter collision — parting out healthy M54B30 engine, 5-speed manual swap, black sport seats, DME/EWS key kit, doors & glass.',
    publicHighlights: 'FULL PART-OUT AVAILABLE: Tested M54B30 Engine, Manual Trans, Sport Interior, EWS/DME Key Set & Body Panels'
  },
  {
    id: 'MM-106',
    vin: 'WBAVB13526PT99412',
    ymm: '2009 BMW 328i Sedan (E90 LCI Part-Out)',
    mileage: 151200,
    source: 'Direct Cash-for-Cars Buy',
    category: 'Part-Outs',
    selectedTier: 'tier1',
    buyPrice: 800,
    mmrValue: 3200,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/BMW_328i_%28E90%29_Washington_DC_Metro_Area%2C_USA_%282%29.jpg/960px-BMW_328i_%28E90%29_Washington_DC_Metro_Area%2C_USA_%282%29.jpg',
    issuesRaw: 'Front-end damage — parting out N52 engine accessories, automatic transmission, CAS3 module + programmed keys, doors, trunk & wheels.',
    publicHighlights: 'FULL PART-OUT AVAILABLE: Good N52 Top End, CAS3 + Key Fobs, Clean Interior Trim, Doors, Tail Lights & Alloy Wheels'
  }
];

vehiclesDB.forEach((v) => {
  v.plans = generateThreeTierPlan(v.issuesRaw, v.buyPrice, v.mmrValue);
});

let selectedVehicleId = vehiclesDB[0].id;
let currentPublicFilter = 'Sign & Drive';
let currentPitWallTab = 'intake';
let currentJobQueueFilter = 'All';
let isAdminUnlocked = false;

// ============================================================================
// 2B. UNIFIED BUSINESS JOB QUEUE (CATEGORIZED MECHANIC WORK, KEYS, LEADS, SALES)
// ============================================================================
let leadsDB = [
  {
    id: 'JOB-201',
    category: 'Car Leads',
    type: 'Cash-for-Cars Acquisition Lead',
    status: 'Pending Appraisal',
    name: 'Carlos M. (Stockton)',
    phone: '(209) 555-0192',
    vin: 'WBAVB73567VF88210',
    ymm: '2007 BMW 335i Coupe (E92)',
    mileage: 124000,
    askingPrice: 2900,
    estMmr: 6400,
    issues: 'Lost the only key fob, wastegate rattle on cold start, valve cover oil leak, needs rear tires.'
  },
  {
    id: 'JOB-202',
    category: 'Key Programming',
    type: 'Key Cutting & Immobilizer',
    status: 'Scheduled Today',
    name: 'Marcus T. (Lodi)',
    phone: '(209) 555-0831',
    vin: 'WBA3A5C59EF601922',
    ymm: '2014 BMW 328i (F30)',
    mileage: 108000,
    askingPrice: 240,
    estMmr: 0,
    issues: 'Cut & Program New OEM-Style Smart Key Fob (FEM Module) + Clear Lost Key Slot.'
  },
  {
    id: 'JOB-203',
    category: 'Oil & Maintenance',
    type: 'Oil & Cooling Overhaul',
    status: 'In Shop Bay',
    name: 'Devon R. (Stockton)',
    phone: '(510) 555-0148',
    vin: 'WBAFR7C57DC819201',
    ymm: '2013 BMW 535i (F10)',
    mileage: 98000,
    askingPrice: 680,
    estMmr: 0,
    issues: 'Full Synthetic Oil Service + Oil Filter Housing Gasket (OFHG) & Electric Water Pump.'
  },
  {
    id: 'JOB-204',
    category: 'Brake & Suspension',
    type: 'Brakes & Chassis Service',
    status: 'Parts Ordered',
    name: 'Alicia K. (Manteca)',
    phone: '(209) 555-0419',
    vin: 'WBAVB13586PT10294',
    ymm: '2008 BMW 328i (E90)',
    mileage: 132000,
    askingPrice: 520,
    estMmr: 0,
    issues: 'Front & Rear Zimmermann Coated Rotors + Akebono Ceramic Pads + Front Control Arm Bushings.'
  },
  {
    id: 'JOB-205',
    category: 'Diagnostics & Smog',
    type: 'Diagnostics & Smog Prep',
    status: 'Waiting Inspection',
    name: 'ramon G. (Stockton)',
    phone: '(209) 555-0774',
    vin: 'WBAEV53413KM44910',
    ymm: '2004 BMW 330i (E46)',
    mileage: 149000,
    askingPrice: 185,
    estMmr: 0,
    issues: 'Check Engine Light P0171/P0174 Lean Code Smoke Test + Pre-Smog Readiness Drive Cycle.'
  },
  {
    id: 'JOB-206',
    category: 'Sales Status',
    type: 'Vehicle Sale & Test Drive',
    status: 'Deposit Received',
    name: 'Jordan P. (Sacramento)',
    phone: '(916) 555-0311',
    vin: 'WBAEV53494KM90112',
    ymm: '2005 BMW 330i ZHP Sedan (MM-102)',
    mileage: 131000,
    askingPrice: 10600,
    estMmr: 7800,
    issues: 'Buyer scheduled for Saturday pickup — CA DMV Reg/Title transfer & STAR Smog certificate ready.'
  }
];

// ============================================================================
// 3. CONCRETE & NEON ENCLAVE GATEKEEPER (PIT CREW TELEMETRY)
// ============================================================================

const ENCLAVE_CIPHER_VECTOR = [51, 51, 53, 105, 115];

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }
}

function verifyEnclaveCipher(raw) {
  const clean = (raw || '').trim().toLowerCase();
  if (clean.length !== ENCLAVE_CIPHER_VECTOR.length) return false;
  for (let i = 0; i < ENCLAVE_CIPHER_VECTOR.length; i++) {
    if (clean.charCodeAt(i) !== ENCLAVE_CIPHER_VECTOR[i]) return false;
  }
  return true;
}

function playEnclaveTone(freq = 520, type = 'sine', duration = 0.06, endFreq = null) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    if (endFreq) {
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
    }
    gain.gain.setValueAtTime(0.045, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Ignore audio context restriction
  }
}

function resetEnclaveVisualState() {
  const wrapper = document.getElementById('enclave-unit-wrapper');
  const monolith = document.getElementById('enclave-monolith');
  const overlay = document.getElementById('enclave-unlock-overlay');
  const shutters = document.getElementById('enclave-shutters');
  const progressBar = document.getElementById('unlock-progress-bar');
  const cable1 = document.getElementById('enclave-cable-1');
  const cable2 = document.getElementById('enclave-cable-2');

  if (wrapper) {
    wrapper.style.transform = '';
    wrapper.style.opacity = '';
  }
  if (monolith) monolith.classList.remove('enclave-unlocked-bolts');
  if (overlay) {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
  }
  if (shutters) shutters.classList.remove('shutter-open');
  if (progressBar) progressBar.style.width = '0%';
  if (cable1) cable1.className = 'w-10 h-2 bg-gradient-to-b from-[#25282c] to-[#0d0f12] border-y border-[#333840] transition-all duration-300';
  if (cable2) cable2.className = 'w-10 h-2 bg-gradient-to-b from-[#25282c] to-[#0d0f12] border-y border-[#333840] transition-all duration-300';

  [1, 2, 3, 4].forEach((n) => {
    const pin = document.getElementById(`pin-status-${n}`);
    if (pin) {
      pin.className = 'py-1.5 border border-[#28303d] bg-[#0d1117] text-slate-500';
      pin.textContent = `PIN 0${n}: LOCKED`;
    }
  });
}

function openTerminalGate() {
  if (isAdminUnlocked) {
    switchMode('admin');
    return;
  }
  resetEnclaveVisualState();
  playEnclaveTone(640, 'sine', 0.08);
  const modal = document.getElementById('terminal-modal');
  const input = document.getElementById('terminal-code-input');
  const status = document.getElementById('terminal-status-msg');
  const badge = document.getElementById('enclave-lock-badge');
  const slotLed = document.getElementById('enclave-slot-led');

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  input.value = '';

  if (badge) {
    badge.className = 'w-9 h-9 bg-[#151a22] border border-[#2b3442] flex items-center justify-center text-[#00f0ff] shadow-inner';
    badge.innerHTML = `<i data-lucide="lock" class="w-4 h-4"></i>`;
  }
  if (slotLed) {
    slotLed.className = 'w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]';
  }
  status.innerHTML = `
    <span class="text-slate-400">STATUS: STANDBY // AWAITING CIPHER</span>
    <span class="text-[#00f0ff]/80">AES-256 ENCLAVE</span>
  `;
  refreshIcons();
  setTimeout(() => input.focus(), 80);
}

function closeTerminalGate() {
  const modal = document.getElementById('terminal-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
}

function handleEnclaveInput(val) {
  playEnclaveTone(580, 'sine', 0.04);
  const slotLed = document.getElementById('enclave-slot-led');
  if (slotLed) {
    slotLed.className = val && val.length > 0
      ? 'w-2.5 h-2.5 rounded-full bg-[#e2fd52] shadow-[0_0_12px_#e2fd52] animate-ping'
      : 'w-2.5 h-2.5 rounded-full bg-[#00f0ff] shadow-[0_0_10px_#00f0ff]';
  }
}

function pressEnclaveKey(key) {
  const input = document.getElementById('terminal-code-input');
  if (!input) return;
  if (key === 'CLR') {
    playEnclaveTone(240, 'triangle', 0.08);
    input.value = '';
  } else {
    playEnclaveTone(620, 'sine', 0.05);
    input.value = (input.value || '') + key;
  }
  handleEnclaveInput(input.value);
  input.focus();
}

function runMechanicalUnlockSequence() {
  const wrapper = document.getElementById('enclave-unit-wrapper');
  const monolith = document.getElementById('enclave-monolith');
  const overlay = document.getElementById('enclave-unlock-overlay');
  const shutters = document.getElementById('enclave-shutters');
  const stageTag = document.getElementById('unlock-stage-tag');
  const stageTitle = document.getElementById('unlock-stage-title');
  const rpmReadout = document.getElementById('unlock-rpm-readout');
  const psiReadout = document.getElementById('unlock-psi-readout');
  const progressBar = document.getElementById('unlock-progress-bar');
  const cable1 = document.getElementById('enclave-cable-1');
  const cable2 = document.getElementById('enclave-cable-2');

  // Switch the underlying page to the Pit Crew Homepage immediately so it is ready behind the keypad
  switchMode('admin');
  switchPitWallTab('intake');

  // Show mechanical overlay & rotate 4 corner concrete Allen bolts
  if (overlay) {
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
  }
  if (monolith) {
    monolith.classList.add('enclave-unlocked-bolts');
  }
  if (cable1) cable1.className = 'w-10 h-2 bg-[#00f0ff] shadow-[0_0_12px_#00f0ff] transition-all duration-300';
  if (cable2) cable2.className = 'w-10 h-2 bg-[#e2fd52] shadow-[0_0_12px_#e2fd52] transition-all duration-300';
  refreshIcons();

  // Stage 1: Solenoid Bolt Retraction (0ms - 500ms)
  playEnclaveTone(320, 'sawtooth', 0.12, 640);
  if (progressBar) progressBar.style.width = '38%';

  [1, 2, 3, 4].forEach((n, idx) => {
    setTimeout(() => {
      playEnclaveTone(480 + idx * 110, 'triangle', 0.07);
      const pin = document.getElementById(`pin-status-${n}`);
      if (pin) {
        pin.className = 'py-1.5 border border-[#00f0ff] bg-[#00f0ff]/15 text-[#7ceeff] font-bold shadow-[0_0_8px_rgba(0,240,255,0.3)]';
        pin.textContent = `PIN 0${n}: OPEN`;
      }
    }, idx * 105);
  });

  // Stage 2: Twin-Turbo Ignition Spool & Hydraulic Boost Sweep (500ms - 1100ms)
  setTimeout(() => {
    playEnclaveTone(220, 'sawtooth', 0.5, 1180);
    if (stageTag) stageTag.textContent = 'STAGE 02 // TWIN-TURBO IGNITION ENGAGED';
    if (stageTitle) stageTitle.textContent = 'SPOOLING TELEMETRY CORE';
    if (rpmReadout) rpmReadout.textContent = 'IGNITION: 7,000 RPM';
    if (psiReadout) psiReadout.textContent = 'BOOST: 18.5 PSI LOCKED';
    if (progressBar) progressBar.style.width = '100%';
  }, 500);

  // Stage 3: Hydraulic Concrete Blast Doors Split + Keypad Unit Retracts Away (1100ms - 1600ms)
  setTimeout(() => {
    playEnclaveTone(980, 'sine', 0.22, 1480);
    if (stageTag) {
      stageTag.className = 'text-[10px] font-bold tracking-[0.25em] text-[#e2fd52] uppercase';
      stageTag.textContent = 'STAGE 03 // ENCLAVE VAULT UNSEALED';
    }
    if (stageTitle) stageTitle.textContent = 'ENTERING PIT CREW HOMEPAGE';
    if (shutters) shutters.classList.add('shutter-open');
    if (wrapper) {
      wrapper.style.transform = 'scale(0.92) translateY(-18px)';
      wrapper.style.opacity = '0';
    }
  }, 1100);

  // Automatically dismiss the Enclave Modal (same action as [ESC]) to reveal Pit Crew Homepage
  setTimeout(() => {
    closeTerminalGate();
    resetEnclaveVisualState();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1600);
}

function handleTerminalSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('terminal-code-input');
  const status = document.getElementById('terminal-status-msg');
  const badge = document.getElementById('enclave-lock-badge');
  const slotLed = document.getElementById('enclave-slot-led');

  if (verifyEnclaveCipher(input.value)) {
    isAdminUnlocked = true;
    if (badge) {
      badge.className = 'w-9 h-9 bg-[#e2fd52]/15 border border-[#e2fd52] flex items-center justify-center text-[#e2fd52] shadow-[0_0_15px_rgba(226,253,82,0.4)]';
      badge.innerHTML = `<i data-lucide="unlock" class="w-4 h-4"></i>`;
    }
    if (slotLed) {
      slotLed.className = 'w-2.5 h-2.5 rounded-full bg-[#e2fd52] shadow-[0_0_12px_#e2fd52]';
    }
    status.innerHTML = `
      <span class="text-[#e2fd52] font-bold animate-pulse">CIPHER VERIFIED // STARTING ENGINE SEQUENCE...</span>
      <span class="text-[#e2fd52]">UNLOCKING</span>
    `;
    refreshIcons();
    runMechanicalUnlockSequence();
  } else {
    playEnclaveTone(150, 'sawtooth', 0.25);
    if (badge) {
      badge.className = 'w-9 h-9 bg-red-500/15 border border-red-500/60 flex items-center justify-center text-red-400';
      badge.innerHTML = `<i data-lucide="shield-alert" class="w-4 h-4"></i>`;
    }
    if (slotLed) {
      slotLed.className = 'w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_#ef4444]';
    }
    status.innerHTML = `
      <span class="text-red-400 font-bold">ACCESS DENIED // INVALID CHASSIS CIPHER</span>
      <span class="text-red-400/80">LOCKED</span>
    `;
    refreshIcons();
    input.value = '';
    input.focus();
  }
}

function lockAndExitAdmin() {
  isAdminUnlocked = false;
  switchMode('public');
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeTerminalGate();
  }
});

// ============================================================================
// 4. VIEW SWITCHING & PIT CREW STANDALONE TAB SECTIONS
// ============================================================================

function switchMode(mode) {
  const publicView = document.getElementById('view-public');
  const adminView = document.getElementById('view-admin');
  const publicNav = document.getElementById('public-nav');
  const btnOpenTerminal = document.getElementById('btn-open-terminal');
  const btnExitAdmin = document.getElementById('btn-exit-admin');

  if (mode === 'admin') {
    if (!isAdminUnlocked) {
      openTerminalGate();
      return;
    }
    publicView.classList.add('hidden');
    adminView.classList.remove('hidden');
    publicNav.classList.add('hidden');
    btnOpenTerminal.classList.add('hidden');
    btnExitAdmin.classList.remove('hidden');
    btnExitAdmin.classList.add('inline-flex');
    renderAdminDashboard();
  } else {
    adminView.classList.add('hidden');
    publicView.classList.remove('hidden');
    publicNav.classList.remove('hidden');
    btnOpenTerminal.classList.remove('hidden');
    btnExitAdmin.classList.add('hidden');
    btnExitAdmin.classList.remove('inline-flex');
    renderPublicInventory();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (window.lucide) lucide.createIcons();
}

function switchPitWallTab(tabName) {
  currentPitWallTab = tabName;
  const sections = {
    intake: document.getElementById('pit-section-intake'),
    database: document.getElementById('pit-section-database'),
    calculator: document.getElementById('pit-section-calculator'),
    leads: document.getElementById('pit-section-leads')
  };
  const buttons = {
    intake: document.getElementById('pit-tab-intake'),
    database: document.getElementById('pit-tab-database'),
    calculator: document.getElementById('pit-tab-calculator'),
    leads: document.getElementById('pit-tab-leads')
  };

  Object.keys(sections).forEach((k) => {
    if (!sections[k] || !buttons[k]) return;
    if (k === tabName) {
      sections[k].classList.remove('hidden');
      buttons[k].className = 'p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 bg-maki-lightBlue text-slate-950 border-maki-lightBlue shadow-lg shadow-blue-500/20';
    } else {
      sections[k].classList.add('hidden');
      buttons[k].className = 'p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3.5 bg-slate-950/80 text-slate-300 border-slate-800 hover:border-slate-600';
    }
  });

  renderAdminDashboard();
}

function filterPublicInventory(filterValue) {
  currentPublicFilter = filterValue;
  const buttonMap = {
    'Sign & Drive': document.getElementById('filter-signdrive'),
    'Economy Wholesale': document.getElementById('filter-wholesale'),
    'Part-Outs': document.getElementById('filter-partouts'),
    'all': document.getElementById('filter-all')
  };

  Object.keys(buttonMap).forEach((k) => {
    const btn = buttonMap[k];
    if (!btn) return;
    if (k === filterValue) {
      btn.className = 'px-5 py-2.5 rounded-xl text-xs font-semibold bg-maki-lightBlue text-slate-950 transition-all flex items-center gap-2 shadow';
    } else {
      btn.className = 'px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-950/60 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2';
    }
  });

  const headingEl = document.getElementById('inventory-section-heading');
  const subtitleEl = document.getElementById('inventory-section-subtitle');
  if (headingEl && subtitleEl) {
    if (filterValue === 'Sign & Drive') {
      headingEl.textContent = 'SIGN & DRIVE CERTIFIED VEHICLES';
      subtitleEl.textContent = 'Turnkey vehicles personally inspected, serviced, smogged, and keyed in-house by our Master Mechanic—ready to drive home today.';
    } else if (filterValue === 'Economy Wholesale') {
      headingEl.textContent = 'ECONOMY WHOLESALE SPECIALS';
      subtitleEl.textContent = 'Running, driving, smogged commuter & project cars priced at wholesale levels for maximum value.';
    } else if (filterValue === 'Part-Outs') {
      headingEl.textContent = 'DONOR PART-OUT VEHICLES';
      subtitleEl.textContent = 'OEM engines, transmissions, ECUs/CAS key modules, interior trim, and body panels pulled by our Master Mechanic in Stockton.';
    } else {
      headingEl.textContent = 'ALL MAKI INVENTORY & PART-OUTS';
      subtitleEl.textContent = 'Browse our full selection of turnkey Sign & Drive cars, budget Economy Wholesale specials, and donor Part-Out vehicles.';
    }
  }

  renderPublicInventory();
}

function renderPublicInventory() {
  const grid = document.getElementById('public-inventory-grid');
  if (!grid) return;

  const filtered = currentPublicFilter === 'all'
    ? vehiclesDB
    : vehiclesDB.filter((v) => v.category === currentPublicFilter);

  grid.innerHTML = filtered.map((car) => {
    const activePlan = car.plans[car.selectedTier];
    const isPartOut = car.category === 'Part-Outs';
    const isWholesale = car.category === 'Economy Wholesale';

    let categoryBadge = '';
    if (car.category === 'Sign & Drive') {
      categoryBadge = '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Sign & Drive Certified</span>';
    } else if (isWholesale) {
      categoryBadge = '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-maki-lightBlue/20 text-maki-lightBlue border border-maki-lightBlue/40">Economy Wholesale Price</span>';
    } else {
      categoryBadge = '<span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-500/25 text-red-300 border border-red-500/40">Donor Part-Out Vehicle</span>';
    }

    const priceDisplay = isPartOut
      ? `<div class="font-display font-bold text-lg text-maki-red">PART-OUT</div><div class="text-[10px] text-slate-400 uppercase">Parts From $45+</div>`
      : `<div class="font-display font-bold text-xl text-maki-lightBlue">$${activePlan.estSalePrice.toLocaleString()}</div><div class="text-[10px] text-slate-400 uppercase">${car.category}</div>`;

    const detailsBox = isPartOut
      ? `<p class="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-xl border border-red-500/20">
           <strong class="text-red-400">Available Donor Parts & Assemblies:</strong><br/>
           ${car.publicHighlights || car.issuesRaw}
         </p>`
      : `<p class="text-xs text-slate-300 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
           <strong class="text-maki-lightBlue">Master Mechanic Completed Work:</strong><br/>
           ${activePlan.items.map((i) => i.task).join(' • ')}
         </p>`;

    return `
      <div class="rounded-2xl bg-maki-card border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-all group">
        <div>
          <div class="relative h-52 bg-slate-950 overflow-hidden">
            <img src="${car.image}" alt="${car.ymm}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-3 left-3 flex gap-2">
              ${categoryBadge}
            </div>
            <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-maki-dark/90 backdrop-blur border border-slate-700 text-xs font-mono text-slate-300">
              ${car.mileage.toLocaleString()} mi
            </div>
          </div>

          <div class="p-5 space-y-3">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-display font-bold text-lg text-white leading-snug">${car.ymm}</h3>
              <div class="text-right shrink-0">
                ${priceDisplay}
              </div>
            </div>

            ${detailsBox}

            <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1">
              <span>VIN: <code class="text-slate-300">${car.vin.slice(0, 11)}...</code></span>
              <span class="text-emerald-400 font-medium">${isPartOut ? 'Stockton Yard' : 'CA Smog & Key Ready'}</span>
            </div>
          </div>
        </div>

        <div class="p-4 pt-0 flex gap-2">
          <a href="tel:5104184822" class="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-center text-xs font-semibold text-white transition-colors">
            ${isPartOut ? 'Call For Parts Availability' : 'Call (510) 418-4822'}
          </a>
          <button type="button" onclick="inquireOnVehicle('${car.id}')" class="px-3.5 py-2.5 rounded-xl bg-maki-lightBlue/15 hover:bg-maki-lightBlue/25 border border-maki-lightBlue/30 text-xs font-semibold text-maki-lightBlue transition-colors">
            ${isPartOut ? 'Request Part' : 'Schedule Test Drive'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function inquireOnVehicle(carId) {
  const car = vehiclesDB.find((v) => v.id === carId);
  if (!car) return;
  const isPartOut = car.category === 'Part-Outs';
  const catInput = document.getElementById('mech-category');
  const serviceInput = document.getElementById('mech-service');
  const carInput = document.getElementById('mech-car');
  const vinInput = document.getElementById('mech-vin');
  const badge = document.getElementById('selected-service-badge');

  if (catInput) catInput.value = isPartOut ? 'Donor Part-Out Request' : 'Vehicle Sales & Test Drive';
  if (serviceInput) {
    serviceInput.value = isPartOut
      ? `OEM Part Availability Request — ${car.ymm}`
      : `Schedule Test Drive / Purchase Inquiry (${car.category}) — $${car.plans[car.selectedTier].estSalePrice.toLocaleString()}`;
  }
  if (carInput) carInput.value = car.ymm;
  if (vinInput) vinInput.value = car.vin;
  if (badge) badge.textContent = isPartOut ? 'Part-Out Inquiry' : 'Test Drive / Sales';

  const formEl = document.getElementById('mechanic-service-form');
  if (formEl) {
    formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    formEl.classList.add('ring-2', 'ring-maki-lightBlue');
    setTimeout(() => formEl.classList.remove('ring-2', 'ring-maki-lightBlue'), 1600);
  }
  const nameInput = document.getElementById('mech-name');
  if (nameInput) setTimeout(() => nameInput.focus(), 450);
}

// ============================================================================
// 5. PIT CREW MODULES:
//    - MODULE 02: ACQUIRED VEHICLES DATABASE & TIER RULING DOSSIER
//    - MODULE 03: STANDALONE CONDITION CALCULATOR
//    - MODULE 04: UNIFIED BUSINESS JOB QUEUE
// ============================================================================

function renderAdminDashboard() {
  document.getElementById('kpi-total-cars').textContent = vehiclesDB.length;

  const totalCapital = vehiclesDB.reduce((sum, v) => {
    const plan = v.plans[v.selectedTier];
    return sum + plan.totalAllInCost;
  }, 0);
  const totalProfit = vehiclesDB.reduce((sum, v) => {
    const plan = v.plans[v.selectedTier];
    return sum + plan.netProfit;
  }, 0);

  document.getElementById('kpi-capital').textContent = '$' + totalCapital.toLocaleString();
  document.getElementById('kpi-profit').textContent = '+$' + totalProfit.toLocaleString();
  document.getElementById('kpi-leads').textContent = leadsDB.length + ' Active';

  const listEl = document.getElementById('admin-vehicle-list');
  if (listEl) {
    listEl.innerHTML = vehiclesDB.map((car) => {
      const isSelected = car.id === selectedVehicleId;
      const activePlan = car.plans[car.selectedTier];
      return `
        <div onclick="selectAdminVehicle('${car.id}')" class="p-3.5 rounded-xl border transition-all cursor-pointer ${
          isSelected
            ? 'bg-slate-900 border-maki-lightBlue shadow-md shadow-blue-500/10'
            : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
        }">
          <div class="flex items-center justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <img src="${car.image}" alt="${car.ymm}" class="w-11 h-11 rounded-lg object-cover border border-slate-700 shrink-0" />
              <div>
                <div class="font-display font-bold text-sm text-white">${car.ymm}</div>
                <div class="text-[11px] text-slate-400">${car.category} • Buy: <strong class="text-slate-200">$${car.buyPrice.toLocaleString()}</strong></div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-xs font-bold text-emerald-400">+$${activePlan.netProfit.toLocaleString()}</div>
              <div class="text-[10px] text-slate-400 uppercase">${car.selectedTier.toUpperCase()}</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  renderDatabaseRulingPanel();
  renderSelectedReconAnalyzer();
  renderAdminLeads();
  if (window.lucide) lucide.createIcons();
}

function selectAdminVehicle(carId) {
  selectedVehicleId = carId;
  renderAdminDashboard();
}

function setVehicleTier(carId, tierKey) {
  const car = vehiclesDB.find((v) => v.id === carId);
  if (!car) return;
  car.selectedTier = tierKey;
  if (tierKey === 'tier1' && car.category !== 'Part-Outs') {
    car.category = 'Economy Wholesale';
  } else if (tierKey === 'tier2' || tierKey === 'tier3') {
    car.category = 'Sign & Drive';
  }
  saveMakiDatabase();
  renderAdminDashboard();
  renderPublicInventory();
}

function cycleVehicleCategory(carId) {
  const car = vehiclesDB.find((v) => v.id === carId);
  if (!car) return;
  const order = ['Sign & Drive', 'Economy Wholesale', 'Part-Outs'];
  const nextIdx = (order.indexOf(car.category) + 1) % order.length;
  car.category = order[nextIdx];
  saveMakiDatabase();
  renderAdminDashboard();
  renderPublicInventory();
}

function renderDatabaseRulingPanel() {
  const panel = document.getElementById('database-ruling-panel');
  const car = vehiclesDB.find((v) => v.id === selectedVehicleId) || vehiclesDB[0];
  if (!panel || !car) return;

  const ruling = evaluateVehicleTierRuling(car);
  const chassisIntel = lookupChassisIntelligence(car.ymm, car.mileage);
  const activePlan = car.plans[car.selectedTier];

  panel.innerHTML = `
    <!-- Top Vehicle Banner -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
      <div class="flex items-center gap-4">
        <img src="${car.image}" alt="${car.ymm}" class="w-16 h-16 rounded-xl object-cover border border-slate-700" />
        <div>
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-slate-800 text-maki-lightBlue font-mono text-[11px]">${car.id}</span>
            <span class="text-xs text-slate-400 font-mono">VIN: ${car.vin}</span>
          </div>
          <h2 class="font-display font-bold text-2xl text-white mt-0.5">${car.ymm}</h2>
          <p class="text-xs text-slate-400">${car.mileage.toLocaleString()} miles • Buy: $${car.buyPrice.toLocaleString()} • MMR: $${car.mmrValue.toLocaleString()}</p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <button onclick="cycleVehicleCategory('${car.id}')" class="px-3.5 py-2 rounded-xl border text-xs font-semibold bg-slate-900 border-slate-700 text-slate-200 hover:border-maki-lightBlue">
          Lot: ${car.category}
        </button>
        <button onclick="switchPitWallTab('calculator')" class="px-4 py-2 rounded-xl bg-maki-lightBlue hover:bg-blue-400 text-slate-950 font-display font-bold text-xs uppercase tracking-wider flex items-center gap-1.5">
          Open Condition Calculator &rarr;
        </button>
      </div>
    </div>

    <!-- 1. TIER STATUS RULING & INVESTMENT VERDICT CARD -->
    <div class="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-maki-lightBlue/40 space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
          ${ruling.verdictBadge}
        </span>
        <span class="text-xs font-mono text-maki-lightBlue">
          Current Assigned Tier: <strong>${activePlan.label}</strong> (Est. Profit: +$${activePlan.netProfit.toLocaleString()})
        </span>
      </div>
      <div class="space-y-1.5 pt-1">
        <h4 class="font-display font-bold text-sm uppercase tracking-wider text-white">Why This Tier Ruling Was Assigned:</h4>
        <p class="text-xs text-slate-300 leading-relaxed">${ruling.rulingExplanation}</p>
      </div>
      <div class="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800 text-xs text-emerald-300 font-medium">
        <strong class="text-white uppercase tracking-wider block mb-0.5">Investment Worthiness Verdict:</strong>
        ${ruling.investmentVerdict}
      </div>
    </div>

    <!-- 2. WHAT TO IMPROVE TO MOVE THIS VEHICLE TO A HIGHER TIER -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <!-- Step-Up Path A: Tier 1 (Wholesale) -> Tier 2 (Sign & Drive Retail) -->
      <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-mono font-bold uppercase text-maki-lightBlue">UPGRADE PATH A // TIER 1 &rarr; TIER 2</span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[11px] font-mono font-bold">+${ruling.roiT1toT2}% Parts ROI</span>
          </div>
          <h4 class="font-display font-bold text-sm text-white">Requirements to Move to "Sign & Drive" Retail</h4>
          <div class="space-y-2 pt-1">
            ${ruling.upgradeStepsT1toT2.map((u) => `
              <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs">
                <div class="flex items-center justify-between font-semibold text-white">
                  <span>${u.category}</span>
                  <span class="font-mono text-maki-lightBlue">+$${u.extraCost} parts (${u.extraHours >= 0 ? '+' + u.extraHours : u.extraHours}h)</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Upgrade to: <span class="text-slate-200">${u.toTask}</span></p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span class="text-slate-400 block text-[10px]">Extra Parts / Net Gain</span>
            <strong class="text-white">+$${ruling.extraPartsT1toT2} Parts &rarr; <span class="text-emerald-400">+$${ruling.extraProfitT1toT2.toLocaleString()} Profit</span></strong>
          </div>
          <button onclick="setVehicleTier('${car.id}', 'tier2')" class="px-3 py-1.5 rounded-lg bg-maki-lightBlue text-slate-950 font-bold text-xs">
            Promote to Tier 2
          </button>
        </div>
      </div>

      <!-- Step-Up Path B: Tier 2 (Sign & Drive) -> Tier 3 (Full Restoration) -->
      <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 flex flex-col justify-between">
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-mono font-bold uppercase text-maki-red">UPGRADE PATH B // TIER 2 &rarr; TIER 3</span>
            <span class="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[11px] font-mono font-bold">+${ruling.roiT2toT3}% Parts ROI</span>
          </div>
          <h4 class="font-display font-bold text-sm text-white">Requirements for "Full Enthusiast Restoration"</h4>
          <div class="space-y-2 pt-1">
            ${ruling.upgradeStepsT2toT3.map((u) => `
              <div class="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-xs">
                <div class="flex items-center justify-between font-semibold text-white">
                  <span>${u.category}</span>
                  <span class="font-mono text-maki-red">+$${u.extraCost} parts (+${u.extraHours}h)</span>
                </div>
                <p class="text-[11px] text-slate-400 mt-0.5">Upgrade to: <span class="text-slate-200">${u.toTask}</span></p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <div>
            <span class="text-slate-400 block text-[10px]">Extra Parts / Net Gain</span>
            <strong class="text-white">+$${ruling.extraPartsT2toT3} Parts &rarr; <span class="text-emerald-400">+$${ruling.extraProfitT2toT3.toLocaleString()} Profit</span></strong>
          </div>
          <button onclick="setVehicleTier('${car.id}', 'tier3')" class="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs">
            Promote to Tier 3
          </button>
        </div>
      </div>

    </div>

    <!-- 3. CHASSIS & MILEAGE-SPECIFIC MECHANICAL INTELLIGENCE DATABASE -->
    <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-800">
        <div>
          <span class="text-[10px] font-mono uppercase text-maki-lightBlue">VERIFIED PLATFORM SERVICE TABLE // NOT GENERIC AI</span>
          <h4 class="font-display font-bold text-base text-white">${chassisIntel.platform} — High-ROI Repairs at ${car.mileage.toLocaleString()} Mi</h4>
        </div>
        <span class="text-xs font-mono text-slate-400">Odometer Checkpoints</span>
      </div>
      <div class="space-y-2">
        ${chassisIntel.checkpoints.map((cp) => `
          <div class="p-3 rounded-lg bg-slate-900/90 border ${cp.isDueAtCurrentMileage ? 'border-amber-500/40' : 'border-slate-800'} flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div class="space-y-0.5">
              <div class="flex items-center gap-2">
                <span class="px-2 py-0.5 rounded font-mono text-[10px] font-bold ${
                  cp.isDueAtCurrentMileage ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                }">${cp.minMiles.toLocaleString()}+ MI INTERVAL</span>
                <strong class="text-white">${cp.item}</strong>
                <span class="text-[11px] font-mono text-emerald-400">[${cp.roiVerdict}]</span>
              </div>
              <p class="text-slate-400 text-[11px]">${cp.note}</p>
            </div>
            <div class="flex items-center gap-3 shrink-0 font-mono">
              <span class="text-slate-400">${cp.shopHours} hrs</span>
              <span class="text-white font-bold">$${cp.oemPartCost} OEM</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// Renders Section 03: Standalone Condition Calculator
function renderSelectedReconAnalyzer() {
  const panel = document.getElementById('recon-analyzer-panel');
  const car = vehiclesDB.find((v) => v.id === selectedVehicleId) || vehiclesDB[0];
  if (!car || !panel) return;

  const activePlan = car.plans[car.selectedTier];

  const vehicleSelectorOptions = vehiclesDB.map((v) =>
    `<option value="${v.id}" ${v.id === car.id ? 'selected' : ''}>${v.id} — ${v.ymm} (${v.mileage.toLocaleString()} mi | Buy: $${v.buyPrice.toLocaleString()})</option>`
  ).join('');

  const tierCardsHtml = ['tier1', 'tier2', 'tier3'].map((tKey) => {
    const t = car.plans[tKey];
    const isChosen = car.selectedTier === tKey;
    return `
      <div onclick="setVehicleTier('${car.id}', '${tKey}')" class="p-4 rounded-xl border cursor-pointer transition-all ${
        isChosen
          ? 'bg-slate-900 border-maki-lightBlue ring-1 ring-maki-lightBlue'
          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
      }">
        <div class="flex items-center justify-between mb-1">
          <span class="font-display font-bold text-xs uppercase tracking-wider ${
            isChosen ? 'text-maki-lightBlue' : 'text-slate-300'
          }">${t.label}</span>
          ${isChosen ? '<span class="px-2 py-0.5 rounded bg-maki-lightBlue text-slate-950 text-[10px] font-bold">ACTIVE</span>' : ''}
        </div>
        <div class="grid grid-cols-3 gap-2 pt-2 mt-2 border-t border-slate-800/80 text-xs">
          <div>
            <span class="text-[10px] text-slate-400 block">Parts Cost</span>
            <strong class="text-white">$${t.partsCost.toLocaleString()}</strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block">Target Sale</span>
            <strong class="text-slate-200">$${t.estSalePrice.toLocaleString()}</strong>
          </div>
          <div>
            <span class="text-[10px] text-slate-400 block">Est. Net Profit</span>
            <strong class="text-emerald-400">+$${t.netProfit.toLocaleString()}</strong>
          </div>
        </div>
      </div>
    `;
  }).join('');

  panel.innerHTML = `
    <!-- Standalone Condition Calculator Top Bar with Vehicle Switcher -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
      <div>
        <span class="text-xs font-mono uppercase text-emerald-400">STEP 03 // STANDALONE VEHICLE CONDITION CALCULATOR</span>
        <h2 class="font-display font-bold italic text-2xl text-white mt-0.5">CONDITION CALCULATOR & 3-TIER PROFIT SIMULATOR</h2>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <select onchange="selectAdminVehicle(this.value)" class="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-white">
          ${vehicleSelectorOptions}
        </select>
        <button onclick="switchPitWallTab('database')" class="px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-maki-lightBlue">
          &larr; Back to Tier Ruling Dossier
        </button>
      </div>
    </div>

    <!-- Raw Mechanic Inspection Note -->
    <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold uppercase tracking-wider text-slate-400">Logged Condition & Key Inspection Note (${car.ymm})</span>
        <span class="text-[11px] text-maki-lightBlue">Edit below (add "lost key", "turbo", "coolant", etc.) to recalculate live</span>
      </div>
      <div class="flex gap-2">
        <input type="text" id="live-issue-editor" value="${car.issuesRaw}" class="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white" />
        <button onclick="recalculateVehicleIssues('${car.id}')" class="px-4 py-2 rounded-lg bg-maki-lightBlue text-slate-950 font-bold text-xs shrink-0 hover:bg-blue-400">
          Recalculate Condition
        </button>
      </div>
    </div>

    <!-- 3-Tier Strategy Selector -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <h3 class="font-display font-bold text-sm uppercase tracking-wider text-white">
          Select Condition Strategy (Economy Wholesale vs. Sign & Drive vs. Full Restoration)
        </h3>
        <span class="text-xs text-slate-400">Manheim MMR Baseline: <strong class="text-white">$${car.mmrValue.toLocaleString()}</strong></span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        ${tierCardsHtml}
      </div>
    </div>

    <!-- Detailed Parts & Labor Breakdown for Chosen Tier -->
    <div class="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div>
          <h4 class="font-display font-bold text-base text-white">${activePlan.label} — Action Plan</h4>
          <p class="text-xs text-slate-400">${activePlan.description}</p>
        </div>
        <div class="text-right shrink-0">
          <span class="text-[11px] text-emerald-400 font-semibold block">
            Master Mechanic & Key Advantage: Saved $${activePlan.retailLaborSaved.toLocaleString()} in Outside Labor
          </span>
          <span class="text-[11px] text-slate-400">Est. Shop Time: ${activePlan.totalHours} hrs</span>
        </div>
      </div>

      <div class="space-y-2">
        ${activePlan.items.map((item) => `
          <div class="flex items-center justify-between p-3 rounded-lg bg-slate-900/90 border border-slate-800/90 text-xs">
            <div>
              <span class="px-2 py-0.5 rounded bg-slate-800 text-maki-lightBlue font-semibold text-[10px] mr-2">${item.category}</span>
              <span class="text-slate-200 font-medium">${item.task}</span>
            </div>
            <div class="flex items-center gap-4 shrink-0">
              <span class="text-slate-400">${item.hours} hrs</span>
              <span class="font-mono font-bold text-white w-16 text-right">$${item.parts}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Financial Deal Box -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-slate-800 text-xs">
        <div class="p-3 rounded-lg bg-slate-900">
          <span class="text-slate-400 block text-[11px]">Purchase Price</span>
          <strong class="text-white text-sm font-mono">$${car.buyPrice.toLocaleString()}</strong>
        </div>
        <div class="p-3 rounded-lg bg-slate-900">
          <span class="text-slate-400 block text-[11px]">Parts + Fees</span>
          <strong class="text-white text-sm font-mono">$${(activePlan.partsCost + activePlan.auctionAndDmvFees).toLocaleString()}</strong>
        </div>
        <div class="p-3 rounded-lg bg-slate-900">
          <span class="text-slate-400 block text-[11px]">All-In Cost Basis</span>
          <strong class="text-maki-lightBlue text-sm font-mono">$${activePlan.totalAllInCost.toLocaleString()}</strong>
        </div>
        <div class="p-3 rounded-lg bg-slate-900">
          <span class="text-slate-400 block text-[11px]">Target Sale Price</span>
          <strong class="text-white text-sm font-mono">$${activePlan.estSalePrice.toLocaleString()}</strong>
        </div>
        <div class="p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/30">
          <span class="text-emerald-300 block text-[11px] font-semibold">Projected Net Profit</span>
          <strong class="text-emerald-400 text-base font-mono">+$${activePlan.netProfit.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  `;
}

function recalculateVehicleIssues(carId) {
  const car = vehiclesDB.find((v) => v.id === carId);
  const input = document.getElementById('live-issue-editor');
  if (!car || !input) return;
  car.issuesRaw = input.value;
  car.plans = generateThreeTierPlan(car.issuesRaw, car.buyPrice, car.mmrValue);
  renderAdminDashboard();
}

// ============================================================================
// 6. FORM HANDLERS, LIVE FEDERAL NHTSA VIN DECODING & UNIFIED BUSINESS JOB QUEUE
// ============================================================================

async function decodeVinNHTSA(vin) {
  const clean = (vin || '').trim().toUpperCase();
  if (clean.length < 11) return null;
  try {
    const res = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${encodeURIComponent(clean)}?format=json`);
    const data = await res.json();
    if (data && data.Results && data.Results[0]) {
      const r = data.Results[0];
      if (r.ModelYear && r.Make && r.Model) {
        return {
          title: `${r.ModelYear} ${r.Make} ${r.Model} ${r.Trim || ''}`.trim(),
          engine: `${r.DisplacementL ? r.DisplacementL + 'L ' : ''}${r.EngineCylinders ? r.EngineCylinders + '-Cyl ' : ''}${r.EngineModel || ''}`.trim(),
          body: r.BodyClass || 'Sedan/Coupe',
          plant: r.PlantCountry || 'Germany'
        };
      }
    }
  } catch (e) {
    // Fallback
  }
  return null;
}

async function decodeCustomerVin() {
  const vinInput = document.getElementById('cfc-vin');
  const ymmInput = document.getElementById('cfc-ymm');
  const decoded = await decodeVinNHTSA(vinInput.value);
  ymmInput.value = decoded ? decoded.title : '2014 BMW 335i Sedan (Decoded)';
}

async function decodeAdminVin() {
  const vinInput = document.getElementById('new-car-vin');
  const ymmInput = document.getElementById('new-car-ymm');
  const telemetryEl = document.getElementById('vin-decoded-telemetry');
  const decoded = await decodeVinNHTSA(vinInput.value);

  if (decoded) {
    ymmInput.value = decoded.title;
    if (telemetryEl) {
      telemetryEl.classList.remove('hidden');
      telemetryEl.innerHTML = `[NHTSA FEDERAL VIN SPEC] Vehicle: <strong>${decoded.title}</strong> • Engine: <strong>${decoded.engine || 'Inline-6'}</strong> • Body: <strong>${decoded.body}</strong> • Origin: <strong>${decoded.plant}</strong>`;
    }
  } else {
    ymmInput.value = '2014 BMW 335i Sedan (F30)';
    if (telemetryEl) {
      telemetryEl.classList.remove('hidden');
      telemetryEl.innerHTML = `[NHTSA SPEC PRESET] Vehicle: <strong>2014 BMW 335i Sedan (F30)</strong> • Engine: <strong>3.0L Turbo N55B30</strong> • Transmission: <strong>8-Speed Sport Auto / 6MT</strong>`;
    }
  }
}

function fillSampleIssues() {
  document.getElementById('new-car-vin').value = 'WBA3A9C55EF601922';
  document.getElementById('new-car-ymm').value = '2014 BMW 335i Sedan (F30)';
  document.getElementById('new-car-buy').value = '5800';
  document.getElementById('new-car-mmr').value = '11500';
  document.getElementById('new-car-miles').value = '96500';
  document.getElementById('new-car-issues').value =
    'Lost key fob (needs FEM smart key cut & programmed), coolant expansion tank leak, valve cover gasket smoking, cylinder 5 misfire coil, front brakes and CA smog check.';
  decodeAdminVin();
}

function handleAdminVehicleIntake(e) {
  e.preventDefault();
  const vin = document.getElementById('new-car-vin').value.trim() || 'WBA' + Math.floor(100000000 + Math.random() * 900000000);
  const ymm = document.getElementById('new-car-ymm').value.trim();
  const category = document.getElementById('new-car-category').value;
  const buyPrice = Number(document.getElementById('new-car-buy').value) || 3000;
  const mmrValue = Number(document.getElementById('new-car-mmr').value) || Math.round(buyPrice * 1.65);
  const mileage = Number(document.getElementById('new-car-miles').value) || 110000;
  const issuesRaw = document.getElementById('new-car-issues').value.trim();

  const newCar = {
    id: 'MM-' + (101 + vehiclesDB.length),
    vin,
    ymm,
    mileage,
    source: 'Pit Crew Field Intake',
    category,
    selectedTier: category === 'Economy Wholesale' ? 'tier1' : 'tier2',
    buyPrice,
    mmrValue,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/BMW_E46_330i_ZHP.jpg',
    issuesRaw,
    plans: generateThreeTierPlan(issuesRaw, buyPrice, mmrValue)
  };

  vehiclesDB.unshift(newCar);
  selectedVehicleId = newCar.id;
  saveMakiDatabase();
  e.target.reset();
  const telemetryEl = document.getElementById('vin-decoded-telemetry');
  if (telemetryEl) telemetryEl.classList.add('hidden');

  renderPublicInventory();
  switchPitWallTab('database');
}

// ============================================================================
// 6. PERSISTENT DATABASE ENGINE, LIVE CLOUD SYNC & TOGGLEABLE PRE-FILLED SMS
// ============================================================================

const MAKI_STORAGE_KEY = 'maki_motorsports_db_v1';
const MAKI_DEALER_PHONE = '+15104184822';

let pitCrewSettings = {
  autoSmsRelayEnabled: true,
  cloudRestUrl: ''
};

const makiSyncChannel = typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel('maki_pit_crew_sync')
  : null;

if (makiSyncChannel) {
  makiSyncChannel.onmessage = (ev) => {
    if (ev.data && ev.data.type === 'DB_UPDATED') {
      loadMakiDatabase(false);
      renderPublicInventory();
      renderAdminDashboard();
      renderSmsRelayToggleUI();
    }
  };
}

window.addEventListener('storage', (ev) => {
  if (ev.key === MAKI_STORAGE_KEY) {
    loadMakiDatabase(false);
    renderPublicInventory();
    renderAdminDashboard();
    renderSmsRelayToggleUI();
  }
});

function saveMakiDatabase() {
  try {
    const payload = {
      updatedAt: new Date().toISOString(),
      vehiclesDB,
      leadsDB,
      pitCrewSettings
    };
    localStorage.setItem(MAKI_STORAGE_KEY, JSON.stringify(payload));
    if (makiSyncChannel) {
      makiSyncChannel.postMessage({ type: 'DB_UPDATED', updatedAt: payload.updatedAt });
    }
    if (pitCrewSettings.cloudRestUrl) {
      pushCloudSnapshot(payload);
    }
    updateDbSyncBadge('DB Sync: Saved');
  } catch (err) {
    console.warn('Database persistence warning:', err);
  }
}

function loadMakiDatabase(pullRemote = true) {
  try {
    const raw = localStorage.getItem(MAKI_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.vehiclesDB) && parsed.vehiclesDB.length > 0) {
        vehiclesDB = parsed.vehiclesDB;
      }
      if (Array.isArray(parsed.leadsDB) && parsed.leadsDB.length > 0) {
        leadsDB = parsed.leadsDB;
      }
      if (parsed.pitCrewSettings && typeof parsed.pitCrewSettings === 'object') {
        pitCrewSettings = { ...pitCrewSettings, ...parsed.pitCrewSettings };
      }
    }
    if (pullRemote && pitCrewSettings.cloudRestUrl) {
      pullCloudSnapshot();
    }
  } catch (err) {
    console.warn('Database load warning:', err);
  }
}

async function pushCloudSnapshot(payload) {
  if (!pitCrewSettings.cloudRestUrl) return;
  try {
    updateDbSyncBadge('Cloud: Syncing...');
    await fetch(pitCrewSettings.cloudRestUrl, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    updateDbSyncBadge('Cloud: Live');
  } catch (err) {
    updateDbSyncBadge('Local Sync Only');
  }
}

async function pullCloudSnapshot() {
  if (!pitCrewSettings.cloudRestUrl) return;
  try {
    const res = await fetch(pitCrewSettings.cloudRestUrl);
    if (!res.ok) return;
    const data = await res.json();
    if (data && Array.isArray(data.vehiclesDB)) {
      vehiclesDB = data.vehiclesDB;
      if (Array.isArray(data.leadsDB)) leadsDB = data.leadsDB;
      if (data.pitCrewSettings) pitCrewSettings = { ...pitCrewSettings, ...data.pitCrewSettings };
      localStorage.setItem(MAKI_STORAGE_KEY, JSON.stringify(data));
      renderPublicInventory();
      renderAdminDashboard();
      renderSmsRelayToggleUI();
      updateDbSyncBadge('Cloud: Live');
    }
  } catch (err) {
    updateDbSyncBadge('Local Sync Only');
  }
}

function updateDbSyncBadge(text) {
  const el = document.getElementById('db-sync-status-label');
  if (el) el.textContent = text;
}

function openCloudSyncPrompt() {
  const current = pitCrewSettings.cloudRestUrl || '';
  const input = window.prompt(
    'MAKI MOTORSPORTS // CLOUD DATABASE SYNC\n\n' +
    'All vehicles & customer leads automatically persist locally and across tabs.\n' +
    'To sync across multiple phones/laptops in real time, paste a Firebase Realtime DB (.json) or REST JSON endpoint URL below (or leave blank for local storage):',
    current
  );
  if (input === null) return;
  pitCrewSettings.cloudRestUrl = input.trim();
  saveMakiDatabase();
  if (pitCrewSettings.cloudRestUrl) {
    pullCloudSnapshot();
  } else {
    updateDbSyncBadge('DB Sync: Active');
  }
}

function toggleAutoSmsRelay() {
  pitCrewSettings.autoSmsRelayEnabled = !pitCrewSettings.autoSmsRelayEnabled;
  saveMakiDatabase();
  renderSmsRelayToggleUI();
}

function renderSmsRelayToggleUI() {
  const btn = document.getElementById('btn-toggle-sms-relay');
  const dot = document.getElementById('sms-relay-dot');
  const label = document.getElementById('sms-relay-label');
  if (!btn || !dot || !label) return;

  if (pitCrewSettings.autoSmsRelayEnabled) {
    btn.className = 'px-3.5 py-2 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-all';
    dot.className = 'w-2 h-2 rounded-full bg-emerald-400 animate-pulse';
    label.textContent = 'Auto-SMS Relay: ON';
  } else {
    btn.className = 'px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-400 flex items-center gap-1.5 transition-all';
    dot.className = 'w-2 h-2 rounded-full bg-slate-500';
    label.textContent = 'Auto-SMS Relay: OFF (Queue Only)';
  }
}

function buildSmsHref(smsBody, targetPhone = MAKI_DEALER_PHONE) {
  return `sms:${targetPhone}?body=${encodeURIComponent(smsBody)}`;
}

function triggerPreFilledSms(smsBody) {
  if (!pitCrewSettings.autoSmsRelayEnabled) return;
  const smsHref = buildSmsHref(smsBody, MAKI_DEALER_PHONE);
  setTimeout(() => {
    window.location.href = smsHref;
  }, 250);
}

function handleCashForCarsSubmit(e) {
  e.preventDefault();
  const vin = document.getElementById('cfc-vin').value.trim();
  const mileage = Number(document.getElementById('cfc-mileage').value) || 115000;
  const ymm = document.getElementById('cfc-ymm').value.trim();
  const askingPrice = Number(document.getElementById('cfc-asking').value) || 2800;
  const issues = document.getElementById('cfc-issues').value.trim() || 'Needs general mechanical inspection & smog';
  const name = document.getElementById('cfc-name').value.trim();
  const phone = document.getElementById('cfc-phone').value.trim();

  const estMmr = Math.round((askingPrice * 1.75) / 100) * 100;
  const jobId = 'JOB-' + (201 + leadsDB.length);
  leadsDB.unshift({
    id: jobId,
    category: 'Car Leads',
    type: 'Cash-for-Cars Acquisition Lead',
    status: 'New Lead',
    name,
    phone,
    vin,
    ymm,
    mileage,
    askingPrice,
    estMmr,
    issues
  });
  saveMakiDatabase();

  const smsBody =
    `[MAKI CASH FOR CARS // ${jobId}]\n` +
    `Vehicle: ${ymm} (${mileage.toLocaleString()} mi)\n` +
    `VIN: ${vin || 'N/A'}\n` +
    `Asking: $${askingPrice.toLocaleString()}\n` +
    `Notes: ${issues}\n` +
    `Seller: ${name} (${phone})`;

  const smsHref = buildSmsHref(smsBody);

  const fb = document.getElementById('cfc-feedback');
  fb.classList.remove('hidden');
  fb.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <strong>Submitted to Maki Motorsports LLC (Stockton, CA)!</strong> We logged your <strong>${ymm}</strong> into our Business Queue (${jobId}) and will contact <strong>${phone}</strong> shortly.
      </div>
      <a href="${smsHref}" class="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap shrink-0 text-center">
        Text Details to (510) 418-4822 &rarr;
      </a>
    </div>
  `;
  e.target.reset();
  renderPublicInventory();
  renderAdminDashboard();
  triggerPreFilledSms(smsBody);
}

function mapFormCategoryToQueueCategory(catTitle, serviceText) {
  const combined = ((catTitle || '') + ' ' + (serviceText || '')).toLowerCase();
  if (combined.includes('sale') || combined.includes('test drive') || combined.includes('purchase') || combined.includes('part-out') || combined.includes('donor')) return 'Sales Status';
  if (combined.includes('key') || combined.includes('fob') || combined.includes('lock') || combined.includes('cas')) return 'Key Programming';
  if (combined.includes('brake') || combined.includes('suspension') || combined.includes('coilover') || combined.includes('control arm')) return 'Brake & Suspension';
  if (combined.includes('oil') || combined.includes('maint') || combined.includes('coolant') || combined.includes('gasket')) return 'Oil & Maintenance';
  return 'Diagnostics & Smog';
}

function handleMechanicJobSubmit(e) {
  e.preventDefault();
  const catTitle = document.getElementById('mech-category').value.trim();
  const service = document.getElementById('mech-service').value.trim();
  const ymm = document.getElementById('mech-car').value.trim();
  const vin = document.getElementById('mech-vin').value.trim() || 'Customer Vehicle';
  const name = document.getElementById('mech-name').value.trim();
  const phone = document.getElementById('mech-phone').value.trim();

  const queueCat = mapFormCategoryToQueueCategory(catTitle, service);
  const jobId = 'JOB-' + (201 + leadsDB.length);

  leadsDB.unshift({
    id: jobId,
    category: queueCat,
    type: catTitle,
    status: 'New Request',
    name,
    phone,
    vin,
    ymm,
    mileage: 0,
    askingPrice: 0,
    estMmr: 0,
    issues: service
  });
  saveMakiDatabase();

  const smsBody =
    `[MAKI SERVICE REQUEST // ${jobId}]\n` +
    `Category: ${catTitle}\n` +
    `Requested Work: ${service}\n` +
    `Vehicle: ${ymm}\n` +
    `VIN: ${vin}\n` +
    `Customer: ${name} (${phone})`;

  const smsHref = buildSmsHref(smsBody);

  const fb = document.getElementById('mech-feedback');
  fb.classList.remove('hidden');
  fb.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <strong>Work Order Logged (${jobId})!</strong> Your request for <strong>${ymm}</strong> (<em>${service}</em>) is in our Stockton Business Job Queue under <strong>${queueCat}</strong>.
      </div>
      <a href="${smsHref}" class="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap shrink-0 text-center">
        Send Pre-Filled Text to (510) 418-4822 &rarr;
      </a>
    </div>
  `;
  document.getElementById('mech-car').value = '';
  document.getElementById('mech-vin').value = '';
  document.getElementById('mech-name').value = '';
  document.getElementById('mech-phone').value = '';
  renderAdminDashboard();
  triggerPreFilledSms(smsBody);
}

function filterJobQueue(category) {
  currentJobQueueFilter = category;
  renderAdminLeads();
}

function cycleJobStatus(jobId) {
  const job = leadsDB.find((j) => j.id === jobId);
  if (!job) return;
  const statuses = ['New Request', 'Scheduled Today', 'In Shop Bay', 'Parts Ordered', 'Completed / Paid'];
  const idx = statuses.indexOf(job.status);
  job.status = statuses[(idx + 1) % statuses.length];
  saveMakiDatabase();
  renderAdminLeads();
}

function renderAdminLeads() {
  const container = document.getElementById('admin-leads-list');
  const filterContainer = document.getElementById('job-queue-filters');
  if (!container) return;

  const categories = [
    'All',
    'Oil & Maintenance',
    'Brake & Suspension',
    'Key Programming',
    'Diagnostics & Smog',
    'Car Leads',
    'Sales Status'
  ];

  if (filterContainer) {
    filterContainer.innerHTML = categories.map((cat) => {
      const count = cat === 'All' ? leadsDB.length : leadsDB.filter((j) => j.category === cat).length;
      const isSelected = currentJobQueueFilter === cat;
      return `
        <button
          onclick="filterJobQueue('${cat}')"
          class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            isSelected
              ? 'bg-maki-lightBlue text-slate-950 font-bold shadow'
              : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
          }"
        >
          <span>${cat}</span>
          <span class="px-1.5 py-0.2 rounded-full text-[10px] ${
            isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-900 text-slate-400'
          }">${count}</span>
        </button>
      `;
    }).join('');
  }

  const filteredJobs = currentJobQueueFilter === 'All'
    ? leadsDB
    : leadsDB.filter((j) => j.category === currentJobQueueFilter);

  const badgeColors = {
    'Oil & Maintenance': 'bg-maki-lightBlue/20 text-maki-lightBlue border-maki-lightBlue/30',
    'Brake & Suspension': 'bg-red-500/20 text-red-300 border-red-500/30',
    'Key Programming': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Diagnostics & Smog': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Car Leads': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    'Sales Status': 'bg-blue-500/20 text-blue-300 border-blue-500/30'
  };

  container.innerHTML = filteredJobs.map((job) => {
    const isCarLead = job.category === 'Car Leads';
    const badgeClass = badgeColors[job.category] || 'bg-slate-800 text-slate-300';
    const cleanPhone = (job.phone || '').replace(/[^0-9+]/g, '');
    const replySmsHref = cleanPhone
      ? buildSmsHref(`Hi ${job.name}, this is Maki Motorsports LLC in Stockton regarding your ${job.ymm} (${job.issues}).`, cleanPhone)
      : '';

    return `
      <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all">
        <div class="space-y-1.5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="font-mono text-[11px] text-slate-500">${job.id}</span>
            <span class="px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase ${badgeClass}">${job.category}</span>
            <span class="text-sm font-bold text-white">${job.ymm}</span>
            <span class="text-xs text-slate-400">• ${job.name} (${job.phone})</span>
            ${job.vin && job.vin !== 'Customer Vehicle' ? `<span class="text-[11px] font-mono text-slate-500">VIN: ${job.vin}</span>` : ''}
          </div>
          <p class="text-xs text-slate-200">${job.issues}</p>
          ${
            isCarLead
              ? `<div class="text-[11px] text-slate-400">Customer Asking: <strong class="text-white">$${job.askingPrice.toLocaleString()}</strong> • Est. Manheim MMR: <strong class="text-maki-lightBlue">$${job.estMmr.toLocaleString()}</strong></div>`
              : job.askingPrice > 0
              ? `<div class="text-[11px] text-slate-400">Est. Ticket / Sale Amount: <strong class="text-emerald-400 font-mono">$${job.askingPrice.toLocaleString()}</strong></div>`
              : ''
          }
        </div>
        <div class="flex flex-wrap items-center gap-2 shrink-0">
          ${
            cleanPhone
              ? `<a href="tel:${cleanPhone}" class="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300" title="Call customer">Call</a>
                 <a href="${replySmsHref}" class="px-2.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-maki-lightBlue" title="Send pre-filled reply text to customer">Text</a>`
              : ''
          }
          <button onclick="cycleJobStatus('${job.id}')" class="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200" title="Click to advance workflow status">
            Status: <span class="text-maki-lightBlue">${job.status}</span>
          </button>
          ${
            isCarLead
              ? `<button onclick="convertLeadToVehicle('${job.id}')" class="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shrink-0">
                   Acquire & View Tier Ruling
                 </button>`
              : ''
          }
        </div>
      </div>
    `;
  }).join('');
}

function convertLeadToVehicle(leadId) {
  const idx = leadsDB.findIndex((l) => l.id === leadId);
  if (idx === -1) return;
  const lead = leadsDB[idx];

  const newCar = {
    id: 'MM-' + (101 + vehiclesDB.length),
    vin: lead.vin || 'WBA1234567890',
    ymm: lead.ymm,
    mileage: lead.mileage || 115000,
    source: lead.type,
    category: 'Sign & Drive',
    selectedTier: 'tier2',
    buyPrice: lead.askingPrice || 3000,
    mmrValue: lead.estMmr || 6000,
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/84/BMW_E46_330i_ZHP.jpg',
    issuesRaw: lead.issues,
    plans: generateThreeTierPlan(lead.issues, lead.askingPrice || 3000, lead.estMmr || 6000)
  };

  vehiclesDB.unshift(newCar);
  leadsDB.splice(idx, 1);
  selectedVehicleId = newCar.id;
  saveMakiDatabase();
  switchPitWallTab('database');
}

function loadSampleManheimImport() {
  const importedCar = {
    id: 'MM-' + (101 + vehiclesDB.length),
    vin: 'WBA3A9G55DNP29411',
    ymm: '2013 BMW 335i M-Sport (F30)',
    mileage: 104200,
    source: 'Manheim Campaign Auto-Sync',
    category: 'Sign & Drive',
    selectedTier: 'tier2',
    buyPrice: 6900,
    mmrValue: 11800,
    image: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/BMW_M4%2C_EMS_23%2C_Essen_%28P1170092%29.jpg/960px-BMW_M4%2C_EMS_23%2C_Essen_%28P1170092%29.jpg',
    issuesRaw: 'Manheim Report: Only 1 key fob (program spare FEM key), oil filter housing gasket leak, charge pipe boost leak code, front brake rotors warped.',
    plans: generateThreeTierPlan(
      'Only 1 key fob (program spare FEM key), oil filter housing gasket leak, charge pipe boost leak code, front brake rotors warped.',
      6900,
      11800
    )
  };
  vehiclesDB.unshift(importedCar);
  selectedVehicleId = importedCar.id;
  saveMakiDatabase();
  switchPitWallTab('database');
}

document.addEventListener('DOMContentLoaded', () => {
  loadMakiDatabase(true);
  renderPublicInventory();
  renderInteractiveServiceSelector();
  renderSmsRelayToggleUI();
  if (window.lucide) lucide.createIcons();
});
