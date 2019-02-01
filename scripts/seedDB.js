const mongoose = require("mongoose");
const db = require("../models");



mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/usersearches"
);


const advertisementsSeedArray = [
  {
      company: "Amazon",
      keywords: ["books", "tv", "games", "everything", "amazon"],
      image: "https://beyondpesticides.org/dailynewsblog/wp-content/uploads/2017/03/Amazon-Logo.jpg",
      link: "https://www.amazon.com/",
      description: "Shop Amazon to get lower prices on everything.",
      timesShownRandom: 0,
      timesShownCustom: 0,
  },

  {
      company: "Target",
      keywords: ["clothes", "soap", "detergent", "target"],
      image: "https://pbs.twimg.com/profile_images/960896975737622528/-5k32D4t_400x400.jpg",
      link: "https://www.target.com/",
      description: "Shop at Target because you are better than Walmart! Bring your Wallet",
      timesShownRandom: 0,
      timesShownCustom: 0,
  },


  {
      company: "UNCC",
      keywords: ["coding", "bootcamp", "learning", "uncc"],
      image: "https://images-na.ssl-images-amazon.com/images/I/61ZuoCK%2B3vL._SX425_.jpg",
      link: "https://bootcamp.uncc.edu/coding/",
      description: "Join us while we learn to code and type. Click the link for more info.",
      timesShownRandom: 0,
      timesShownCustom: 0,
  },

  {
      company: "Trader Joes",
      keywords: ["organic", "bagless", "apples", "snacks", "trader joes"],
      image: "https://fortunedotcom.files.wordpress.com/2016/03/776-ft-lauderdale-fl-night.jpg",
      link: "https://www.traderjoes.com/",
      description: "Come shop at Trader Joes, Everyone is doing it! Bring your own bag too.",
      timesShownRandom: 0,
      timesShownCustom: 0,
  },

  {
      company: "Walmart",
      keywords: ["walmart", "toys", "christmas", "gifts", "electronics"],
      image: "https://visitlaramie.org/wp-content/uploads/2013/06/walmart-logo.jpg",
      link: "https://www.walmart.com/",
      description: "Shop Walmart this Christmas, even on Christmas day.",
      timesShownRandom: 0,
      timesShownCustom: 0,
  },
]




  seedDatabase = function () {
    db.Advertisements
    .remove({})
    .then(() => db.Advertisements.collection.insertMany(advertisementsSeedArray))
    .then(data => {
      console.log(data.result.n + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
  

  }



  