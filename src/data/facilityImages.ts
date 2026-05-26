export interface FacilityInfo {
  name: string;
  image: string;
  desc: string;
}

const facilityMap: Record<string, FacilityInfo> = {
  "King Bed": {
    name: "King Bed",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&auto=format&fit=crop&q=80",
    desc: "Ranjang king size premium dengan orthopaedic mattress",
  },
  "AC": {
    name: "AC",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&auto=format&fit=crop&q=80",
    desc: "Pendingin ruangan dengan smart thermostat",
  },
  "Smart TV": {
    name: "Smart TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80",
    desc: "TV layar datar 55 inch dengan streaming apps",
  },
  "WiFi": {
    name: "WiFi",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400&auto=format&fit=crop&q=80",
    desc: "Internet高速 dengan bandwidth 100 Mbps",
  },
  "Mini Bar": {
    name: "Mini Bar",
    image: "https://images.unsplash.com/photo-1559304822-0f2ef8a2cdec?w=400&auto=format&fit=crop&q=80",
    desc: "Mini bar lengkap dengan minuman dan snacks premium",
  },
  "Hot Shower": {
    name: "Hot Shower",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80",
    desc: "Shower air panas dengan high-pressure system",
  },
  "Safety Box": {
    name: "Safety Box",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&auto=format&fit=crop&q=80",
    desc: "Brankas digital untuk keamanan barang berharga",
  },
  "Living Room": {
    name: "Living Room",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=400&auto=format&fit=crop&q=80",
    desc: "Ruang tamu terpisah dengan sofa mewah dan meja kopi",
  },
  "Bathtub": {
    name: "Bathtub",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&auto=format&fit=crop&q=80",
    desc: "Bathtub marble dengan jet relaxation system",
  },
  "Jacuzzi": {
    name: "Jacuzzi",
    image: "https://images.unsplash.com/photo-1601314253843-199d0ce5b28a?w=400&auto=format&fit=crop&q=80",
    desc: "Jacuzzi pribadi dengan hydro-massage dan chromotherapy",
  },
  "Balkon": {
    name: "Balkon",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&auto=format&fit=crop&q=80",
    desc: "Balkon pribadi dengan view hutan yang menakjubkan",
  },
  "Butler Service": {
    name: "Butler Service",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=400&auto=format&fit=crop&q=80",
    desc: "Layanan butler 24 jam siap melayani kebutuhan Anda",
  },
};

export function getFacilityInfo(name: string): FacilityInfo {
  return facilityMap[name] || {
    name,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&auto=format&fit=crop&q=80",
    desc: `${name} — fasilitas premium untuk kenyamanan Anda`,
  };
}
