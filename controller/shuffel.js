function shuffleArray(array) {
    // Iterate over the array backwards
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
  
      // Swap the current element with the randomly generated one
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  
    // Return the shuffled array
    return array;
  }
  
//   // Example usage:
//   const myArray = [1, 2, 3, 4, 5];
//   const shuffledArray = shuffleArray(myArray);
//   console.log(shuffledArray); // will output a randomly shuffled array
  

exports.shuffleArray = shuffleArray