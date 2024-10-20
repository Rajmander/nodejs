import categoryService from "../services/categoryService.js";

class CategoryController {
  async add(req, res) {
    const data = req.body;
    try {
      const result = await categoryService.add(data);
      console.log("Result length>>", result);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          msg: "Category added successfully",
          status: "success",
          statusCode: 201,
        });
      } else {
        return res.status(209).json({
          error: "Conflict",
          msg: "Category name already exists",
          status: "success",
          statusCode: 209,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async update(req, res) {
    const data = req.body;
    data.id = req.params.categoryId;
    try {
      const result = await categoryService.update(data);
      console.log("Result length>>", result);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          msg: "Category updated successfully",
          status: "success",
          statusCode: 201,
        });
      } else {
        return res.status(209).json({
          error: "Conflict",
          msg: "Category name already exists",
          status: "success",
          statusCode: 209,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async show(req, res) {
    try {
      const result = await categoryService.show();
      console.log("Result length>>", result);

      if (result.length > 0) {
        return res.status(200).json({
          msg: "Category listing",
          status: "success",
          data: result,
          statusCode: 200,
        });
      } else {
        return res.status(404).json({
          error: "Not Found",
          msg: "No record found",
          status: "success",
          statusCode: 200,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async delete(req, res) {
    const categoryId = req.params.categoryId;
    try {
      const result = await categoryService.delete(categoryId);
      console.log("Result length>>", result);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          msg: "Category deleted successfully",
          status: "success",
          statusCode: 201,
        });
      } else {
        return res.status(209).json({
          msg: "Category cannot be deleted had some services",
          status: "failed",
          statusCode: 500,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async addService(req, res) {
    const data = req.body;
    const category_id = req.params.categoryId;
    data.categoryId = category_id;

    try {
      const result = await categoryService.addService(data);
      console.log("Result length>>", result);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          msg: "Service added successfully",
          status: "success",
          statusCode: 201,
        });
      } else {
        return res.status(209).json({
          error: "Conflict",
          msg: "Service name already exists",
          status: "success",
          statusCode: 209,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async showService(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const result = await categoryService.showService(categoryId);
      console.log("Result length>>", result);

      if (result.length > 0) {
        return res.status(200).json({
          msg: "Services listing",
          status: "success",
          data: result,
          statusCode: 200,
        });
      } else {
        return res.status(404).json({
          error: "Not Found",
          msg: "No record found",
          status: "success",
          statusCode: 200,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }

  async updateService(req, res) {
    const data = req.body;
    data.categoryId = req.params.categoryId;
    data.serviceId = req.params.serviceId;
    try {
      const result = await categoryService.updateService(data);
      console.log("Result length>>", result);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          msg: "Service updated successfully",
          status: "success",
          statusCode: 201,
        });
      } else {
        return res.status(209).json({
          error: "Conflict",
          msg: "Service name already exists",
          status: "success",
          statusCode: 209,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }
  async deleteService(req, res) {
    const data = {};
    data.categoryId = req.params.categoryId;
    data.serviceId = req.params.serviceId;
    try {
      const result = await categoryService.deleteService(data);
      console.log("Result length>>", result);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          msg: "Service deleted successfully",
          status: "success",
          statusCode: 201,
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: "Server error",
        msg: "Something went wrong",
        status: "failed",
        statusCode: 500,
      });
    }
  }
}
export default new CategoryController();
