const express = require("express");
const cors = require("cors");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./public/images/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage });
  

app.get("/",(req, res)=>{
    res.sendFile(__dirname+"/index.html");
});

let trinkets = [
    
    {
        "name": "Pet Rock",
        "imagesquare": "images/petrock.jpg",
        "image2by1": "images/petrock2x1.jpg",
        "image5by4": "images/petrock5x4.jpg",
        "year": "N/A",
        "value": "Priceless",
        "origin": "USA",
        "description": "This is one of the ugliest trinkets I own. However, it was given to me by my boyfriend, who spent around 20 minutes making it and told me it was \"me as a rock\". If you squint hard enough, it kind of does look like me a bit (not really). 5 stars for sentimental value." ,
        "rating": "★★★★★",
        "ranking_id": 1,
        "categories": [
            "Junk",
            "weird",
            "home",
            "example"
        ],
        "extraparam": "Highest Rating"
    },
    {
        "name": "Mia Macaron",
        "imagesquare": "images/macaron.jpg",
        "image2by1": "null",
        "image5by4": "images/macaron5x4.jpg",
        "year": "2024",
        "value": "$22.00",
        "origin": "Indonesia",
        "description":"Despite her young age, Mia Macaron already has an incredibly worldly outlook. Starting in a factory in Indonesia, Mia was shipped to France (possibly stopping in London, her company's homeland)! Here, she patiently sat in Paris's Jellycat Patisserie, until she was eventually picked up and bought by an American tourist, who just happened to be my mother.",
        "rating": "★★★★☆",
        "ranking_id": 2,
        "categories": [
            "Cute",
            "Collectible",
            "example"
        ],
        "extraparam": "null"
    },
    {
        "name": "Intriguing Candle",
        "imagesquare": "images/candle.jpg",
        "image2by1": "images/candle2x1.jpg",
        "image5by4": "images/candle5x4.jpg",
        "year": "Unknown",
        "value": "$5.50",
        "origin": "Unknown",
        "description":"After hours of slaving away at my computer, I looked to this candle to see it was almost completely finished, and in an incredibly interesting shape to boot. While this is incredibly mundane, looking at it makes me feel like an accomplished worker (and makes me wonder if I have secret candle powers).",
        "rating": "★★★★☆",
        "ranking_id": 3,
        "categories": [
            "home",
            "new",
            "Misc",
            "example"
        ],
        "extraparam": "Newest Trinket"
    },
    {
        "name": "Hangyodon Hiding",
        "imagesquare": "images/hangyodon.jpg",
        "image2by1": "images/hangyodon2x1.jpg",
        "image5by4": "images/hangyodon5x4.jpg",
        "year": "2019",
        "value": "$8.00",
        "origin": "Japan",
        "description":"",
        "rating": "★★★☆☆",
        "ranking_id": 4,
        "categories": [
            "home",
            "random"
        ],
        "extraparam": "Random Trinket"
    },
    {
        "name": "Monchichi",
        "imagesquare": "images/monchichi.jpg",
        "image2by1": "null",
        "image5by4": "images/monchichi5x4.jpg",
        "year": "Unknown",
        "value": "$16.00",
        "origin": "",
        "description":"",
        "rating": "",
        "ranking_id": 5,
        "categories": [
            "Vintage"
        ],
        "extraparam": "null"
    },
    {
        "name": "Custom Blythe Doll",
        "imagesquare": "images/blythe.jpg",
        "image2by1": "null",
        "image5by4": "null",
        "year": "N/A",
        "value": "$50.00-$200.00+",
        "origin": "N/A",
        "description":"Blythe is a line of fashion dolls which were originally sold in 1972 in the U.S., U.K., Australia, and Japan. While the dolls never enjoyed large mainstream success, they have since developed a cult following. Today, most blythe doll collectors seek out custom dolls made by individual sellers, or even choose to customize their own doll using knock-off/replica parts.",
        "rating": "While many find Blythe dolls creepy, I think they're super cute and endearing, and would particularly like to make a \"mini-me\" blythe doll to display in my room.",
        "ranking_id": 0,
        "categories": [
            "future"
        ],
        "extraparam": "https://www.etsy.com/listing/1572457336/custom-blythe-doll-ooak-doll-ivy"
    },
    {
        "name": "Comically Large Taper Candle (minimum 15 inches)",
        "imagesquare": "images/largecandle.jpg",
        "image2by1": "null",
        "image5by4": "null",
        "year": "N/A",
        "value": "$15.00-$25.00",
        "origin": "N/A",
        "description":"A taper candle is a long, thin candle, which were formerly most often used to light rooms after nightfall, but are now more commonly used as a form of decorative lighting. Most taper candles are between 10-12 inches, and have a burn time of approx. 10 hours.",
        "rating": "For some reason, I find that when studying or doing homework I focus best when the only lightsource available to me is a taper candle. However, the average taper candle doesn't last long enough to be convenient for my daily needs, and I've (quite literally) been burning through candles since I made this discovery.",
        "ranking_id": 0,
        "categories": [
            "future"
        ],
        "extraparam": "https://www.potterybarn.com/products/xl-taper-candles/"
    },
    {
        "name": "Tea Pet",
        "imagesquare": "images/teapet.jpg",
        "image2by1": "null",
        "image5by4": "null",
        "year": "N/A",
        "value": "$15.00-$50.00+",
        "origin": "China",
        "description":"In Chinese tea ceremonies, tea pets are a decorative ceramic figurine and good luck charm. Since the most tea leaves produce the strongest flavor after their second steeping, it's traditional to pour the tea from your first steep onto your tea pet as an offering of sorts.",
        "rating": "As someone who drinks tea a good bit, I think this would be a fun addition to my tea drinking. Also look at how cute it is!",
        "ranking_id": 0,
        "categories": [
            "future"
        ],
        "extraparam": "https://www.cnteaspirit.com/product/handmade-zisha-yixing-clay-otter-tea-pet/"
    },
    {
        "name":"Draculara",
        "imagesquare": "images/drac.jpg",
        "image2by1": "null",
        "image5by4": "drac5x4.jpg",
        "year": "2023",
        "origin": "USA",
        "description": "",
        "rating": "",
        "ranking_id": 6,
        "categories": [
            "Doll"
        ],
        "extraparam": "null"
    },
    {
        "name":"Smiski doing Yoga",
        "imagesquare": "images/smiski.jpg",
        "image2by1": "null",
        "image5by4": "images/smiski.jpg",
        "year": "Unknown",
        "origin": "Japan",
        "description": "",
        "rating": "",
        "ranking_id": 7,
        "categories": [
            "Collectible"
        ],
        "extraparam": "null"
    },
    {
        "name":"Cat in Shark Costume",
        "imagesquare": "images/catshark.jpg",
        "image2by1": "null",
        "image5by4": "images/catshark5x4.jpg",
        "year": "Unknown",
        "origin": "Unknown",
        "description": "",
        "rating": "",
        "ranking_id": 8,
        "categories": [
            "Animal",
            "Collectible"
        ],
        "extraparam": "null"
    },
    {
        "name":"Smiski doing Yoga",
        "imagesquare": "images/smiski.jpg",
        "image2by1": "null",
        "image5by4": "images/smiski5x4.jpg",
        "year": "Unknown",
        "origin": "Japan",
        "description": "",
        "rating": "",
        "ranking_id": 9,
        "categories": [
            "Collectible",
            "Foreign"
        ],
        "extraparam": "null"
    },
    {
        "name":"My Melody",
        "imagesquare": "images/mymelo.jpg",
        "image2by1": "null",
        "image5by4": "images/mymelo5x4.jpg",
        "year": "Unknown",
        "origin": "Taiwan",
        "description": "",
        "rating": "",
        "ranking_id": 10,
        "categories": [
            "Foreign",
            "Cute"
        ],
        "extraparam": "null"
    },
    {
        "name":"Artsy Bear",
        "imagesquare": "images/bear.jpg",
        "image2by1": "null",
        "image5by4": "images/bear5x4.jpg",
        "year": "Unknown",
        "origin": "Unknown",
        "description": "",
        "rating": "",
        "ranking_id": 11,
        "categories": [
            "Misc"
        ],
        "extraparam": "null"
    }
    
];

app.get("/api/trinkets", (req, res)=>{
    res.send(trinkets);
});

app.post("/api/trinkets", upload.single("img"), (req, res) => {
    const result = validateTrinket(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    const trinket = {
      ranking_id: trinkets.length + 1,
      name: req.body.name,
      year: req.body.year,
      origin: req.body.origin,
      description: req.body.description,
      rating: req.body.rating,
      categories: ["example"],
      extraparam: "null",
    };
  
    if (req.file) {
      trinket.imagesquare = "images/" + req.file.filename;
      trinket.image2by1 = "images/" + req.file.filename;
      trinket.image5by4 = "images/" + req.file.filename;
    }
  
    trinkets.push(trinket);
    res.status(200).send(trinket);
  });

const validateTrinket = (trinket) => {
    const schema = Joi.object({
      ranking_id: Joi.allow(""),
      name: Joi.string().min(3).required(),
      year: Joi.string().required(),
      origin: Joi.string().required(),
      description: Joi.string().required(),
      rating: Joi.number().required,
    });
  
    return schema.validate(trinket);
  };

app.listen(3001, ()=>{
    console.log("I'm listening");
});