export const getPlantImage = (imageName) => {
  try {
    return `/images/plants/${imageName}`;
  } catch (error) {
    return '/images/plants/placeholder.jpg'; // Default placeholder image
  }
};
