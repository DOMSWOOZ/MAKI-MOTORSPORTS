// ============================================================================
// MAKI MOTORSPORTS LLC - ALL-MAKES DEALER, MASTER MECHANIC & PIT CREW SYSTEM
// ============================================================================

// 1. MASTER MECHANIC & KEY PROGRAMMING ISSUE PARSER (3-TIER KNOWLEDGE BASE)
const MECHANIC_KNOWLEDGE_BASE = [
  {
    keywords: ['key', 'fob', 'lost key', 'no key', 'immobilizer', 'smart key', 'transponder', 'ignition lock', 'spare key'],
    category: 'Key Cutting & Smart Fob Programming',
    tier1: { task: 'Cut Emergency Door/Ignition Blade + Program Basic Transponder Chip In-House', parts: 28, hours: 0.8 },
    tier2: { task: 'Cut & Program New OEM-Style Smart Key Fob + Clear Lost Key Slots from Immobilizer', parts: 65, hours: 1.2 },
    tier3: { task: 'Program 2x New Proximity Smart Key Fobs + Ignition Switch Service + Full Diagnostic Sync', parts: 145, hours: 2.0 }
  },
  {
    keywords: ['coolant', 'expansion tank', 'overheat', 'water pump', 'thermostat', 'radiator'],
    category: 'Cooling System',
    tier1: { task: 'Replace leaking hose/thermostat housing + pressure test & refill coolant', parts: 65, hours: 1.5 },
    tier2: { task: 'OEM Water Pump, Thermostat & Radiator Hose Refresh + Full Coolant Flush', parts: 215, hours: 2.8 },
    tier3: { task: 'Complete Cooling Overhaul (New Radiator, Water Pump, Thermostat, Fans & All Hoses)', parts: 540, hours: 4.5 }
  },
  {
    keywords: ['valve cover', 'oil leak', 'gasket', 'oil filter housing', 'oil pan', 'timing cover'],
    category: 'Engine Seals & Oil Leaks',
    tier1: { task: 'Replace Valve Cover Gasket & Oil Filter Seal + degrease engine bay', parts: 55, hours: 2.0 },
    tier2: { task: 'OEM Valve Cover Gasket Set + PCV Valve + Fresh Full Synthetic Oil & Filter Service', parts: 185, hours: 3.0 },
    tier3: { task: 'Complete Engine Reseal (Valve Cover, Oil Pan Gasket, Rear Main / Front Crank Seal)', parts: 490, hours: 7.5 }
  },
  {
    keywords: ['misfire', 'coil', 'spark plug', 'rough idle', 'p030', 'injector', 'tune-up', 'tune up'],
    category: 'Ignition & Tune-Up',
    tier1: { task: 'Replace faulty Ignition Coil(s) + Spark Plugs & clear misfire codes', parts: 68, hours: 1.0 },
    tier2: { task: 'Full Set of OEM Iridium Spark Plugs + Denso/Bosch Ignition Coils + Throttle Body Clean', parts: 210, hours: 1.5 },
    tier3: { task: 'Full Ignition Overhaul + Fuel Injector Cleaning/Replacement + Intake Valve Service', parts: 640, hours: 4.0 }
  },
  {
    keywords: ['smog', 'p0420', 'cat', 'o2', 'check engine', 'cel', 'emissions', 'evap', 'lean'],
    category: 'CA Smog & Check Engine',
    tier1: { task: 'Fix vacuum/exhaust leak, replace faulty O2 sensor & complete CA Smog drive cycle', parts: 75, hours: 1.5 },
    tier2: { task: 'Upstream + Downstream O2/AFR Sensors, EVAP Smoke Test & Official CA STAR Smog Certificate', parts: 195, hours: 2.0 },
    tier3: { task: 'CARB-Compliant Replacement Catalytic Converter + All O2 Sensors + Full Emissions Cert', parts: 760, hours: 3.5 }
  },
  {
    keywords: ['brake', 'rotor', 'pad', 'caliper', 'squeak'],
    category: 'Brakes & Rotors',
    tier1: { task: 'Install daily-driver ceramic brake pads + resurface/replace worn front rotors', parts: 95, hours: 1.5 },
    tier2: { task: 'New Coated Front & Rear Brake Rotors + Ceramic Low-Dust Pads + Brake Fluid Flush', parts: 310, hours: 2.5 },
    tier3: { task: 'Heavy-Duty / Performance Slotted Rotors, New Calipers, Ceramic Pads & Stainless Lines', parts: 740, hours: 4.0 }
  },
  {
    keywords: ['bumper', 'paint', 'dent', 'fender', 'clear coat', 'cosmetic', 'hood', 'trim'],
    category: 'Body & Exterior',
    tier1: { task: 'Re-clip/align bumper brackets, touch-up paint & restore cloudy headlights', parts: 45, hours: 1.5 },
    tier2: { task: 'CAPA Certified Replacement Bumper Cover + Color-Matched Paint Blend + Machine Polish', parts: 380, hours: 3.5 },
    tier3: { task: 'Full Panel Refinish + Paint Correction + Interior/Exterior Ceramic Detail', parts: 1150, hours: 7.5 }
  },
  {
    keywords: ['suspension', 'control arm', 'strut', 'shock', 'clunk', 'bushing', 'tie rod'],
    category: 'Suspension & Steering',
    tier1: { task: 'Replace worn sway bar end-links & front control arm bushings', parts: 85, hours: 1.5 },
    tier2: { task: 'New Front Lower Control Arms, Quick-Strut Assemblies & 4-Wheel Alignment', parts: 420, hours: 3.5 },
    tier3: { task: 'Complete Front & Rear Suspension Refresh (Struts, Shocks, Control Arms, Tie Rods, Alignment)', parts: 980, hours: 6.0 }
  },
  {
    keywords: ['tire', 'wheel', 'curb', 'alignment', 'bald'],
    category: 'Wheels & Tires',
    tier1: { task: 'Mount 2 matching high-tread tires + balance to pass safety inspection', parts: 130, hours: 1.0 },
    tier2: { task: 'Full Set of 4 New All-Season Tires + Computer Balance + 4-Wheel Alignment', parts: 490, hours: 1.5 },
    tier3: { task: 'Refinished Alloy Wheels + 4 Premium Michelin / Bridgestone Tires + Alignment', parts: 1190, hours: 2.0 }
  },
  {
    keywords: ['turbo', 'wastegate', 'boost', 'charge pipe', 'intercooler'],
    category: 'Turbo & Boost System',
    tier1: { task: 'Replace cracked boost/charge pipe & vacuum lines + test wastegate actuator', parts: 135, hours: 2.0 },
    tier2: { task: 'Rebuilt OEM Turbocharger Cartridge + Oil Feed Lines + Upgraded Charge Pipe', parts: 560, hours: 6.0 },
    tier3: { task: 'New Complete OEM Turbocharger Assembly + Intercooler + All Boost Sensors', parts: 1380, hours: 8.5 }
  },
  {
    keywords: ['ac', 'air conditioning', 'compressor', 'warm', 'freon', 'blower'],
    category: 'A/C & Climate Control',
    tier1: { task: 'Replace A/C valve cores/O-rings, vacuum leak test & R134a/R1234yf recharge', parts: 55, hours: 1.0 },
    tier2: { task: 'New Denso OEM A/C Compressor + Condenser Drier + Full Vacuum Evac & Recharge', parts: 320, hours: 3.0 },
    tier3: { task: 'Complete A/C Overhaul (Compressor, Condenser, Expansion Valve & Cabin Blower Motor)', parts: 590, hours: 4.5 }
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
    subtitle: 'Full synthetic oil changes, gaskets, cooling & fluid flushes',
    subIssues: [
      'Full Synthetic Oil & OEM Filter Service',
      'Valve Cover Gasket & Engine Oil Leak Repair',
      'Cooling System Service (Water Pump, Thermostat & Radiator)',
      'Spark Plugs, Ignition Coils & 100k-Mile Tune-Up'
    ]
  },
  {
    id: 'brakes-susp',
    title: 'Brakes, Suspension & Steering',
    icon: 'disc',
    accent: 'maki-red',
    subtitle: 'Brake pads, rotors, struts, control arms & wheel bearings',
    subIssues: [
      'Front & Rear Brake Pads + Rotors Replacement',
      'Control Arms, Ball Joints & Suspension Clunk Repair',
      'Struts, Shocks & Ride Quality Refresh',
      'Brake Fluid Flush & Safety Inspection'
    ]
  },
  {
    id: 'keys-elec',
    title: 'Key Programming & Automotive Locksmith',
    icon: 'key-round',
    accent: 'emerald-400',
    subtitle: 'Smart key fobs, laser key cutting & lost-all-keys service',
    subIssues: [
      'Cut & Program New Smart Key Fob (Spare Key)',
      'Lost All Keys — On-Site Immobilizer & Smart Key Programming',
      'Ignition Switch / Steering Lock & Start Button Repair',
      'ECU / Immobilizer Module Sync & Electrical Diagnostics'
    ]
  },
  {
    id: 'diag-engine',
    title: 'Diagnostics, Smog & Engine Work',
    icon: 'gauge',
    accent: 'amber-400',
    subtitle: 'Check engine lights, CA Smog prep, A/C repair & inspections',
    subIssues: [
      'Check Engine Light (CEL) & CA Smog Diagnostics',
      'A/C Recharge, Compressor & Cooling Repair',
      'Starter, Alternator & Battery Charging Diagnostics',
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
                ? 'bg-slate-900 border-maki-lightBlue ring-1 ring-maki-lightBlue shadow-sm'
                : 'bg-maki-card border-slate-700 hover:border-slate-600'
            }"
          >
            <div class="w-10 h-10 rounded-xl bg-slate-950 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5">
              <i data-lucide="${cat.icon}" class="w-5 h-5 text-${cat.accent}"></i>
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between gap-2">
                <h4 class="font-display font-bold text-sm sm:text-base text-white">${cat.title}</h4>
                ${isSelected ? '<span class="px-2 py-0.5 rounded-md bg-maki-lightBlue text-slate-950 text-xs font-bold">Selected</span>' : ''}
              </div>
              <p class="text-xs sm:text-sm text-slate-400 mt-1">${cat.subtitle}</p>
            </div>
          </button>
        `;
      }).join('')}
    </div>

    <!-- Sub-Issue Breakdown Pills (Click any issue to auto-populate & scroll to form) -->
    <div class="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs sm:text-sm font-semibold text-maki-lightBlue">
          ${activeCat.title} — Tap a specific service to fill your form below:
        </span>
      </div>
      <div class="flex flex-wrap gap-2">
        ${activeCat.subIssues.map((issue) => {
          const isChosen = issue === activePublicSubIssue;
          return `
            <button
              type="button"
              onclick="selectSpecificServiceIssue('${activeCat.id}', '${issue.replace(/'/g, "\\'")}')"
              class="px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left flex items-center gap-2 ${
                isChosen
                  ? 'bg-maki-lightBlue text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-200 border border-slate-700 hover:border-maki-lightBlue'
              }"
            >
              <span>${issue}</span>
              <i data-lucide="arrow-down-right" class="w-4 h-4 opacity-75 shrink-0"></i>
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
// 1C. ALL-MAKES VEHICLE PLATFORM & MILEAGE SERVICE GUIDE
// ============================================================================
const CHASSIS_SERVICE_DATABASE = [
  {
    match: ['toyota', 'camry', 'corolla', 'rav4', 'lexus', 'is 350', 'is350', 'es350', 'rx350'],
    platform: 'Toyota / Lexus (2.5L 4-Cyl & 3.5L V6 Platforms)',
    commonCheckpoints: [
      { minMiles: 75000, item: 'Aisin Water Pump & Coolant Flush', oemPartCost: 145, shopHours: 2.2, roiVerdict: 'High ROI (Sign & Drive)', note: 'Weep-hole seepage starts around 80k–100k miles; replacing early locks in top retail buyer confidence.' },
      { minMiles: 90000, item: 'Denso Iridium Spark Plugs & Valve Cover Gasket', oemPartCost: 95, shopHours: 1.8, roiVerdict: 'High ROI (Smooth Idle)', note: 'Restores fuel economy and smooth idle; quick in-house job.' },
      { minMiles: 100000, item: 'Front Lower Control Arms & Ceramic Brake Service', oemPartCost: 240, shopHours: 2.5, roiVerdict: 'Sign & Drive Standard', note: 'Eliminates highway vibration and brake squeal on test drives.' }
    ]
  },
  {
    match: ['honda', 'accord', 'civic', 'cr-v', 'crv', 'acura', 'tsx', 'tlx'],
    platform: 'Honda / Acura (1.5T / 2.4L K-Series / 3.5L V6)',
    commonCheckpoints: [
      { minMiles: 75000, item: 'VTEC Solenoid Spool Valve Gasket & Valve Cover Seal', oemPartCost: 55, shopHours: 1.5, roiVerdict: 'Critical (Stop Oil Drip)', note: 'Very common oil leak point on Honda 4-cylinder & V6 engines—cheap part, huge buyer peace of mind.' },
      { minMiles: 90000, item: 'CVT / Automatic Transmission Fluid Drain & Fill + Engine Mounts', oemPartCost: 135, shopHours: 1.8, roiVerdict: 'High ROI (Sign & Drive)', note: 'Eliminates shift shudder and idle vibration at stoplights.' },
      { minMiles: 105000, item: 'Starter / Alternator Brush Check & Smart Key Fob Programming', oemPartCost: 160, shopHours: 1.5, roiVerdict: 'In-House Advantage', note: 'Including 2 working smart keys adds $400+ to retail sale value.' }
    ]
  },
  {
    match: ['ford', 'f-150', 'f150', 'chevy', 'silverado', 'tahoe', 'ram', 'gmc', 'sierra'],
    platform: 'Domestic Trucks & SUVs (Ford F-150 / Chevy Silverado / GMC / Ram)',
    commonCheckpoints: [
      { minMiles: 80000, item: 'Motorcraft / ACDelco Spark Plugs & Ignition Coils', oemPartCost: 165, shopHours: 2.0, roiVerdict: 'Mandatory (Fix Misfires)', note: 'Prevents load misfires on EcoBoost and V8 trucks; essential for passing CA Smog.' },
      { minMiles: 95000, item: 'Thermostat, Coolant Y-Pipe / Tee & Radiator Service', oemPartCost: 120, shopHours: 1.8, roiVerdict: 'High ROI (Prevent Overheat)', note: 'Plastic heater/coolant tees commonly seep past 90k miles.' },
      { minMiles: 110000, item: 'Front Upper Control Arms, Ball Joints & Heavy-Duty Brakes', oemPartCost: 310, shopHours: 3.0, roiVerdict: 'Sign & Drive Truck Spec', note: 'Tightens steering feel and commands top retail truck money.' }
    ]
  },
  {
    match: ['bmw', '335', '328', '330', 'm4', '535', 'mercedes', 'audi'],
    platform: 'European Platforms (BMW / Mercedes / Audi Turbo & Inline-6)',
    commonCheckpoints: [
      { minMiles: 65000, item: 'Valve Cover Gasket & Oil Filter Housing Seal', oemPartCost: 85, shopHours: 2.5, roiVerdict: 'Critical (Stop Oil Leak)', note: 'Prevents oil from dripping onto belts or exhaust manifolds.' },
      { minMiles: 80000, item: 'Electric Water Pump, Thermostat & Expansion Tank Refresh', oemPartCost: 290, shopHours: 3.0, roiVerdict: 'High ROI (Sign & Drive)', note: 'Proactive cooling refresh is the #1 selling point for European vehicles.' },
      { minMiles: 95000, item: 'Ignition Coils, Spark Plugs & Smart Key Fob Programming', oemPartCost: 210, shopHours: 1.8, roiVerdict: 'In-House Advantage', note: 'Saves over $900 vs. dealership service & key replacement.' }
    ]
  }
];

function lookupChassisIntelligence(ymm, mileage) {
  const lower = (ymm || '').toLowerCase();
  const found = CHASSIS_SERVICE_DATABASE.find((entry) =>
    entry.match.some((kw) => lower.includes(kw))
  ) || CHASSIS_SERVICE_DATABASE[0];

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
  let verdictBadge = 'Recommended: Tier 2 (Sign & Drive Retail)';
  let verdictColor = 'emerald';
  let rulingExplanation = '';
  let investmentVerdict = '';

  if (car.category === 'Part-Outs') {
    recommendedTier = 'tier1';
    verdictBadge = 'Ruling: Donor Part-Out Vehicle';
    verdictColor = 'red';
    rulingExplanation = `At ${car.mileage.toLocaleString()} miles and a $${car.buyPrice.toLocaleString()} buy-in, collision or structural damage makes retail reconditioning uneconomical. Harvesting the engine, transmission, electronics, and body panels yields the highest return.`;
    investmentVerdict = `Do not spend money on cosmetic or retail parts. Pull the drivetrain and high-demand OEM assemblies in-house.`;
  } else if (car.mileage > 140000 && car.mmrValue < 6000) {
    recommendedTier = 'tier1';
    verdictBadge = 'Ruling: Tier 1 (Economy Wholesale Flip)';
    verdictColor = 'blue';
    rulingExplanation = `With ${car.mileage.toLocaleString()} miles and a $${car.mmrValue.toLocaleString()} market baseline, keeping parts spend to $${t1.partsCost} (${t1.totalHours} shop hrs) protects your margin and sells quickly.`;
    investmentVerdict = `Optional Upgrade: Spending an extra $${extraPartsT1toT2} in Tier 2 parts + ${extraHoursT1toT2} hrs would add +$${extraProfitT1toT2.toLocaleString()} in net profit (${roiT1toT2}% Parts ROI) if you move it to Sign & Drive.`;
  } else if (car.mmrValue >= 14000) {
    recommendedTier = 'tier2';
    verdictBadge = 'Ruling: High-Demand Vehicle — Tier 2 or Tier 3 Worthy';
    verdictColor = 'emerald';
    rulingExplanation = `Strong $${car.mmrValue.toLocaleString()} market value on this ${car.ymm}. Spending $${extraPartsT1toT2} more to move from Tier 1 to Tier 2 unlocks +$${extraProfitT1toT2.toLocaleString()} in additional net profit (${roiT1toT2}% Parts ROI).`;
    investmentVerdict = `Worth Full Investment: Stepping up to Tier 3 (Full Restoration) requires $${extraPartsT2toT3} more in parts (${extraHoursT2toT3} shop hrs) and yields +$${extraProfitT2toT3.toLocaleString()} additional profit (${roiT2toT3}% Parts ROI).`;
  } else {
    recommendedTier = 'tier2';
    verdictBadge = 'Ruling: Tier 2 (Sign & Drive Sweet Spot)';
    verdictColor = 'emerald';
    rulingExplanation = `Spending $${t2.partsCost} on Tier 2 parts (${t2.totalHours} hrs in-house labor) positions this ${car.ymm} for full Sign & Drive retail pricing ($${t2.estSalePrice.toLocaleString()}) while saving $${t2.retailLaborSaved.toLocaleString()} in outside mechanic labor.`;
    investmentVerdict = `Upgrading from Tier 1 to Tier 2 costs only $${extraPartsT1toT2} in extra parts and nets +$${extraProfitT1toT2.toLocaleString()} more profit (${roiT1toT2}% ROI).`;
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
      'Tier 1: Economy Wholesale',
      'emerald',
      1.08,
      'Lowest cost path to get the vehicle running, driving, keyed, and passing CA Smog for a quick Economy Wholesale sale.'
    ),
    tier2: buildTierSummary(
      'tier2',
      'Tier 2: Sign & Drive Retail',
      'blue',
      1.34,
      'Turnkey Sign & Drive retail spec. OEM-quality replacement parts, programmed smart key fob, CA STAR Smog & full detail.'
    ),
    tier3: buildTierSummary(
      'tier3',
      'Tier 3: Full Restoration',
      'red',
      1.62,
      'Complete mechanical & cosmetic refresh. Overhauled cooling, suspension, brakes, paint correction & 2 smart keys.'
    )
  };
}

// ============================================================================
// 2. SEED INVENTORY: ALL-MAKES DEALERSHIP & MECHANIC FLEET (VERIFIED PHOTOS)
// ============================================================================
function resolveVehiclePhoto(ymm) {
  const lower = (ymm || '').toLowerCase();
  if (lower.includes('camry')) return 'assets/vehicles/camry-2018.jpg';
  if (lower.includes('accord')) return 'assets/vehicles/accord-2017.jpg';
  if (lower.includes('lexus') || lower.includes('is 350') || lower.includes('is350')) return 'assets/vehicles/lexus-is350.jpg';
  if (lower.includes('f-150') || lower.includes('f150') || lower.includes('ford') || lower.includes('silverado') || lower.includes('truck')) return 'assets/vehicles/f150-2014.jpg';
  if (lower.includes('bmw') || lower.includes('335') || lower.includes('328') || lower.includes('330')) return 'assets/vehicles/bmw-335i-2013.jpg';
  if (lower.includes('civic')) return 'assets/vehicles/civic-2012.jpg';
  if (lower.includes('corolla')) return 'assets/vehicles/corolla-2016.jpg';
  if (lower.includes('cr-v') || lower.includes('crv') || lower.includes('rav4') || lower.includes('suv')) return 'assets/vehicles/crv-2015.jpg';
  if (lower.includes('altima') || lower.includes('nissan')) return 'assets/vehicles/altima-2017.jpg';
  return 'assets/vehicles/camry-2018.jpg';
}

let vehiclesDB = [
  {
    id: 'MM-101',
    vin: '4T1B11HK5JU610294',
    ymm: '2018 Toyota Camry SE',
    mileage: 78400,
    source: 'California Dealer Lane',
    category: 'Sign & Drive',
    selectedTier: 'tier2',
    buyPrice: 10900,
    mmrValue: 14200,
    image: 'assets/vehicles/camry-2018.jpg',
    issuesRaw: 'Front brake pads & rotors worn, needs spare smart key fob programmed, synthetic oil & filter service.',
    publicHighlights: '2.5L 4-Cylinder • Fresh Ceramic Brakes, Full Synthetic Service & 2 Programmed Smart Keys'
  },
  {
    id: 'MM-102',
    vin: '1HGCR2F59HA184022',
    ymm: '2017 Honda Accord Sport',
    mileage: 92100,
    source: 'Direct Cash-for-Cars Buy',
    category: 'Sign & Drive',
    selectedTier: 'tier2',
    buyPrice: 9400,
    mmrValue: 12900,
    image: 'assets/vehicles/accord-2017.jpg',
    issuesRaw: 'Valve cover gasket oil seepage, needs 4 new tires, alignment, and CA smog check.',
    publicHighlights: 'Turnkey Commuter Sedan • New All-Season Tires, Fresh Gasket Service & CA Smog Certified'
  },
  {
    id: 'MM-103',
    vin: 'JTHBE1D25F5049182',
    ymm: '2015 Lexus IS 350 F-Sport',
    mileage: 86500,
    source: 'Bay Area Trade-In',
    category: 'Sign & Drive',
    selectedTier: 'tier2',
    buyPrice: 13200,
    mmrValue: 16800,
    image: 'assets/vehicles/lexus-is350.jpg',
    issuesRaw: 'Water pump weep-hole coolant seepage, front brake pads worn, spare smart key fob needed.',
    publicHighlights: '3.5L V6 F-Sport • New OEM Water Pump, Fresh Front Brakes & 2 Smart Key Fobs'
  },
  {
    id: 'MM-104',
    vin: '1FTFW1ET4EFA92811',
    ymm: '2014 Ford F-150 XLT Crew Cab',
    mileage: 134500,
    source: 'Stockton Local Acquisition',
    category: 'Economy Wholesale',
    selectedTier: 'tier1',
    buyPrice: 7200,
    mmrValue: 10800,
    image: 'assets/vehicles/f150-2014.jpg',
    issuesRaw: 'Cylinder 4 ignition coil misfire, thermostat housing coolant leak, needs smog check.',
    publicHighlights: 'Crew Cab 4x4 Truck • Economy Wholesale Price • New Ignition Coils, Plugs & CA Smogged'
  },
  {
    id: 'MM-105',
    vin: 'WBA3A9C55DF491820',
    ymm: '2013 BMW 335i Sedan',
    mileage: 116800,
    source: 'Northern CA Auction',
    category: 'Economy Wholesale',
    selectedTier: 'tier1',
    buyPrice: 4900,
    mmrValue: 8200,
    image: 'assets/vehicles/bmw-335i-2013.jpg',
    issuesRaw: 'Acquired with lost key fob, valve cover gasket oil leak, plastic charge pipe crack, needs smog check.',
    publicHighlights: 'Turbo Inline-6 F30 • Wholesale Special • New Smart Key Programmed In-House, Fresh Gasket & Smogged'
  },
  {
    id: 'MM-106',
    vin: '2HGFB2F81CH519204',
    ymm: '2012 Honda Civic EX (Donor Part-Out)',
    mileage: 148200,
    source: 'Salvage / Tow-In',
    category: 'Part-Outs',
    selectedTier: 'tier1',
    buyPrice: 850,
    mmrValue: 3400,
    image: 'assets/vehicles/civic-2012.jpg',
    issuesRaw: 'Rear collision — parting out healthy 1.8L engine, automatic transmission, front clip, doors, alternator, starter & alloy wheels.',
    publicHighlights: 'PART-OUT VEHICLE: Tested 1.8L Engine, Auto Transmission, Front Clip, Doors, ECU/Key Set & Wheels'
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
// 2B. UNIFIED BUSINESS JOB QUEUE (ALL-MAKES MECHANIC WORK, KEYS, LEADS, SALES)
// ============================================================================
let leadsDB = [
  {
    id: 'JOB-201',
    category: 'Car Leads',
    type: 'Cash-for-Cars Acquisition Lead',
    status: 'Pending Appraisal',
    name: 'Carlos M. (Stockton)',
    phone: '(209) 555-0192',
    vin: '1HGCV1F34JA092811',
    ymm: '2016 Honda Accord LX',
    mileage: 128000,
    askingPrice: 4200,
    estMmr: 8400,
    issues: 'Lost the main key fob, check engine light on for O2 sensor, needs front brake pads.'
  },
  {
    id: 'JOB-202',
    category: 'Key Programming',
    type: 'Key Cutting & Smart Fob',
    status: 'Scheduled Today',
    name: 'Marcus T. (Lodi)',
    phone: '(209) 555-0831',
    vin: '2T3P1RFV8KW019283',
    ymm: '2019 Toyota RAV4 XLE',
    mileage: 64000,
    askingPrice: 220,
    estMmr: 0,
    issues: 'Cut & Program New Proximity Smart Key Fob (Spare Key).'
  },
  {
    id: 'JOB-203',
    category: 'Oil & Maintenance',
    type: 'Oil & Cooling Service',
    status: 'In Shop Bay',
    name: 'Devon R. (Stockton)',
    phone: '(510) 555-0148',
    vin: '1GCVKREC8FZ109284',
    ymm: '2015 Chevy Silverado 1500',
    mileage: 112000,
    askingPrice: 540,
    estMmr: 0,
    issues: 'Full Synthetic Oil Service + Thermostat, Water Pump & Coolant Flush.'
  },
  {
    id: 'JOB-204',
    category: 'Brake & Suspension',
    type: 'Brakes & Suspension Service',
    status: 'Parts Ordered',
    name: 'Alicia K. (Manteca)',
    phone: '(209) 555-0419',
    vin: '1N4AL3AP8HC291044',
    ymm: '2017 Nissan Altima SR',
    mileage: 98000,
    askingPrice: 460,
    estMmr: 0,
    issues: 'Front & Rear Ceramic Brake Pads + Coated Rotors + Front Sway Bar Links.'
  },
  {
    id: 'JOB-205',
    category: 'Diagnostics & Smog',
    type: 'Diagnostics & Smog Prep',
    status: 'Waiting Inspection',
    name: 'Ramon G. (Stockton)',
    phone: '(209) 555-0774',
    vin: 'WBA3A5C59EF601922',
    ymm: '2014 BMW 328i',
    mileage: 119000,
    askingPrice: 185,
    estMmr: 0,
    issues: 'Check Engine Light Smoke Test + Pre-Smog Diagnostic & Drive Cycle.'
  },
  {
    id: 'JOB-206',
    category: 'Sales Status',
    type: 'Vehicle Sale & Test Drive',
    status: 'Deposit Received',
    name: 'Jordan P. (Sacramento)',
    phone: '(916) 555-0311',
    vin: '4T1B11HK5JU610294',
    ymm: '2018 Toyota Camry SE (MM-101)',
    mileage: 78400,
    askingPrice: 15800,
    estMmr: 14200,
    issues: 'Buyer scheduled for Saturday test drive & pickup — CA DMV paperwork & Smog certificate ready.'
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
      pin.className = 'py-1.5 border border-[#332C25] bg-[#161310] text-slate-500';
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
    badge.className = 'w-9 h-9 bg-[#1C1814] border border-[#3B3229] flex items-center justify-center text-[#F59E0B] shadow-inner';
    badge.innerHTML = `<i data-lucide="lock" class="w-4 h-4"></i>`;
  }
  if (slotLed) {
    slotLed.className = 'w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]';
  }
  status.innerHTML = `
    <span class="text-slate-400">STATUS: STANDBY // AWAITING CIPHER</span>
    <span class="text-[#F59E0B]/90">AES-256 ENCLAVE</span>
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
      ? 'w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_12px_#10B981] animate-ping'
      : 'w-2.5 h-2.5 rounded-full bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]';
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
  if (cable1) cable1.className = 'w-10 h-2 bg-[#F59E0B] shadow-[0_0_12px_#F59E0B] transition-all duration-300';
  if (cable2) cable2.className = 'w-10 h-2 bg-[#10B981] shadow-[0_0_12px_#10B981] transition-all duration-300';
  refreshIcons();

  // Stage 1: Solenoid Bolt Retraction (0ms - 500ms)
  playEnclaveTone(320, 'sawtooth', 0.12, 640);
  if (progressBar) progressBar.style.width = '38%';

  [1, 2, 3, 4].forEach((n, idx) => {
    setTimeout(() => {
      playEnclaveTone(480 + idx * 110, 'triangle', 0.07);
      const pin = document.getElementById(`pin-status-${n}`);
      if (pin) {
        pin.className = 'py-1.5 border border-[#F59E0B] bg-[#F59E0B]/15 text-[#FBBF24] font-bold shadow-[0_0_8px_rgba(245,158,11,0.3)]';
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
      stageTag.className = 'text-[10px] font-bold tracking-[0.25em] text-[#10B981] uppercase';
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
      badge.className = 'w-9 h-9 bg-[#10B981]/15 border border-[#10B981] flex items-center justify-center text-[#10B981] shadow-[0_0_15px_rgba(16,185,129,0.4)]';
      badge.innerHTML = `<i data-lucide="unlock" class="w-4 h-4"></i>`;
    }
    if (slotLed) {
      slotLed.className = 'w-2.5 h-2.5 rounded-full bg-[#10B981] shadow-[0_0_12px_#10B981]';
    }
    status.innerHTML = `
      <span class="text-[#10B981] font-bold animate-pulse">CIPHER VERIFIED // STARTING ENGINE SEQUENCE...</span>
      <span class="text-[#10B981]">UNLOCKING</span>
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

function switchMode(mode, skipScrollTop = false) {
  const publicView = document.getElementById('view-public');
  const adminView = document.getElementById('view-admin');
  const btnOpenTerminal = document.getElementById('btn-open-terminal');
  const btnExitAdmin = document.getElementById('btn-exit-admin');

  if (mode === 'admin') {
    if (!isAdminUnlocked) {
      openTerminalGate();
      return;
    }
    publicView.classList.add('hidden');
    adminView.classList.remove('hidden');
    btnOpenTerminal.classList.add('hidden');
    btnExitAdmin.classList.remove('hidden');
    btnExitAdmin.classList.add('inline-flex');
    renderAdminDashboard();
  } else {
    adminView.classList.add('hidden');
    publicView.classList.remove('hidden');
    btnOpenTerminal.classList.remove('hidden');
    btnExitAdmin.classList.add('hidden');
    btnExitAdmin.classList.remove('inline-flex');
    renderPublicInventory();
  }
  if (!skipScrollTop) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  if (window.lucide) lucide.createIcons();
}

function navigatePublicSection(e, sectionId, categoryFilter) {
  if (e) e.preventDefault();
  switchMode('public', true);
  if (categoryFilter) {
    filterPublicInventory(categoryFilter);
  }
  requestAnimationFrame(() => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
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
  const badges = {
    intake: document.getElementById('pit-badge-intake'),
    database: document.getElementById('pit-badge-database'),
    calculator: document.getElementById('pit-badge-calculator'),
    leads: document.getElementById('pit-badge-leads')
  };

  Object.keys(sections).forEach((k) => {
    if (!sections[k] || !buttons[k]) return;
    if (k === tabName) {
      sections[k].classList.remove('hidden');
      buttons[k].className = 'p-3.5 rounded-xl border text-left transition-all flex items-center gap-3.5 bg-maki-lightBlue text-slate-950 border-maki-lightBlue font-semibold shadow-sm';
    } else {
      sections[k].classList.add('hidden');
      buttons[k].className = 'p-3.5 rounded-xl border text-left transition-all flex items-center gap-3.5 bg-slate-900/90 text-slate-200 border-slate-800 hover:border-slate-700';
    }
    if (badges[k]) {
      badges[k].className = 'w-9 h-9 rounded-lg bg-[#12100E] border border-[#3D3833] flex items-center justify-center font-display font-bold text-sm text-[#F59E0B] shrink-0';
    }
  });

  renderAdminDashboard();
}

function appendQuickIssue(issueText) {
  const textarea = document.getElementById('new-car-issues');
  if (!textarea) return;
  const current = textarea.value.trim();
  if (!current) {
    textarea.value = issueText;
  } else if (!current.toLowerCase().includes(issueText.toLowerCase())) {
    textarea.value = current.replace(/,\s*$/, '') + ', ' + issueText;
  }
  textarea.focus();
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
      btn.className = 'px-5 py-2.5 rounded-xl text-sm font-semibold bg-maki-lightBlue text-slate-950 transition-all flex items-center gap-2 shadow-sm';
    } else {
      btn.className = 'px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-950/60 text-slate-300 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-2';
    }
  });

  const headingEl = document.getElementById('inventory-section-heading');
  const subtitleEl = document.getElementById('inventory-section-subtitle');
  if (headingEl && subtitleEl) {
    if (filterValue === 'Sign & Drive') {
      headingEl.textContent = 'Sign & Drive Certified Vehicles';
      subtitleEl.textContent = 'Turnkey vehicles personally inspected, serviced, smogged, and keyed in-house by our Master Mechanic—ready to drive home today.';
    } else if (filterValue === 'Economy Wholesale') {
      headingEl.textContent = 'Economy Wholesale Specials';
      subtitleEl.textContent = 'Running, driving, smogged commuter & work vehicles priced near wholesale for maximum value.';
    } else if (filterValue === 'Part-Outs') {
      headingEl.textContent = 'Donor Part-Out Vehicles';
      subtitleEl.textContent = 'Tested OEM engines, transmissions, electronics, interior trim, and body panels pulled by our shop in Stockton.';
    } else {
      headingEl.textContent = 'All Inventory & Part-Outs';
      subtitleEl.textContent = 'Browse our full selection of turnkey Sign & Drive vehicles, budget Economy Wholesale specials, and donor Part-Out cars.';
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
      categoryBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-[#059669] text-white shadow-sm">Sign & Drive</span>';
    } else if (isWholesale) {
      categoryBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-[#EA580C] text-white shadow-sm">Economy Wholesale</span>';
    } else {
      categoryBadge = '<span class="px-3 py-1 rounded-full text-xs font-bold bg-[#E11D48] text-white shadow-sm">Part-Out Donor</span>';
    }

    const priceDisplay = isPartOut
      ? `<div class="font-display font-bold text-lg text-maki-red">Part-Out</div><div class="text-xs text-slate-400">Parts From $45+</div>`
      : `<div class="font-display font-bold text-xl text-maki-lightBlue">$${activePlan.estSalePrice.toLocaleString()}</div><div class="text-xs text-slate-400">${car.category}</div>`;

    const detailsBox = isPartOut
      ? `<div class="text-sm text-slate-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
           <strong class="text-white block mb-1">Available Donor Parts:</strong>
           ${car.publicHighlights || car.issuesRaw}
         </div>`
      : `<div class="text-sm text-slate-300 bg-slate-900/90 p-3.5 rounded-xl border border-slate-800 leading-relaxed">
           <strong class="text-white block mb-1">Completed Shop Work:</strong>
           ${activePlan.items.map((i) => i.task).join(' • ')}
         </div>`;

    return `
      <div class="rounded-2xl bg-maki-card border border-slate-700/80 overflow-hidden flex flex-col justify-between hover:border-maki-lightBlue/50 transition-all shadow-sm group">
        <div>
          <div class="relative h-56 bg-[#161412] overflow-hidden">
            <img src="${car.image}" alt="${car.ymm}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute top-3 left-3 flex gap-2">
              ${categoryBadge}
            </div>
            <div class="photo-badge-dark absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-[#161412]/90 backdrop-blur border border-white/15 text-xs font-mono text-white">
              ${car.mileage.toLocaleString()} mi
            </div>
          </div>

          <div class="p-5 space-y-3.5">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-display font-bold text-lg text-white leading-snug">${car.ymm}</h3>
              <div class="text-right shrink-0">
                ${priceDisplay}
              </div>
            </div>

            ${detailsBox}

            <div class="flex items-center justify-between text-xs text-slate-400 pt-1">
              <span>VIN: <code class="text-slate-300">${car.vin.slice(0, 11)}...</code></span>
              <span class="text-emerald-400 font-medium">${isPartOut ? 'Stockton Yard' : 'CA Smog & Key Ready'}</span>
            </div>
          </div>
        </div>

        <div class="p-5 pt-0 flex gap-2.5">
          <a href="tel:5104184822" class="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-center text-xs sm:text-sm font-semibold text-white transition-colors">
            ${isPartOut ? 'Call For Parts' : 'Call (510) 418-4822'}
          </a>
          <button type="button" onclick="inquireOnVehicle('${car.id}')" class="px-4 py-2.5 rounded-xl bg-maki-lightBlue hover:bg-sky-300 text-xs sm:text-sm font-bold text-slate-950 transition-colors">
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
// 5. PIT CREW CLEAN APP WORKSPACE MODULES:
//    - MODULE 02: VEHICLE DATABASE & TIER RULING DOSSIER
//    - MODULE 03: STANDALONE CONDITION CALCULATOR
//    - MODULE 04: UNIFIED BUSINESS JOB QUEUE
// ============================================================================

function renderAdminDashboard() {
  const totalCarsEl = document.getElementById('kpi-total-cars');
  if (totalCarsEl) totalCarsEl.textContent = vehiclesDB.length;

  const totalCapital = vehiclesDB.reduce((sum, v) => {
    const plan = v.plans[v.selectedTier];
    return sum + plan.totalAllInCost;
  }, 0);
  const totalProfit = vehiclesDB.reduce((sum, v) => {
    const plan = v.plans[v.selectedTier];
    return sum + plan.netProfit;
  }, 0);

  const capEl = document.getElementById('kpi-capital');
  const profEl = document.getElementById('kpi-profit');
  const leadsEl = document.getElementById('kpi-leads');

  if (capEl) capEl.textContent = '$' + totalCapital.toLocaleString();
  if (profEl) profEl.textContent = '+$' + totalProfit.toLocaleString();
  if (leadsEl) leadsEl.textContent = leadsDB.length + ' Active';

  const listEl = document.getElementById('admin-vehicle-list');
  if (listEl) {
    listEl.innerHTML = vehiclesDB.map((car) => {
      const isSelected = car.id === selectedVehicleId;
      const activePlan = car.plans[car.selectedTier];
      return `
        <div onclick="selectAdminVehicle('${car.id}')" class="p-4 rounded-xl border transition-all cursor-pointer ${
          isSelected
            ? 'bg-slate-900 border-maki-lightBlue ring-1 ring-maki-lightBlue shadow-sm'
            : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
        }">
          <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-3 min-w-0">
              <img src="${car.image}" alt="${car.ymm}" class="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0" />
              <div class="min-w-0">
                <div class="font-display font-bold text-sm sm:text-base text-white truncate">${car.ymm}</div>
                <div class="text-xs text-slate-400 mt-0.5">${car.category} • Buy: <strong class="text-slate-200">$${car.buyPrice.toLocaleString()}</strong></div>
              </div>
            </div>
            <div class="text-right shrink-0">
              <div class="text-sm font-bold text-emerald-400">+$${activePlan.netProfit.toLocaleString()}</div>
              <div class="text-xs text-slate-400">${car.selectedTier.toUpperCase()}</div>
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
    <!-- Top Vehicle Summary Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
      <div class="flex items-center gap-4">
        <img src="${car.image}" alt="${car.ymm}" class="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0" />
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <span class="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-maki-lightBlue font-mono text-xs font-semibold">${car.id}</span>
            <span class="text-xs sm:text-sm text-slate-400 font-mono">VIN: ${car.vin}</span>
          </div>
          <h2 class="font-display font-bold text-2xl text-white mt-1">${car.ymm}</h2>
          <p class="text-sm text-slate-300 mt-0.5">
            ${car.mileage.toLocaleString()} miles • Buy Price: <strong class="text-white">$${car.buyPrice.toLocaleString()}</strong> • Market Value: <strong class="text-white">$${car.mmrValue.toLocaleString()}</strong>
          </p>
        </div>
      </div>

      <div class="flex flex-wrap items-center gap-2.5">
        <button onclick="cycleVehicleCategory('${car.id}')" class="px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold bg-slate-900 border-slate-700 text-slate-200 hover:border-maki-lightBlue">
          ${car.category} (Switch)
        </button>
        <button onclick="switchPitWallTab('calculator')" class="px-4 py-2.5 rounded-xl bg-maki-lightBlue hover:bg-sky-300 text-slate-950 font-display font-bold text-xs sm:text-sm flex items-center gap-1.5">
          <span>Open Calculator</span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>

    <!-- 1. TIER STATUS RULING & INVESTMENT VERDICT CARD -->
    <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <span class="px-3.5 py-1 rounded-full text-xs sm:text-sm font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          ${ruling.verdictBadge}
        </span>
        <span class="text-xs sm:text-sm text-slate-300">
          Active Tier: <strong class="text-maki-lightBlue">${activePlan.label}</strong> (Est. Profit: <strong class="text-emerald-400">+$${activePlan.netProfit.toLocaleString()}</strong>)
        </span>
      </div>

      <div class="space-y-1.5">
        <h4 class="font-display font-bold text-base text-white">Why This Tier Was Assigned</h4>
        <p class="text-sm text-slate-300 leading-relaxed">${ruling.rulingExplanation}</p>
      </div>

      <div class="p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-emerald-300 leading-relaxed">
        <strong class="text-white block mb-1">Investment Recommendation:</strong>
        ${ruling.investmentVerdict}
      </div>
    </div>

    <!-- 2. STEP-BY-STEP UPGRADE PATHS -->
    <div class="space-y-3">
      <h3 class="font-display font-bold text-lg text-white">How to Move This Vehicle to a Higher Tier</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <!-- Step-Up Path A: Tier 1 (Wholesale) -> Tier 2 (Sign & Drive Retail) -->
        <div class="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-maki-lightBlue">Tier 1 &rarr; Tier 2 (Sign & Drive)</span>
              <span class="px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-xs font-semibold">+${ruling.roiT1toT2}% Parts ROI</span>
            </div>
            <div class="space-y-2">
              ${ruling.upgradeStepsT1toT2.map((u) => `
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm">
                  <div class="flex items-center justify-between font-semibold text-white">
                    <span>${u.category}</span>
                    <span class="font-mono text-xs text-maki-lightBlue">+$${u.extraCost} (${u.extraHours >= 0 ? '+' + u.extraHours : u.extraHours}h)</span>
                  </div>
                  <p class="text-xs text-slate-300 mt-1">${u.toTask}</p>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-sm">
            <div>
              <span class="text-slate-400 block text-xs">Extra Spend vs. Profit Gain</span>
              <strong class="text-white">+$${ruling.extraPartsT1toT2} Parts &rarr; <span class="text-emerald-400">+$${ruling.extraProfitT1toT2.toLocaleString()}</span></strong>
            </div>
            <button onclick="setVehicleTier('${car.id}', 'tier2')" class="px-3.5 py-2 rounded-xl bg-maki-lightBlue hover:bg-sky-300 text-slate-950 font-bold text-xs shrink-0">
              Set Tier 2
            </button>
          </div>
        </div>

        <!-- Step-Up Path B: Tier 2 (Sign & Drive) -> Tier 3 (Full Restoration) -->
        <div class="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold uppercase tracking-wider text-amber-400">Tier 2 &rarr; Tier 3 (Full Recon)</span>
              <span class="px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-xs font-semibold">+${ruling.roiT2toT3}% Parts ROI</span>
            </div>
            <div class="space-y-2">
              ${ruling.upgradeStepsT2toT3.map((u) => `
                <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm">
                  <div class="flex items-center justify-between font-semibold text-white">
                    <span>${u.category}</span>
                    <span class="font-mono text-xs text-amber-300">+$${u.extraCost} (+${u.extraHours}h)</span>
                  </div>
                  <p class="text-xs text-slate-300 mt-1">${u.toTask}</p>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="pt-3 border-t border-slate-800 flex items-center justify-between gap-2 text-sm">
            <div>
              <span class="text-slate-400 block text-xs">Extra Spend vs. Profit Gain</span>
              <strong class="text-white">+$${ruling.extraPartsT2toT3} Parts &rarr; <span class="text-emerald-400">+$${ruling.extraProfitT2toT3.toLocaleString()}</span></strong>
            </div>
            <button onclick="setVehicleTier('${car.id}', 'tier3')" class="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs shrink-0">
              Set Tier 3
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- 3. COLLAPSIBLE MAKE / MODEL MILEAGE SERVICE GUIDE (KEEPS SCREEN CLEAN) -->
    <details class="group rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden">
      <summary class="p-4 sm:p-5 cursor-pointer flex items-center justify-between gap-3 select-none hover:bg-slate-900 transition-colors">
        <div>
          <span class="text-xs font-semibold text-maki-lightBlue block">Make & Model Service Reference</span>
          <h4 class="font-display font-bold text-base text-white mt-0.5">
            ${chassisIntel.platform} — Common Repairs Worth Doing at ${car.mileage.toLocaleString()} Miles
          </h4>
        </div>
        <span class="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300 group-open:bg-maki-lightBlue group-open:text-slate-950 transition-colors shrink-0">
          Tap to Expand / Hide
        </span>
      </summary>
      <div class="p-4 sm:p-5 pt-0 border-t border-slate-800 space-y-2.5 mt-3">
        ${chassisIntel.checkpoints.map((cp) => `
          <div class="p-3.5 rounded-xl bg-slate-950 border ${cp.isDueAtCurrentMileage ? 'border-amber-500/40' : 'border-slate-800'} flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
            <div class="space-y-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-md font-mono text-xs font-semibold ${
                  cp.isDueAtCurrentMileage ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'
                }">${cp.minMiles.toLocaleString()}+ mi</span>
                <strong class="text-white">${cp.item}</strong>
                <span class="text-xs font-semibold text-emerald-400">(${cp.roiVerdict})</span>
              </div>
              <p class="text-slate-300 text-xs sm:text-sm">${cp.note}</p>
            </div>
            <div class="flex items-center gap-4 shrink-0 font-mono text-sm">
              <span class="text-slate-400">${cp.shopHours} hrs</span>
              <span class="text-white font-bold">$${cp.oemPartCost} Parts</span>
            </div>
          </div>
        `).join('')}
      </div>
    </details>
  `;
}

// Renders Module 03: Standalone Condition Calculator
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
      <div onclick="setVehicleTier('${car.id}', '${tKey}')" class="p-5 rounded-xl border cursor-pointer transition-all ${
        isChosen
          ? 'bg-slate-900 border-maki-lightBlue ring-1 ring-maki-lightBlue shadow-sm'
          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
      }">
        <div class="flex items-center justify-between mb-2">
          <span class="font-display font-bold text-sm ${
            isChosen ? 'text-maki-lightBlue' : 'text-white'
          }">${t.label}</span>
          ${isChosen ? '<span class="px-2.5 py-0.5 rounded-md bg-maki-lightBlue text-slate-950 text-xs font-bold">Active</span>' : ''}
        </div>
        <div class="grid grid-cols-3 gap-2 pt-3 mt-2 border-t border-slate-800 text-sm">
          <div>
            <span class="text-xs text-slate-400 block">Parts Cost</span>
            <strong class="text-white font-mono">$${t.partsCost.toLocaleString()}</strong>
          </div>
          <div>
            <span class="text-xs text-slate-400 block">Target Sale</span>
            <strong class="text-slate-200 font-mono">$${t.estSalePrice.toLocaleString()}</strong>
          </div>
          <div>
            <span class="text-xs text-slate-400 block">Net Profit</span>
            <strong class="text-emerald-400 font-mono">+$${t.netProfit.toLocaleString()}</strong>
          </div>
        </div>
      </div>
    `;
  }).join('');

  panel.innerHTML = `
    <!-- Top Bar with Vehicle Switcher -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800">
      <div>
        <span class="text-xs font-bold uppercase tracking-wider text-maki-lightBlue">Module 3 of 4</span>
        <h2 class="font-display font-bold text-2xl sm:text-3xl text-white mt-0.5">Condition Calculator</h2>
        <p class="text-sm text-slate-300 mt-0.5">Compare repair tiers, parts cost, and profit side-by-side.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <select onchange="selectAdminVehicle(this.value)" class="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm font-semibold text-white">
          ${vehicleSelectorOptions}
        </select>
        <button onclick="switchPitWallTab('database')" class="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-semibold text-maki-lightBlue">
          &larr; Vehicle Dossier
        </button>
      </div>
    </div>

    <!-- Editable Mechanic Notes -->
    <div class="p-4 sm:p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <label class="text-sm font-semibold text-white">Inspection Notes for ${car.ymm}</label>
        <span class="text-xs text-slate-400">Add or remove issues below and click Recalculate</span>
      </div>
      <div class="flex flex-col sm:flex-row gap-2.5">
        <input type="text" id="live-issue-editor" value="${car.issuesRaw}" class="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white" />
        <button onclick="recalculateVehicleIssues('${car.id}')" class="px-5 py-2.5 rounded-xl bg-maki-lightBlue hover:bg-sky-300 text-slate-950 font-bold text-sm shrink-0">
          Recalculate
        </button>
      </div>
    </div>

    <!-- 3-Tier Strategy Cards -->
    <div class="space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h3 class="font-display font-bold text-base text-white">Select a Reconditioning Tier</h3>
        <span class="text-sm text-slate-300">Market / MMR Value: <strong class="text-white font-mono">$${car.mmrValue.toLocaleString()}</strong></span>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        ${tierCardsHtml}
      </div>
    </div>

    <!-- Repair Line Items & Deal Numbers -->
    <div class="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h4 class="font-display font-bold text-lg text-white">${activePlan.label} — Repair Breakdown</h4>
          <p class="text-sm text-slate-300 mt-0.5">${activePlan.description}</p>
        </div>
        <div class="sm:text-right shrink-0">
          <span class="text-xs sm:text-sm text-emerald-400 font-semibold block">
            In-House Shop Savings: $${activePlan.retailLaborSaved.toLocaleString()} Saved
          </span>
          <span class="text-xs text-slate-400">Est. Shop Time: ${activePlan.totalHours} hrs</span>
        </div>
      </div>

      <div class="space-y-2.5">
        ${activePlan.items.map((item) => `
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm">
            <div>
              <span class="px-2.5 py-0.5 rounded-md bg-slate-900 border border-slate-700 text-maki-lightBlue font-semibold text-xs mr-2">${item.category}</span>
              <span class="text-slate-200 font-medium">${item.task}</span>
            </div>
            <div class="flex items-center gap-4 shrink-0 font-mono">
              <span class="text-slate-400 text-xs sm:text-sm">${item.hours} hrs</span>
              <span class="font-bold text-white w-16 text-right">$${item.parts}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- 5-Box Financial Summary -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 border-t border-slate-800 text-sm">
        <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <span class="text-slate-400 block text-xs">Buy Price</span>
          <strong class="text-white text-base font-mono mt-0.5 block">$${car.buyPrice.toLocaleString()}</strong>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <span class="text-slate-400 block text-xs">Parts + Fees</span>
          <strong class="text-white text-base font-mono mt-0.5 block">$${(activePlan.partsCost + activePlan.auctionAndDmvFees).toLocaleString()}</strong>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <span class="text-slate-400 block text-xs">All-In Cost</span>
          <strong class="text-maki-lightBlue text-base font-mono mt-0.5 block">$${activePlan.totalAllInCost.toLocaleString()}</strong>
        </div>
        <div class="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
          <span class="text-slate-400 block text-xs">Target Sale</span>
          <strong class="text-white text-base font-mono mt-0.5 block">$${activePlan.estSalePrice.toLocaleString()}</strong>
        </div>
        <div class="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30">
          <span class="text-emerald-300 block text-xs font-semibold">Est. Net Profit</span>
          <strong class="text-emerald-400 text-lg font-mono mt-0.5 block">+$${activePlan.netProfit.toLocaleString()}</strong>
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
  saveMakiDatabase();
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
          body: r.BodyClass || 'Sedan',
          plant: r.PlantCountry || 'USA'
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
  ymmInput.value = decoded ? decoded.title : '2017 Honda Accord Sport';
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
      telemetryEl.innerHTML = `<strong>VIN Decoded:</strong> ${decoded.title} • Engine: <strong>${decoded.engine || 'Standard'}</strong> • Body: <strong>${decoded.body}</strong>`;
    }
  } else {
    ymmInput.value = '2018 Toyota Camry SE';
    if (telemetryEl) {
      telemetryEl.classList.remove('hidden');
      telemetryEl.innerHTML = `<strong>Sample Vehicle Loaded:</strong> 2018 Toyota Camry SE • 2.5L 4-Cylinder • 8-Speed Automatic`;
    }
  }
}

function fillSampleIssues() {
  document.getElementById('new-car-vin').value = '4T1B11HK5JU610294';
  document.getElementById('new-car-ymm').value = '2018 Toyota Camry SE';
  document.getElementById('new-car-buy').value = '8900';
  document.getElementById('new-car-mmr').value = '13800';
  document.getElementById('new-car-miles').value = '94500';
  document.getElementById('new-car-issues').value =
    'Lost spare key fob, front brakes & rotors worn, valve cover gasket oil seepage, needs CA smog check.';
  decodeAdminVin();
}

function handleAdminVehicleIntake(e) {
  e.preventDefault();
  const vin = document.getElementById('new-car-vin').value.trim() || '1HG' + Math.floor(100000000 + Math.random() * 900000000);
  const ymm = document.getElementById('new-car-ymm').value.trim();
  const category = document.getElementById('new-car-category').value;
  const buyPrice = Number(document.getElementById('new-car-buy').value) || 4500;
  const mmrValue = Number(document.getElementById('new-car-mmr').value) || Math.round(buyPrice * 1.55);
  const mileage = Number(document.getElementById('new-car-miles').value) || 105000;
  const issuesRaw = document.getElementById('new-car-issues').value.trim();

  const newCar = {
    id: 'MM-' + (101 + vehiclesDB.length),
    vin,
    ymm,
    mileage,
    source: 'Pit Crew Intake',
    category,
    selectedTier: category === 'Economy Wholesale' ? 'tier1' : 'tier2',
    buyPrice,
    mmrValue,
    image: resolveVehiclePhoto(ymm),
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
// 7. PERSISTENT DATABASE ENGINE, THEME MODE, CLOUD SYNC & PRE-FILLED SMS
// ============================================================================

const MAKI_STORAGE_KEY = 'maki_motorsports_db_v3';
const MAKI_DEALER_PHONE = '+15104184822';

let pitCrewSettings = {
  autoSmsRelayEnabled: true,
  cloudRestUrl: '',
  lightMode: true
};

function toggleThemeMode() {
  pitCrewSettings.lightMode = !pitCrewSettings.lightMode;
  applyThemeMode();
  saveMakiDatabase();
}

function applyThemeMode() {
  const htmlEl = document.documentElement;
  const labelEl = document.getElementById('theme-toggle-label');
  if (pitCrewSettings.lightMode) {
    htmlEl.classList.add('light-mode');
    if (labelEl) labelEl.textContent = 'Night Garage';
  } else {
    htmlEl.classList.remove('light-mode');
    if (labelEl) labelEl.textContent = 'Showroom Light';
  }
}

const makiSyncChannel = typeof BroadcastChannel !== 'undefined'
  ? new BroadcastChannel('maki_pit_crew_sync')
  : null;

if (makiSyncChannel) {
  makiSyncChannel.onmessage = (ev) => {
    if (ev.data && ev.data.type === 'DB_UPDATED') {
      loadMakiDatabase(false);
      applyThemeMode();
      renderPublicInventory();
      renderAdminDashboard();
      renderSmsRelayToggleUI();
    }
  };
}

window.addEventListener('storage', (ev) => {
  if (ev.key === MAKI_STORAGE_KEY) {
    loadMakiDatabase(false);
    applyThemeMode();
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
      applyThemeMode();
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
    btn.className = 'w-full px-3.5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-xs font-semibold text-emerald-300 flex items-center justify-between transition-all';
    dot.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse';
    label.textContent = 'Auto-SMS Relay: ON';
  } else {
    btn.className = 'w-full px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-400 flex items-center justify-between transition-all';
    dot.className = 'w-2.5 h-2.5 rounded-full bg-slate-500';
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
  const askingPrice = Number(document.getElementById('cfc-asking').value) || 3500;
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
        <strong>Submitted to Maki Motorsports LLC!</strong> Your <strong>${ymm}</strong> is logged (${jobId}) and we will contact <strong>${phone}</strong> shortly.
      </div>
      <a href="${smsHref}" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap shrink-0 text-center">
        Send Pre-Filled Text to (510) 418-4822 &rarr;
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
  if (combined.includes('key') || combined.includes('fob') || combined.includes('lock') || combined.includes('immobilizer')) return 'Key Programming';
  if (combined.includes('brake') || combined.includes('suspension') || combined.includes('strut') || combined.includes('control arm')) return 'Brake & Suspension';
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
        <strong>Work Order Logged (${jobId})!</strong> Your request for <strong>${ymm}</strong> (<em>${service}</em>) is in our Business Job Queue under <strong>${queueCat}</strong>.
      </div>
      <a href="${smsHref}" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs whitespace-nowrap shrink-0 text-center">
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

const JOB_STATUS_OPTIONS = [
  'New Request',
  'New Lead',
  'Pending Appraisal',
  'Scheduled Today',
  'In Shop Bay',
  'Parts Ordered',
  'Ready for Pickup',
  'Completed / Paid'
];

function updateJobStatus(jobId, newStatus) {
  const job = leadsDB.find((j) => j.id === jobId);
  if (!job || !newStatus) return;
  job.status = newStatus;
  saveMakiDatabase();
  renderAdminLeads();
}

function cycleJobStatus(jobId) {
  const job = leadsDB.find((j) => j.id === jobId);
  if (!job) return;
  const idx = JOB_STATUS_OPTIONS.indexOf(job.status);
  job.status = JOB_STATUS_OPTIONS[(idx + 1) % JOB_STATUS_OPTIONS.length];
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
          class="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
            isSelected
              ? 'bg-maki-lightBlue text-slate-950 font-bold shadow-sm'
              : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-slate-600'
          }"
        >
          <span>${cat}</span>
          <span class="px-2 py-0.5 rounded-full text-xs ${
            isSelected ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-300'
          }">${count}</span>
        </button>
      `;
    }).join('');
  }

  const filteredJobs = currentJobQueueFilter === 'All'
    ? leadsDB
    : leadsDB.filter((j) => j.category === currentJobQueueFilter);

  const badgeColors = {
    'Oil & Maintenance': 'bg-maki-lightBlue/15 text-maki-lightBlue border-maki-lightBlue/30',
    'Brake & Suspension': 'bg-red-500/15 text-red-300 border-red-500/30',
    'Key Programming': 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    'Diagnostics & Smog': 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    'Car Leads': 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    'Sales Status': 'bg-blue-500/15 text-blue-300 border-blue-500/30'
  };

  container.innerHTML = filteredJobs.map((job) => {
    const isCarLead = job.category === 'Car Leads';
    const badgeClass = badgeColors[job.category] || 'bg-slate-800 text-slate-300';
    const cleanPhone = (job.phone || '').replace(/[^0-9+]/g, '');
    const replySmsHref = cleanPhone
      ? buildSmsHref(`Hi ${job.name}, this is Maki Motorsports LLC in Stockton regarding your ${job.ymm} (${job.issues}).`, cleanPhone)
      : '';

    return `
      <div class="p-5 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all">
        <div class="space-y-1.5">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="font-mono text-xs text-slate-400">${job.id}</span>
            <span class="px-3 py-0.5 rounded-full border text-xs font-semibold ${badgeClass}">${job.category}</span>
            <span class="text-base font-bold text-white">${job.ymm}</span>
            <span class="text-sm text-slate-300">• ${job.name} (${job.phone})</span>
            ${job.vin && job.vin !== 'Customer Vehicle' ? `<span class="text-xs font-mono text-slate-400">VIN: ${job.vin}</span>` : ''}
          </div>
          <p class="text-sm text-slate-200 leading-relaxed">${job.issues}</p>
          ${
            isCarLead
              ? `<div class="text-xs sm:text-sm text-slate-400">Customer Asking: <strong class="text-white">$${job.askingPrice.toLocaleString()}</strong> • Est. Market Value: <strong class="text-maki-lightBlue">$${job.estMmr.toLocaleString()}</strong></div>`
              : job.askingPrice > 0
              ? `<div class="text-xs sm:text-sm text-slate-400">Est. Ticket / Sale Amount: <strong class="text-emerald-400 font-mono">$${job.askingPrice.toLocaleString()}</strong></div>`
              : ''
          }
        </div>
        <div class="flex flex-wrap items-center gap-2 shrink-0">
          ${
            cleanPhone
              ? `<a href="tel:${cleanPhone}" class="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-semibold text-slate-200">Call</a>
                 <a href="${replySmsHref}" class="px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-700 text-xs sm:text-sm font-semibold text-maki-lightBlue">Text</a>`
              : ''
          }
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700">
            <label for="status-select-${job.id}" class="text-xs font-semibold text-slate-400 whitespace-nowrap">Status:</label>
            <select
              id="status-select-${job.id}"
              onchange="updateJobStatus('${job.id}', this.value)"
              class="bg-transparent text-xs sm:text-sm font-bold text-maki-lightBlue focus:outline-none cursor-pointer pr-1"
            >
              ${JOB_STATUS_OPTIONS.map((st) => `<option value="${st}" ${job.status === st ? 'selected' : ''} class="bg-slate-900 text-white">${st}</option>`).join('')}
            </select>
          </div>
          ${
            isCarLead
              ? `<button onclick="convertLeadToVehicle('${job.id}')" class="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shrink-0">
                   Acquire Vehicle
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
    vin: lead.vin || '1HG1234567890',
    ymm: lead.ymm,
    mileage: lead.mileage || 115000,
    source: lead.type,
    category: 'Sign & Drive',
    selectedTier: 'tier2',
    buyPrice: lead.askingPrice || 3500,
    mmrValue: lead.estMmr || 7000,
    image: resolveVehiclePhoto(lead.ymm),
    issuesRaw: lead.issues,
    plans: generateThreeTierPlan(lead.issues, lead.askingPrice || 3500, lead.estMmr || 7000)
  };

  vehiclesDB.unshift(newCar);
  leadsDB.splice(idx, 1);
  selectedVehicleId = newCar.id;
  saveMakiDatabase();
  switchPitWallTab('database');
}

let auctionImportCursor = 0;
function loadSampleManheimImport() {
  const auctionSamples = [
    {
      vin: '5YFBURHE8GP419284',
      ymm: '2016 Toyota Corolla LE',
      mileage: 89400,
      buyPrice: 7400,
      mmrValue: 11200,
      image: 'assets/vehicles/corolla-2016.jpg',
      issuesRaw: 'Auction Condition Report: Only 1 key fob (program spare smart key), front brake pads & rotors worn, synthetic oil service & smog.'
    },
    {
      vin: '2HKRM4H56FH610293',
      ymm: '2015 Honda CR-V EX',
      mileage: 98200,
      buyPrice: 8800,
      mmrValue: 13100,
      image: 'assets/vehicles/crv-2015.jpg',
      issuesRaw: 'Auction Condition Report: Valve cover gasket seepage, needs 4 new tires & alignment, spare smart key fob, CA smog check.'
    },
    {
      vin: '1N4AL3AP8HC284910',
      ymm: '2017 Nissan Altima 2.5 SV',
      mileage: 104600,
      buyPrice: 5600,
      mmrValue: 9400,
      image: 'assets/vehicles/altima-2017.jpg',
      issuesRaw: 'Auction Condition Report: Lost spare smart key fob, front struts & brake pads worn, synthetic oil & CVT fluid service.'
    }
  ];
  const sample = auctionSamples[auctionImportCursor % auctionSamples.length];
  auctionImportCursor += 1;

  const importedCar = {
    id: 'MM-' + (101 + vehiclesDB.length),
    vin: sample.vin,
    ymm: sample.ymm,
    mileage: sample.mileage,
    source: 'Auction Auto-Import',
    category: 'Sign & Drive',
    selectedTier: 'tier2',
    buyPrice: sample.buyPrice,
    mmrValue: sample.mmrValue,
    image: sample.image,
    issuesRaw: sample.issuesRaw,
    plans: generateThreeTierPlan(sample.issuesRaw, sample.buyPrice, sample.mmrValue)
  };
  vehiclesDB.unshift(importedCar);
  selectedVehicleId = importedCar.id;
  saveMakiDatabase();
  switchPitWallTab('database');
}

document.addEventListener('DOMContentLoaded', () => {
  loadMakiDatabase(true);
  applyThemeMode();
  renderPublicInventory();
  renderInteractiveServiceSelector();
  renderSmsRelayToggleUI();
  if (window.lucide) lucide.createIcons();
});
