const express = require("express");

const app = express();

const { UserDataToMongo } = require("./db/db.connect");

UserDataToMongo();

const hotelModel = require("./models/Hotel.models");

app.use(express.json());
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

const individualHotelDataToDatabase = async (newHotel) => {
  try {
    const newHotelDataToDatabase = new hotelModel(newHotel);
    const hotelDataSaved = await newHotelDataToDatabase.save();
    return hotelDataSaved;
  } catch (error) {
    console.log("Error Seeding to Database", error);
  }
};

//Add New Hotel Data to Database.

app.post("/hotels", async (req, res) => {
  try {
    const addNewHotel = await individualHotelDataToDatabase(req.body);
    res
      .status(201)
      .json({ message: "Added to New Hotel Data to Database.", addNewHotel });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to add new hotel data to Database." });
  }
});

// Filter All Hotel Data From MongoDB Database

const readAllHotelData = async () => {
  try {
    const AllHotelData = await hotelModel.find();
    console.log(AllHotelData);
    return AllHotelData;
  } catch (error) {
    console.log(error);
  }
};

app.get("/hotels", async (req, res) => {
  try {
    const filterAllHotelData = await readAllHotelData();
    if (filterAllHotelData) {
      res.status(200).json({
        message: "Hotel Data Fetched from the Database.",
        filterAllHotelData,
      });
    } else {
      res.status(404).json({ error: "Hotel Not Found." });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to Fetch Hotel Data From The Database.",
    });
  }
});

// // Filter Hotel Data By Name From MongoDB Database

const readAllHotelDataByName = async (hotelName) => {
  try {
    const AllHotelDataByName = await hotelModel.findOne({ name: hotelName });
    console.log(AllHotelDataByName);
    return AllHotelDataByName;
  } catch (error) {
    console.log(error);
  }
};

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const filterHotelDataByName = await readAllHotelDataByName(
      req.params.hotelName
    );
    if (filterHotelDataByName) {
      res.status(200).json({
        message: "Hotel Data Fetched From the Database using Hotel Name.",
        filterHotelDataByName,
      });
    } else {
      res.status(404).json({ error: "Hotel Data Not Found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to Fetch Hotel Data From the Database." });
  }
});

// // Filter Hotel Data By Phone Number From MongoDB Database

const readAllHotelDataByPhoneNumber = async (PhoneNumber) => {
  try {
    const AllHotelDataByPhoneNumber = await hotelModel.findOne({
      phoneNumber: PhoneNumber,
    });
    console.log(AllHotelDataByPhoneNumber);
    return AllHotelDataByPhoneNumber;
  } catch (error) {
    console.log(error);
  }
};

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const filterAllHotelDataByPhoneNumber = await readAllHotelDataByPhoneNumber(
      req.params.phoneNumber
    );
    if (filterAllHotelDataByPhoneNumber) {
      res.status(200).json({
        message: "Hotel Data Fetched from the Database using Phone Number.",
        filterAllHotelDataByPhoneNumber,
      });
    } else {
      res.status(404).json({ error: "Hotel Not Found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hotel Failed to Fetch Data From the Database." });
  }
});

// Filter Hotel Data By Rating From MongoDB Database

const readHotelsByRating = async (hotelRating) => {
  try {
    const hotelsWithRating = await hotelModel.findOne({ rating: hotelRating });

    console.log(hotelsWithRating);

    return hotelsWithRating;
  } catch (error) {
    console.log(error);
  }
};

app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const readhotelsWithRating = await readHotelsByRating(
      req.params.hotelRating
    );
    if (readhotelsWithRating) {
      res.status(200).json({
        message: "Hotel Data Fetched from the Database using Rating.",
        readhotelsWithRating,
      });
    } else {
      res.status(404).json({ error: "Hotel Not Found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hotel data Failed to Fetch from the Database." });
  }
});

// Filter Hotel Data By Category From MongoDB Database

const readAllHotelsByCategory = async (categoryName) => {
  try {
    const readHotelsWithCategory = await hotelModel.find({
      category: categoryName,
    });

    console.log(readHotelsWithCategory);

    return readHotelsWithCategory;
  } catch (error) {
    console.log(error);
  }
};

app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const filterHotelDataByCategory = await readAllHotelsByCategory(
      req.params.hotelCategory
    );
    if (filterHotelDataByCategory) {
      res.status(200).json({
        message: "Hotel Data Fetched from the Database using Category.",
        filterHotelDataByCategory,
      });
    } else {
      res.status(404).json({ error: "Hotel Not Found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Hotel Data Failed to Fetched from the Database." });
  }
});

//find a Hotel by id and delete from the database

const deleteHotelById = async (HotelId) => {
  try {
    const HotelById = await hotelModel.findByIdAndDelete(HotelId);
    console.log("The 'New Hotel' Deleted", HotelById);
    return HotelById;
  } catch (error) {
    console.log(error);
  }
};

app.delete("/hotels/identification/:hotelId", async (req, res) => {
  try {
    const deleteHotelDataById = await deleteHotelById(req.params.hotelId);
    if (!deleteHotelDataById) {
      res.status(404).json({ error: "Hotel Data Not Found to Delete." });
    } else {
      res.status(201).json({
        message: "Deleted Hotel Data from the Database using Hotel Id.",
        deleteHotelDataById
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to Delete Hotel Data From the Database using Hotel Id.",
    });
  }
});

// Update Update Hotel Rating in MongoDB DataBase Dynamically after Calling Function.

const UpdateHotelRating = async (hotelId, dataToUpdate) => {
  try {
    const HotelRating = await hotelModel.findOneAndUpdate(
      { _id: hotelId },
      dataToUpdate,
      { new: true }
    );
    console.log(HotelRating);
    return HotelRating;
  } catch (error) {
    console.log(error);
  }
};

app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotelRating = await UpdateHotelRating(
      req.params.hotelId,
      req.body
    );
    if (!updatedHotelRating) {
      res.status(404).json({ error: "Hotel Data Not Found." });
    } else {
      res.status(201).json({
        message: "Hotel Rating Updated in the Hotel Database using Hotel Id.",
        updatedHotelRating,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Failed to Update Rating in the Hotel Database Using Hotel Id.",
    });
  }
});

const PORT = 3000;

app.listen(PORT, (req, res) => {
  console.log("Server is Running on PORT - ", PORT);
});
