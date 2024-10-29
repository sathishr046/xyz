export const cropData = {
  "Mysuru": {
    crops: {
      "Potato": {
        currentAcreage: 5000,
        demandAcreage: 7000,
        priceHistory: [
          { month: "Jan", price: 1200 },
          { month: "Feb", price: 1300 },
          { month: "Mar", price: 1100 },
          { month: "Apr", price: 1000 },
          { month: "May", price: 1400 },
          { month: "Jun", price: 1600 }
        ],
        demandTrend: "increasing"
      },
      "Tomato": {
        currentAcreage: 3000,
        demandAcreage: 4000,
        priceHistory: [
          { month: "Jan", price: 800 },
          { month: "Feb", price: 900 },
          { month: "Mar", price: 1200 },
          { month: "Apr", price: 1100 },
          { month: "May", price: 1000 },
          { month: "Jun", price: 900 }
        ],
        demandTrend: "stable"
      }
    }
  },
  "Mandya": {
    crops: {
      "Sugarcane": {
        currentAcreage: 8000,
        demandAcreage: 10000,
        priceHistory: [
          { month: "Jan", price: 2500 },
          { month: "Feb", price: 2600 },
          { month: "Mar", price: 2700 },
          { month: "Apr", price: 2800 },
          { month: "May", price: 2900 }
        ],
        demandTrend: "increasing"
      }
    }
  }
  // Add more taluks and crops as needed
}; 