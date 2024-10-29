export const plantCategories = {
  CEREALS: 'Cereals & Millets',
  PULSES: 'Pulses',
  VEGETABLES: 'Vegetables',
  FRUITS: 'Fruits',
  SPICES: 'Spices & Condiments',
  COMMERCIAL: 'Commercial Crops',
  OTHER: 'Other Plants'
};

export const plants = [
  // Cereals & Millets (50 plants)
  {
    id: 1,
    name: 'Rice',
    scientificName: 'Oryza sativa',
    category: plantCategories.CEREALS,
    emoji: '🌾',
    varieties: ['Basmati', 'Jasmine', 'Arborio', 'Sushi Rice', 'Brown Rice'],
    description: 'Major staple food crop worldwide',
    growingConditions: {
      soil: 'Clay-loamy',
      temperature: '20-35°C',
      rainfall: '100-200cm'
    }
  },
  {
    id: 2,
    name: 'Quinoa',
    scientificName: 'Chenopodium quinoa',
    category: plantCategories.CEREALS,
    emoji: '🌱',
    varieties: ['White', 'Red', 'Black'],
    description: 'Ancient grain with complete protein profile',
    growingConditions: {
      soil: 'Well-draining sandy',
      temperature: '15-20°C',
      rainfall: '30-50cm'
    }
  },
  {
    id: 3,
    name: 'Pearl Millet',
    scientificName: 'Pennisetum glaucum',
    category: plantCategories.CEREALS,
    emoji: '🌾',
    description: 'Drought-resistant cereal crop',
    growingConditions: {
      soil: 'Sandy loam',
      temperature: '25-35°C',
      rainfall: '40-60cm'
    }
  },
  {
    id: 4,
    name: 'Finger Millet',
    scientificName: 'Eleusine coracana',
    category: plantCategories.CEREALS,
    emoji: '🌾',
    description: 'Nutrient-rich millet variety',
    localNames: {
        hi: 'रागी',
        te: 'రాగి',
        ta: 'கேழ்வரகு',
        ka: 'ರಾಗಿ'
    }
  },
  {
    id: 5,
    name: 'Foxtail Millet',
    scientificName: 'Setaria italica',
    category: plantCategories.CEREALS,
    emoji: '🌾',
    description: 'Ancient grain with high fiber content',
    localNames: {
        hi: 'कांगनी',
        te: 'కొర్రలు',
        ta: 'தினை',
        ka: 'ನವಣೆ'
    }
  },

  // Pulses (40 plants)
  {
    id: 51,
    name: 'Red Lentils',
    scientificName: 'Lens culinaris',
    category: plantCategories.PULSES,
    emoji: '🫘',
    varieties: ['Masoor Dal', 'Turkish Red', 'Petite Crimson'],
    description: 'Quick-cooking protein-rich pulse',
    nutritionalValue: {
      protein: '24g/100g',
      fiber: '11g/100g',
      iron: '6.5mg/100g'
    }
  },
  {
    id: 52,
    name: 'Mung Bean',
    scientificName: 'Vigna radiata',
    category: plantCategories.PULSES,
    emoji: '🫘',
    varieties: ['Green Gram', 'Golden Gram'],
    description: 'Versatile pulse used for sprouts and dal',
    nutritionalValue: {
      protein: '23g/100g',
      fiber: '16g/100g',
      iron: '6.7mg/100g'
    }
  },

  // Vegetables (70 plants)
  {
    id: 101,
    name: 'Purple Carrot',
    scientificName: 'Daucus carota',
    category: plantCategories.VEGETABLES,
    emoji: '🥕',
    varieties: ['Cosmic Purple', 'Purple Haze', 'Deep Purple'],
    description: 'Antioxidant-rich heritage variety',
    nutritionalValue: {
      antioxidants: 'High in anthocyanins',
      betaCarotene: 'High',
      fiber: '2.8g/100g'
    }
  },
  {
    id: 102,
    name: 'Romanesco Broccoli',
    scientificName: 'Brassica oleracea var. botrytis',
    category: plantCategories.VEGETABLES,
    emoji: '🥦',
    description: 'Fractal-patterned cruciferous vegetable',
    growingConditions: {
      soil: 'Rich, well-draining',
      temperature: '15-20°C',
      spacing: '45-60cm'
    }
  },
  {
    id: 103,
    name: 'Bitter Gourd',
    scientificName: 'Momordica charantia',
    category: plantCategories.VEGETABLES,
    emoji: '🥬',
    description: 'Medicinal vegetable known for blood sugar control',
    varieties: ['White', 'Green', 'Chinese Bitter Gourd'],
    nutritionalValue: {
        vitamin_c: 'High',
        iron: 'Moderate',
        antioxidants: 'Very High'
    }
  },
  {
    id: 104,
    name: 'Ridge Gourd',
    scientificName: 'Luffa acutangula',
    category: plantCategories.VEGETABLES,
    emoji: '🥒',
    description: 'Fibrous gourd with multiple uses',
    uses: ['Culinary', 'Natural Scrubber', 'Medicinal']
  },
  {
    id: 105,
    name: 'Snake Gourd',
    scientificName: 'Trichosanthes cucumerina',
    category: plantCategories.VEGETABLES,
    emoji: '🐍',
    description: 'Long, snake-like gourd vegetable',
    growingConditions: {
        trellisHeight: '2-3m',
        spacing: '1m',
        season: 'Summer-Rainy'
    }
  },

  // Fruits (60 plants)
  {
    id: 151,
    name: 'Dragon Fruit',
    scientificName: 'Hylocereus undatus',
    category: plantCategories.FRUITS,
    emoji: '🐉',
    varieties: ['White Flesh', 'Red Flesh', 'Yellow Skin'],
    description: 'Exotic cactus fruit with striking appearance',
    nutritionalValue: {
      vitamin_c: 'High',
      antioxidants: 'Very High',
      fiber: '3g/100g'
    }
  },
  {
    id: 152,
    name: 'Passion Fruit',
    scientificName: 'Passiflora edulis',
    category: plantCategories.FRUITS,
    emoji: '🟣',
    varieties: ['Purple', 'Yellow', 'Giant Granadilla'],
    description: 'Tropical fruit with unique flavor profile',
    growingConditions: {
      climate: 'Tropical/Subtropical',
      soil: 'Well-draining rich soil',
      support: 'Requires trellising'
    }
  },
  {
    id: 153,
    name: 'Rambutan',
    scientificName: 'Nephelium lappaceum',
    category: plantCategories.FRUITS,
    emoji: '🔴',
    description: 'Hairy tropical fruit with sweet flesh',
    nutritionalValue: {
        vitamin_c: '40.9mg/100g',
        iron: '0.35mg/100g',
        fiber: '2.8g/100g'
    }
  },
  {
    id: 154,
    name: 'Durian',
    scientificName: 'Durio zibethinus',
    category: plantCategories.FRUITS,
    emoji: '🥝',
    description: 'King of fruits with strong aroma',
    varieties: ['Musang King', 'D24', 'Red Prawn']
  },
  {
    id: 155,
    name: 'Mangosteen',
    scientificName: 'Garcinia mangostana',
    category: plantCategories.FRUITS,
    emoji: '⚫',
    description: 'Queen of fruits with white segments',
    nutritionalValue: {
        antioxidants: 'Very High',
        xanthones: 'Present',
        fiber: 'Moderate'
    }
  },

  // Spices (40 plants)
  {
    id: 201,
    name: 'Saffron',
    scientificName: 'Crocus sativus',
    category: plantCategories.SPICES,
    emoji: '💮',
    description: "World's most expensive spice",
    uses: ['Culinary', 'Medicinal', 'Dye'],
    harvesting: {
      season: 'Autumn',
      method: 'Hand-picking stigmas',
      yield: '150 flowers for 1g saffron'
    }
  },
  {
    id: 202,
    name: 'Grains of Paradise',
    scientificName: 'Aframomum melegueta',
    category: plantCategories.SPICES,
    emoji: '✨',
    description: 'West African spice with peppery cardamom notes',
    uses: ['Spice blends', 'Traditional medicine', 'Beverages']
  },
  {
    id: 203,
    name: 'Long Pepper',
    scientificName: 'Piper longum',
    category: plantCategories.SPICES,
    emoji: '🌶️',
    description: 'Ancient spice with unique flavor profile',
    uses: ['Ayurvedic Medicine', 'Spice Blends', 'Traditional Cooking']
  },
  {
    id: 204,
    name: 'Galangal',
    scientificName: 'Alpinia galanga',
    category: plantCategories.SPICES,
    emoji: '🌱',
    description: 'Thai ginger with citrusy notes',
    culinaryUses: ['Thai Curry', 'Tom Yum', 'Indonesian Cuisine']
  },

  // Commercial Crops (30 plants)
  {
    id: 251,
    name: 'Blue Agave',
    scientificName: 'Agave tequilana',
    category: plantCategories.COMMERCIAL,
    emoji: '🌵',
    description: 'Source of tequila and natural sweeteners',
    commercialUses: ['Tequila production', 'Syrup', 'Fiber'],
    growingPeriod: '7-10 years'
  },
  {
    id: 252,
    name: 'Japanese Indigo',
    scientificName: 'Persicaria tinctoria',
    category: plantCategories.COMMERCIAL,
    emoji: '🌿',
    description: 'Natural blue dye source',
    uses: ['Textile dyeing', 'Traditional medicine'],
    processing: ['Leaf fermentation', 'Oxidation', 'Dye extraction']
  },
  {
    id: 253,
    name: 'Vanilla',
    scientificName: 'Vanilla planifolia',
    category: plantCategories.COMMERCIAL,
    emoji: '🌺',
    description: 'Orchid producing vanilla beans',
    processing: {
        steps: ['Hand Pollination', 'Harvesting', 'Curing', 'Drying'],
        duration: '6-8 months post-pollination'
    }
  },
  {
    id: 254,
    name: 'Rubber',
    scientificName: 'Hevea brasiliensis',
    category: plantCategories.COMMERCIAL,
    emoji: '🌳',
    description: 'Natural rubber producing tree',
    commercialValue: {
        products: ['Natural Rubber', 'Latex', 'Wood'],
        tappingAge: '7 years',
        productiveLife: '25-30 years'
    }
  },

  // Other Plants (10 plants)
  {
    id: 291,
    name: 'Bamboo',
    scientificName: 'Bambusoideae',
    category: plantCategories.OTHER,
    emoji: '🎋',
    description: 'Fast-growing woody grass'
  },
  // Add 9 more other plants...
];

// Helper functions
export const getPlantsByCategory = (category) => {
  return plants.filter(plant => plant.category === category);
};

export const searchPlants = (query) => {
  const searchTerm = query.toLowerCase();
  return plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm) ||
    plant.scientificName.toLowerCase().includes(searchTerm)
  );
};

// Additional helper functions for advanced filtering
export const getPlantsByNutritionalValue = (nutrientType) => {
  return plants.filter(plant => 
    plant.nutritionalValue && 
    plant.nutritionalValue[nutrientType]
  );
};

export const getPlantsByClimate = (climate) => {
  return plants.filter(plant => 
    plant.growingConditions && 
    plant.growingConditions.climate === climate
  );
};

export const getPlantsByUse = (use) => {
  return plants.filter(plant => 
    plant.uses && 
    plant.uses.includes(use)
  );
};
