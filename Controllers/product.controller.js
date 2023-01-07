import Product from "../models/product.schema.js"
import formidable from 'formidable';
import fs from "fs"
import {deleteFile, s3FileUpload} from "../services/imageUpload.js"
import Mongoose from "mongoose"
import asyncHandler from '../services/asyncHandler'
import CustomError from '../utils/customError'
import config from "../config/index.js"


/**********************************************************
 * @ADD_PRODUCT
 * @route https://localhost:5000/api/product
 * @description Controller used for creating a new product
 * @description Only admin can create the coupon
 * @descriptio Uses AWS S3 Bucket for image upload
 * @returns Product Object
 *********************************************************/