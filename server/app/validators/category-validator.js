import Category from "../models/category-model.js";

export const categoryValidation = {
  //  Validation for name field
  name: {
    in: ["body"],
    exists: {
      errorMessage: "Name field is required",
    },
    notEmpty: {
      errorMessage: "Name field should not be empty",
    },
    trim: true,
    custom: {
      options: async (value) => {
        const category = await Category.findOne({ name: value });
        if (category) {
          throw new Error("Category already exists");
        }
        return true;
      },
    },
  },

  //  Validation for description field
  description: {
    in: ["body"],
    optional: true,
    trim: true,
  },

  //  Validation for imageUrl (optional, must be a URL if provided)
  imageUrl: {
    in: ["body"],
    optional: true,
    isURL: {
      errorMessage: "Image URL must be a valid URL",
    },
  },
};

export const categoryUpdateValidation = {
  name: {
    in: ["body"],
    exists: {
      errorMessage: "Name field is required",
    },
    notEmpty: {
      errorMessage: "Name field should not be empty",
    },
    trim: true,
    custom: {
      options: async (value, { req }) => {
        const category = await Category.findOne({ name: value });
        if (category && category._id.toString() !== req.params.id) {
          throw new Error("Category already exists");
        }
        return true;
      },
    },
  },

  description: {
    in: ["body"],
    optional: true,
    trim: true,
  },

  imageUrl: {
    in: ["body"],
    optional: true,
    isURL: {
      errorMessage: "Image URL must be a valid URL",
    },
  },

  isActive: {
    in: ["body"],
    optional: true,
    isBoolean: {
      errorMessage: "isActive must be true or false",
    },
    toBoolean: true,
  },
};
