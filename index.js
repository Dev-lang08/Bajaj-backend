const express = require("express");
const app = express();
var cors = require("cors");

app.use(cors());
app.use(express.json());

function processData(data) {
  let numbers = data.filter((item) => !isNaN(item));
  let alphabets = data.filter((item) => /^[a-zA-Z]+$/.test(item));
  let highestLowercase =
    alphabets
      .filter((item) => /^[a-z]+$/.test(item))
      .sort()
      .reverse()[0] || "";
  return {
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : [],
  };
}

// POST method route
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false });
    }

    const processedData = processData(data);
    const response = {
      is_success: true,
      user_id: "Devansh_Tewari_04032003",
      email: "devtewari03@gmail.com",
      roll_number: "21BAI1474",
      ...processedData,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ is_success: false, error: error.message });
  }
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
