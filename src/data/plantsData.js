export const plantsData = [
    {
      id: 1,
      name: "Tomato",
      scientificName: "Solanum lycopersicum",
      category: "vegetables",
      image: "/images/plants/vegetables/tomato.jpg", // Updated path
      description: "A staple vegetable crop known for its versatility in cooking.",
      careGuide: {
        water: "Regular watering, maintain consistent moisture",
        sunlight: "Full sun, 6-8 hours daily",
        soil: "Rich, well-draining soil with pH 6.0-6.8",
        temperature: "65-85°F (18-29°C)",
        humidity: "50-70%",
        fertilizer: "Regular feeding with balanced fertilizer",
        pruning: "Remove suckers for indeterminate varieties"
      },
      diseases: [
        {
          name: "Early Blight",
          symptoms: "Dark brown spots with concentric rings",
          treatment: "Copper-based fungicides, improve air circulation"
        },
        {
          name: "Late Blight",
          symptoms: "Water-soaked spots, white fuzzy growth",
          treatment: "Remove infected plants, use preventive fungicides"
        }
      ],
      tips: [
        "Stake or cage plants for support",
        "Mulch to retain moisture",
        "Plant deep to develop strong roots"
      ],
      harvestInfo: {
        season: "Summer",
        signs: "Firm, fully colored fruits",
        method: "Twist gently or cut with pruners"
      }
    },
    // Add 49 more plants with similar detailed information
  ];
