const PropertyModel = require("../models/Property");

const distructObj = (body, user) => {
    return {
        name: body.name?.toLowerCase(),
        description: body.description?.toLowerCase(),
        address: body.address?.toLowerCase(),
        city: body.city?.toLowerCase(),
        state: body.state?.toLowerCase(),
        country: body.country?.toLowerCase(),
        zipCode: body.zipCode?.toLowerCase(),
        propertyType: body.propertyType?.toLowerCase(),
        guests: body.guests,
        bedrooms: body.bedrooms,
        noOfBeds: body.noOfBeds,
        bathrooms: body.bathrooms,
        amenities: body.amenities,
        pricePerNight: body.pricePerNight,
        image: body.images,   
        creator: user 
    }
}

const bookedDates = (fromDate, toDate) => {
    const startDate = new Date(fromDate);
    const endDate = new Date(toDate);
    const dates = [];
    while (endDate > startDate) {
        startDate.setDate(startDate.getDate() + 1);
        dates.push(startDate.toJSON());
    }
    return dates;
}
module.exports = {distructObj, bookedDates}