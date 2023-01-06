import Collection from '../models/collection.schema.js'
import asyncHandler from '../services/asyncHandler'
import CustomError from '../utils/customError'

/******************************************************
 * @Create_COLLECTION
 * @route http://localhost:5000/api/collection
 * @description User signUp Controller for creating new user
 * @parameters name, email, password
 * @returns User Object
 ******************************************************/

export const createCollection = asyncHandler(async (req, res) => {
    //take name from front end
    const { name } = req.body

    if (!name) {
        throw new CustomError("Collection name is required", 400)
    }

    //add this name to database
    const collection = await Collection.create({
        name
    })
    //send this response value to frontend
    res.status(200).json({
        success: true,
        message: "Collection created with success",
        collection
    })

})

export const updateCollection = asyncHandler(async (req, res) => {
    //existing value to be updates
    const {id: collectionId} = req.params
    //new value to get updated
    const {name} = req.body

    if (!name) {
        throw new CustomError("Collection name is required", 400)
    }

    let updatedCollection = await Collection.findByIdAndUpdate(
        collectionId,
        {
            name,
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!updatedCollection) {
        throw new CustomError("Collection not found", 400)
    }

    //send response to front end
    res.status(200).json({
        success: true,
        message: "Collection updated successfully",
        updateCollection
    })

})