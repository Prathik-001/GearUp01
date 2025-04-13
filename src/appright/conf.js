/* eslint-disable no-useless-catch */
import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../conf/conf.js";

export class Service {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl);
    this.client.setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }
  // Car database
  async uploadData(
    imageId,
    vehicleName,
    vehicleType,
    fuelType,
    range,
    mileage,
    seats,
    luggageCapacity,
    rentPrice,
    airConditioning,
    gpsNavigation,
    bluetooth,
    sunroof,
    transmissionType,
    numberOfDoors,
    conditions,
    rating,
    userId
  ) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(),
        {
          vehicleName,
          vehicleType,
          fuelType,
          range,
          mileage,
          seats,
          luggageCapacity,
          rentPrice,
          airConditioning,
          gpsNavigation,
          bluetooth,
          sunroof,
          transmissionType,
          numberOfDoors,
          conditions,
          rating,
          imageId,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: car error " + error);
      return false;
    }
  }

  //Bike database
  async uploadBikeData(
    imageId,
    vehicleName,
    vehicleType,
    fuelType,
    range,
    mileage,
    cc,
    rentPrice,
    abs,
    gpsNavigation,
    topBox,
    conditions,
    rating,
    userId
  ) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBikeCollectionId,
        ID.unique(),
        {
          imageId,
          vehicleName,
          vehicleType,
          fuelType,
          range,
          mileage,
          cc,
          rentPrice,
          abs,
          gpsNavigation,
          topBox,
          conditions,
          rating,

          userId 
        }
      );
    } catch (error) {
      console.log("Appwrite service :: uploadBikeData :: error", error);
      return false;
    }
  }
  
// Fetch all cars (with pagination)
  async getAllCarsData() {
    try {
      const allDocs = [];
      let offset = 0;
      const limit = 100;
      let fetched;
  
      do {
        const res = await this.database.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          [Query.limit(limit), Query.offset(offset)]
        );
  
        fetched = res.documents;
        allDocs.push(...fetched);
        offset += limit;
      } while (fetched.length === limit);
  
      return allDocs;
    } catch (error) {
      console.log("Appwrite service :: getAllVehiclesData :: error " + error);
      return false;
    }
  }
  
//  Fetch all bikes (with pagination)
  async getAllBikesData() {
    try {
      const allDocs = [];
      let offset = 0;
      const limit = 100;
      let fetched;
  
      do {
        const res = await this.database.listDocuments(
          conf.appwriteDatabaseId,
          conf.appwriteBikeCollectionId,
          [Query.limit(limit), Query.offset(offset)]
        );
  
        fetched = res.documents;
        allDocs.push(...fetched);
        offset += limit;
      } while (fetched.length === limit);
  
      return allDocs;
    } catch (error) {
      console.log("Appwrite service :: getAllBikesData :: error " + error);
      return false;
    }
  }
  // async getWishlistedCourses(numbers) {
  //   try {
  //     return await this.database.listDocuments(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteCollectionId,
  //       [Query.equal("$id", numbers)]
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service :: getData :: error " + error);
  //     return false;
  //   }
  // }
  // async updateWishlistStatus(id, status) {
  //   try {
  //     return await this.database.updateDocument(
  //       conf.appwriteDatabaseId,
  //       conf.appwriteCollectionId,
  //       id,
  //       { wishlisted: status }
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service :: updatePost :: error " + error);
  //   }
  // }

  async getCarInfo(id) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite service :: getData :: error " + error);
      return false;
    }
  }

  async getBikeInfo(id) {
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteBikeCollectionId,
        id
      );
    } catch (error) {
      console.log("Appwrite service :: getData :: error " + error);
      return false;
    }
  }

  // Delete a car document
async deleteCar(documentId) {
  try {
    return await this.database.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      documentId
    );
  } catch (error) {
    console.log("Appwrite service :: deleteCar :: error " + error);
    throw error;
  }
}

// Delete a bike document
async deleteBike(documentId) {
  try {
    return await this.database.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteBikeCollectionId,
      documentId
    );
  } catch (error) {
    console.log("Appwrite service :: deleteBike :: error " + error);
    throw error;
  }
}

  // async getCourseByTopic(topic) {
  //   try {
  //     return await this.database.listDocuments(
  //       conf.appWriteDatabaseId,
  //       conf.appWriteCollectionId,
  //       [Query.equal("topic", topic)]
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service :: getCourseByTopic :: error " + error);
  //     return false;
  //   }
  // }
  // async createWishlist({ userId, wishlist }) {
  //   try {
  //     return await this.database.createDocument(
  //       conf.appWriteDatabaseId,
  //       conf.appWriteWishlistCollectionId,
  //       ID.unique(),
  //       { userId: userId, wishlist: wishlist }
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service :: createPost :: error " + error);
  //   }
  // }
  // async getWishlists(userId) {
  //   try {
  //     return await this.database.listDocuments(
  //       conf.appWriteDatabaseId,
  //       conf.appWriteWishlistCollectionId,
  //       [Query.equal("userId", userId)]
  //     );
  //   } catch (error) {
  //     console.log("Appwrite service :: getData :: error " + error);
  //     return false;
  //   }
  // }

  // async updateWishlist(id, userId, wishlist) {
  //   if (id) {
  //     try {
  //       return await this.database.updateDocument(
  //         conf.appWriteDatabaseId,
  //         conf.appWriteWishlistCollectionId,
  //         id,
  //         { userId: userId, wishlist: wishlist }
  //       );
  //     } catch (error) {
  //       console.log("Appwrite service :: updatePost :: error " + error);
  //     }
  //   }
  // }

  //file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("Appwrite service :: uploadFile:: error " + error);
      return false;
    }
  }

  // async deleteFile(fileId) {
  //   try {
  //     await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
  //     return true;
  //   } catch (error) {
  //     console.log("Appwrite service :: deleteFile :: error " + error);
  //     return false;
  //   }
  // }

  //  async getFilePreiview({fileId}) {
  //   try {
  //     if (fileId)
  //       console.log(fileId);
  //     const res=  this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  //     if (res){
  //       console.log(res);
  //       return res;
  //     }
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  // }
  
  getFilePreiview(fileId) {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;