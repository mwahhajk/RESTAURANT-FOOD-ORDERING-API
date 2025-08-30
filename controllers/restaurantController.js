import Resturant from "../models/restaurantSchema.js";

export const createRestaurantController=async(req,res)=>{
    console.log("create restaurant");
    try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "please provide title and address",
      });
    }
    const newResturant = new Resturant({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "New Resturant Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
  }
    
}

export const getAllRestaurantController=async(req,res)=>{
    console.log("Get ALL");
    try {

        const allRestaurnats=await Resturant.find();
        if(!allRestaurnats)
        {
        return res.status(500).send({
        success: false,
        message: "No Restaurant Found",
      });
        }
        return res.status(200).json({
            success:true,
            totalCount: allRestaurnats.length,
            restaurants:allRestaurnats
        })
    } catch (error) {
      res.status(500).send({
      success: false,
      message: "Error In Create Resturant api",
      error,
    });
    }
    
}

export const getRestaurantByIdController=async(req,res)=>{
    console.log("get By ID");

    try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "Please Provide Resturnat ID",
      });
    }
    //find resturant
    const resturant = await Resturant.findById(resturantId);
    if (!resturant) {
      return res.status(404).send({
        success: false,
        message: "no resturant found",
      });
    }
    res.status(200).send({
      success: true,
      resturant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get Resturarnt by id api",
      error,
    });
  }
    
}

export const deleteRestaurantController=async(req,res)=>{
    console.log("delete restaurnt");

    try {
    const resturantId = req.params.id;
    if (!resturantId) {
      return res.status(404).send({
        success: false,
        message: "No Resturant Found OR Provide Resturant ID",
      });
    }
    await Resturant.findByIdAndDelete(resturantId);
    res.status(200).send({
      success: true,
      message: "Resturant Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror in delete resturant api",
      error,
    });
  }
    
}