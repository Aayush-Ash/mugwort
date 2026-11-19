// Indian Pincode Directory and Serviceability Calculator

const PINCODE_DATABASE = {
  // Delhi NCR
  '110001': { city: 'New Delhi', state: 'Delhi', zone: 'Metro', days: '1–2 Days', courier: 'BlueDart Express' },
  '110017': { city: 'South Delhi', state: 'Delhi', zone: 'Metro', days: '1–2 Days', courier: 'BlueDart Express' },
  '122001': { city: 'Gurugram', state: 'Haryana', zone: 'Metro', days: '1–2 Days', courier: 'Delhivery Air' },
  '201301': { city: 'Noida', state: 'Uttar Pradesh', zone: 'Metro', days: '1–2 Days', courier: 'Delhivery Air' },
  '121001': { city: 'Faridabad', state: 'Haryana', zone: 'Metro', days: '1–2 Days', courier: 'Xpressbees' },
  // Mumbai & Maharashtra
  '400001': { city: 'Mumbai', state: 'Maharashtra', zone: 'Metro', days: '2–3 Days', courier: 'BlueDart Express' },
  '400050': { city: 'Bandra Mumbai', state: 'Maharashtra', zone: 'Metro', days: '2–3 Days', courier: 'BlueDart Express' },
  '411001': { city: 'Pune', state: 'Maharashtra', zone: 'Tier-1', days: '2–3 Days', courier: 'Delhivery Surface' },
  '440001': { city: 'Nagpur', state: 'Maharashtra', zone: 'Tier-2', days: '3–4 Days', courier: 'Xpressbees' },
  // Bangalore & Karnataka
  '560001': { city: 'Bengaluru', state: 'Karnataka', zone: 'Metro', days: '2–3 Days', courier: 'BlueDart Express' },
  '560034': { city: 'Koramangala Bengaluru', state: 'Karnataka', zone: 'Metro', days: '2–3 Days', courier: 'Delhivery Surface' },
  '570001': { city: 'Mysuru', state: 'Karnataka', zone: 'Tier-2', days: '3–4 Days', courier: 'Delhivery Surface' },
  // Hyderabad & Telangana
  '500001': { city: 'Hyderabad', state: 'Telangana', zone: 'Metro', days: '2–3 Days', courier: 'Delhivery Air' },
  '500081': { city: 'Hitec City Hyderabad', state: 'Telangana', zone: 'Metro', days: '2–3 Days', courier: 'BlueDart Express' },
  // Chennai & Tamil Nadu
  '600001': { city: 'Chennai', state: 'Tamil Nadu', zone: 'Metro', days: '2–3 Days', courier: 'BlueDart Express' },
  '641001': { city: 'Coimbatore', state: 'Tamil Nadu', zone: 'Tier-2', days: '3–4 Days', courier: 'Delhivery Surface' },
  // Kolkata & West Bengal
  '700001': { city: 'Kolkata', state: 'West Bengal', zone: 'Metro', days: '2–4 Days', courier: 'BlueDart Express' },
  '734001': { city: 'Siliguri', state: 'West Bengal', zone: 'Tier-2', days: '3–5 Days', courier: 'Delhivery Surface' },
  // Gujarat
  '380001': { city: 'Ahmedabad', state: 'Gujarat', zone: 'Tier-1', days: '2–3 Days', courier: 'BlueDart Express' },
  '395001': { city: 'Surat', state: 'Gujarat', zone: 'Tier-1', days: '2–3 Days', courier: 'Delhivery Surface' },
  // Rajasthan
  '302001': { city: 'Jaipur', state: 'Rajasthan', zone: 'Tier-1', days: '2–3 Days', courier: 'Delhivery Air' },
  '342001': { city: 'Jodhpur', state: 'Rajasthan', zone: 'Tier-2', days: '3–4 Days', courier: 'Xpressbees' },
  // Punjab & Chandigarh
  '160017': { city: 'Chandigarh', state: 'Chandigarh', zone: 'Tier-1', days: '1–2 Days', courier: 'Delhivery Air' },
  '141001': { city: 'Ludhiana', state: 'Punjab', zone: 'Tier-2', days: '2–3 Days', courier: 'Delhivery Surface' },
  // Kerala
  '682001': { city: 'Kochi', state: 'Kerala', zone: 'Tier-2', days: '3–4 Days', courier: 'BlueDart Express' },
  // Uttar Pradesh
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh', zone: 'Tier-1', days: '2–3 Days', courier: 'Delhivery Air' },
  '208001': { city: 'Kanpur', state: 'Uttar Pradesh', zone: 'Tier-2', days: '2–3 Days', courier: 'Xpressbees' }
};

// State mapping heuristics based on first 2 digits of Indian Pincode
const PIN_ZONE_MAP = {
  '11': { state: 'Delhi', region: 'North', estDays: '1–2 Days' },
  '12': { state: 'Haryana', region: 'North', estDays: '1–2 Days' },
  '13': { state: 'Haryana', region: 'North', estDays: '2–3 Days' },
  '14': { state: 'Punjab', region: 'North', estDays: '2–3 Days' },
  '15': { state: 'Punjab', region: 'North', estDays: '2–3 Days' },
  '16': { state: 'Chandigarh', region: 'North', estDays: '1–2 Days' },
  '17': { state: 'Himachal Pradesh', region: 'North', estDays: '3–4 Days' },
  '18': { state: 'Jammu & Kashmir', region: 'North', estDays: '4–5 Days' },
  '19': { state: 'Jammu & Kashmir', region: 'North', estDays: '4–5 Days' },
  '20': { state: 'Uttar Pradesh', region: 'North', estDays: '2–3 Days' },
  '21': { state: 'Uttar Pradesh', region: 'North', estDays: '2–3 Days' },
  '22': { state: 'Uttar Pradesh', region: 'North', estDays: '2–3 Days' },
  '23': { state: 'Uttar Pradesh', region: 'North', estDays: '2–3 Days' },
  '24': { state: 'Uttarakhand', region: 'North', estDays: '2–4 Days' },
  '25': { state: 'Uttar Pradesh', region: 'North', estDays: '2–3 Days' },
  '26': { state: 'Uttarakhand', region: 'North', estDays: '3–4 Days' },
  '27': { state: 'Uttar Pradesh', region: 'North', estDays: '3–4 Days' },
  '28': { state: 'Uttar Pradesh', region: 'North', estDays: '2–3 Days' },
  '30': { state: 'Rajasthan', region: 'West', estDays: '2–3 Days' },
  '31': { state: 'Rajasthan', region: 'West', estDays: '2–3 Days' },
  '32': { state: 'Rajasthan', region: 'West', estDays: '3–4 Days' },
  '33': { state: 'Rajasthan', region: 'West', estDays: '3–4 Days' },
  '34': { state: 'Rajasthan', region: 'West', estDays: '3–4 Days' },
  '36': { state: 'Gujarat', region: 'West', estDays: '2–3 Days' },
  '37': { state: 'Gujarat', region: 'West', estDays: '3–4 Days' },
  '38': { state: 'Gujarat', region: 'West', estDays: '2–3 Days' },
  '39': { state: 'Gujarat', region: 'West', estDays: '2–3 Days' },
  '40': { state: 'Maharashtra', region: 'West', estDays: '2–3 Days' },
  '41': { state: 'Maharashtra', region: 'West', estDays: '2–3 Days' },
  '42': { state: 'Maharashtra', region: 'West', estDays: '3–4 Days' },
  '43': { state: 'Maharashtra', region: 'West', estDays: '3–4 Days' },
  '44': { state: 'Maharashtra', region: 'Central', estDays: '3–4 Days' },
  '45': { state: 'Madhya Pradesh', region: 'Central', estDays: '3–4 Days' },
  '46': { state: 'Madhya Pradesh', region: 'Central', estDays: '3–4 Days' },
  '47': { state: 'Madhya Pradesh', region: 'Central', estDays: '3–4 Days' },
  '48': { state: 'Madhya Pradesh', region: 'Central', estDays: '3–4 Days' },
  '49': { state: 'Chhattisgarh', region: 'Central', estDays: '3–4 Days' },
  '50': { state: 'Telangana', region: 'South', estDays: '2–3 Days' },
  '51': { state: 'Andhra Pradesh', region: 'South', estDays: '3–4 Days' },
  '52': { state: 'Andhra Pradesh', region: 'South', estDays: '3–4 Days' },
  '53': { state: 'Andhra Pradesh', region: 'South', estDays: '3–4 Days' },
  '56': { state: 'Karnataka', region: 'South', estDays: '2–3 Days' },
  '57': { state: 'Karnataka', region: 'South', estDays: '3–4 Days' },
  '58': { state: 'Karnataka', region: 'South', estDays: '3–4 Days' },
  '59': { state: 'Karnataka', region: 'South', estDays: '3–4 Days' },
  '60': { state: 'Tamil Nadu', region: 'South', estDays: '2–3 Days' },
  '61': { state: 'Tamil Nadu', region: 'South', estDays: '3–4 Days' },
  '62': { state: 'Tamil Nadu', region: 'South', estDays: '3–4 Days' },
  '63': { state: 'Tamil Nadu', region: 'South', estDays: '3–4 Days' },
  '64': { state: 'Tamil Nadu', region: 'South', estDays: '3–4 Days' },
  '67': { state: 'Kerala', region: 'South', estDays: '3–4 Days' },
  '68': { state: 'Kerala', region: 'South', estDays: '3–4 Days' },
  '69': { state: 'Kerala', region: 'South', estDays: '3–4 Days' },
  '70': { state: 'West Bengal', region: 'East', estDays: '2–3 Days' },
  '71': { state: 'West Bengal', region: 'East', estDays: '3–4 Days' },
  '72': { state: 'West Bengal', region: 'East', estDays: '3–4 Days' },
  '73': { state: 'West Bengal', region: 'East', estDays: '3–4 Days' },
  '74': { state: 'West Bengal', region: 'East', estDays: '3–4 Days' },
  '75': { state: 'Odisha', region: 'East', estDays: '3–4 Days' },
  '76': { state: 'Odisha', region: 'East', estDays: '3–4 Days' },
  '78': { state: 'Assam', region: 'North-East', estDays: '4–5 Days' },
  '79': { state: 'North-East (NE)', region: 'North-East', estDays: '4–6 Days' },
  '80': { state: 'Bihar', region: 'East', estDays: '3–4 Days' },
  '81': { state: 'Bihar', region: 'East', estDays: '3–4 Days' },
  '82': { state: 'Jharkhand', region: 'East', estDays: '3–4 Days' },
  '83': { state: 'Jharkhand', region: 'East', estDays: '3–4 Days' },
  '84': { state: 'Bihar', region: 'East', estDays: '3–4 Days' },
  '85': { state: 'Bihar', region: 'East', estDays: '3–4 Days' }
};

export async function lookupPincode(pincode) {
  const pin = String(pincode).trim();
  if (!/^\d{6}$/.test(pin)) {
    return {
      serviceable: false,
      error: 'Please enter a valid 6-digit Indian PIN code'
    };
  }

  // 1. Direct local database match
  if (PINCODE_DATABASE[pin]) {
    return {
      serviceable: true,
      pincode: pin,
      ...PINCODE_DATABASE[pin],
      codAvailable: true,
      prepaidExpress: true
    };
  }

  // 2. Try online Indian Postal Pincode API if network is available
  try {
    const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice?.length) {
        const po = data[0].PostOffice[0];
        const prefix = pin.substring(0, 2);
        const zoneInfo = PIN_ZONE_MAP[prefix] || { estDays: '3–4 Days', region: 'National' };
        return {
          serviceable: true,
          pincode: pin,
          city: po.District || po.Name,
          state: po.State,
          zone: zoneInfo.region || 'Standard Zone',
          days: zoneInfo.estDays,
          courier: 'Delhivery Surface',
          codAvailable: true,
          prepaidExpress: true
        };
      }
    }
  } catch (err) {
    // API failed or offline - fall through to intelligent heuristic
  }

  // 3. Fallback to regional prefix lookup
  const prefix = pin.substring(0, 2);
  const zoneInfo = PIN_ZONE_MAP[prefix];
  if (zoneInfo) {
    return {
      serviceable: true,
      pincode: pin,
      city: `${zoneInfo.state} District`,
      state: zoneInfo.state,
      zone: zoneInfo.region,
      days: zoneInfo.estDays,
      courier: 'Delhivery Surface',
      codAvailable: true,
      prepaidExpress: true
    };
  }

  // Default Pan-India serviceable
  return {
    serviceable: true,
    pincode: pin,
    city: 'India Hub',
    state: 'India',
    zone: 'Standard Zone',
    days: '3–5 Days',
    courier: 'Delhivery Surface / India Post',
    codAvailable: true,
    prepaidExpress: true
  };
}
